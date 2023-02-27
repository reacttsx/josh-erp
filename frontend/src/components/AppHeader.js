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
import { logo } from 'src/assets/brand/logo'
import { useLogoutUsersMutation } from 'src/redux/services/users'
import { toast } from 'react-toastify'
import { logout } from 'src/redux/feature/userSlice'
import Spinner from './Spinner'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [logoutUsers, { isLoading, isError, isSuccess, error }] = useLogoutUsersMutation()

  useEffect(() => {
    if (isSuccess) {
      dispatch(logout())
      toast.success('User logged out successfully')
    }

    if (isError) {
      toast.error(error?.data?.messagFCoree || 'Something went wrong. Try again.')
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
          <CHeaderToggler
            className="ps-1"
            onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
          <CHeaderBrand className="mx-auto d-md-none" to="/">
            <CIcon icon={logo} height={48} alt="Logo" />
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
