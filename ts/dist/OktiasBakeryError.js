"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OktiasBakeryError = void 0;
class OktiasBakeryError extends Error {
    isOktiasBakeryError = true;
    sdk = 'OktiasBakery';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.OktiasBakeryError = OktiasBakeryError;
//# sourceMappingURL=OktiasBakeryError.js.map