import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { APIS } from 'src/utility/apis'
import { API_ENDPOINT } from 'src/utility/constants'

export const accountsApi = createApi({
  reducerPath: 'accounts',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ENDPOINT,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.userData?.token

      headers.set('Accept', 'application/json')
      token && headers.set('Authorization', `Bearer ${token}`)
    },
  }),
  endpoints: (builder) => ({
    createAccounts: builder.mutation({
      query: (payload) => ({ url: APIS.accounts.create, method: 'POST', body: payload }),
    }),
    getAllAccounts: builder.query({
      query: ({ page, limit, from, to }) => ({
        url: APIS.accounts.listAll,
        params: { page, limit, from, to },
      }),
    }),
  }),
})

export const { useCreateAccountsMutation, useGetAllAccountsQuery } = accountsApi
