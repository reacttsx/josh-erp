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
import { Table } from 'src/components'
import FeedbackModal from './modal/FeedbackModal'
import { useGetAllFeedbackQuery } from 'src/redux/services/customer'

const CustomerFeedback = () => {
  const [modal, setModal] = useState(false)
  const [page, setPage] = useState(1)
  const feedback = useGetAllFeedbackQuery({ page: page }, { refetchOnMountOrArgChange: true })
  const columns = [
    {
      Header: 'Customer name',
      accessor: 'name',
      disableFilters: true,
    },
    {
      Header: 'Job No.',
      accessor: 'job_no',
      disableFilters: true,
    },
    {
      Header: 'D.o.D',
      accessor: 'dod',
      disableFilters: true,
    },
    {
      Header: 'First call',
      accessor: 'first_call',
      disableFilters: true,
    },
    {
      Header: 'Feedback',
      accessor: 'first_call_status',
      disableFilters: true,
    },
    {
      Header: 'Second call',
      accessor: 'second_call',
      disableFilters: true,
    },
    {
      Header: 'Feedback',
      accessor: 'second_call_status',
      disableFilters: true,
    },
    {
      Header: 'Third call',
      accessor: 'third_call',
      disableFilters: true,
    },
    {
      Header: 'Feedback',
      accessor: 'third_call_status',
      disableFilters: true,
    },
  ]

  const fetchData = (page) => {
    setPage(page)
  }

  const reloadData = () => {
    feedback.refetch()
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Customer Feedback</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12}>
                  {feedback.isLoading ? (
                    <CSpinner size="sm" color="primary" className="mb-5" />
                  ) : (
                    <Table
                      list={feedback.data.data}
                      columns={columns}
                      pageOffset={feedback.data.current_page - 1}
                      page={feedback.data.current_page}
                      pageCount={feedback.data.last_page}
                      fetchDataFunction={fetchData}
                      isLoading={feedback.isLoading}
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
      {modal && <FeedbackModal visible={modal} setVisible={setModal} reloadData={reloadData} />}
    </>
  )
}

export default CustomerFeedback
