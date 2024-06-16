import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
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
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Table,
  Paper,
} from '@mui/material'

import VisibilityIcon from '@mui/icons-material/Visibility'

import {
  VisuallyHiddenInput,
  VisuallyFile,
} from '@components/FileUploader/styledComponents'

import { useFormik } from 'formik'
import { useLoading } from '@hooks/useLoading'
import Snack from '@snack'

import { Close } from '@mui/icons-material'
import { prospectsApi } from 'api/prospects/prospects.api'

const ModalProspects = ({ showModal, handleShowModal, idProspect }) => {
  const [pipelines, setPipelines] = useState([])
  const [selectedPipeline, setSelectedPipeline] = useState(null)
  const [disabledInputs, setDisabledInputs] = useState(true)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const { open, close, isLoading } = useLoading()

  useEffect(() => {
    getCtlStatus(), getDocumentsFiles(idProspect), loadProspectData(idProspect)
  }, [showModal])

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
    validationSchema: Yup.object({
      name: Yup.string().required('El nombre es requerido'),
      firstLastName: Yup.string().required('El apellido paterno es requerido.'),
      phone: Yup.number().min(10),
    }),
    onSubmit: async (values, helpers) => {
      await updateStatus(values)
    },
  })

  const handleCloseModal = async () => {
    formik.resetForm()
    setPipelines([])
    setUploadedFiles([])
    setSelectedPipeline(null)
    await handleShowModal()
  }

  const getCtlStatus = async () => {
    try {
      const response = await prospectsApi.getCtlStatus()
      if (!response.success) {
        Snack.error(
          response.message ?? 'A ocurrido un error en la consulta de datos'
        )
      } else {
        const list = [...response.data]
        if (list.length > 0) {
          setPipelines(list)
        }
      }
    } catch (error) {
      Snack.error(error.message)
    }
  }

  const getDocumentsFiles = async (id) => {
    try {
      if (id && id !== 0 && uploadedFiles.length <= 0) {
        const response = await prospectsApi.getDocuments(id)
        if (!response.success) {
          Snack.error(response.message)
        } else {
          let list = [...response.data]

          list = list.map((x) => {
            return {
              ...x,
              id: x.idFileType,
              type: x.fileType,
            }
          })
          setUploadedFiles(list)
        }
      }
    } catch (error) {
      Snack.error(error.message)
    }
  }

  const loadProspectData = async (id) => {
    try {
      if (id && id !== 0) {
        const response = await prospectsApi.getProspect(id)
        if (!response.success) {
          Snack.error(response.message)
        } else {
          if (response.data) {
            const prospectData = response.data[0]
            formik.setValues({
              ...formik.values,
              name: prospectData?.name,
              firstLastName: prospectData?.firstLastName,
              secondLastName: prospectData?.secondLastName,
              street: prospectData?.street,
              streetNumber: prospectData?.streetNumber,
              colony: prospectData?.colony,
              zipCode: prospectData?.zipCode,
              phone: prospectData?.phone,
              rfc: prospectData?.rfc,
              pipeline: prospectData?.pipeline,
              observations: prospectData?.observations,
            })

            setSelectedPipeline(prospectData?.idPipeline)
          }
        }
      }
    } catch (error) {
      Snack.error(error.message)
    }
  }

  const updateStatus = async (values) => {
    try {
      if (
        selectedPipeline === 3 &&
        values.observations === ''
      ) {
        Snack.error('Debe especificar una razón para cancelar al prospecto')
      } else {
        const body = {
          prospectId: idProspect,
          statusId: selectedPipeline,
          observations: values.observations,
        }
        const response = await prospectsApi.updateStatus(body)
        if (!response.success) {
          Snack.error(response.message)
        } else {
          Snack.success(response.message)
          handleCloseModal()
        }
      }
    } catch (error) {
      Snack.error(error.message)
    }
  }

  const renderInput = (reg) => {
    return (
      <>
        <Button
          component="label"
          startIcon={<VisibilityIcon />}
          target="_blank"
        >
          <VisuallyFile onClick={() => renderOpenFile(reg)} />
        </Button>
      </>
    )
  }

  const renderOpenFile = (file) => {
    var pdfData = file.data
    var w = window.open('')
    if (w) {
      w.document.write(
        `<embed width="100%" height="100%" src="${pdfData}" type=${file.type} />`
      )
    }
  }

  const renderCells = (reg) => {
    const arreglo = []
    // Verifica si el objeto tiene la propiedad 'fileName'
    if (reg.hasOwnProperty('name')) {
      // Agrega la celda al arreglo utilizando JSX (React)
      arreglo.push(<TableCell key={reg.name}>{reg.name}</TableCell>)
    }
    return arreglo
  }

  const handleChangeStatus = (reg) => {
    setSelectedPipeline(reg)
  }

  return (
    <Dialog
      open={showModal}
      onClose={handleCloseModal}
      fullWidth
      maxWidth={'md'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DialogTitle>Gestión de Prospecto</DialogTitle>
        <IconButton
          onClick={handleCloseModal}
          sx={{ width: '60px', height: '60px' }}
        >
          <Close />
        </IconButton>
      </div>
      <DialogContent sx={{ padding: '15px 15px' }}>
        <Grid container spacing={2} p={0.5}>
          <Grid item container spacing={2} style={{ justifyContent: 'right' }}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth variant="outlined" size="small">
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
                        src={`${window.location.origin}/icons/status.svg`}
                        style={{ width: '18px' }}
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

              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Código Postal"
                  size="small"
                  variant="outlined"
                  name="zipCode"
                  disabled
                  value={formik.values.zipCode}
                  onChange={formik.handleChange}
                  error={Boolean(
                    formik.touched.zipCode && formik.errors.zipCode
                  )}
                  helperText={formik.touched.zipCode && formik.errors.zipCode}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Colonia"
                  size="small"
                  variant="outlined"
                  name="colony"
                  disabled
                  value={formik.values.colony}
                  onChange={formik.handleChange}
                  error={Boolean(formik.touched.colony && formik.errors.colony)}
                  helperText={formik.touched.colony && formik.errors.colony}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Calle"
                  size="small"
                  variant="outlined"
                  name="street"
                  disabled
                  value={formik.values.street}
                  onChange={formik.handleChange}
                  error={Boolean(formik.touched.street && formik.errors.street)}
                  helperText={formik.touched.street && formik.errors.street}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Numero Exterior"
                  size="small"
                  variant="outlined"
                  name="streetNumber"
                  disabled
                  value={formik.values.streetNumber}
                  onChange={formik.handleChange}
                  error={Boolean(
                    formik.touched.streetNumber && formik.errors.streetNumber
                  )}
                  helperText={
                    formik.touched.streetNumber && formik.errors.streetNumber
                  }
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="h7" color="primary">
                  Documentos
                </Typography>
              </Grid>
              <Box sx={{ width: '100%' }}>
                <>
                  <Grid container xs={12} justifyContent={'end'}></Grid>
                  <TableContainer
                    component={Paper}
                    sx={{ borderRadius: '16px', marginTop: 'auto' }}
                  >
                    <Table sx={{ minWidth: '450px' }} size="small">
                      <TableHead
                        sx={{
                          backgroundColor: '#F4F5F7',
                          height: '20px',
                          width: '100%',
                        }}
                      ></TableHead>
                      <TableBody>
                        {uploadedFiles.map((reg, i) => (
                          <TableRow key={reg.id}>
                            {renderCells(reg)}
                            {
                              <TableCell align="right">
                                {renderInput(reg)}
                              </TableCell>
                            }
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <div style={{ textAlign: 'right' }}></div>
                </>
              </Box>
              {selectedPipeline === 3 && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    maxRows={3}
                    label="Observaciones"
                    name="observations"
                    value={formik.values.observations}
                    onChange={formik.handleChange}
                    error={Boolean(
                      formik.touched.observations && formik.errors.observations
                    )}
                    helperText={
                      formik.touched.observations && formik.errors.observations
                    }
                  ></TextField>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="primary" onClick={formik.submitForm}>
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
