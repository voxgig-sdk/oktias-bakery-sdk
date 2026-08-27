<?php
declare(strict_types=1);

// OktiasBakery SDK configuration

class OktiasBakeryConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "OktiasBakery",
                "slug" => "oktias-bakery",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://beni.xo.je",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "product" => [],
                ],
            ],
            "entity" => [
        'product' => [
          'fields' => [
            [
              'name' => 'category',
              'req' => true,
              'short' => 'Category of the product (e.g., cakes, pastries)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'currency',
              'short' => 'Currency code (e.g., USD, EUR)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'short' => 'Detailed description of the product',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'req' => true,
              'short' => 'Unique identifier for the product',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'imageUrl',
              'short' => 'URL to the product image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'inStock',
              'req' => true,
              'short' => 'Indicates if the product is currently in stock',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'name',
              'req' => true,
              'short' => 'Name of the bakery product',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'price',
              'req' => true,
              'short' => 'Price of the product',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'quantity',
              'short' => 'Available quantity in inventory',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'product',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'category',
                        'orig' => 'category',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/products',
                  'parts' => [
                    'products',
                  ],
                  'select' => [
                    'exist' => [
                      'category',
                      'limit',
                      'offset',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.products`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return OktiasBakeryFeatures::make_feature($name);
    }
}
