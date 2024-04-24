import { PRODUCTS_URL } from "../../api/constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        getProductById: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        createProduct : builder.mutation({
            query : ()=>({
                url : PRODUCTS_URL,
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                method : "POST",
            }),
            invalidatesTags : ["Product"],
        }),
        deleteProductById : builder.mutation({
            query : (productId)=>({
                url : `${PRODUCTS_URL}/${productId}`,
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                method : "DELETE",
            }),
            invalidatesTags : ["Product"],
        }),
    }),
});

export const { useGetProductsQuery , useGetProductByIdQuery , useCreateProductMutation , useDeleteProductByIdMutation} = productApiSlice;
