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
  const [limit, setLimit] = useState(20)
  const { data, refetch, isLoading, isFetching } = useGetAllFeedbackQuery(
    { page: page, limit: limit },
    { refetchOnMountOrArgChange: true },
  )
  const columns = [
    {
      Header: '#',
      Footer: '#',
      id: 'row',
      Cell: (row) => {
        return <div>{parseInt(row.row.id) + 1}</div>
      },
    },
    {
      Header: 'Customer name',
      Footer: 'Customer name',
      accessor: 'name',
      disableFilters: true,
    },
    {
      Header: 'D.o.D',
      Footer: 'D.o.D',
      accessor: 'dod',
      disableFilters: true,
    },
    {
      Header: 'First call',
      Footer: 'First call',
      accessor: 'first_call',
      disableFilters: true,
    },
    {
      Header: 'Feedback',
      Footer: 'Feedback',
      accessor: 'first_call_status',
      disableFilters: true,
    },
    {
      Header: 'Second call',
      Footer: 'Second call',
      accessor: 'second_call',
      disableFilters: true,
    },
    {
      Header: 'Feedback',
      Footer: 'Feedback',
      accessor: 'second_call_status',
      disableFilters: true,
    },
    {
      Header: 'Third call',
      Footer: 'Third call',
      accessor: 'third_call',
      disableFilters: true,
    },
    {
      Header: 'Feedback',
      Footer: 'Feedback',
      accessor: 'third_call_status',
      disableFilters: true,
    },
  ]

  const fetchData = (page, limit) => {
    setPage(page)
    setLimit(limit === 'All' ? 0 : limit)
  }

  const reloadData = () => {
    refetch()
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
                  {isLoading ? (
                    <CSpinner size="sm" color="primary" className="mb-5" />
                  ) : (
                    <Table
                      list={data?.data}
                      columns={columns}
                      pageOffset={data?.current_page - 1}
                      page={data?.current_page}
                      pageCount={data?.last_page}
                      fetchDataFunction={fetchData}
                      isLoading={isLoading || isFetching}
                      pageLimit={limit}
                      enablePagination={true}
                    />
                  )}
                </CCol>
              </CRow>
            </CCardBody>
            <CCardFooter>
              <CButton type="button" size="sm" onClick={() => setModal(true)}>
                Create Customer Feedback
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
