import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { useRouter } from 'next/router'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import * as Yup from 'yup'

import ModalConfirm from '@components/ModalConfirm'
import FileUploader from '@components/FileUploader/FileUploader'

//Material UI
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Typography,
  TextField,
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
import AddCircleIcon from '@mui/icons-material/AddCircle'

//Components
import { useFormik } from 'formik'
//API
import { prospectsApi } from 'api/prospects/prospects.api'
//Resource
import Snack from '@snack'

const ProspectsAdd = () => {
  const [ctlDocuments, setCtlDocuments] = useState([])
  const [showModalConfirm, setShowModalConfirm] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [canceledProspect, setCanceledProspect] = useState(false)
  const [loadedList, setLoadedList] = useState(false)

  const router = useRouter()
  const { id } = router.query
  const loadStatus = id && id !== 0 ? true : false

  useEffect(() => {
    getCtlDocuments()
  }, [])

  useEffect(() =>{
    if(loadStatus){
      getDocumentsFiles(id),
      loadProspectData(id)
    }
  }, [id, loadStatus])


  const formik = useFormik({
    initialValues: {
      id: id && id !== 0 ? id : null,
      name: '',
      firstLastName: '',
      secondLastName: '',
      street: '',
      streetNumber: '',
      colony: '',
      zipCode: '',
      phone: '',
      rfc: '',
      pipeline: '',
      observations: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('El nombre es requerido'),
      firstLastName: Yup.string().required('El apellido paterno es requerido.'),
      phone: Yup.number().min(10),
    }),
    onSubmit: async (values, helpers) => {
      try {
        let files = []
        if (uploadedFiles.length > 0) {
          files = uploadedFiles.map((x) => {
            return {
              id: x.id,
              name: x.name,
              data: x.data,
            }
          })
        }
        const body = { ...values, files }
        const response = await prospectsApi.createProspect(body)

        if (!response.success) {
          Snack.error(response.message)
        } else {
          Snack.success(response.message)
          formik.resetForm()
          setUploadedFiles([])
        }
      } catch (error) {
        Snack.error(error.message)
      }
    },
  })

  const loadProspectData = async (id) =>{
    try {
      
      if(id && id !== 0){
        const response = await prospectsApi.getProspect(id)
        if (!response.success)
          {
            Snack.error(response.message)
          }
        else{
          if(response.data){
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
              observations: prospectData?.observations
            })

            if(prospectData?.idPipeline === 3){
              setCanceledProspect(true)
            }
          }

         
        }
      }
    } catch (error) {
      Snack.error(error.message)
    }
  }

  const getCtlDocuments = async () => {
    try {
      const response = await prospectsApi.getCtlDocuments()

      if (!response.success) {
        Snack.error(
          response.message ?? 'A ocurrido un error en la consulta de datos'
        )
      } else {
        const list = [...response.data]
        if (list.length > 0) {
          setCtlDocuments(list)
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

  const handleReturn = () => {
    handleShowModalConfirm()
    formik.resetForm()
    router.back()
  }

  const handleShowModalConfirm = async () => {
    if(!loadStatus){
      setShowModalConfirm(!showModalConfirm)
    }
    else{
      formik.resetForm()
      setUploadedFiles([])
      router.back()
    }
  }

  const handleFileChange = async (e) => {
    const reader = new FileReader()
    let file = e.target.files[0]
    const { id, name } = e.target

    const maxSize = 5 * 1024 * 1024

    const allowedFileTypes = [...ctlDocuments]
    const allowedTypes = allowedFileTypes.map((x) => x.extension)

    if (!file) {
      return
    }

    if (!allowedTypes.includes(file.type)) {
      return
    }

    if (file.size > maxSize) {
      e.target.value = ''
      return
    }

    reader.onloadend = (e) => {
      const data = e.target.result
      const inx = allowedTypes.indexOf(file.type)

      file = {
        data,
        id: allowedFileTypes[inx].id,
        name: file.name,
        type: file.type,
      }
      const list = [...uploadedFiles, file]
      setUploadedFiles(list)
      setLoadedList(!loadedList)
    }

    reader.readAsDataURL(file)
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

  return (
    <Grid container justifyContent={'space-between'} spacing={2}>
      <Grid item xs={12} sm={4}>
        <Button
          sx={{ textTransform: 'none' }}
          color="primary"
          onClick={handleShowModalConfirm}
        >
          <KeyboardArrowLeftIcon /> Regresar
        </Button>
      </Grid>
      <form onSubmit={formik.handleSubmit}>
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
              disabled={loadStatus}
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
              disabled={loadStatus}
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
              disabled={loadStatus}
              value={formik.values.secondLastName}
              onChange={formik.handleChange}
              error={Boolean(
                formik.touched.secondLastName && formik.errors.secondLastName
              )}
              helperText={
                formik.touched.secondLastName && formik.errors.secondLastName
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
              disabled={loadStatus}
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
              disabled={loadStatus}
              value={formik.values.rfc}
              onChange={formik.handleChange}
              error={Boolean(formik.touched.rfc && formik.errors.rfc)}
              helperText={formik.touched.rfc && formik.errors.rfc}
            />
          </Grid>
          {loadStatus && (
            <Grid item xs={4} md={4}>
            <TextField
              fullWidth
              label="Status"
              size="small"
              variant="outlined"
              name="Estatus"
              disabled={loadStatus}
              value={formik.values.pipeline}
              onChange={formik.handleChange}
              error={Boolean(formik.touched.pipeline && formik.errors.pipeline)}
              helperText={formik.touched.pipeline && formik.errors.pipeline}
            />
          </Grid>
          )}
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
              disabled={loadStatus}
              value={formik.values.zipCode}
              onChange={formik.handleChange}
              error={Boolean(formik.touched.zipCode && formik.errors.zipCode)}
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
              disabled={loadStatus}
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
              disabled={loadStatus}
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
              disabled={loadStatus}
              value={formik.values.streetNumber}
              onChange={formik.handleChange}
              error={Boolean(formik.touched.streetNumber && formik.errors.streetNumber)}
              helperText={formik.touched.streetNumber && formik.errors.streetNumber}
            />
          </Grid>
          {canceledProspect && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    maxRows={3}
                    label="Observaciones"
                    name="observations"
                    disabled
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
          <Grid item xs={12} md={12}>
            <Typography variant="h7" color="primary">
              Documentos
            </Typography>
          </Grid>

          <Box sx={{ width: '100%' }}>
            <>
              <Grid container xs={12} justifyContent={'end'}>
                {!loadStatus && (
                  <Button component="label" startIcon={<AddCircleIcon />}>
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => handleFileChange(e)}
                    accept=".pdf, .doc, .docx, .txt, .jpg, .jpeg, .png"
                  />
                </Button>
                )}
              </Grid>
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
          {!loadStatus && (
            <Grid container mt={2} justifyContent={'right'}>
              <Grid item xs={2}>
                <Button fullWidth variant="primary" onClick={formik.submitForm}>
                  Guardar
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </form>
      <ModalConfirm
        showModal={showModalConfirm}
        handleClose={handleShowModalConfirm}
        handleConfirm={handleReturn}
        onCancel={handleShowModalConfirm}
        title={'Cancelar Alta'}
        description={
          '¿Está seguro de regresar y perder la información capturada?'
        }
        cancelButton={'Cancelar'}
        confirmButton={'Aceptar'}
      />
    </Grid>
  )
}

export default ProspectsAdd
