# OktiasBakery SDK exists test

require "minitest/autorun"
require_relative "../OktiasBakery_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = OktiasBakerySDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
