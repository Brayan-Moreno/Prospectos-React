import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const userSelector = (state) => {
  const { name, cellphone, profile, id, employeeCode, branchId, positionId, storeId, departmentId } = state.user
  return {
    id,
    name,
    cellphone,
    profile,
    employeeCode,
    branchId,
    positionId,
    storeId,
    departmentId
  }
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogged: false,
    id: "",
    name: "",
    cellphone: 0,
    employeeCode: "",
    profile: "",
    permissions: [],
    branchId: "",
    positionId: "",
    storeId: "",
    departmentId: "",
  },
  reducers: {
    logoutThunk: (state) => {
      state.isLogged = false
      state.name = ""
      state.cellphone = 0
      state.profile = ""
      state.employeeCode = ""
      state.permissions = []
      state.branchId = ""
      state.positionId = ""
      state.storeId = ""
      state.departmentId = ""
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      Router.push("/")
    },
  },
})
export const isLoggedSelector = (state) => state.user.isLogged
export const permissionsSelector = (state) => state.user.permissions

export const { logoutThunk } = userSlice.actions

export default userSlice.reducer
