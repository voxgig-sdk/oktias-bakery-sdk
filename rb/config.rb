# OktiasBakery SDK configuration

module OktiasBakeryConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "OktiasBakery",
        "slug" => "oktias-bakery",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://beni.xo.je",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "product" => {},
        },
      },
      "entity" => {
        "product" => {
          "fields" => [
            {
              "name" => "category",
              "title" => "Category",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Category of the product (e.g., cakes, pastries)",
            },
            {
              "name" => "currency",
              "title" => "Currency",
              "type" => "`$STRING`",
              "short" => "Currency code (e.g., USD, EUR)",
            },
            {
              "name" => "description",
              "title" => "Description",
              "type" => "`$STRING`",
              "short" => "Detailed description of the product",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Unique identifier for the product",
            },
            {
              "name" => "imageUrl",
              "title" => "Image Url",
              "type" => "`$STRING`",
              "short" => "URL to the product image",
              "format" => "uri",
            },
            {
              "name" => "inStock",
              "title" => "In Stock",
              "type" => "`$BOOLEAN`",
              "req" => true,
              "short" => "Indicates if the product is currently in stock",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Name of the bakery product",
            },
            {
              "name" => "price",
              "title" => "Price",
              "type" => "`$NUMBER`",
              "req" => true,
              "short" => "Price of the product",
              "format" => "float",
            },
            {
              "name" => "quantity",
              "title" => "Quantity",
              "type" => "`$INTEGER`",
              "short" => "Available quantity in inventory",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "product",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/products",
                  "segments" => [
                    {
                      "lit" => "products",
                    },
                  ],
                  "parts" => [
                    "products",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.products`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "category",
                        "orig" => "category",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 20,
                      },
                      {
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 0,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "category",
                      "limit",
                      "offset",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    OktiasBakeryFeatures.make_feature(name)
  end
end
