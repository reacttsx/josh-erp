import React, { useState } from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
  CSpinner,
} from '@coreui/react'
import EnquiryModal from './modal/EnquiryModal'
import { useGetAllEnquiryQuery } from 'src/redux/services/customer'
import { Table } from 'src/components'

const CustomerEnquiry = () => {
  const [modal, setModal] = useState(false)
  const [page, setPage] = useState(1)
  const enquiry = useGetAllEnquiryQuery({ page: page }, { refetchOnMountOrArgChange: true })
  const columns = [
    {
      Header: 'Customer name',
      accessor: 'name',
      disableFilters: true,
    },
    {
      Header: 'Contact',
      accessor: 'contact',
      disableFilters: true,
    },
    {
      Header: 'E.D.o.D',
      accessor: 'edod',
      disableFilters: true,
    },
    {
      Header: 'Mode of enquiry',
      accessor: 'mode_of_enq',
      disableFilters: true,
    },
    {
      Header: 'Dealer',
      accessor: 'dealer',
      disableFilters: true,
    },
    {
      Header: 'Sales man',
      accessor: 'sales_man',
      disableFilters: true,
    },
    {
      Header: 'First call',
      accessor: 'first_call',
      disableFilters: true,
    },
    {
      Header: 'Status',
      accessor: 'first_call_status',
      disableFilters: true,
    },
    {
      Header: 'Second call',
      accessor: 'second_call',
      disableFilters: true,
    },
    {
      Header: 'Status',
      accessor: 'second_call_status',
      disableFilters: true,
    },
    {
      Header: 'Remarks',
      accessor: 'remarks',
      disableFilters: true,
    },
  ]

  const fetchData = (page) => {
    setPage(page)
  }

  const reloadData = () => {
    enquiry.refetch()
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Customer Enquiry</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12}>
                  {enquiry.isLoading ? (
                    <CSpinner size="sm" color="primary" className="mb-5" />
                  ) : (
                    <Table
                      list={enquiry.data.data}
                      columns={columns}
                      pageOffset={enquiry.data.current_page - 1}
                      page={enquiry.data.current_page}
                      pageCount={enquiry.data.last_page}
                      fetchDataFunction={fetchData}
                      isLoading={enquiry.isLoading}
                      pageLimit={20}
                      enablePagination={true}
                    />
                  )}
                </CCol>
              </CRow>
            </CCardBody>
            <CCardFooter>
              <CButton type="button" size="sm" onClick={() => setModal(true)}>
                Create Customer Enquiry
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
      {modal && <EnquiryModal visible={modal} setVisible={setModal} reloadData={reloadData} />}
    </>
  )
}

export default CustomerEnquiry
