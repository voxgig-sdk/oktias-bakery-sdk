# OktiasBakery SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "OktiasBakery",
            "slug": "oktias-bakery",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://beni.xo.je",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "product": {},
            },
        },
        "entity": {
      "product": {
        "fields": [
          {
            "name": "category",
            "req": True,
            "short": "Category of the product (e.g., cakes, pastries)",
            "type": "`$STRING`",
          },
          {
            "name": "currency",
            "short": "Currency code (e.g., USD, EUR)",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "short": "Detailed description of the product",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "req": True,
            "short": "Unique identifier for the product",
            "type": "`$STRING`",
          },
          {
            "name": "imageUrl",
            "short": "URL to the product image",
            "type": "`$STRING`",
          },
          {
            "name": "inStock",
            "req": True,
            "short": "Indicates if the product is currently in stock",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "name",
            "req": True,
            "short": "Name of the bakery product",
            "type": "`$STRING`",
          },
          {
            "name": "price",
            "req": True,
            "short": "Price of the product",
            "type": "`$NUMBER`",
          },
          {
            "name": "quantity",
            "short": "Available quantity in inventory",
            "type": "`$INTEGER`",
          },
        ],
        "name": "product",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "category",
                      "orig": "category",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/products",
                "parts": [
                  "products",
                ],
                "select": {
                  "exist": [
                    "category",
                    "limit",
                    "offset",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.products`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
