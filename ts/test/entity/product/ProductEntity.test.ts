

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { OktiasBakerySDK, BaseFeature, config, stdutil } from '../../..'

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


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('product hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of OktiasBakerySDK.test(offline).Product().stream('list')) { }
    }, /offline/)

    for await (const _item of OktiasBakerySDK.test(offline).Product()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = OktiasBakerySDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Product().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of OktiasBakerySDK.test().Product().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new OktiasBakerySDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Product().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Product().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = OktiasBakerySDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Product().list({"category":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OKTIAS_BAKERY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'product.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"category":{"a":true,"h":"Category","n":"category","r":true,"sh":"Category of the product (e.g., cakes, pastries)","t":"`$STRING`","key$":"category","index$":0},"currency":{"a":true,"h":"Currency","n":"currency","r":false,"sh":"Currency code (e.g., USD, EUR)","t":"`$STRING`","key$":"currency","index$":1},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Detailed description of the product","t":"`$STRING`","key$":"description","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Unique identifier for the product","t":"`$STRING`","key$":"id","index$":3},"imageUrl":{"a":true,"fo":"uri","h":"Image Url","n":"imageUrl","r":false,"sh":"URL to the product image","t":"`$STRING`","key$":"imageUrl","index$":4},"inStock":{"a":true,"h":"In Stock","n":"inStock","r":true,"sh":"Indicates if the product is currently in stock","t":"`$BOOLEAN`","key$":"inStock","index$":5},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"Name of the bakery product","t":"`$STRING`","key$":"name","index$":6},"price":{"a":true,"fo":"float","h":"Price","n":"price","r":true,"sh":"Price of the product","t":"`$NUMBER`","key$":"price","index$":7},"quantity":{"a":true,"h":"Quantity","n":"quantity","r":false,"sh":"Available quantity in inventory","t":"`$INTEGER`","key$":"quantity","index$":8}},"id":{"field":"id","name":"id"},"name":"product","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /products","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"category","or":"category","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/products","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"products"}],"t":{"req":"`reqdata`","res":"`body.products`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"product","name__orig":"product","Name":"Product","name_":"product","name-":"product","NAME":"PRODUCT","index$":0}, {"active":true,"entity":"product","key$":"BasicProductFlow","kind":"basic","name":"BasicProductFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"product_ref01"}}],"index$":0}]}, 'Product', {"GET /products":{"protocol":"http","parameters":[{"name":"category","in":"query","description":"Filter products by category (e.g., cakes, pastries)","required":false,"schema":{"type":"string"},"index$":0},{"name":"limit","in":"query","description":"Maximum number of products to return","required":false,"schema":{"type":"integer","minimum":1,"maximum":100,"default":20},"index$":1},{"name":"offset","in":"query","description":"Number of products to skip for pagination","required":false,"schema":{"type":"integer","minimum":0,"default":0},"index$":2}]}}, { strict: LIVE_STRICT, t })
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



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  
