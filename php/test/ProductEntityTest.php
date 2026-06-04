<?php
declare(strict_types=1);

// Product entity test

require_once __DIR__ . '/../oktiasbakery_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ProductEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = OktiasBakerySDK::test(null, null);
        $ent = $testsdk->Product(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = product_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "product." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set OKTIASBAKERY_TEST_PRODUCT_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $product_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.product")));
        $product_ref01_data = null;
        if (count($product_ref01_data_raw) > 0) {
            $product_ref01_data = Helpers::to_map($product_ref01_data_raw[0][1]);
        }

        // LIST
        $product_ref01_ent = $client->Product(null);
        $product_ref01_match = [];

        [$product_ref01_list_result, $err] = $product_ref01_ent->list($product_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($product_ref01_list_result);

    }
}

function product_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/product/ProductTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = OktiasBakerySDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["product01", "product02", "product03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("OKTIASBAKERY_TEST_PRODUCT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "OKTIASBAKERY_TEST_PRODUCT_ENTID" => $idmap,
        "OKTIASBAKERY_TEST_LIVE" => "FALSE",
        "OKTIASBAKERY_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["OKTIASBAKERY_TEST_PRODUCT_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["OKTIASBAKERY_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new OktiasBakerySDK(Helpers::to_map($merged_opts));
    }

    $live = $env["OKTIASBAKERY_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["OKTIASBAKERY_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
