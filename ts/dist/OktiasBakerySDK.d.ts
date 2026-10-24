import { ProductEntity } from './entity/ProductEntity';
export type * from './OktiasBakeryTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { OktiasBakeryEntityBase } from './OktiasBakeryEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class OktiasBakerySDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Product(entopts?: Record<string, any>): ProductEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): OktiasBakerySDK;
    tester(testopts?: any, sdkopts?: any): OktiasBakerySDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof OktiasBakerySDK;
export { stdutil, config, BaseFeature, OktiasBakeryEntityBase, OktiasBakerySDK, SDK, };
export type { DirectResult };
