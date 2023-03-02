import React, { useEffect } from 'react'

import {
  CButton,
  CCol,
  CForm,
  CFormInput,
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
import { useCreateCustomerFeedbackMutation } from 'src/redux/services/customer'

const FeedbackModal = ({ visible, setVisible, reloadData }) => {
  const [createCustomerEnquiry, { isLoading, isError, isSuccess, error }] =
    useCreateCustomerFeedbackMutation()

  const FeedbackSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    job_no: Yup.string().required('Required'),
    dod: Yup.date().required('Required'),
    first: Yup.string().required('Required'),
    first_status: Yup.string().required('Required'),
    second: Yup.string().required('Required'),
    second_status: Yup.string().required('Required'),
    third: Yup.string().required('Required'),
    third_status: Yup.string().required('Required'),
  })
  const formik = useFormik({
    initialValues: {
      name: '',
      job_no: '',
      dod: '',
      first: '',
      first_status: '',
      second: '',
      second_status: '',
      third: '',
      third_status: '',
    },
    validationSchema: FeedbackSchema,
    onSubmit: async (values) => {
      await createCustomerEnquiry(values)
    },
  })

  useEffect(() => {
    if (isSuccess) {
      reloadData()
      toast.success('Customer feedback created successfully')
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
        <CModalTitle>Create Customer Feedback</CModalTitle>
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
                name="job_no"
                label="Job No."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.job_no}
              />
              {formik.errors.job_no && (
                <div className="invalid-feedback d-block">{formik.errors.job_no}</div>
              )}
            </CCol>
            <CCol xs={12}>
              <CFormInput
                type="date"
                name="dod"
                label="D.o.D"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dod}
              />
              {formik.errors.dod && (
                <div className="invalid-feedback d-block">{formik.errors.dod}</div>
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
              {formik.errors.first && (
                <div className="invalid-feedback d-block">{formik.errors.first}</div>
              )}
            </CCol>
            <CCol md={6}>
              <CFormInput
                name="first_status"
                label="Feedback"
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
                type="date"
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
                label="Feedback"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.second_status}
              />
              {formik.errors.second_status && (
                <div className="invalid-feedback d-block">{formik.errors.second_status}</div>
              )}
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="date"
                name="third"
                label="Third call"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.third}
              />
              {formik.errors.third && (
                <div className="invalid-feedback d-block">{formik.errors.third}</div>
              )}
            </CCol>
            <CCol md={6}>
              <CFormInput
                name="third_status"
                label="Feedback"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.third_status}
              />
              {formik.errors.third_status && (
                <div className="invalid-feedback d-block">{formik.errors.third_status}</div>
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

FeedbackModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  reloadData: PropTypes.func.isRequired,
}

export default FeedbackModal
