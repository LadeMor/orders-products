import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Price{
    id:number,
    productId: number,
    value: number,
    symbol:string,
    isDefault: boolean
}

interface Guarantees{
    id:number,
    productId: number,
    startDate: string,
    endDate: string
}

export interface Product {
    id: number,
    title: string,
    price: number,
    orderId: number,
    prices: Price[],
    guarantees: Guarantees[]
}

interface ProductState{
    list: Product[],
    loading: boolean,
    error: string | null
}

const initialState: ProductState = {
    list: [],
    loading: false,
    error: null
}

export const fetchProducts = createAsyncThunk("products/fetchProducts", async ({limit, offset} : {limit: number, offset:number}) =>{
    const response = await fetch(`http://localhost:3002/api/products?limit=${limit}&offset=${offset}`);
    return response.json();
})

export const fetchProductByOrderID = createAsyncThunk("products/fetchProductByOrderID", async ({orderId, limit, offset} : {orderId:number, limit:number, offset:number}) => {
    try{
        const response = await fetch(`http://localhost:3002/api/products/order/${orderId}?limit=${limit}&offset=${offset}`);
        if(response.ok){
            return response.json();
        }else{
            throw Error("Failed to get products");
        }
    }catch(err){

    }
})

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers:{},
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