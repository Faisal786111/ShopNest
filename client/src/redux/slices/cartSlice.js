import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : { cartItems: [] };

const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const existItem = state.cartItems.find(cartItem => cartItem._id === item._id);

            if (existItem) {
                state.cartItems = state.cartItems.map(cartItem =>
                    cartItem._id === existItem._id ? item : cartItem
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            // Calculate items price 
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

            // Calculate shipping price (If order is over $100 then free , else $10rs)
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

            // Calculate tax price (15% tax)
            state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice));

            // Calculate total price 
            state.totalPrice = (
                state.itemsPrice +
                state.shippingPrice +
                state.taxPrice
            ).toFixed(2);

            localStorage.setItem("cart", JSON.stringify(state));
        },
    },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;