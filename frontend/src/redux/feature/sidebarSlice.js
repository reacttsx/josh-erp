import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarShow: false,
  unfoldable: false,
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: initialState,
  reducers: {
    setSidebar: (state, action) => {
      state.sidebarShow = action.payload
    },
    setSidebarUnfoldable: (state, action) => {
      state.unfoldable = action.payload
    },
  },
})

export default sidebarSlice.reducer

export const { setSidebar, setSidebarUnfoldable } = sidebarSlice.actions
