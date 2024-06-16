import { combineReducers } from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'
import moduleReducer from '../slices/moduleSlice'
import loadingReducer from '../slices/loadingSlice'

const rootReducer = combineReducers({
  loading: loadingReducer,
  module: moduleReducer
})

export default rootReducer
