# OktiasBakery SDK utility: make_context
require_relative '../core/context'
module OktiasBakeryUtilities
  MakeContext = ->(ctxmap, basectx) {
    OktiasBakeryContext.new(ctxmap, basectx)
  }
end
