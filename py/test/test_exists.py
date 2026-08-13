# OktiasBakery SDK exists test

import pytest
from oktiasbakery_sdk import OktiasBakerySDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = OktiasBakerySDK.test(None, None)
        assert testsdk is not None
