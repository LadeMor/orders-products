import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";

interface Price {
    id: number,
    productId: number,
    value: number,
    symbol: string,
    isDefault: boolean
}

interface Guarantees {
    id: number,
    productId: number,
    start_date: string,
    end_date: string
}

export interface Product {
    id: number,
    serial_number: number,
    is_new: boolean,
    photo: string,
    title: string,
    product_type: string,
    price: number,
    specification: string,
    order_id: number,
    order_name: string,
    date: string,
    prices: Price[],
    total_products: number,
    guarantees: Guarantees[]
}

interface ProductState {
    list: Product[],
    loading: boolean,
    error: string | null
}

const initialState: ProductState = {
    list: [],
    loading: false,
    error: null
}

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (
    { productType, specification, limit, offset }:
        { productType: string | null, specification: string | null, limit: number, offset: number }) => {
    const params = new URLSearchParams();
    if (productType !== null) params.append("productType", productType);
    if (specification !== null) params.append("specification", specification);
    params.append("limit", limit.toString());
    params.append("offset", offset.toString());

    const response = await fetch(
        `${API_URL}/api/products?${params.toString()}`
    );

    return response.json();
})

export const fetchProductByOrderID = createAsyncThunk("products/fetchProductByOrderID", async ({ orderId, limit, offset }: { orderId: number, limit: number, offset: number }) => {
    try {
        const response = await fetch(`${API_URL}/api/products/order/${orderId}?limit=${limit}&offset=${offset}`);
        if (response.ok) {
            return response.json();
        } else {
            throw Error("Failed to get products");
        }
    } catch (err) {
        console.error("Failed to fetch products by order id: " + err);
    }
})

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.error.message ?? "Failed to fetch products";
                state.loading = false;
            })
            .addCase(fetchProductByOrderID.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductByOrderID.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchProductByOrderID.rejected, (state, action) => {
                state.error = action.error.message ?? "Failed to fetch products by order id";
                state.loading = true;
            })
    }
})

export default productsSlice.reducer;