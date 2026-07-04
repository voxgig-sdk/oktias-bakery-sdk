# Typed models for the OktiasBakery SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Product:
    category: str
    id: str
    in_stock: bool
    name: str
    price: float
    currency: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    quantity: Optional[int] = None


@dataclass
class ProductListMatch:
    category: Optional[str] = None
    currency: Optional[str] = None
    description: Optional[str] = None
    id: Optional[str] = None
    image_url: Optional[str] = None
    in_stock: Optional[bool] = None
    name: Optional[str] = None
    price: Optional[float] = None
    quantity: Optional[int] = None

