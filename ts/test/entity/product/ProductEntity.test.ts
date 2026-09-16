

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { OktiasBakerySDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('ProductEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OKTIAS_BAKERY_TEST_LIVE=TRUE.
  afterEach(liveDelay('OKTIAS_BAKERY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OktiasBakerySDK.test()
    const ent = testsdk.Product()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OKTIAS_BAKERY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'product.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"category","req":true,"short":"Category of the product (e.g., cakes, pastries)","type":"`$STRING`","index$":0},{"active":true,"name":"currency","req":false,"short":"Currency code (e.g., USD, EUR)","type":"`$STRING`","index$":1},{"active":true,"name":"description","req":false,"short":"Detailed description of the product","type":"`$STRING`","index$":2},{"active":true,"name":"id","req":true,"short":"Unique identifier for the product","type":"`$STRING`","index$":3},{"active":true,"format":"uri","name":"imageUrl","req":false,"short":"URL to the product image","type":"`$STRING`","index$":4},{"active":true,"name":"inStock","req":true,"short":"Indicates if the product is currently in stock","type":"`$BOOLEAN`","index$":5},{"active":true,"name":"name","req":true,"short":"Name of the bakery product","type":"`$STRING`","index$":6},{"active":true,"format":"float","name":"price","req":true,"short":"Price of the product","type":"`$NUMBER`","index$":7},{"active":true,"name":"quantity","req":false,"short":"Available quantity in inventory","type":"`$INTEGER`","index$":8}],"id":{"field":"id","name":"id"},"name":"product","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"category","orig":"category","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":20,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"example":0,"kind":"query","name":"offset","orig":"offset","reqd":false,"type":"`$INTEGER`","index$":2}]},"contract":{"id":"GET /products","json":"{\"operationId\":\"getProducts\",\"parameters\":[{\"description\":\"Filter products by category (e.g., cakes, pastries)\",\"in\":\"query\",\"name\":\"category\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Maximum number of products to return\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":20,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Number of products to skip for pagination\",\"in\":\"query\",\"name\":\"offset\",\"required\":false,\"schema\":{\"default\":0,\"minimum\":0,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"limit\":{\"type\":\"integer\"},\"offset\":{\"type\":\"integer\"},\"products\":{\"items\":{\"properties\":{\"category\":{\"description\":\"Category of the product (e.g., cakes, pastries)\",\"enum\":[\"cakes\",\"pastries\",\"breads\",\"desserts\"],\"type\":\"string\"},\"currency\":{\"default\":\"USD\",\"description\":\"Currency code (e.g., USD, EUR)\",\"type\":\"string\"},\"description\":{\"description\":\"Detailed description of the product\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the product\",\"type\":\"string\"},\"imageUrl\":{\"description\":\"URL to the product image\",\"format\":\"uri\",\"type\":\"string\"},\"inStock\":{\"description\":\"Indicates if the product is currently in stock\",\"type\":\"boolean\"},\"name\":{\"description\":\"Name of the bakery product\",\"type\":\"string\"},\"price\":{\"description\":\"Price of the product\",\"format\":\"float\",\"type\":\"number\"},\"quantity\":{\"description\":\"Available quantity in inventory\",\"type\":\"integer\"}},\"required\":[\"id\",\"name\",\"price\",\"category\",\"inStock\"],\"type\":\"object\"},\"type\":\"array\"},\"total\":{\"description\":\"Total number of products available\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with list of products\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Bad request\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/products","segments":[{"lit":"products"}],"select":{"exist":["category","limit","offset"]},"transform":{"req":"`reqdata`","res":"`body.products`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"product","name__orig":"product","Name":"Product","name_":"product","name-":"product","NAME":"PRODUCT","index$":0}, {"active":true,"entity":"product","key$":"BasicProductFlow","kind":"basic","name":"BasicProductFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"product_ref01"}}],"index$":0}]}, 'Product')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let product_ref01_data = Object.values(setup.data.existing.product)[0] as any

    // LIST
    const product_ref01_ent = client.Product()
    const product_ref01_match: any = {}

    const product_ref01_list = (await product_ref01_ent.list(product_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/product/ProductTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = OktiasBakerySDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['product01','product02','product03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OKTIAS_BAKERY_TEST_PRODUCT_ENTID': idmap,
    'OKTIAS_BAKERY_TEST_LIVE': 'FALSE',
    'OKTIAS_BAKERY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['OKTIAS_BAKERY_TEST_PRODUCT_ENTID']

  const live = 'TRUE' === env.OKTIAS_BAKERY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OKTIAS_BAKERY_TEST_PRODUCT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new OktiasBakerySDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.OKTIAS_BAKERY_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
