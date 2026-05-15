package = "voxgig-sdk-oktias-bakery"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/oktias-bakery-sdk.git"
}
description = {
  summary = "OktiasBakery SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["oktias-bakery_sdk"] = "oktias-bakery_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
