package voxgigoktiasbakerysdk

import (
	"github.com/voxgig-sdk/oktias-bakery-sdk/go/core"
	"github.com/voxgig-sdk/oktias-bakery-sdk/go/entity"
	"github.com/voxgig-sdk/oktias-bakery-sdk/go/feature"
	_ "github.com/voxgig-sdk/oktias-bakery-sdk/go/utility"
)

// Type aliases preserve external API.
type OktiasBakerySDK = core.OktiasBakerySDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type OktiasBakeryEntity = core.OktiasBakeryEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type OktiasBakeryError = core.OktiasBakeryError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewProductEntityFunc = func(client *core.OktiasBakerySDK, entopts map[string]any) core.OktiasBakeryEntity {
		return entity.NewProductEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewOktiasBakerySDK = core.NewOktiasBakerySDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewOktiasBakerySDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *OktiasBakerySDK  { return NewOktiasBakerySDK(nil) }
func Test() *OktiasBakerySDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
