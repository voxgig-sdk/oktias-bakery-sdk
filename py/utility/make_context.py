# OktiasBakery SDK utility: make_context

from core.context import OktiasBakeryContext


def make_context_util(ctxmap, basectx):
    return OktiasBakeryContext(ctxmap, basectx)
