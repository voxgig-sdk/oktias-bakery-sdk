
import { Context } from './Context'


class OktiasBakeryError extends Error {

  isOktiasBakeryError = true

  sdk = 'OktiasBakery'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  OktiasBakeryError
}

