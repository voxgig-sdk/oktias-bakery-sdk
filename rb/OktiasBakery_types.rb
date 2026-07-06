# frozen_string_literal: true

# Typed models for the OktiasBakery SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Product entity data model.
#
# @!attribute [rw] category
#   @return [String]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] image_url
#   @return [String, nil]
#
# @!attribute [rw] in_stock
#   @return [Boolean]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] price
#   @return [Float]
#
# @!attribute [rw] quantity
#   @return [Integer, nil]
Product = Struct.new(
  :category,
  :currency,
  :description,
  :id,
  :image_url,
  :in_stock,
  :name,
  :price,
  :quantity,
  keyword_init: true
)

# Request payload for Product#list.
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] image_url
#   @return [String, nil]
#
# @!attribute [rw] in_stock
#   @return [Boolean, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] price
#   @return [Float, nil]
#
# @!attribute [rw] quantity
#   @return [Integer, nil]
ProductListMatch = Struct.new(
  :category,
  :currency,
  :description,
  :id,
  :image_url,
  :in_stock,
  :name,
  :price,
  :quantity,
  keyword_init: true
)

