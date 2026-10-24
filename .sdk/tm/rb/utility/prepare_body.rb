# OktiasBakery SDK utility: prepare_body
require_relative 'media'
module OktiasBakeryUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return OktiasBakeryUtilities.raw_body(ctx.reqdata) if OktiasBakeryUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
