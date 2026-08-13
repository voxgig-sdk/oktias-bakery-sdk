# OktiasBakery SDK feature factory

from oktiasbakery_sdk.feature.base_feature import OktiasBakeryBaseFeature
from oktiasbakery_sdk.feature.test_feature import OktiasBakeryTestFeature


def _make_feature(name):
    features = {
        "base": lambda: OktiasBakeryBaseFeature(),
        "test": lambda: OktiasBakeryTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
