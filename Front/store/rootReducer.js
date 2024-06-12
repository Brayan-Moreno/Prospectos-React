import { combineReducers } from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'
import moduleReducer from '../slices/moduleSlice'
import loadingReducer from '../slices/loadingSlice'
import fingerReaderReducer from '../slices/fingerReaderSlice'

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  fingerReader:fingerReaderReducer,
  module: moduleReducer
})

export default rootReducer
