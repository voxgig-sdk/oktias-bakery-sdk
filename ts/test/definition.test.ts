import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "product",
    "accessor": "Product",
    "op": "list",
    "method": "GET",
    "path": "/products",
    "args": [],
    "select": {
      "category": "v1",
      "limit": "v1",
      "offset": "v1"
    },
    "headers": [],
    "query": [
      "category",
      "limit",
      "offset"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "products": [
        {
          "category": "cakes",
          "currency": "x",
          "description": "x",
          "id": "x",
          "imageUrl": "x",
          "inStock": true,
          "name": "x",
          "price": 1,
          "quantity": 1
        }
      ],
      "total": 1,
      "limit": 1,
      "offset": 1
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
