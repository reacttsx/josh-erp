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
import { useGetAllAdvanceQuery } from 'src/redux/services/advance'

const Advance = () => {
  const [modal, setModal] = useState(false)
  const [page, setPage] = useState(1)
  const { data, refetch, isLoading } = useGetAllAdvanceQuery(
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
            <CCardHeader>Advance</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12}>
                  {isLoading ? (
                    <CSpinner size="sm" color="primary" className="mb-5" />
                  ) : (
                    <Table
                      list={data.data}
                      columns={columns}
                      pageOffset={data.current_page - 1}
                      page={data.current_page}
                      pageCount={data.last_page}
                      fetchDataFunction={fetchData}
                      isLoading={isLoading}
                      pageLimit={20}
                      enablePagination={true}
                    />
                  )}
                </CCol>
              </CRow>
            </CCardBody>
            <CCardFooter>
              <CButton type="button" size="sm" onClick={() => setModal(true)}>
                Create Advance
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
      {modal && <CreateModal visible={modal} setVisible={setModal} reloadData={reloadData} />}
    </>
  )
}

export default Advance
