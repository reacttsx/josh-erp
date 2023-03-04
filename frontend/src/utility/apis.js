export const APIS = {
  user: {
    login: 'login',
    logout: 'logout',
  },
  customer: {
    create: 'customer/create',
    update: 'customer/update',
    list: 'customer/get-all-enq',
    listCustomer: 'customer/all',
    allCustomer: 'customer/list-all',
    createFeedback: 'customer/create-feedback',
    listFeedback: 'customer/get-all-feedback',
    search: 'customer/search',
    dashboard: 'customer/dashboard',
  },
  payments: {
    create: 'payments/create',
    listAll: 'payments/all',
  },
  advance: {
    create: 'advance/create',
    listAll: 'advance/all',
  },
  purchase: {
    create: 'purchase/create',
    listAll: 'purchase/all',
  },
}
