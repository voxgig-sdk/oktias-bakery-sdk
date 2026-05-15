<?php
declare(strict_types=1);

// OktiasBakery SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class OktiasBakeryMakeContext
{
    public static function call(array $ctxmap, ?OktiasBakeryContext $basectx): OktiasBakeryContext
    {
        return new OktiasBakeryContext($ctxmap, $basectx);
    }
}
