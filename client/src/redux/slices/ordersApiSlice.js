import { ORDERS_URL } from "../../api/constants";
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
    }),
});

export const { useCreateOrderMutation } = ordersApiSlice;