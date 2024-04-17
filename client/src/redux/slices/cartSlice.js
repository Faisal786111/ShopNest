import { createSlice } from '@reduxjs/toolkit'
import { updateCart } from '../../utils/cartUtils';

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

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

            return updateCart(state);
        },
        removeFromCart: (state, action) => {
            const itemIdToRemove = action.payload;

            state.cartItems = state.cartItems.filter(item => item._id !== itemIdToRemove);

            // Recalculate price
            return updateCart(state);
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;

            // Recalculate price
            return updateCart(state);
        }
    },
});

export const { addToCart, removeFromCart, saveShippingAddress } = cartSlice.actions;

export default cartSlice.reducer;