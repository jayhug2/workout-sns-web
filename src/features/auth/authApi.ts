import { baseApi } from '@/store/baseApi';
import type { SignInRequest, SignInResponse, SignupRequest, User, RefreshResponse } from './types/auth.types';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signin: builder.mutation<SignInResponse, SignInRequest>({
            query: (credentials) => ({
                url: '/auth/signin',
                method: 'POST',
                body: credentials,
            }),
        }),

        signup: builder.mutation<User, SignupRequest>({
            query: (userData) => ({
                url: '/auth/signup',
                method: 'POST',
                body: userData,
            }),
        }),

        refresh: builder.mutation<RefreshResponse, void>({
            query: () => ({
                url: '/auth/refresh',
                method: 'POST',
            })
        }),

        signout: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/signout',
                method: 'POST',
            })
        })
    }),
});

export const {
    useSigninMutation,
    useSignupMutation,
    useRefreshMutation,
    useSignoutMutation

} = authApi;