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
} from '@mui/material'

//Components
import { useFormik } from 'formik'
//API

//Resource
import Snack from '@snack'

const ProspectsAdd = () => {
  const [cancel, setCancel] = useState([])
  const [value, setValue] = useState(0)
  const [document, setDocument] = useState([])
  const [filteredDocuments, setFilteredDocuments] = useState([])
  const [showModalConfirm, setShowModalConfirm] = useState(false)

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
              disabled ={loadStatus}
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
              disabled ={loadStatus}
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
              disabled ={loadStatus}
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
              disabled ={loadStatus}
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
              disabled ={loadStatus}
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
              disabled ={loadStatus}
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
              disabled ={loadStatus}
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
              disabled ={loadStatus}
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
