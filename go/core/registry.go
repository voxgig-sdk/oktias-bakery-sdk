package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewProductEntityFunc func(client *OktiasBakerySDK, entopts map[string]any) OktiasBakeryEntity

