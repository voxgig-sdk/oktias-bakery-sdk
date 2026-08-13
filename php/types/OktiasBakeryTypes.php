<?php
declare(strict_types=1);

// Typed models for the OktiasBakery SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Product entity data model. */
class Product
{
    public string $category;
    public ?string $currency = null;
    public ?string $description = null;
    public string $id;
    public ?string $imageUrl = null;
    public bool $inStock;
    public string $name;
    public float $price;
    public ?int $quantity = null;
}

/** Request payload for Product#list. */
class ProductListMatch
{
    public ?string $category = null;
    public ?string $currency = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $imageUrl = null;
    public ?bool $inStock = null;
    public ?string $name = null;
    public ?float $price = null;
    public ?int $quantity = null;
}

