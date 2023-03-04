import React, { useState } from 'react'

import { CCard, CCardBody, CCardHeader, CCol, CFormLabel, CRow } from '@coreui/react'
import { useListAllCustomerQuery, useSearchCustomerQuery } from 'src/redux/services/customer'
import Select from 'react-select'
import Spinner from 'src/components/Spinner'

const Customer = () => {
  const [customerId, setCustomerId] = useState(0)
  const { data } = useListAllCustomerQuery({}, { refetchOnMountOrArgChange: true })
  const searchData = useSearchCustomerQuery(customerId, { refetchOnMountOrArgChange: true })

  return (
    <>
      {searchData.isFetching && <Spinner />}
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Customer Search</CCardHeader>
            <CCardBody>
              <CRow className="justify-content-center">
                <CCol md={6}>
                  <CFormLabel>Customer</CFormLabel>
                  <Select
                    name="customer_id"
                    options={data}
                    onChange={(selectedOption) => setCustomerId(selectedOption.value)}
                  />
                </CCol>
              </CRow>
              {searchData.data?.id && (
                <CRow className="justify-content-center">
                  <CCol md={6}>
                    <p className="mb-0 mt-4">
                      <b>Name: </b>
                      {searchData.data.name}
                    </p>
                    <p className="mb-0">
                      <b>Contact: </b>
                      {searchData.data.contact}
                    </p>
                    <p className="mb-0">
                      <b>Total payments/received amount: </b>₹{searchData.data.total_payments || 0}
                    </p>
                    <p className="mb-0">
                      <b>Advance amount: </b>₹{searchData.data.advance || 0}
                    </p>
                    <p className="mb-0">
                      <b>Total purchase amount: </b>₹{searchData.data.purchase || 0}
                    </p>
                    <p className="mb-0">
                      <b>Total pending amount: </b>₹{searchData.data.pending || 0}
                    </p>
                  </CCol>
                </CRow>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Customer
