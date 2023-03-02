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
  const [editData, setEditData] = useState({})
  const { data, refetch, isLoading } = useGetAllEnquiryQuery(
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
      Cell: (row) => {
        return <div>{row.value ? row.value : 'Not available'}</div>
      },
    },
    {
      Header: 'Status',
      accessor: 'first_call_status',
      disableFilters: true,
      Cell: (row) => {
        return <div>{row.value ? row.value : 'Not available'}</div>
      },
    },
    {
      Header: 'Second call',
      accessor: 'second_call',
      disableFilters: true,
      Cell: (row) => {
        return <div>{row.value ? row.value : 'Not available'}</div>
      },
    },
    {
      Header: 'Status',
      accessor: 'second_call_status',
      disableFilters: true,
      Cell: (row) => {
        return <div>{row.value ? row.value : 'Not available'}</div>
      },
    },
    {
      Header: 'Remarks',
      accessor: 'remarks',
      disableFilters: true,
    },
    {
      Header: 'Finished',
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

  const fetchData = (page) => {
    setPage(page)
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
