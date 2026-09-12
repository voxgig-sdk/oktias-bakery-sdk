import { Context } from './Context';
declare class OktiasBakeryError extends Error {
    isOktiasBakeryError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { OktiasBakeryError };
