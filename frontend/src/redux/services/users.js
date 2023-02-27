import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { APIS } from 'src/utility/apis'
import { API_ENDPOINT } from 'src/utility/constants'
import { setUser } from '../feature/userSlice'

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ENDPOINT,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.userData?.token

      headers.set('Accept', 'application/json')
      token && headers.set('Authorization', `Bearer ${token}`)
    },
  }),
  endpoints: (builder) => ({
    loginUsers: builder.mutation({
      query: (payload) => ({ url: APIS.user.login, method: 'POST', body: payload }),
      transformResponse: (result) => result.data,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data))
        } catch (error) {}
      },
    }),
    logoutUsers: builder.mutation({
      query: () => ({ url: APIS.user.logout, method: 'GET' }),
    }),
  }),
})

export const { useLoginUsersMutation, useLogoutUsersMutation } = usersApi
