<?php
declare(strict_types=1);

// OktiasBakery SDK utility: result_body

class OktiasBakeryResultBody
{
    public static function call(OktiasBakeryContext $ctx): ?OktiasBakeryResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
