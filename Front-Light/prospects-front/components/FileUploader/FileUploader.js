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

const FileUploader = ({
  onFileSelect,
  headers,
  list,
  handleChange,
  handleUploadSuccess,
  ...props
}) => {
  const [selectedFiles, setSelectedFiles] = useState({})
  const { open, close } = useLoading()

  useEffect(() => {
    if (props.resetPage) {
      setPage(1)
    }
  }, [list])

  const handleFileChange = async (e) => {
    const reader = new FileReader()
    let file = e.target.files[0]
    console.log(file, "file")
    const { id, name } = e.target

    const maxSize = 5 * 1024 * 1024

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']

    if (!file){
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

      setSelectedFiles((prev) => ({
        ...prev,
        [id]: file,
      }))
    }

    console.log(selectedFiles, "archivos")
    reader.readAsDataURL(file)
  }


  const renderInput = (reg) => {
    return (
      <>
          <Button component="label" startIcon={<CloudUploadIcon />}>
          <VisuallyHiddenInput
            type="file"
            onChange={(e) => handleFileChange(e)}
            id={reg.id}
            name={reg.description}
            accept=".pdf, .doc, .docx, .txt, .jpg, .jpeg, .png"
          />
        </Button>
        {selectedFiles[reg.id] && (
            <p>Archivo seleccionado: {selectedFiles[reg.id].fileName}</p>
          )}
          {selectedFiles[reg.id]  &&(
             <Button
             component="label"
             startIcon={<VisibilityIcon />}
             target="_blank"
           >
             <VisuallyFile onClick={() => renderOpenFile(selectedFiles[reg.id])} />
           </Button>
          )}
      </>
    )
  }

  const renderOpenFile = (file) => {
    var pdfData = file.data;
    var w = window.open("");
    if (w) {
      w.document.write(
        `<embed width="100%" height="100%" src="${pdfData}" type=${file.type} />`
      );
    }
  }

  const renderCells = (reg) => {
    const arreglo = []
    for (const key in reg) {
      if (key !== 'id') {
        arreglo.push(<TableCell key={key}>{reg[key]}</TableCell>)
      }
    }
    return arreglo
  }

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: '16px', marginTop: 'auto' }}
      >
        <Table sx={{ minWidth: '450px' }} size="small">
          {/* <TableHead sx={{ height: '40px' }}></TableHead> */}
          <TableHead sx={{ backgroundColor: '#F4F5F7', height: '40px', width:'100%' }}>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index} sx={{ borderBottom: 'none', width: '100%' }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((reg, i) => (
              <TableRow key={reg.id} >
                {renderCells(reg)}
                {!props.hiddenMenu && (
                  <TableCell align="right">{renderInput(reg)}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ textAlign: 'right' }}>
      </div>
    </>
  )
}

FileUploader.propTypes = {
  idApplication: PropTypes.number,
  client: PropTypes.string,
  headers: PropTypes.array,
  list: PropTypes.array,
  pages: PropTypes.number,
  handleChange: PropTypes.func,
  handleUploadSuccess: PropTypes.func,
}

export default FileUploader
