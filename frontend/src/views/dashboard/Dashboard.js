import React from 'react'

import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { useDashboardDataQuery } from 'src/redux/services/customer'
import Spinner from 'src/components/Spinner'

const Dashboard = () => {
  const { data, isFetching } = useDashboardDataQuery({}, { refetchOnMountOrArgChange: true })

  return (
    <>
      {isFetching && <Spinner />}
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Dashboard</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md={6}>
                  <p className="mb-0">
                    <b>Live Vehicles: </b>
                    {data?.live || 0}
                  </p>
                  <p className="mb-0">
                    <b>Total Recevables: </b>₹{data?.receivables || 0}
                  </p>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
