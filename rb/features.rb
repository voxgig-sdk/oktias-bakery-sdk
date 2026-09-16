# OktiasBakery SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module OktiasBakeryFeatures
  def self.make_feature(name)
    case name
    when "base"
      OktiasBakeryBaseFeature.new
    when "ratelimit"
      OktiasBakeryRatelimitFeature.new
    when "retry"
      OktiasBakeryRetryFeature.new
    when "test"
      OktiasBakeryTestFeature.new
    when "timeout"
      OktiasBakeryTimeoutFeature.new
    else
      OktiasBakeryBaseFeature.new
    end
  end
end
