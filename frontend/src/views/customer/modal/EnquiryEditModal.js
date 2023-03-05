import React, { useEffect } from 'react'

import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
} from '@coreui/react'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { useUpdateCustomerEnquiryMutation } from 'src/redux/services/customer'

const EnquiryEditModal = ({ visible, setVisible, editData, setEditData, reloadData }) => {
  const [updateCustomerEnquiry, { isLoading, isError, isSuccess, error }] =
    useUpdateCustomerEnquiryMutation()

  const EnquirySchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    contact: Yup.string().required('Required'),
    edod: Yup.date().required('Required'),
    mode: Yup.string().required('Required'),
    dealer: Yup.string().required('Required'),
    sales: Yup.string().required('Required'),
    remarks: Yup.string().required('Required'),
  })
  const formik = useFormik({
    initialValues: {
      name: editData.name,
      contact: editData.contact,
      edod: editData.edod,
      mode: editData.mode_of_enq,
      dealer: editData.dealer,
      sales: editData.sales_man,
      first: editData.first_call,
      first_status: editData.first_call_status,
      second: editData.second_call,
      second_status: editData.second_call_status,
      remarks: editData.remarks,
      finished: parseInt(editData.finished) === 1 ? true : false,
      completed: parseInt(editData.completed) === 1 ? true : false,
    },
    validationSchema: EnquirySchema,
    onSubmit: async (values) => {
      values['id'] = editData.id
      await updateCustomerEnquiry(values, editData.id)
    },
  })

  useEffect(() => {
    if (isSuccess) {
      reloadData()
      toast.success('Customer enquiry updated successfully')
      setVisible(false)
      formik.resetForm()
    }

    if (isError) {
      toast.error(error?.data?.message || 'Something went wrong. Try again.')
    }
  }, [isError, isSuccess])

  const closeModal = () => {
    setVisible(false)
    setEditData({})
  }

  return (
    <CModal visible={visible} onClose={closeModal} backdrop="static" alignment="center">
      <CModalHeader>
        <CModalTitle>Update Customer Enquiry</CModalTitle>
      </CModalHeader>
      <CForm onSubmit={formik.handleSubmit}>
        <CModalBody>
          <div className="row g-3">
            <CCol md={6}>
              <CFormInput
                name="name"
                label="Customer name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.errors.name && (
                <div className="invalid-feedback d-block">{formik.errors.name}</div>
              )}
            </CCol>
            <CCol md={6}>
              <CFormInput
                name="contact"
                label="Contact"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.contact}
              />
              {formik.errors.contact && (
                <div className="invalid-feedback d-block">{formik.errors.contact}</div>
              )}
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="date"
                name="edod"
                label="E.D.o.D"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.edod}
              />
              {formik.errors.edod && (
                <div className="invalid-feedback d-block">{formik.errors.edod}</div>
              )}
            </CCol>
            <CCol md={6}>
              <CFormInput
                name="mode"
                label="Mode of enquiry"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mode}
              />
              {formik.errors.mode && (
                <div className="invalid-feedback d-block">{formik.errors.mode}</div>
              )}
            </CCol>
            <CCol md={6}>
              <CFormInput
                name="dealer"
                label="Dealer"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dealer}
              />
              {formik.errors.dealer && (
                <div className="invalid-feedback d-block">{formik.errors.dealer}</div>
              )}
            </CCol>
            <CCol md={6}>
              <CFormInput
                name="sales"
                label="Sales man"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sales}
              />
              {formik.errors.sales && (
                <div className="invalid-feedback d-block">{formik.errors.sales}</div>
              )}
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="date"
                name="first"
                label="First call"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.first}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                name="first_status"
                label="Status"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.first_status}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="date"
                name="second"
                label="Second call"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.second}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                name="second_status"
                label="Status"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.second_status}
              />
            </CCol>
            <CCol xs={12}>
              <CFormTextarea
                name="remarks"
                label="Remarks"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {formik.values.remarks}
              </CFormTextarea>
              {formik.errors.remarks && (
                <div className="invalid-feedback d-block">{formik.errors.remarks}</div>
              )}
            </CCol>
            <CCol md={6}>
              <CFormCheck
                name="finished"
                label="Finished"
                checked={formik.values.finished}
                onChange={(e) => formik.setFieldValue('finished', e.target.checked)}
              />
            </CCol>
            <CCol md={6}>
              <CFormCheck
                name="completed"
                label="Completed"
                checked={formik.values.completed}
                onChange={(e) => formik.setFieldValue('completed', e.target.checked)}
              />
            </CCol>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton type="button" color="secondary" onClick={closeModal}>
            Close
          </CButton>
          <CButton type="submit" color="primary" disabled={isLoading}>
            {isLoading ? <CSpinner size="sm" color="light" /> : 'Update'}
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  )
}

EnquiryEditModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  editData: PropTypes.object.isRequired,
  setEditData: PropTypes.func.isRequired,
  reloadData: PropTypes.func.isRequired,
}

export default EnquiryEditModal
