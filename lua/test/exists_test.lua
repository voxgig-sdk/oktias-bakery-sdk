-- OktiasBakery SDK exists test

local sdk = require("oktias-bakery_sdk")

describe("OktiasBakerySDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
