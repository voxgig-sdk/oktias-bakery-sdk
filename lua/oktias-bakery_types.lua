-- Typed models for the OktiasBakery SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Product
---@field category string
---@field currency? string
---@field description? string
---@field id string
---@field image_url? string
---@field in_stock boolean
---@field name string
---@field price number
---@field quantity? number

---@class ProductListMatch

local M = {}

return M
