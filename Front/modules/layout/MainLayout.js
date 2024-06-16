import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'

// Material UI
import { Box, useTheme } from '@mui/material'

// Components
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'
import Menu from '@components/Menu'
import Loading from '@components/Loading'


// Hooks
import { useLoading } from '@hooks/useLoading'


const MainLayout = ({ classes, ...props }) => {
  const theme = useTheme()
  //const auth = useAuth()
  const { isLoading, close } = useLoading()
  //const { fingerReader, close: closeFingerReader } = useFingerReader()

  // useEffect(() => {
  //   if (auth.isLogged) {
  //     auth.me()
  //   }
  // }, [])

  return (
    <Fragment>
      <Box sx={theme.root}>
        <Navbar />

        {auth.isLogged ? (
          <Box sx={{ display: 'flex' }}>
            <Box component="nav">
              <Menu />
            </Box>
            <Box component='main' sx={{ flexGrow: 1 }}>
              <Box sx={theme.main}>{props.children}</Box>
              <Footer />
            </Box>
          </Box>
        ) : (
          <Box sx={theme.main}>{props.children}</Box>
        )}
      </Box>

      <Loading showModal={isLoading} handleShowModal={() => close()} />

      <FingerReader showModal={fingerReader.open} handleShowModal={() => closeFingerReader()} />
    </Fragment>
  )
}

MainLayout.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node,
}

export default MainLayout
