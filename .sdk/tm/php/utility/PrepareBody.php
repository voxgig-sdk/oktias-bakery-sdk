<?php
declare(strict_types=1);

// OktiasBakery SDK utility: prepare_body

class OktiasBakeryPrepareBody
{
    public static function call(OktiasBakeryContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
