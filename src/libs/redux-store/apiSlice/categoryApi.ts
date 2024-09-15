import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Helper function to get token from localStorage
const getToken = () => {
  return typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
};

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://34.71.24.46:9292/api/v1/',
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
        // Log the result outside the return statement
        console.log(result, "result is here");
    
        // If result is undefined or empty, return a default tag
        if (!result) {
          return [{ type: 'categories', categoryId: 'LIST' }];
        }
    
        // Map over the result if it's defined
        return [
          ...result.map(({ categoryId }: { categoryId: number; }) => ({ type: 'categories', categoryId })),
          { type: 'categories', categoryId: 'LIST' },
        ];
      },
    }),

    // getArchivedProjects: builder.query<{ projects: Project[]; }, null>({
    //   query: () => 'projects?archived=true',
    //   providesTags: (result = { projects: [] }) => [
    //     ...result.projects.map(({ id }) => ({ type: 'projects', id } as const)),
    //     { type: 'projects' as const, id: 'LIST' },
    //   ],
    // }),

    // getProject: builder.query<{ project: Project; }, string>({
    //   query: (projectId) => `projects/${projectId}`,
    //   providesTags: (project, error, id) => [{ type: 'projects', id }],
    // }),

    // addPost: builder.mutation<unknown, unknown>({
    //   query: (body) => ({
    //     url: 'user/1/category/1/address/1/posts',
    //     method: 'POST',
    //     body,
    //   }),
    //   invalidatesTags: [{ type: 'posts', id: 'LIST' }],
    //   // async onQueryStarted(_, { dispatch, queryFulfilled }) {
    //   //   await queryFulfilled;
    //   //   dispatch(calendarTypeApi.util.invalidateTags([{ type: 'calendarTypes', id: 'LIST' }]));
    //   // },
    // }),

    // updateProject: builder.mutation<Project, Partial<Project>>({
    //   query: (data) => {
    //     const { id, ...body } = data;
    //     return {
    //       url: `projects/${id}`,
    //       method: 'PUT',
    //       body,
    //     };
    //   },
    //   invalidatesTags: (project) => [{ type: 'projects', id: project?.id }],
    // }),

    // deleteProject: builder.mutation<Project, Partial<Project>>({
    //   query: (data) => {
    //     const { id } = data;
    //     return {
    //       url: `projects/${id}`,
    //       method: 'DELETE',
    //     };
    //   },
    //   invalidatesTags: [{ type: 'projects', id: 'LIST' }],
    // }),

    // archiveProject: builder.mutation<Project, Partial<Project>>({
    //   query: (data) => {
    //     const { id } = data;
    //     return {
    //       url: `projects/${id}/archive`,
    //       method: 'PATCH',
    //     };
    //   },
    //   invalidatesTags: (project) => [{ type: 'projects', id: project?.id }],
    // }),

    // restoreProject: builder.mutation<Project, Partial<Project>>({
    //   query: (data) => {
    //     const { id } = data;
    //     return {
    //       url: `projects/${id}/restore`,
    //       method: 'PATCH',
    //     };
    //   },
    //   invalidatesTags: (project) => [{ type: 'projects', id: project?.id }],
    // }),

  }),
});

export const {
  useGetCategoriesQuery,
} = categoryApi;
