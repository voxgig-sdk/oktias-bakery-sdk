export interface Product {
    category: string;
    currency?: string;
    description?: string;
    id: string;
    imageUrl?: string;
    inStock: boolean;
    name: string;
    price: number;
    quantity?: number;
}
export interface ProductListMatch {
    category?: string;
    limit?: number;
    offset?: number;
}
