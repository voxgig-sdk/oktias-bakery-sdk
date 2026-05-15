# OktiasBakery SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module OktiasBakeryFeatures
  def self.make_feature(name)
    case name
    when "base"
      OktiasBakeryBaseFeature.new
    when "test"
      OktiasBakeryTestFeature.new
    else
      OktiasBakeryBaseFeature.new
    end
  end
end
