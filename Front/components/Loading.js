import React from 'react'
import PropTypes from 'prop-types'
import {
  CircularProgress,
  Dialog,
  DialogContent,
  Typography,
} from '@mui/material'

const Loading = ({ showModal, handleShowModal }) => {
  return (
    <Dialog open={showModal} onClose={handleShowModal}>
      <DialogContent sx={{ width: '200px', textAlign: 'center' }}>
        <CircularProgress />
        <Typography>Cargando...</Typography>
      </DialogContent>
    </Dialog>
  )
}

Loading.propTypes = {
  showModal: PropTypes.bool,
  handleShowModal: PropTypes.func,
}

export default Loading
