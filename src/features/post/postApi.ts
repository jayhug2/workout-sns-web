import { baseApi } from '@/store/baseApi';
import type {PostResponse, PostCreateRequest, PostListResponse, ImageUploadResponse} from './types/post.types';

export const postApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // 게시글 목록 조회
        getPosts: builder.query<PostListResponse, { page?: number; size?: number }>({
            query: ({ page = 0, size = 10 }) => ({
                url: '/posts',
                params: { page, size, sort: 'createdAt,desc' },
            }),
            providesTags: ['Post'],
        }),

        // 인기 게시글 조회 (추가)
        getPopularPosts: builder.query<PostListResponse, { page?: number; size?: number }>({
            query: ({ page = 0, size = 10 }) => ({
                url: '/posts/popular',
                params: { page, size },
            }),
            providesTags: ['Post'],
        }),

        // 게시글 상세 조회
        getPost: builder.query<PostResponse, number>({
            query: (id) => `/posts/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Post', id }],  // ← 수정
        }),

        // 게시글 작성
        createPost: builder.mutation<PostResponse, PostCreateRequest>({
            query: (data) => ({
                url: '/posts',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Post'],
        }),

        // 게시글 수정
        updatePost: builder.mutation<PostResponse, { id: number; data: PostCreateRequest }>({
            query: ({ id, data }) => ({
                url: `/posts/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Post', id }, 'Post'],
        }),
        // 게시글 삭제
        deletePost: builder.mutation<void, number>({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Post'],
        }),

        uploadImage: builder.mutation<ImageUploadResponse, FormData>({
            query: (formData) => ({
                url: '/images/upload',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
});

export const {
    useGetPostsQuery,
    useGetPopularPostsQuery,
    useGetPostQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useUploadImageMutation
} = postApi;