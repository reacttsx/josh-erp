import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { useLogoutUsersMutation } from 'src/redux/services/users'
import { toast } from 'react-toastify'
import { logout } from 'src/redux/feature/userSlice'
import Spinner from './Spinner'
import { setSidebar } from 'src/redux/feature/sidebarSlice'

const AppHeader = () => {
  const dispatch = useDispatch()
  const { sidebarShow } = useSelector((state) => state.sidebar)
  const [logoutUsers, { isLoading, isError, isSuccess, error }] = useLogoutUsersMutation()

  useEffect(() => {
    if (isSuccess) {
      dispatch(logout())
      toast.success('User logged out successfully')
    }

    if (isError) {
      toast.error(error?.data?.message || 'Something went wrong. Try again.')
    }
  }, [dispatch, error, isError, isLoading, isSuccess])

  const onLogout = async () => {
    await logoutUsers()
  }

  return (
    <>
      {isLoading && <Spinner />}
      <CHeader position="sticky" className="mb-4">
        <CContainer fluid>
          <CHeaderToggler className="ps-1" onClick={() => dispatch(setSidebar(!sidebarShow))}>
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
          <CHeaderBrand className="mx-auto d-md-none" to="/">
            <h3>Adagio CRM</h3>
          </CHeaderBrand>
          <CHeaderNav className="ms-3">
            <AppHeaderDropdown onLogout={onLogout} />
          </CHeaderNav>
        </CContainer>
        <CHeaderDivider />
        <CContainer fluid>
          <AppBreadcrumb />
        </CContainer>
      </CHeader>
    </>
  )
}

export default AppHeader
