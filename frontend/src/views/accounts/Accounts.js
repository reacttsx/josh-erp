import React, { useState } from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormInput,
  CRow,
  CSpinner,
} from '@coreui/react'
import { Table } from 'src/components'
import CreateModal from './modal/CreateModal'
import { useGetAllAccountsQuery } from 'src/redux/services/accounts'

const Accounts = () => {
  const [modal, setModal] = useState(false)
  const [page, setPage] = useState(1)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [limit, setLimit] = useState(20)
  const { data, refetch, isLoading, isFetching } = useGetAllAccountsQuery(
    { page: page, limit: limit, from: from, to: to },
    { refetchOnMountOrArgChange: true },
  )
  const columns = [
    {
      Header: '#',
      id: 'row',
      Cell: (row) => {
        return <div>{parseInt(row.row.id) + 1}</div>
      },
      Footer: '#',
    },
    {
      Header: 'Date',
      accessor: 'acc_date',
      disableFilters: true,
      Footer: 'Date',
    },
    {
      Header: 'Total income',
      accessor: 'total_income',
      disableFilters: true,
      Footer: (row) => {
        const check = row.data.reduce((a, b) => parseInt(a.total_income) + parseInt(b.total_income))
        return check.total_income ? check.total_income : check
      },
    },
    {
      Header: 'Store expense',
      accessor: 'store_expense',
      disableFilters: true,
      Footer: (row) => {
        const check = row.data.reduce(
          (a, b) => parseInt(a.store_expense) + parseInt(b.store_expense),
        )
        return check.store_expense ? check.store_expense : check
      },
    },
    {
      Header: 'Salary expense',
      accessor: 'salary_expense',
      disableFilters: true,
      Footer: (row) => {
        const check = row.data.reduce(
          (a, b) => parseInt(a.salary_expense) + parseInt(b.salary_expense),
        )
        return check.salary_expense ? check.salary_expense : check
      },
    },
    {
      Header: 'Other expense',
      accessor: 'other_expense',
      disableFilters: true,
      Footer: (row) => {
        const check = row.data.reduce(
          (a, b) => parseInt(a.other_expense) + parseInt(b.other_expense),
        )
        return check.other_expense ? check.other_expense : check
      },
    },
    {
      Header: 'Remarks',
      accessor: 'remarks',
      disableFilters: true,
      Footer: 'Remarks',
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
            <CCardHeader>Accounts</CCardHeader>
            <CCardBody>
              <CRow className="mb-4 justify-content-center">
                <CCol md={3}>
                  <CFormInput
                    type="date"
                    name="from"
                    label="From date"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  />
                </CCol>
                <CCol md={3}>
                  <CFormInput
                    type="date"
                    name="to"
                    label="To date"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                </CCol>
              </CRow>
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
