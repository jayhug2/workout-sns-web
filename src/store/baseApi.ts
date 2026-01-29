import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from './index';

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth?.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Post', 'User', 'Comment', 'Notification', 'Feed'],
    endpoints: () => ({}),
});