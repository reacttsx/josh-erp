import React, { useEffect } from 'react'

import {
  CButton,
  CCol,
  CForm,
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
import { useCreateCustomerEnquiryMutation } from 'src/redux/services/customer'

const EnquiryModal = ({ visible, setVisible, reloadData }) => {
  const [createCustomerEnquiry, { isLoading, isError, isSuccess, error }] =
    useCreateCustomerEnquiryMutation()

  const EnquirySchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    contact: Yup.string().required('Required'),
    edod: Yup.date().required('Required'),
    mode: Yup.string().required('Required'),
    dealer: Yup.string().required('Required'),
    sales: Yup.string().required('Required'),
    first: Yup.string().required('Required'),
    first_status: Yup.string().required('Required'),
    second: Yup.string().required('Required'),
    second_status: Yup.string().required('Required'),
    remarks: Yup.string().required('Required'),
  })
  const formik = useFormik({
    initialValues: {
      name: '',
      contact: '',
      edod: '',
      mode: '',
      dealer: '',
      sales: '',
      first: '',
      first_status: '',
      second: '',
      second_status: '',
      remarks: '',
    },
    validationSchema: EnquirySchema,
    onSubmit: async (values) => {
      await createCustomerEnquiry(values)
    },
  })

  useEffect(() => {
    if (isSuccess) {
      reloadData()
      toast.success('Customer enquiry created successfully')
      setVisible(false)
      formik.resetForm()
    }

    if (isError) {
      toast.error(error?.data?.message || 'Something went wrong. Try again.')
    }
  }, [isError, isSuccess])

  return (
    <CModal
      visible={visible}
      onClose={() => setVisible(false)}
      backdrop="static"
      alignment="center"
    >
      <CModalHeader>
        <CModalTitle>Create Customer Enquiry</CModalTitle>
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
                name="first"
                label="First call"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.first}
              />
              {formik.errors.first && (
                <div className="invalid-feedback d-block">{formik.errors.first}</div>
              )}
            </CCol>
            <CCol md={6}>
              <CFormInput
                name="first_status"
                label="Status"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.first_status}
              />
              {formik.errors.first_status && (
                <div className="invalid-feedback d-block">{formik.errors.first_status}</div>
              )}
            </CCol>
            <CCol md={6}>
              <CFormInput
                name="second"
                label="Second call"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.second}
              />
              {formik.errors.second && (
                <div className="invalid-feedback d-block">{formik.errors.second}</div>
              )}
            </CCol>
            <CCol md={6}>
              <CFormInput
                name="second_status"
                label="Status"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.second_status}
              />
              {formik.errors.second_status && (
                <div className="invalid-feedback d-block">{formik.errors.second_status}</div>
              )}
            </CCol>
            <CCol xs={12}>
              <CFormTextarea
                name="remarks"
                label="Remarks"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.remarks}
              />
              {formik.errors.remarks && (
                <div className="invalid-feedback d-block">{formik.errors.remarks}</div>
              )}
            </CCol>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton type="button" color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton type="submit" color="primary" disabled={isLoading}>
            {isLoading ? <CSpinner size="sm" color="light" /> : 'Save'}
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  )
}

EnquiryModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  reloadData: PropTypes.func.isRequired,
}

export default EnquiryModal
