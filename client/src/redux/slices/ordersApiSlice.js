import { ORDERS_URL, PAYPAL_URL } from "../../api/constants";
import { apiSlice } from "./apiSlice";

const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL + "/",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: { ...order }
            }),
        }),
        getOrderById: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`,
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            }),
            keepUnusedDataFor: 5,
        }),
        payOrder: builder.mutation({
            query: (orderId, details) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                method: "PUT",
                body: { ...details },
            }),
            keepUnusedDataFor: 5,
        }),
        getPayPalClientId: builder.query({
            query: () => ({
                url: `${PAYPAL_URL}`,
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useCreateOrderMutation, useGetOrderByIdQuery, usePayOrderMutation, useGetPayPalClientIdQuery } = ordersApiSlice;