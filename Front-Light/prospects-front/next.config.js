/** @type {import('next').NextConfig} */
const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
  } = require('next/constants')
  
  module.exports = (phase) => {
    const isDev = phase === PHASE_DEVELOPMENT_SERVER
    const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
    const isStaging =
      phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'
    const env = {
      CONFIG_ENV: (() => {
        if (isDev)
          return {
            APP_MODE: 'dev',
            URL_BACKEND: 'http://localhost:3001/api',
            NEXT_PUBLIC_URL_BACKEND: 'http://localhost:3001/api',
          }
        if (isStaging)
          return {
            APP_MODE: 'staging',
            URL_BACKEND: 'http://localhost:3001/api',
          }
        if (isProd)
          return {
            APP_MODE: 'production',
            URL_BACKEND: '',
          }
      })(),
    }
    console.log(`isDev:${isDev} - isProd:${isProd} - isStage:${isStaging}`)
    return {
      env,
      reactStrictMode: true,
      swcMinify: true,
      optimizeFonts: false,
    }
  }
  