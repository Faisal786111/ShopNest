import { PRODUCTS_URL, UPLOAD_URL } from "../../api/constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor: 5,
            providesTags: ["Products"],
        }),
        getProductById: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                method: "POST",
            }),
            invalidatesTags: ["Product"],
        }),
        deleteProductById: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                method: "DELETE",
            }),
            invalidatesTags: ["Product"],
        }),
        updateOrderById: builder.mutation({
            query: ({ updateProduct, productId }) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                method: "PUT",
                body: { ...updateProduct },
            }),
            invalidatesTags: ["Products"],
        }),
        uploadProductImage: builder.mutation({
            query: (image) => ({
                url: UPLOAD_URL,
                credentials: "include",
                method: "POST",
                body: image,
            }),
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                credentials: "include",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Product"],
        }),
    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useCreateProductMutation, useDeleteProductByIdMutation, useUpdateOrderByIdMutation, useUploadProductImageMutation, useCreateReviewMutation } = productApiSlice;
