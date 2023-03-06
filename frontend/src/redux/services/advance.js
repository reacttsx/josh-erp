import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { APIS } from 'src/utility/apis'
import { API_ENDPOINT } from 'src/utility/constants'

export const advanceApi = createApi({
  reducerPath: 'advance',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ENDPOINT,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.userData?.token

      headers.set('Accept', 'application/json')
      token && headers.set('Authorization', `Bearer ${token}`)
    },
  }),
  endpoints: (builder) => ({
    createAdvance: builder.mutation({
      query: (payload) => ({ url: APIS.advance.create, method: 'POST', body: payload }),
    }),
    getAllAdvance: builder.query({
      query: ({ page, limit }) => ({ url: APIS.advance.listAll, params: { page, limit } }),
    }),
  }),
})

export const { useCreateAdvanceMutation, useGetAllAdvanceQuery } = advanceApi
