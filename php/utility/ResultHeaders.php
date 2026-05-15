<?php
declare(strict_types=1);

// OktiasBakery SDK utility: result_headers

class OktiasBakeryResultHeaders
{
    public static function call(OktiasBakeryContext $ctx): ?OktiasBakeryResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
