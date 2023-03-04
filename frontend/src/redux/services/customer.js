import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { APIS } from 'src/utility/apis'
import { API_ENDPOINT } from 'src/utility/constants'

export const customerApi = createApi({
  reducerPath: 'customer',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ENDPOINT,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.userData?.token

      headers.set('Accept', 'application/json')
      token && headers.set('Authorization', `Bearer ${token}`)
    },
  }),
  endpoints: (builder) => ({
    createCustomerEnquiry: builder.mutation({
      query: (payload) => ({ url: APIS.customer.create, method: 'POST', body: payload }),
    }),
    updateCustomerEnquiry: builder.mutation({
      query: (payload) => ({
        url: APIS.customer.update,
        method: 'PATCH',
        body: payload,
      }),
    }),
    getAllEnquiry: builder.query({
      query: ({ page }) => ({ url: APIS.customer.list, params: { page } }),
    }),
    getAllCustomer: builder.query({
      query: () => ({ url: APIS.customer.listCustomer }),
    }),
    listAllCustomer: builder.query({
      query: () => ({ url: APIS.customer.allCustomer }),
    }),
    createCustomerFeedback: builder.mutation({
      query: (payload) => ({ url: APIS.customer.createFeedback, method: 'POST', body: payload }),
    }),
    getAllFeedback: builder.query({
      query: ({ page }) => ({ url: APIS.customer.listFeedback, params: { page } }),
    }),
    searchCustomer: builder.query({
      query: (customerId) => ({ url: `${APIS.customer.search}/${customerId}` }),
    }),
    dashboardData: builder.query({
      query: () => ({ url: `${APIS.customer.dashboard}` }),
    }),
  }),
})

export const {
  useCreateCustomerEnquiryMutation,
  useUpdateCustomerEnquiryMutation,
  useGetAllEnquiryQuery,
  useGetAllCustomerQuery,
  useListAllCustomerQuery,
  useCreateCustomerFeedbackMutation,
  useGetAllFeedbackQuery,
  useSearchCustomerQuery,
  useDashboardDataQuery,
} = customerApi
