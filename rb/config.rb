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
              "req" => true,
              "short" => "Category of the product (e.g., cakes, pastries)",
              "type" => "`$STRING`",
            },
            {
              "name" => "currency",
              "short" => "Currency code (e.g., USD, EUR)",
              "type" => "`$STRING`",
            },
            {
              "name" => "description",
              "short" => "Detailed description of the product",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "req" => true,
              "short" => "Unique identifier for the product",
              "type" => "`$STRING`",
            },
            {
              "format" => "uri",
              "name" => "imageUrl",
              "short" => "URL to the product image",
              "type" => "`$STRING`",
            },
            {
              "name" => "inStock",
              "req" => true,
              "short" => "Indicates if the product is currently in stock",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "name",
              "req" => true,
              "short" => "Name of the bakery product",
              "type" => "`$STRING`",
            },
            {
              "format" => "float",
              "name" => "price",
              "req" => true,
              "short" => "Price of the product",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "quantity",
              "short" => "Available quantity in inventory",
              "type" => "`$INTEGER`",
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
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "category",
                        "orig" => "category",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 20,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/products",
                  "segments" => [
                    {
                      "lit" => "products",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "category",
                      "limit",
                      "offset",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.products`",
                  },
                  "parts" => [
                    "products",
                  ],
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
