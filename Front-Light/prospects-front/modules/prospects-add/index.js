import React, { useState } from 'react'
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

import { VisuallyHiddenInput, VisuallyFile } from '@components/FileUploader/styledComponents'

import AddCircleIcon from '@mui/icons-material/AddCircle'

//Components
import { useFormik } from 'formik'
//API
import { prospectsApi } from 'api/prospects/prospects.api'
//Resource
import Snack from '@snack'

const ProspectsAdd = () => {
  const [cancel, setCancel] = useState([])
  const [value, setValue] = useState(0)
  const [documents, setDocuments] = useState([])
  const [filteredDocuments, setFilteredDocuments] = useState([])
  const [showModalConfirm, setShowModalConfirm] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [loadedList, setLoadedList] = useState(false)

  const router = useRouter()
  const { id } = router.query

  const loadStatus = id && id !== 0 ? true : false

  const listDocuments = [
    {
      id: 1,
      description: 'Selfie',
    },
    {
      id: 2,
      description: 'Ine',
    },
    {
      id: 3,
      description: 'Domicilio',
    },
  ]

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
      observations: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('El nombre es requerido'),
      firstLastName: Yup.string().required('El apellido paterno es requerido.'),
      phone: Yup.number().min(10),
    }),
    // onSubmit: async (values, helpers) = {

    // },
  })

  const setProspect = async (values) => {
    open()
    try {
    } catch (error) {
      Snack.error(error.message)
    }
    close()
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

  const handleReturn = () => {
    handleShowModalConfirm()
    formik.resetForm()
    router.back()
  }

  const handleShowModalConfirm = async () => {
    setShowModalConfirm(!showModalConfirm)
  }

  const recoverFiles = (files) => {
    let filesList = [...files]
    setDocuments(filesList)
  }


  const handleFileChange = async (e) => {
    const reader = new FileReader()
    let file = e.target.files[0]
    const { id, name } = e.target

    const maxSize = 5 * 1024 * 1024

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']

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
      file = {
        data,
        idTypeDocument: Number(id),
        fileName: file.name,
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
            <VisuallyFile
              onClick={() => renderOpenFile(reg)}
            />
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
      if (reg.hasOwnProperty('fileName')) {
        // Agrega la celda al arreglo utilizando JSX (React)
        arreglo.push(
          <TableCell key={reg.fileName}>
            {reg.fileName} {/* Mostrar el nombre del archivo u otro contenido */}
          </TableCell>
        );
      }
    return arreglo
  }

  let fileUploaderComponent = null
  fileUploaderComponent = (
    <>
      <CustomTabPanel value={value} index={0}>
        <FileUploader
          headers={['Adjuntar archivos']}
          list={listDocuments}
          recoverFiles={recoverFiles}
        />
      </CustomTabPanel>
    </>
  )

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
              disabled={loadStatus}
              value={formik.values.zipCode}
              onChange={formik.handleChange}
              error={Boolean(formik.touched.zipCode && formik.errors.zipCode)}
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
              disabled={loadStatus}
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
              disabled={loadStatus}
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

          <Box sx={{ width: '100%' }}>
            <>
              <Grid container xs={12} justifyContent={'end'}>
                <Button component="label" startIcon={<AddCircleIcon />}>
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => handleFileChange(e)}
                    accept=".pdf, .doc, .docx, .txt, .jpg, .jpeg, .png"
                  />
                </Button>
              </Grid>
              <TableContainer
                component={Paper}
                sx={{ borderRadius: '16px', marginTop: 'auto' }}
              >
                <Table sx={{ minWidth: '450px' }} size="small">
                  <TableHead
                    sx={{
                      backgroundColor: '#F4F5F7',
                      height: '40px',
                      width: '100%',
                    }}
                  ></TableHead>
                  <TableBody>
                    {uploadedFiles.map((reg, i) => (
                      <TableRow key={reg.id}>
                        {renderCells(reg)}
                        {(
                          <TableCell align="right">
                            {renderInput(reg)}
                          </TableCell>
                        )}
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
