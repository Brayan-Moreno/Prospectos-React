import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useLoading } from '@hooks/useLoading'


//Resource
import Snack from '@snack'

//Material UI
import {
  Grid,
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
  Menu,
  MenuItem,
} from '@mui/material'

import ModalProspects from '@components/ModalProspects'
import {StyledTableRow} from '../style/styledComponents'

//Api
import { prospectsApi } from 'api/prospects/prospects.api'

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
  const headers = ['Nombre', 'Apellido Paterno', 'Apellido Materno', 'Estatus', 'Acciones']

  useEffect(() =>{
    prospectsGet()
  },[])


  const prospectsGet = async () => {
    try {
      const response = await prospectsApi.getProspect()
      if (!response.success) {
        Snack.error(response.message)
      } else {
        const prospects = [...response.data]
        setProspects(prospects)
      }
    } catch (error) {
      Snack.error(error.message)
    }
  }
 

  const handleChangePage = async (_, value) => {
    setPage(value)
    //Se hace consulta a la api para actualizar la información
  }

  const handleClick = (event, id) => {
    setSelectedIndex(id)
    setAnchorEl(event.target)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleShowModal = async () => {
    setShowModal(!showModal)
    if (showModal) {
      await prospectsGet()
    }
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
          slotProps={{
            paper:{
              style: {
                width: '20ch',
                boxShadow: '0px 1px 0px 1px gray',
              },
            }
            
          }}
        >
          <MenuItem onClick={handleDetail}>Gestionar</MenuItem>
        </Menu>
      )
    }
  }

  const handleDetail = () => {
    handleShowModal()
  }

  const handleChangeSelect = async (value) => {
    if (value !== null) {
      setSelectedProspect(value)
      let newArray = [...prospects]
      if (value !== null) {
        newArray = prospects.filter(
          (x) =>
            x.name.trimEnd().trimStart().toLowerCase() ===
            String(value).toLowerCase() || 
            x.firstLastName.trimEnd().trimStart().toLowerCase() ===
            String(value).toLowerCase() ||
            x.secondLastName.trimEnd().trimStart().toLowerCase() ===
            String(value).toLowerCase()
        )
        if (newArray.length > 0) {
          setProspects(newArray)
        } else {
          setProspects([])
        }
      }
    } else {
      setSelectedProspect(null)
      await prospectsGet()
    }
  }

  return (
    <Grid container justifyContent={'space-between'} spacing={2}>
      <Grid item xs={4}>
        <FormControl
          fullWidth
          variant="outlined"
          size="small"
          disabled={isLoading}
        >
          <Autocomplete
            freeSolo
            value={selectedProspect}
            options={prospects.map((reg) => `${reg.name}` )}
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

      <Grid item xs={12} sx={{ margin: 1 }}>
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
