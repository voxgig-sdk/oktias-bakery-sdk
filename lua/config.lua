-- OktiasBakery SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "OktiasBakery",
      slug = "oktias-bakery",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://beni.xo.je",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["product"] = {},
      },
    },
    entity = {
      ["product"] = {
        ["fields"] = {
          {
            ["name"] = "category",
            ["req"] = true,
            ["short"] = "Category of the product (e.g., cakes, pastries)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "currency",
            ["short"] = "Currency code (e.g., USD, EUR)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "description",
            ["short"] = "Detailed description of the product",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["req"] = true,
            ["short"] = "Unique identifier for the product",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "imageUrl",
            ["short"] = "URL to the product image",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "inStock",
            ["req"] = true,
            ["short"] = "Indicates if the product is currently in stock",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "name",
            ["req"] = true,
            ["short"] = "Name of the bakery product",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "price",
            ["req"] = true,
            ["short"] = "Price of the product",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "quantity",
            ["short"] = "Available quantity in inventory",
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "product",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "category",
                      ["orig"] = "category",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 20,
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 0,
                      ["kind"] = "query",
                      ["name"] = "offset",
                      ["orig"] = "offset",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/products",
                ["parts"] = {
                  "products",
                },
                ["select"] = {
                  ["exist"] = {
                    "category",
                    "limit",
                    "offset",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.products`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
