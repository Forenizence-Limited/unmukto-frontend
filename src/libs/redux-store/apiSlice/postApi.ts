import { Post } from '@/utils/types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// Helper function to get token from localStorage
const getToken = () => {
  return typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
};

// Helper function to get token from localStorage
const getUser = () => {
  return typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') ?? "") : null;
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

export const postApi = createApi({
  reducerPath: 'postApi',
  
  baseQuery,

  tagTypes: ['posts'],

  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "posts",
      providesTags: (result) => {
        // Log the result outside the return statement
        console.log(result, "result is here");
    
        // If result is undefined or empty, return a default tag
        if (!result) {
          return [{ type: 'posts', postId: 'LIST' }];
        }
    
        // Map over the result if it's defined
        return [
          ...result.content.map(({ postId }: { postId: number; }) => ({ type: 'posts', postId })),
          { type: 'posts', postId: 'LIST' },
        ];
      },
    }),

    getPostsByCategory: builder.query({
      query: (categoryId) => `category/${categoryId}/posts`,
      providesTags: (result) => {
        // Log the result outside the return statement
        console.log(result, "result is here");
    
        // If result is undefined or empty, return a default tag
        if (!result) {
          return [{ type: 'posts', postId: 'LIST' }];
        }
    
        // Map over the result if it's defined
        return [
          ...result.map(({ postId }: { postId: number; }) => ({ type: 'posts', postId })),
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
        console.log('FormData is here', formData);
        return {
          url: `post/image/upload/${formData.get('postId')}`,
          method: 'POST',
          body: formData,
        };
      },
    }),

    uploadSupportingDocuments: builder.mutation<unknown, FormData>({
      query: (formData) => {
        console.log('FormData is here', formData);
        return {
          url: `post/image/upload-files/${formData.get('postId')}`,
          method: 'POST',
          body: formData,
        }
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

    addPost: builder.mutation<unknown, unknown>({
      query: (body) => {
        const categoryId = body.category.categoryId;
        const userId = getUser().id;
        return {
          url: `user/${userId}/category/${categoryId}/address/1/posts`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: [{ type: 'posts', id: 'LIST' }],
      // async onQueryStarted(_, { dispatch, queryFulfilled }) {
      //   await queryFulfilled;
      //   dispatch(calendarTypeApi.util.invalidateTags([{ type: 'calendarTypes', id: 'LIST' }]));
      // },
    }),

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
  useGetPostsQuery,
  useGetPostsByCategoryQuery,
  useGetPostQuery,
  useAddPostMutation,
  useUploadCoverPhotoMutation,
  useUploadSupportingDocumentsMutation,
} = postApi;
