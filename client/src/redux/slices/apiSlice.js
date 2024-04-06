import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { VITE_BACKEND } from "../../api/constants"

const baseQuery = fetchBaseQuery({ baseUrl: VITE_BACKEND });

// Define an API service for fetching user data
export const apiSlice = createApi({
    // Specify the name of reducer
    reducerPath: "apiSlice",
    // Configure the base URL of the API
    baseQuery,
    tagTypes: ["Product", "Order", "User"],
    // Define endpoints for interacting with the API
    endpoints: (builder) => ({}),
});

