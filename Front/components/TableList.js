/* Props
list: arreglo de objetos a pintar en la tabla
headers: arreglo de strings con las columnas a pintar
pages: número de páginas que tendrá la tabla (viene de la api)
request: llamado a la api cada que cambia la página
handleEdit: método que se va activar al click en editar
handleDelete: método que se va activar al click en eliminar
*/
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Pagination,
  Menu,
  MenuItem,
} from '@mui/material'

import { useActions } from '@hooks/useActions'

const ITEM_HEIGHT = 48
const TableList = ({
  headers,
  list,
  pages,
  request,
  handleEdit,
  handleDelete,
  handleDetail,
  ...props
}) => {
  const [page, setPage] = useState(1)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const openMenu = Boolean(anchorEl)
  const actions = useActions()

  useEffect(() => {
    if (props.resetPage) {
      setPage(1)
    }
  }, [list])

  const handleChange = (_, value) => {
    setPage(value)
    request(value)
  }

  const handleClick = (event, id) => {
    setSelectedIndex(id)
    setAnchorEl(event.target)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleAction = (key) => {
    if (key === 'edit') {
      handleEdit(selectedIndex)
    } else if (key === 'delete') {
      handleDelete(selectedIndex)
    } else if (key === 'detail') {
      handleDetail(selectedIndex)
    }
    setSelectedIndex(null)
    handleClose()
  }

  const renderCells = (reg) => {
    const arreglo = []
    for (const key in reg) {
      // se recorre el arreglo para que no se pinten los id's en la tabla
      if (key !== 'id' && key !== 'profileId') {
        arreglo.push(<TableCell key={key}>{reg[key]}</TableCell>)
      }
    }
    return arreglo
  }

  return (
    <TableContainer sx={{ borderRadius: '15px', border: 'solid 1px #757575' }}>
      <Table sx={{ minWidth: '300px' }} size="small">
        <TableHead sx={{ backgroundColor: '#DADAD9' }}>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index}>{header}</TableCell>
            ))}
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((reg, i) => (
            <TableRow key={i}>
              {renderCells(reg)}
              {!props.hiddenMenu && (
                <TableCell align="right">
                  <IconButton
                    aria-label="more"
                    id="icon-button"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={(e) => handleClick(e, reg.id)}
                  >
                    <img src={`${window.location.origin}/icons/menu.svg`} />
                  </IconButton>
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
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: props.menuSize ? props.menuSize : '20ch',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    {actions.includes('u') && handleEdit && (
                      <MenuItem onClick={() => handleAction('edit')}>
                        Editar
                      </MenuItem>
                    )}
                    {handleDetail && (
                      <MenuItem onClick={() => handleAction('detail')}>
                        Ver detalle
                      </MenuItem>
                    )}
                    {actions.includes('d') && handleDelete && (
                      <MenuItem onClick={() => handleAction('delete')}>
                        Eliminar
                      </MenuItem>
                    )}
                  </Menu>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        sx={{ margin: '24px auto', display: 'table' }}
        count={pages}
        page={page}
        color="primary"
        onChange={handleChange}
      />
    </TableContainer>
  )
}

TableList.propTypes = {
  headers: PropTypes.array,
  list: PropTypes.array,
  pages: PropTypes.number,
  request: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
}

export default TableList
