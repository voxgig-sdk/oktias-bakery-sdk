// Typed models for the OktiasBakery SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Product {
  category: string
  currency?: string
  description?: string
  id: string
  image_url?: string
  in_stock: boolean
  name: string
  price: number
  quantity?: number
}

export type ProductListMatch = Partial<Product>

