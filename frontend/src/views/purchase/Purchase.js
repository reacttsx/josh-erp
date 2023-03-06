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
import CreateModal from './modal/CreateModal'
import { useGetAllPurchaseQuery } from 'src/redux/services/purchase'

const Purchase = () => {
  const [modal, setModal] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)
  const { data, refetch, isLoading, isFetching } = useGetAllPurchaseQuery(
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
      Header: 'Customer',
      Footer: 'Customer',
      accessor: 'name',
      disableFilters: true,
    },
    {
      Header: 'Amount',
      Footer: 'Amount',
      accessor: 'amount',
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
            <CCardHeader>Purchase</CCardHeader>
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
                      pageLimit={limit}
                      enablePagination={true}
                    />
                  )}
                </CCol>
              </CRow>
            </CCardBody>
            <CCardFooter>
              <CButton type="button" size="sm" onClick={() => setModal(true)}>
                Create Purchase
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
      {modal && <CreateModal visible={modal} setVisible={setModal} reloadData={reloadData} />}
    </>
  )
}

export default Purchase
