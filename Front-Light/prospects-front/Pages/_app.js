import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../store'
import { SnackbarProvider } from 'notistack'
import { SnackbarUtilsConfigurator } from '../resources/Utils/snack'
import CssBaseline from '@mui/material/CssBaseline'
import MainLayout from '@modules/layout/MainLayout'
import ThemeProviderWrapper from '../themes/ThemeProvider'
import 'nprogress/nprogress.css'

NProgress.configure({
  minimum: 0.5,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
})

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export const _app = (props) => {
  const { Component, pageProps } = props

  return (
    <>
      <Head>
        <title>Prospección Web</title>
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="./icons/logo-calzzapato.svg"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProviderWrapper>
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <CssBaseline />
              <MainLayout>
                <SnackbarUtilsConfigurator />
                <Component {...pageProps} />
              </MainLayout>
            </SnackbarProvider>
          </ThemeProviderWrapper>
        </PersistGate>
      </Provider>
    </>
  )
}

_app.getInitialProps = async (props) => {
  let obj = {}

  try {
    obj = { notFound: false }
  } catch (err) {
    obj = { notFound: true }
  }

  return obj
}

export default _app
