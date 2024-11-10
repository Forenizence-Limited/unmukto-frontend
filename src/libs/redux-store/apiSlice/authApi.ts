import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from '@/utils/types/types';

// interface AuthState {
//   token: string | null;
//   isAuthenticated: boolean;
//   user: User | null;
// }

// const initialState: AuthState = {
//   token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
//   isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('token') : false,
//   user: typeof window !== 'undefined' && localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') ?? "null") : null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setCredentials: (state, action: PayloadAction<{ token: string, user: User }>) => {
//       state.token = action.payload.token;
//       state.isAuthenticated = true;
//       state.user = action.payload.user;
//     },
//     logout: (state) => {
//       state.token = null;
//       state.isAuthenticated = false;
//       state.user = null;
//       localStorage.removeItem('token'); // Clear token from localStorage
//       localStorage.removeItem('user'); // Clear user from localStorage
//     },
//   },
// });

// export const { setCredentials, logout } = authSlice.actions;
// export const authReducer = authSlice.reducer;

// export const authApi = createApi({
//   reducerPath: 'authApi',
//   baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}` }),

//   tagTypes: ["auth"],

//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (body) => ({
//         url: 'auth/login',
//         method: 'POST',
//         body,
//       }),
//       invalidatesTags: [{ type: 'auth', id: 'LIST' }],
//       // Use onQueryStarted to handle successful login
//       async onQueryStarted(arg, { dispatch, queryFulfilled }) {
//         try {
//           const { data } = await queryFulfilled;
//           const token = data.token;
//           const user = data.user;

//           dispatch(setCredentials({ token, user }));
//           localStorage.setItem('token', token);
//           localStorage.setItem('user', JSON.stringify(user));
//         } catch (error) {
//           // Handle error if needed
//           console.error("Login failed:", error);
//         }
//       },
//     }),
//   }),
// });

// // Export hooks for usage in functional components
// export const { useLoginMutation } = authApi;

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string, user: User }>) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token'); // Clear token from localStorage
        localStorage.removeItem('user'); // Clear user from localStorage
      }
    },
    initializeAuthState: (state) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') ?? "null") : null;
        state.token = token;
        state.isAuthenticated = !!token;
        state.user = user;
      }
    },
  },
});

export const { setCredentials, logout, initializeAuthState } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}` }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'auth', id: 'LIST' }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const token = data.token;
          const user = data.user;

          dispatch(setCredentials({ token, user }));
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const { useLoginMutation } = authApi;