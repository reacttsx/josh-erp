export const APIS = {
  user: {
    login: 'login',
    logout: 'logout',
  },
  customer: {
    create: 'customer/create',
    list: 'customer/get-all-enq',
    listCustomer: 'customer/all',
    createFeedback: 'customer/create-feedback',
    listFeedback: 'customer/get-all-feedback',
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
