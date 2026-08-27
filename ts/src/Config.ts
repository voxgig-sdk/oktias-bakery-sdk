
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'OktiasBakery',
        slug: "oktias-bakery",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://beni.xo.je",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      product: {
      },

    }
  }


  entity = {
    "product": {
      "fields": [
        {
          "name": "category",
          "req": true,
          "short": "Category of the product (e.g., cakes, pastries)",
          "type": "`$STRING`"
        },
        {
          "name": "currency",
          "short": "Currency code (e.g., USD, EUR)",
          "type": "`$STRING`"
        },
        {
          "name": "description",
          "short": "Detailed description of the product",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "req": true,
          "short": "Unique identifier for the product",
          "type": "`$STRING`"
        },
        {
          "name": "imageUrl",
          "short": "URL to the product image",
          "type": "`$STRING`"
        },
        {
          "name": "inStock",
          "req": true,
          "short": "Indicates if the product is currently in stock",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "name",
          "req": true,
          "short": "Name of the bakery product",
          "type": "`$STRING`"
        },
        {
          "name": "price",
          "req": true,
          "short": "Price of the product",
          "type": "`$NUMBER`"
        },
        {
          "name": "quantity",
          "short": "Available quantity in inventory",
          "type": "`$INTEGER`"
        }
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
                    "type": "`$STRING`"
                  },
                  {
                    "example": 20,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/products",
              "parts": [
                "products"
              ],
              "select": {
                "exist": [
                  "category",
                  "limit",
                  "offset"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.products`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

