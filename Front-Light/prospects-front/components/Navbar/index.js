import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { Avatar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import { RootContainer } from './styledComponents'
import ModalConfirm from '@components/ModalConfirm'
import { useModule } from '@hooks/useModule'


const Navbar = () => {
  const [showModalConfirm, setShowModalConfirm] = useState(false)
  const [initials, setInitials] = useState('')
  const { moduleName, clean } = useModule()


  useEffect(() => {
    getInitials()
    if (initials !== '') {
      renderAvatar()
    }
  }, [initials])

  const getInitials = () => {
    const temp = name.split(' ')
    let _initials
    if (temp.length > 0) {
      _initials = temp[0].substring(0, 1)
      if (temp.length > 1) {
        _initials += temp[1].substring(0, 1)
      }
    }
    setInitials(_initials)
  }

  const handleShowModalConfirm = () => {
    setShowModalConfirm(!showModalConfirm)
  }

  const handleConfirmLogOut = async () => {
    handleShowModalConfirm()
    clean()
  }

  const renderAvatar = () => {
    return (
      <Avatar sx={{ bgcolor: '#243B7A', width: 35, height: 35, fontSize: '18px' }}>
      </Avatar>)
  }

  return (
    <RootContainer position="fixed">
      <Toolbar position="fixed" xs={1}>
        <Typography variant='h5' sx={{ flexGrow: 1, marginLeft: '150px' }}>Prospeción Web</Typography>
        <Grid item>
          {
            (
              <div
                style={{
                  width: '100%',
                  textAlign: 'right',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div style={{ marginRight: '12px' }}>
                  {renderAvatar()}
                </div>
                <div>
                  <div>
                    <Typography variant="navbar" textAlign="right">
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      sx={{ textAlign: 'left', color: '#253E8B', fontSize: 14 }}
                      variant="body1"
                      textAlign="right"
                    >
                    </Typography>
                  </div>
                </div>
                <div style={{ marginLeft: '24px' }}>
                  <IconButton onClick={handleShowModalConfirm}>
                    <img
                      src={`${window.location.origin}/icons/logout.svg`}
                      alt="icon"
                    />
                  </IconButton>
                </div>
              </div>
            )
          }
        </Grid>
      </Toolbar>
      <ModalConfirm
        showModal={showModalConfirm}
        handleClose={handleShowModalConfirm}
        handleConfirm={handleConfirmLogOut}
        onCancel={handleShowModalConfirm}
        title={'Cerrar sesión'}
        description={'¿Está seguro que desea cerrar sesión?'}
        cancelButton={'Cancelar'}
        confirmButton={'Aceptar'}
      />
    </RootContainer>
  )
}
Navbar.propTypes = {}

export default Navbar
