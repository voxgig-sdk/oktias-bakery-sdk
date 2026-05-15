<?php
declare(strict_types=1);

// OktiasBakery SDK utility: feature_add

class OktiasBakeryFeatureAdd
{
    public static function call(OktiasBakeryContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
