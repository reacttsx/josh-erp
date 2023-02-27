import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const CustomerEnquiry = React.lazy(() => import('./views/customer/Enquiry'))
const CustomerFeedback = React.lazy(() => import('./views/customer/Feedback'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/customer-enquiry', name: 'Customer Enquiry', element: CustomerEnquiry },
  { path: '/customer-feedback', name: 'Customer Feedback', element: CustomerFeedback },
]

export default routes
