-- OktiasBakery SDK error

local OktiasBakeryError = {}
OktiasBakeryError.__index = OktiasBakeryError


function OktiasBakeryError.new(code, msg, ctx)
  local self = setmetatable({}, OktiasBakeryError)
  self.is_sdk_error = true
  self.sdk = "OktiasBakery"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function OktiasBakeryError:error()
  return self.msg
end


function OktiasBakeryError:__tostring()
  return self.msg
end


return OktiasBakeryError
