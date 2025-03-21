import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"; // Import cartSlice

const store = configureStore({
  reducer: {
    cart: cartReducer, // Đăng ký giỏ hàng vào Redux store
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
