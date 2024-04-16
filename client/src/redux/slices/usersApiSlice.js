import { USERS_URL } from "../../api/constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            }),
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation } = usersApiSlice;
