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
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
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
                  "parts" => [
                    "products",
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
