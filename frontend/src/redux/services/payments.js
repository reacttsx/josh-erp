import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { APIS } from 'src/utility/apis'
import { API_ENDPOINT } from 'src/utility/constants'

export const paymentsApi = createApi({
  reducerPath: 'payments',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ENDPOINT,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.userData?.token

      headers.set('Accept', 'application/json')
      token && headers.set('Authorization', `Bearer ${token}`)
    },
  }),
  endpoints: (builder) => ({
    createPayments: builder.mutation({
      query: (payload) => ({ url: APIS.payments.create, method: 'POST', body: payload }),
    }),
    getAllPayments: builder.query({
      query: ({ page }) => ({ url: APIS.payments.listAll, params: { page } }),
    }),
  }),
})

export const { useCreatePaymentsMutation, useGetAllPaymentsQuery } = paymentsApi
