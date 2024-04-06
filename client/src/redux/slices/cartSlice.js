import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : { cartItems: [] };

const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {}
});


export default cartSlice.reducer;