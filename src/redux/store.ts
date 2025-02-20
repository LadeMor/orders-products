import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./slices/orderSlice";
import productsReducer from "./slices/productSlice";

export const store = configureStore({
    reducer: {
        orders: ordersReducer,
        products: productsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;