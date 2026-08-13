# OktiasBakery SDK utility: make_context

from projectname_sdk.core.context import OktiasBakeryContext


def make_context_util(ctxmap, basectx):
    return OktiasBakeryContext(ctxmap, basectx)
