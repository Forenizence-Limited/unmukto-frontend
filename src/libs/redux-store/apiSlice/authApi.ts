import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { createSlice } from "@reduxjs/toolkit";

// Create a slice to handle auth state (optional if using local storage)
const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null, user: null },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    clearToken: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://34.71.24.46:9292/api/v1/auth/' }),
  
  tagTypes: ["auth"],

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'auth', id: 'LIST' }],
      // Use onQueryStarted to handle successful login
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const token = data.token;
          const user = data.user;

          dispatch(setToken({ token, user }));
          localStorage.setItem('authToken', token);
          localStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
          // Handle error if needed
          console.error("Login failed:", error);
        }
      },
    }),
    
  }),
});

// Export hooks for usage in functional components
export const { useLoginMutation } = authApi;

