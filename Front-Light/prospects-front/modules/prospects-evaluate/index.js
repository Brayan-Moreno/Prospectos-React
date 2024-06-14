import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useRouter } from 'next/router'

import { useLoading } from '@hooks/useLoading'

import FileUploader from '@components/FileUploader/FileUploader'

import * as Yup from 'yup'

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
  FormControl,
  TextField,
  Autocomplete,
  InputAdornment,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  Pagination,
  IconButton,
} from '@mui/material'

import ModalProspects from '@components/ModalProspects'

const ProspectsEvaluation = () => {
  const [prospects, setProspects] = useState([])
  const [selectedProspect, setSelectedProspect] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  
  const [anchorEl, setAnchorEl] = useState(null)

  const { open, close, isLoading } = useLoading()

  const openMenu = Boolean(anchorEl)
  const router = useRouter()
  const headers = ['Nombre', 'Apellido Paterno', 'Apellido Materno', 'Estatus']


 

  const handleChangePage = async (_, value) => {
    setPage(value)
    //Se hace consulta a la api para actualizar la información
  }

  const handleClick = (event, id) => {
    setSelectedIndex(id)
    setAnchorEl(event.target)
  }

  const handleShowModal = async () => {
    setSelectedIndex(selectedIndex)
    setShowModal(!showModal)
    if (showModal === true) {
      // Se consulta la api para actualizar la tabla
    }
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

  const renderActions = () => {
    const idx = prospects.findIndex((m) => m.id === selectedIndex)
    if (idx !== -1) {
      return (
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
          PaperProps={{
            style: {
              width: '20ch',
              boxShadow: '0px 1px 0px 1px gray',
            },
          }}
        >
          <MenuItem onClick={handleDetail}>Consultar</MenuItem>
        </Menu>
      )
    }
  }

  const handleDetail = () => {
    // router.push(`/prospects-add?id=${selectedIndex}`)
    // setSelectedIndex(null)
  }

  const handleChangeSelect = async (value) => {
    if (value !== null) {
      selectedProspect(value)
      let newArray = [...prospects]
      if (value !== null) {
        newArray = prospects.filter(
          (x) =>
            x.name.trimEnd().trimStart().toLowerCase() ===
            value.name.toLowerCase()
        )
        if (newArray.length > 0) {
          setProspects(newArray)
        } else {
          setProspects([])
        }
      }
    } else {
      setSelectedProspect(null)
      // Se hace la consulta a la APi para actualizar la tabla
    }
  }

  return (
    <Grid container justifyContent={'space-between'} spacing={2}>
      <Grid item xs={12}>
        <FormControl
          fullWidth
          variant="outlined"
          size="small"
          disabled={isLoading}
        >
          <Autocomplete
            freeSolo
            value={selectedProspect}
            options={prospects.map((reg) => reg.name)}
            name="promoterId"
            onChange={(event, value) => handleChangeSelect(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                startAdornment={
                  <InputAdornment position="start">
                    <img
                      src={`${window.location.origin}/icons/promoter.svg`}
                      style={{ width: '18px' }}
                    />
                  </InputAdornment>
                }
                variant="outlined"
                size="small"
                label="Prospecto"
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                  startAdornment: (
                    <InputAdornment position="start">
                      <img
                        src={`${window.location.origin}/icons/search.svg`}
                        style={{ width: '18px' }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} sx={{ margin: 2 }}>
        <TableContainer
          sx={{
            borderRadius: '15px',
            borderColor: 'black',
            border: 'solid 1px #757575',
          }}
        >
          <Table size="small">
            <TableHead sx={{ backgroundColor: '#DADAD9' }}>
              <TableRow>
                {headers.map((header, index) => (
                  <TableCell key={index}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {prospects.map((reg, i) => (
                <StyledTableRow key={i}>
                  <TableCell>{reg.name}</TableCell>
                  <TableCell>{reg.firstLastName}</TableCell>
                  <TableCell>{reg.secondLastName}</TableCell>
                  <TableCell>{reg.pipeline}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="more"
                      id="icon-button"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={(e) => handleClick(e, reg.id)}
                    >
                      <img
                        src={`${window.location.origin}/icons/3-points.svg`}
                      ></img>
                    </IconButton>
                    {renderActions()}
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            sx={{ margin: '24px auto', display: 'table' }}
            count={totalPages}
            page={page}
            color="primary"
            onChange={handleChangePage}
          />
          <ModalProspects
            showModal={showModal}
            handleShowModal={handleShowModal}
            idProspect={selectedIndex}
          />
        </TableContainer>
      </Grid>
    </Grid>
  )
}


export default ProspectsEvaluation
