import React from 'react'

import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

const Dashboard = () => {
  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>Dashboard</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs={12} md={6} xl={6}></CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Dashboard
