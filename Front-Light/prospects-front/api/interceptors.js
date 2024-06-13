// import { authApi } from "./auth.api"
import Router from "next/router"

const onRequest = async (config) => {
  return config
}

const onRequestError = (error) => {
  return Promise.reject(error)
}

const onResponse = (response) => {
  return response
}

const onResponseError = async (error) => {
  try {
    if (error.response?.status === 401) {
      Router.push("/")
    }
  } catch (error) {
    console.log("Error: ", error)
    Router.push("/")
  }

  return Promise.reject(error)
}

export const setupInterceptorsTo = (axiosInstance) => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError)
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
  return axiosInstance
}
