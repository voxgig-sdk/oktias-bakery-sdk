
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { OktiasBakerySDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = OktiasBakerySDK.test()
    equal(testsdk instanceof OktiasBakerySDK, true,
      'OktiasBakerySDK.test() must return a client synchronously')
  })

})
