import React, { useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useLoginUsersMutation } from 'src/redux/services/users'
import { toast } from 'react-toastify'

const Login = () => {
  const [loginUsers, { isLoading, isError, isSuccess, error }] = useLoginUsersMutation()

  useEffect(() => {
    if (isSuccess) {
      toast.success('User logged successfully')
    }

    if (isError) {
      toast.error(error?.data?.message || 'Something went wrong. Try again.')
    }
  }, [error, isError, isLoading, isSuccess])

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8).required('Required'),
  })
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      await loginUsers(values)
    },
  })

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={formik.handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                    </CInputGroup>
                    {formik.errors.email && (
                      <div className="invalid-feedback d-block">{formik.errors.email}</div>
                    )}
                    <CInputGroup className="mt-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                    </CInputGroup>
                    {formik.errors.password && (
                      <div className="invalid-feedback d-block">{formik.errors.password}</div>
                    )}
                    <CRow>
                      <CCol>
                        <CButton
                          type="submit"
                          color="primary"
                          className="px-4 mt-4"
                          disabled={isLoading}
                        >
                          {isLoading ? <CSpinner size="sm" color="light" /> : 'Login'}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
