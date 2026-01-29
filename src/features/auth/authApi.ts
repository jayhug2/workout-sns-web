import { baseApi } from '@/store/baseApi';
import type { LoginRequest, LoginResponse, SignupRequest, User } from './types/auth.types';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/users/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        signup: builder.mutation<User, SignupRequest>({
            query: (userData) => ({
                url: '/users/register',
                method: 'POST',
                body: userData,
            }),
        }),
    }),
});

export const { useLoginMutation, useSignupMutation } = authApi;