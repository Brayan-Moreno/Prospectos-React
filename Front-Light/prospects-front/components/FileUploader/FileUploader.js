import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// Material UI
import {
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Table,
  Paper,
  Button,
  DialogActions,
  Grid,
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import VisibilityIcon from '@mui/icons-material/Visibility'

// Resource
import Snack from '@snack'
import { useLoading } from '@hooks/useLoading'
import { useRouter } from 'next/router'

// API

// Components
import { VisuallyHiddenInput, VisuallyFile } from './styledComponents'
import { CropLandscapeOutlined } from '@mui/icons-material'
import AddCircleIcon from '@mui/icons-material/AddCircle'

const FileUploader = ({
  onFileSelect,
  headers,
  list,
  recoverFiles,
  ...props
}) => {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [loadedList, setLoadedList] = useState(false)
  const { open, close } = useLoading()

  useEffect(() => {
    //recoverFiles(uploadedFiles)
  }, [uploadedFiles])

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

  return (
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
            sx={{ backgroundColor: '#F4F5F7', height: '40px', width: '100%' }}
          >
          </TableHead>
          <TableBody>
            {uploadedFiles.map((reg, i) => (
              <TableRow key={reg.id}>
                {renderCells(reg)}
                {!props.hiddenMenu && (
                  <TableCell align="right">{renderInput(reg)}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ textAlign: 'right' }}></div>
    </>
  )
}

FileUploader.propTypes = {
  idApplication: PropTypes.number,
  client: PropTypes.string,
  headers: PropTypes.array,
  list: PropTypes.array,
  pages: PropTypes.number,
  recoverFiles: PropTypes.func,
}

export default FileUploader
