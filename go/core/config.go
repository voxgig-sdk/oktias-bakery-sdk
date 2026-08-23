package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "OktiasBakery",
			"slug": "oktias-bakery",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://beni.xo.je",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"product": map[string]any{},
			},
		},
		"entity": map[string]any{
			"product": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "category",
						"req": true,
						"short": "Category of the product (e.g., cakes, pastries)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "currency",
						"short": "Currency code (e.g., USD, EUR)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Detailed description of the product",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"short": "Unique identifier for the product",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "imageUrl",
						"short": "URL to the product image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "inStock",
						"req": true,
						"short": "Indicates if the product is currently in stock",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"short": "Name of the bakery product",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "price",
						"req": true,
						"short": "Price of the product",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "quantity",
						"short": "Available quantity in inventory",
						"type": "`$INTEGER`",
					},
				},
				"name": "product",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "category",
											"orig": "category",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/products",
								"parts": []any{
									"products",
								},
								"select": map[string]any{
									"exist": []any{
										"category",
										"limit",
										"offset",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.products`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
