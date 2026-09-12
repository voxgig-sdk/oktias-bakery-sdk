import { OktiasBakeryEntityBase } from '../OktiasBakeryEntityBase';
import type { OktiasBakerySDK } from '../OktiasBakerySDK';
import type { Control } from '../types';
import type { Product, ProductListMatch } from '../OktiasBakeryTypes';
declare class ProductEntity extends OktiasBakeryEntityBase<Product> {
    constructor(client: OktiasBakerySDK, entopts: any);
    make(this: ProductEntity): ProductEntity;
    list(this: any, reqmatch?: ProductListMatch, ctrl?: Control): Promise<ProductEntity[]>;
}
export { ProductEntity };
