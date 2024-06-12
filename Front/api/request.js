import axios from 'axios'
import { Utils } from '@utils'
import { setupInterceptorsTo } from './interceptors'

export const api = async (request) => {
  try {
    const data = request.data ?? {}
    const filters = request.filters ? request.filters : ''
    const endpoint = request.endpoint || ''
    const token = localStorage.getItem('accessToken')
    const url = process.env.CONFIG_ENV.URL_BACKEND + endpoint + filters
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token,
      ...request.headers,
    }

    const options = {
      method: request.method,
      url,
      data,
      headers,
    }

    const apiInstance = setupInterceptorsTo(axios.create())
    const response = await apiInstance(options)
    return response.data
  } catch (err) {
    // ENV === 'dev' && console.log('err: ', err)
    const error = Utils.cloneJson(err.response.data)

    return error
  }
}

export const creditApi = async (request) => {
  try {
    const data = request.data ?? {}
    const filters = request.filters ? request.filters : ''
    const endpoint = request.endpoint || ''
    const token = localStorage.getItem('accessToken')
    const url = process.env.CONFIG_ENV.URL_CREDIT + endpoint + filters
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token,
      ...request.headers,
    }

    const options = {
      method: request.method,
      url,
      data,
      headers,
    }

    const apiInstance = setupInterceptorsTo(axios.create())
    const response = await apiInstance(options)
    return response.data
  } catch (err) {
    // ENV === 'dev' && console.log('err: ', err)
    const error = Utils.cloneJson(err.response.data)

    return error
  }
}
