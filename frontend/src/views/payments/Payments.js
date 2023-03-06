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
import { useGetAllPaymentsQuery } from 'src/redux/services/payments'
import CreateModal from './modal/CreateModal'

const Payments = () => {
  const [modal, setModal] = useState(false)
  const [page, setPage] = useState(1)
  const { data, refetch, isLoading, isFetching } = useGetAllPaymentsQuery(
    { page: page },
    { refetchOnMountOrArgChange: true },
  )
  const columns = [
    {
      Header: '#',
      id: 'row',
      Cell: (row) => {
        return <div>{parseInt(row.row.id) + 1}</div>
      },
    },
    {
      Header: 'Customer',
      accessor: 'name',
      disableFilters: true,
    },
    {
      Header: 'Amount',
      accessor: 'amount',
      disableFilters: true,
    },
    {
      Header: 'Received on',
      accessor: 'received_on',
      disableFilters: true,
    },
  ]

  const fetchData = (page) => {
    setPage(page)
  }

  const reloadData = () => {
    refetch()
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Payments</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12}>
                  {isLoading || isFetching ? (
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
                      pageLimit={20}
                      enablePagination={true}
                    />
                  )}
                </CCol>
              </CRow>
            </CCardBody>
            <CCardFooter>
              <CButton type="button" size="sm" onClick={() => setModal(true)}>
                Create Payments
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
      {modal && <CreateModal visible={modal} setVisible={setModal} reloadData={reloadData} />}
    </>
  )
}

export default Payments
