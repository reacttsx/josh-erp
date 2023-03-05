import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const CustomerEnquiry = React.lazy(() => import('./views/customer/Enquiry'))
const CustomerFeedback = React.lazy(() => import('./views/customer/Feedback'))
const Advance = React.lazy(() => import('./views/advance/Advance'))
const Payments = React.lazy(() => import('./views/payments/Payments'))
const Purchase = React.lazy(() => import('./views/purchase/Purchase'))
const Customer = React.lazy(() => import('./views/customer/Customer'))
const Accounts = React.lazy(() => import('./views/accounts/Accounts'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/customer-enquiry', name: 'Customer Enquiry', element: CustomerEnquiry },
  { path: '/customer-feedback', name: 'Customer Feedback', element: CustomerFeedback },
  { path: '/advance', name: 'Advance', element: Advance },
  { path: '/payments', name: 'Payments', element: Payments },
  { path: '/purchase', name: 'Purchase', element: Purchase },
  { path: '/customer', name: 'Customer', element: Customer },
  { path: '/accounts', name: 'Accounts', element: Accounts },
]

export default routes
