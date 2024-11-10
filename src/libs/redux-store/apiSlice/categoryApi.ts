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

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  
  baseQuery,

  tagTypes: ['categories'],

  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "categories/",
      providesTags: (result) => {
        if (!result) {
          return [{ type: 'categories', categoryId: 'LIST' }];
        }
    
        return [
          ...result.map(({ categoryId }: { categoryId: number; }) => ({ type: 'categories', categoryId })),
          { type: 'categories', categoryId: 'LIST' },
        ];
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
} = categoryApi;
