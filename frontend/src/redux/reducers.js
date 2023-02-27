import { combineReducers } from 'redux'
import { usersApi } from './services/users'
import UserReducer from './feature/userSlice'
import { customerApi } from './services/customer'

const appReducer = combineReducers({
  auth: UserReducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [customerApi.reducerPath]: customerApi.reducer,
})

export const middlewares = [usersApi.middleware, customerApi.middleware]

export const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_STORE') return appReducer(undefined, action)
  else return appReducer(state, action)
}
