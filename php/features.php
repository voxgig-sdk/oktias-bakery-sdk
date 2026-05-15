<?php
declare(strict_types=1);

// OktiasBakery SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class OktiasBakeryFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new OktiasBakeryBaseFeature();
            case "test":
                return new OktiasBakeryTestFeature();
            default:
                return new OktiasBakeryBaseFeature();
        }
    }
}
