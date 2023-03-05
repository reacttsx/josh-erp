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
import { useCreateAccountsMutation } from 'src/redux/services/accounts'

const CreateModal = ({ visible, setVisible, reloadData }) => {
  const [createAccounts, { isLoading, isError, isSuccess, error }] = useCreateAccountsMutation()

  const AccountsSchema = Yup.object().shape({
    date: Yup.date().required('Required'),
  })
  const formik = useFormik({
    initialValues: {
      date: '',
      total_income: '',
      store_expense: '',
      salary_expense: '',
      other_expense: '',
      remarks: '',
    },
    validationSchema: AccountsSchema,
    onSubmit: async (values) => {
      await createAccounts(values)
    },
  })

  useEffect(() => {
    if (isSuccess) {
      reloadData()
      toast.success('Accounts details added successfully')
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
        <CModalTitle>Create Account Details</CModalTitle>
      </CModalHeader>
      <CForm onSubmit={formik.handleSubmit}>
        <CModalBody>
          <div className="row g-3">
            <CCol md={6}>
              <CFormInput
                type="date"
                name="date"
                label="Date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.date}
              />
              {formik.errors.date && (
                <div className="invalid-feedback d-block">{formik.errors.date}</div>
              )}
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="number"
                name="total_income"
                label="Total income"
                onChange={formik.handleChange}
                value={formik.values.total_income}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="number"
                name="store_expense"
                label="Store expense"
                onChange={formik.handleChange}
                value={formik.values.store_expense}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="number"
                name="salary_expense"
                label="Salary expense"
                onChange={formik.handleChange}
                value={formik.values.salary_expense}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="number"
                name="other_expense"
                label="Other expense"
                onChange={formik.handleChange}
                value={formik.values.other_expense}
              />
            </CCol>
            <CCol md={6}>
              <CFormTextarea name="remarks" label="Remarks" onChange={formik.handleChange}>
                {formik.values.remarks}
              </CFormTextarea>
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

CreateModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  reloadData: PropTypes.func.isRequired,
}

export default CreateModal
