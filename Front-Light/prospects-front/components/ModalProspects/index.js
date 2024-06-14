import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  DialogActions,
  FormControl,
  MenuItem,
  InputLabel,
  IconButton,
  Typography,
  InputAdornment,
  Select,
  TextField,
  Box,
} from '@mui/material'

import { useFormik } from 'formik'
import { useLoading } from '@hooks/useLoading'
import FileUploader from '@components/FileUploader/FileUploader'
import Snack from '@snack'

import { Close } from '@mui/icons-material'

const ModalProspects = ({ showModal, handleShowModal, idProspect }) => {
  const [pipelines, setPipelines] = useState([])
  const [selectedPipeline, setSelectedPipeline] = useState([])
  const [disabledInputs, setDisabledInputs] = useState(true)
  const [value, setValue] = useState(0)
  const { open, close, isLoading } = useLoading()

  const formik = useFormik({
    initialValues: {
      id: idProspect && idProspect !== 0 ? idProspect : null,
      name: '',
      firsLastName: '',
      secondLastName: '',
      street: '',
      streetNumber: '',
      colony: '',
      zipCode: '',
      phone: '',
      rfc: '',
      observations: '',
    },
    // onSubmit: async (values, helpers) = {
    //Guardado de estatus
    // },
  })

  const listDocuments = [
    {
        id: 1,
        description: "Selfie"
    },
    {
        id: 2,
        description: "Ine"
    },
    {
        id: 3,
        description: "Domicilio"
    }
  ]

  const handleCloseModal = () => {
    handleShowModal()
    formik.resetForm()
    setPipelines([])
    setSelectedPipeline(null)
  }

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    )
  }

  const handleChange = async (idFiles) => {
    const files = idFiles.map((f) => {
      return {
        id: formik.values.id,
      }
    })
    // const response = await workApplicationApi.createDocumentation(files)
    // if (response.success) {
    //   Snack.success('Se guardó con éxito')
    //   setFilesUploaded(true)
    // } else {
    //   Snack.error(response.message)
    // }
  }

  const handleUploadSuccess = () => {
    setFilesUploaded(true)
  }

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    )
  }

  let fileUploaderComponent = null
  fileUploaderComponent = (
    <>
      <CustomTabPanel value={value} index={0}>
        <FileUploader
          headers={['Adjuntar archivos']}
          list={listDocuments}
          handleChange={handleChange}
          handleUploadSuccess={handleUploadSuccess}
        />
      </CustomTabPanel>
    </>
  )

  return (
    <Dialog
      open={showModal}
      onClose={handleCloseModal}
      fullWidth
      maxWidth={'md'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DialogTitle>Gestión de Prospecto</DialogTitle>
        <IconButton onClick={handleCloseModal} sx={{ width: '60px' }}>
          <Close />
        </IconButton>
      </div>
      <DialogContent sx={{ padding: '15px 15px' }}>
        <Grid container spacing={2} p={0.5}>
          <Grid item container spacing={2} style={{ justifyContent: 'right' }}>
            <Grid item xs={12} md={3}>
              <FormControl
                fullWidth
                variant="outlined"
                size="small"
                disabled={isLoading || disabledInputs}
              >
                <InputLabel id="statusLabel">Estatus</InputLabel>
                <Select
                  labelId="statusLabel"
                  label="Estatus"
                  placeholder="Seleccione un estatus de prospecto"
                  value={selectedPipeline}
                  Name="idPospectStatus"
                  onChange={(event) => handleChangeStatus(event.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <img
                        src={`${window.location.origin}/icons/point.svg`}
                        style={{ width: '12px' }}
                      />
                    </InputAdornment>
                  }
                >
                  {pipelines.map((reg) => (
                    <MenuItem key={reg.id} value={reg.id}>
                      {reg.description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              container
              xs={12}
              justifyContent={'start'}
              sx={{ margin: 2 }}
              spacing={2}
            >
              <Grid item xs={12} md={12}>
                <Typography variant="h7" color="primary">
                  Interesado
                </Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <TextField
                  fullWidth
                  label="Nombre(s)"
                  size="small"
                  variant="outlined"
                  name="name"
                  disabled={isLoading || disabledInputs}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={Boolean(formik.touched.name && formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={4} md={4}>
                <TextField
                  fullWidth
                  label="Apellido paterno"
                  size="small"
                  variant="outlined"
                  name="firstLastName"
                  disabled={isLoading || disabledInputs}
                  value={formik.values.firstLastName}
                  onChange={formik.handleChange}
                  error={Boolean(
                    formik.touched.firstLastName && formik.errors.firstLastName
                  )}
                  helperText={
                    formik.touched.firstLastName && formik.errors.firstLastName
                  }
                />
              </Grid>
              <Grid item xs={4} md={4}>
                <TextField
                  fullWidth
                  label="Apellido materno"
                  size="small"
                  variant="outlined"
                  name="secondLastName"
                  disabled={isLoading || disabledInputs}
                  value={formik.values.secondLastName}
                  onChange={formik.handleChange}
                  error={Boolean(
                    formik.touched.secondLastName &&
                      formik.errors.secondLastName
                  )}
                  helperText={
                    formik.touched.secondLastName &&
                    formik.errors.secondLastName
                  }
                />
              </Grid>
              <Grid item xs={4} md={4}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  size="small"
                  variant="outlined"
                  name="phone"
                  disabled={isLoading || disabledInputs}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={Boolean(formik.touched.phone && formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>
              <Grid item xs={4} md={4}>
                <TextField
                  fullWidth
                  label="RFC"
                  size="small"
                  variant="outlined"
                  name="rfc"
                  disabled={isLoading || disabledInputs}
                  value={formik.values.rfc}
                  onChange={formik.handleChange}
                  error={Boolean(formik.touched.rfc && formik.errors.rfc)}
                  helperText={formik.touched.rfc && formik.errors.rfc}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="h7" color="primary">
                  Domicilio
                </Typography>
              </Grid>

              <Grid item xs={4} md={4}>
                <TextField
                  fullWidth
                  label="Código Postal"
                  size="small"
                  variant="outlined"
                  name="zipCode"
                  disabled={isLoading || disabledInputs}
                  value={formik.values.zipCode}
                  onChange={formik.handleChange}
                  error={Boolean(
                    formik.touched.zipCode && formik.errors.zipCode
                  )}
                  helperText={formik.touched.zipCode && formik.errors.zipCode}
                />
              </Grid>
              <Grid item xs={4} md={4}>
                <TextField
                  fullWidth
                  label="Colonia"
                  size="small"
                  variant="outlined"
                  name="colony"
                  disabled={isLoading || disabledInputs}
                  value={formik.values.colony}
                  onChange={formik.handleChange}
                  error={Boolean(formik.touched.colony && formik.errors.colony)}
                  helperText={formik.touched.colony && formik.errors.colony}
                />
              </Grid>
              <Grid item xs={4} md={4}>
                <TextField
                  fullWidth
                  label="Calle"
                  size="small"
                  variant="outlined"
                  name="street"
                  disabled={isLoading || disabledInputs}
                  value={formik.values.street}
                  onChange={formik.handleChange}
                  error={Boolean(formik.touched.street && formik.errors.street)}
                  helperText={formik.touched.street && formik.errors.street}
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <Typography variant="h7" color="primary">
                  Documentos
                </Typography>
              </Grid>
              <Box sx={{ width: '100%' }}>{fileUploaderComponent}</Box>
              <Grid container mt={2} justifyContent={'right'}>
                <Grid item xs={2}></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button fullWidth variant="primary" onClick={formik.submitForm}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ModalProspects.PropTypes = {
  showModal: PropTypes.bool,
  handleShowModal: PropTypes.func,
  idProspect: PropTypes.number,
}

export default ModalProspects
