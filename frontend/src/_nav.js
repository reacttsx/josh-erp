import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilCash, cilSpeedometer, cilUser } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Customer Enquiry',
    to: '/customer-enquiry',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Customer Feedback',
    to: '/customer-feedback',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Payments',
    to: '/payment',
    icon: <CIcon icon={cilCash} customClassName="nav-icon" />,
  },
]

export default _nav
