import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Order{
    id: number,
    title: string,
    date: string,
    total_price_uah: number,
    total_price_usd: number,
    productsIds: number[]
}

interface OrdersState{
    list: Order[],
    selectedOrder: Order | null,
    loading: boolean,
    error: string | null
}

const initialState : OrdersState = {
    list: [],
    selectedOrder: null,
    loading: false,
    error: null
}

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async ({limit, offset}: {limit: number; offset: number}) => {
    const response = await fetch(`http://localhost:3002/api/orders?limit=${limit}&offset=${offset}`);
    return response.json();
});

const orderSlice = createSlice({
    name:"orders",
    initialState,
    reducers:{
        selectOrder: (state, action) => {
            state.selectedOrder = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.error = action.error.message ?? "Failed to fetch orders";
                state.loading = false;
            });
    }
})

export const {selectOrder} = orderSlice.actions;
export default orderSlice.reducer;