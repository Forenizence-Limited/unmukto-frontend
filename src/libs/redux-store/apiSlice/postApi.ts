import { Post } from '@/utils/types/types';
import { getToken } from '@/utils/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const postApi = createApi({
  reducerPath: 'postApi',
  
  baseQuery,

  tagTypes: ['posts'],

  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (pageNumber: number) => `posts/?pageNumber=${pageNumber}&pageSize=10`,
      providesTags: (result) => {
        if (!result) {
          return [{ type: 'posts', id: 'LIST' }];
        }
    
        return [
          ...result.content.map(({ postId }: { postId: number; }) => ({ type: 'posts', postId })),
          { type: 'posts', id: 'LIST' },
        ];
      },
    }),

    getPostsByCategory: builder.query({
      query: ({ categoryId, pageNumber }) => `posts/category/${categoryId}?pageNumber=${pageNumber}&pageSize=10`,
      providesTags: (result) => {
        if (!result) {
          return [{ type: 'posts', postId: 'LIST' }];
        }

        return [
          ...result.content.map(({ postId }: { postId: number; }) => ({ type: 'posts', postId })),
          { type: 'posts', postId: 'LIST' },
        ];
      },
    }),
    
    getPostsBySearch: builder.query({
      query: ({ keyword, pageNumber }) => `posts/search?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=10`,
      providesTags: (result) => {
        if (!result) {
          return [{ type: 'posts', postId: 'LIST' }];
        }

        return [
          ...result.content.map(({ postId }: { postId: number; }) => ({ type: 'posts', postId })),
          { type: 'posts', postId: 'LIST' },
        ];
      },
    }),
    
    getPost: builder.query<Post, string>({
      query: (postId) => `posts/${postId}`,
      providesTags: (post, error, id) => [{ type: 'posts', id }],
    }),

    uploadCoverPhoto: builder.mutation<unknown, FormData>({
      query: (formData) => {

        return {
          url: `post/image/upload/${formData.get('postId')}`,
          method: 'POST',
          body: formData,
        };
      },
    }),

    uploadSupportingDocuments: builder.mutation<unknown, FormData>({
      query: (formData) => {

        return {
          url: `post/image/upload-files/${formData.get('postId')}`,
          method: 'POST',
          body: formData,
        }
      },
    }),

    addPost: builder.mutation<unknown, unknown>({
      query: (body: Post) => {
        const categoryId = body.category.categoryId;
        return {
          url: `category/${categoryId}/posts`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: [{ type: 'posts', id: 'LIST' }],
    }),

    unpublishPost: builder.mutation<unknown, unknown>({
      query: (postId: number) => {
        return {
          url: `posts/${postId}/unpublish/`,
          method: 'PUT',
        }
      },
      invalidatesTags: [{ type: 'posts', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostsByCategoryQuery,
  useGetPostsBySearchQuery,
  useGetPostQuery,
  useAddPostMutation,
  useUploadCoverPhotoMutation,
  useUploadSupportingDocumentsMutation,
  useUnpublishPostMutation,
} = postApi;
