import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  DialogActions,
  TextField
} from '@mui/material'

const ModalConfirm = ({
  showModal,
  handleClose,
  onCancel,
  handleConfirm,
  title,
  description,
  cancelButton,
  confirmButton,
  withComment
}) => {
  const [comment, setComment] = useState('')
  const [errors, setErrors] = useState({ error: false, message: '' })

  const confirm = () => {
    if (withComment) {
      if (comment === '') {
        const error = { error: true, message: 'Debe ingresar una observación' }
        setErrors(error)
        return
      }
      setComment('')
      setErrors({ error: false, message: '' })
      handleConfirm(comment)
    } else {
      handleConfirm()
    }
  }

  return (
    <Dialog
      open={showModal}
      onClose={handleClose ? handleClose : onCancel}
      onBackdropClick={handleClose ? handleClose : onCancel}
      onEscapeKeyDown={handleClose ? handleClose : onCancel}
    >
      <DialogTitle style={{ textAlign: 'center' }}>{title}</DialogTitle>
      <DialogContent>
        <Typography
          variant="body1"
          align="center"
        >
          {description}
        </Typography>
        {
          withComment && (
            <TextField
              autoFocus
              fullWidth
              variant="outlined"
              label="Observación"
              sx={{
                marginTop: '12px',
                '>.MuiInputBase-root': {
                  borderRadius: '10px',
                }
              }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              error={errors.error}
              helperText={errors.message}
            />
          )
        }
      </DialogContent>
      <DialogActions>
        <Button fullWidth onClick={onCancel} variant="secondary">
          {cancelButton}
        </Button>
        <Button fullWidth onClick={confirm} variant='primary'>
          {confirmButton}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ModalConfirm.propTypes = {
  showModal: PropTypes.bool,
  handleShowModal: PropTypes.func,
  message: PropTypes.string,
  handleConfirm: PropTypes.func,
}

export default ModalConfirm
