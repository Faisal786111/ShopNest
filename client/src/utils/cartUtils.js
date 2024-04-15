export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

export const updateCart = (state) => {
    // Calculate items price 
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) =>
        acc + item.price * item.qty,
        0));

    // Calculate shipping price (If order is over $100 then free , else $10rs)
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

    // Calculate tax price (15% tax)
    state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice));

    // Calculate total price 
    state.totalPrice = (parseFloat(state.itemsPrice) + parseFloat(state.shippingPrice) + parseFloat(state.taxPrice)).toFixed(2);

    // Storing the cart in the localStorage
    localStorage.setItem("cart", JSON.stringify(state));

    return state;
}