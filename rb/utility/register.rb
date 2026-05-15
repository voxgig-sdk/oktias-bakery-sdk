# OktiasBakery SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

OktiasBakeryUtility.registrar = ->(u) {
  u.clean = OktiasBakeryUtilities::Clean
  u.done = OktiasBakeryUtilities::Done
  u.make_error = OktiasBakeryUtilities::MakeError
  u.feature_add = OktiasBakeryUtilities::FeatureAdd
  u.feature_hook = OktiasBakeryUtilities::FeatureHook
  u.feature_init = OktiasBakeryUtilities::FeatureInit
  u.fetcher = OktiasBakeryUtilities::Fetcher
  u.make_fetch_def = OktiasBakeryUtilities::MakeFetchDef
  u.make_context = OktiasBakeryUtilities::MakeContext
  u.make_options = OktiasBakeryUtilities::MakeOptions
  u.make_request = OktiasBakeryUtilities::MakeRequest
  u.make_response = OktiasBakeryUtilities::MakeResponse
  u.make_result = OktiasBakeryUtilities::MakeResult
  u.make_point = OktiasBakeryUtilities::MakePoint
  u.make_spec = OktiasBakeryUtilities::MakeSpec
  u.make_url = OktiasBakeryUtilities::MakeUrl
  u.param = OktiasBakeryUtilities::Param
  u.prepare_auth = OktiasBakeryUtilities::PrepareAuth
  u.prepare_body = OktiasBakeryUtilities::PrepareBody
  u.prepare_headers = OktiasBakeryUtilities::PrepareHeaders
  u.prepare_method = OktiasBakeryUtilities::PrepareMethod
  u.prepare_params = OktiasBakeryUtilities::PrepareParams
  u.prepare_path = OktiasBakeryUtilities::PreparePath
  u.prepare_query = OktiasBakeryUtilities::PrepareQuery
  u.result_basic = OktiasBakeryUtilities::ResultBasic
  u.result_body = OktiasBakeryUtilities::ResultBody
  u.result_headers = OktiasBakeryUtilities::ResultHeaders
  u.transform_request = OktiasBakeryUtilities::TransformRequest
  u.transform_response = OktiasBakeryUtilities::TransformResponse
}
