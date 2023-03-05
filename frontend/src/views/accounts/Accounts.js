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
import { useGetAllAccountsQuery } from 'src/redux/services/accounts'

const Accounts = () => {
  const [modal, setModal] = useState(false)
  const [page, setPage] = useState(1)
  const { data, refetch, isLoading } = useGetAllAccountsQuery(
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
      Header: 'Date',
      accessor: 'acc_date',
      disableFilters: true,
    },
    {
      Header: 'Total income',
      accessor: 'total_income',
      disableFilters: true,
    },
    {
      Header: 'Store expense',
      accessor: 'store_expense',
      disableFilters: true,
    },
    {
      Header: 'Salary expense',
      accessor: 'salary_expense',
      disableFilters: true,
    },
    {
      Header: 'Other expense',
      accessor: 'other_expense',
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
    refetch()
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Accounts</CCardHeader>
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
                Create Account Details
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
      {modal && <CreateModal visible={modal} setVisible={setModal} reloadData={reloadData} />}
    </>
  )
}

export default Accounts
