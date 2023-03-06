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
import CIcon from '@coreui/icons-react'
import { cilCheckCircle, cilXCircle } from '@coreui/icons'
import { Link } from 'react-router-dom'
import EnquiryEditModal from './modal/EnquiryEditModal'

const CustomerEnquiry = () => {
  const [modal, setModal] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)
  const [editData, setEditData] = useState({})
  const { data, refetch, isLoading, isFetching } = useGetAllEnquiryQuery(
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
      Header: 'Contact',
      Footer: 'Contact',
      accessor: 'contact',
      disableFilters: true,
    },
    {
      Header: 'E.D.o.D',
      Footer: 'E.D.o.D',
      accessor: 'edod',
      disableFilters: true,
    },
    {
      Header: 'Mode of enquiry',
      Footer: 'Mode of enquiry',
      accessor: 'mode_of_enq',
      disableFilters: true,
    },
    {
      Header: 'Dealer',
      Footer: 'Dealer',
      accessor: 'dealer',
      disableFilters: true,
    },
    {
      Header: 'Sales man',
      Footer: 'Sales man',
      accessor: 'sales_man',
      disableFilters: true,
    },
    {
      Header: 'First call',
      Footer: 'First call',
      accessor: 'first_call',
      disableFilters: true,
      Cell: (row) => {
        return <div>{row.value ? row.value : 'Not available'}</div>
      },
    },
    {
      Header: 'Status',
      Footer: 'Status',
      accessor: 'first_call_status',
      disableFilters: true,
      Cell: (row) => {
        return <div>{row.value ? row.value : 'Not available'}</div>
      },
    },
    {
      Header: 'Second call',
      Footer: 'Second call',
      accessor: 'second_call',
      disableFilters: true,
      Cell: (row) => {
        return <div>{row.value ? row.value : 'Not available'}</div>
      },
    },
    {
      Header: 'Status',
      Footer: 'Status',
      accessor: 'second_call_status',
      disableFilters: true,
      Cell: (row) => {
        return <div>{row.value ? row.value : 'Not available'}</div>
      },
    },
    {
      Header: 'Remarks',
      Footer: 'Remarks',
      accessor: 'remarks',
      disableFilters: true,
    },
    {
      Header: 'Finished',
      Footer: 'Finished',
      accessor: 'finished',
      disableFilters: true,
      Cell: (row) => {
        return (
          <div>
            {parseInt(row.value) === 1 ? (
              <CIcon icon={cilCheckCircle} size="sm" className="text-success" />
            ) : (
              <CIcon icon={cilXCircle} size="sm" className="text-danger" />
            )}
          </div>
        )
      },
    },
    {
      Header: 'Completed',
      Footer: 'Completed',
      accessor: 'completed',
      disableFilters: true,
      Cell: (row) => {
        return (
          <div>
            {parseInt(row.value) === 1 ? (
              <CIcon icon={cilCheckCircle} size="sm" className="text-success" />
            ) : (
              <CIcon icon={cilXCircle} size="sm" className="text-danger" />
            )}
          </div>
        )
      },
    },
    {
      Header: 'Edit',
      Footer: 'Edit',
      id: 'edit',
      Cell: (row) => {
        return (
          <div>
            <Link to="#" onClick={() => editCustomer(row.data[row.row.id])}>
              Edit
            </Link>
          </div>
        )
      },
    },
  ]

  const fetchData = (page, limit) => {
    setPage(page)
    setLimit(limit === 'All' ? 0 : limit)
  }

  const reloadData = () => {
    refetch()
  }

  const editCustomer = (data) => {
    setEditData(data)
    setModalEdit(true)
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
                Create Customer Enquiry
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
      {modal && (
        <EnquiryModal
          visible={modal}
          setVisible={setModal}
          editData={editData}
          setEditData={setEditData}
          reloadData={reloadData}
        />
      )}
      {modalEdit && (
        <EnquiryEditModal
          visible={modalEdit}
          setVisible={setModalEdit}
          editData={editData}
          setEditData={setEditData}
          reloadData={reloadData}
        />
      )}
    </>
  )
}

export default CustomerEnquiry
