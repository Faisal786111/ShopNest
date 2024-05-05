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
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/`,
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
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: data,
            }),
        }),
        getUsersDetails: builder.query({
            query: () => ({
                url: `${USERS_URL}/`,
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            }),
            keepUnusedDataFor: 5,
            providesTags: ["Users"],
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            }),
            invalidatesTags: ["User"],
        }),
        updateUser: builder.mutation({
            query: (user) => ({
                url: `${USERS_URL}/${user.userId}`,
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: { ...user},
            }),
            invalidatesTags: ["Users"],
        }),
        getUserById: builder.query({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useProfileMutation, useGetUsersDetailsQuery, useUpdateUserMutation, useDeleteUserMutation, useGetUserByIdQuery } = usersApiSlice;
