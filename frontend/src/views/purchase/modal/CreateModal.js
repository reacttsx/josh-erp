import React, { useEffect } from 'react'

import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
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
import Select from 'react-select'
import { useGetAllCustomerQuery } from 'src/redux/services/customer'
import { useCreatePurchaseMutation } from 'src/redux/services/purchase'

const CreateModal = ({ visible, setVisible, reloadData }) => {
  const [createPurchase, { isLoading, isError, isSuccess, error }] = useCreatePurchaseMutation()
  const { data } = useGetAllCustomerQuery({}, { refetchOnMountOrArgChange: true })

  const PurchaseSchema = Yup.object().shape({
    customer_id: Yup.number().required('Required'),
    amount: Yup.number().required('Required'),
  })
  const formik = useFormik({
    initialValues: {
      customer_id: '',
      amount: '',
    },
    validationSchema: PurchaseSchema,
    onSubmit: async (values) => {
      await createPurchase(values)
    },
  })

  useEffect(() => {
    if (isSuccess) {
      reloadData()
      toast.success('Purchase added successfully')
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
        <CModalTitle>Create Purchase</CModalTitle>
      </CModalHeader>
      <CForm onSubmit={formik.handleSubmit}>
        <CModalBody>
          <div className="row g-3">
            <CCol md={6}>
              <CFormLabel>Customer</CFormLabel>
              <Select
                name="customer_id"
                options={data}
                onChange={(selectedOption) =>
                  formik.setFieldValue('customer_id', selectedOption.value)
                }
                onBlur={formik.handleBlur}
              />
              {formik.errors.customer_id && (
                <div className="invalid-feedback d-block">{formik.errors.customer_id}</div>
              )}
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="number"
                name="amount"
                label="Amount"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.amount}
              />
              {formik.errors.amount && (
                <div className="invalid-feedback d-block">{formik.errors.amount}</div>
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

CreateModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  reloadData: PropTypes.func.isRequired,
}

export default CreateModal
