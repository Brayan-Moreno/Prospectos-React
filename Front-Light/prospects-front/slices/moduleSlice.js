import { createSlice } from "@reduxjs/toolkit"

export const moduleSlice = createSlice({
  name: 'module',
  initialState: {
    name: ''
  },
  reducers: {
    setModule: (state, action) => {
      state.name = action.payload
    },
    cleanNavbar: (state) => {
      state.name = ''
    }
  }
})

export const moduleSelector = (state) => state.module.name

export const { setModule } = moduleSlice.actions
export const { cleanNavbar } = moduleSlice.actions

export default moduleSlice.reducer