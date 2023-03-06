import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { APIS } from 'src/utility/apis'
import { API_ENDPOINT } from 'src/utility/constants'

export const purchaseApi = createApi({
  reducerPath: 'purchase',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ENDPOINT,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.userData?.token

      headers.set('Accept', 'application/json')
      token && headers.set('Authorization', `Bearer ${token}`)
    },
  }),
  endpoints: (builder) => ({
    createPurchase: builder.mutation({
      query: (payload) => ({ url: APIS.purchase.create, method: 'POST', body: payload }),
    }),
    getAllPurchase: builder.query({
      query: ({ page, limit }) => ({ url: APIS.purchase.listAll, params: { page, limit } }),
    }),
  }),
})

export const { useCreatePurchaseMutation, useGetAllPurchaseQuery } = purchaseApi
