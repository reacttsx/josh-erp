import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  userData: { email: '', id: 0, name: '', role: 0, status: 0, token: '' },
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logout: () => initialState,
    setUser: (state, action) => {
      state.isAuthenticated = true
      state.userData = action.payload
    },
  },
})

export default userSlice.reducer

export const { logout, setUser } = userSlice.actions
