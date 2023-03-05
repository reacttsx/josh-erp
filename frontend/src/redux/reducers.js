import { combineReducers } from 'redux'
import { usersApi } from './services/users'
import UserReducer from './feature/userSlice'
import SidebarReducer from './feature/sidebarSlice'
import { customerApi } from './services/customer'
import { paymentsApi } from './services/payments'
import { advanceApi } from './services/advance'
import { purchaseApi } from './services/purchase'
import { accountsApi } from './services/accounts'

const appReducer = combineReducers({
  auth: UserReducer,
  sidebar: SidebarReducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [customerApi.reducerPath]: customerApi.reducer,
  [paymentsApi.reducerPath]: paymentsApi.reducer,
  [advanceApi.reducerPath]: advanceApi.reducer,
  [purchaseApi.reducerPath]: purchaseApi.reducer,
  [accountsApi.reducerPath]: accountsApi.reducer,
})

export const middlewares = [
  usersApi.middleware,
  customerApi.middleware,
  paymentsApi.middleware,
  advanceApi.middleware,
  purchaseApi.middleware,
  accountsApi.middleware,
]

export const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_STORE') return appReducer(undefined, action)
  else return appReducer(state, action)
}
