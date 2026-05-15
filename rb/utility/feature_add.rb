# OktiasBakery SDK utility: feature_add
module OktiasBakeryUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
