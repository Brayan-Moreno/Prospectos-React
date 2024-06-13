import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useModule } from '@hooks/useModule'

const ModulesMenu = [
  {
    id: 1,
    url: '/add-prospects',
    icon: 'promoter.svg',
    name: 'Alta de prospectos'
  },
  {
    id: 2,
    url: '/prospects',
    icon: 'assign-promoter.svg',
    name: 'Consulta de prospectos'
  },
  {
    id: 3,
    url: '/prospect-evaluate',
    icon: 'promotor-group.svg',
    name: 'Evaluación de prospectos'
  }
]

const Menu = () => {
  const [moduleExpanded, setModuleExpanded] = useState(null)
  const router = useRouter()
  const theme = useTheme()
  const { set, clean } = useModule()

  const handleClick = (isHome = false, item) => {
    if (item && item.name) {
    }
    if (isHome) {
      clean()
      router.push('/')
    } else {
      if (item.subModules && item.subModules.length > 0) {
        if (moduleExpanded === item.id) {
          setModuleExpanded(null)
        } else {
          setModuleExpanded(item.id)
        }
      } else {
        router.push(`/${item.url}`)
      }
    }
  }

  const renderItems = () => {
    return ModulesMenu.map((item) => {
      const url = item.url
      let selected = false
      const temp = router.pathname.split('/')
      if (temp[1] === url) {
        selected = true
      } else {
        selected = false
      }

      return (
        <ListItem
          key={item.id}
          disablePadding
          sx={selected ? { backgroundColor: 'rgba(255,255,255,0.1)', display: 'block', width: '90%' } : { display: 'block' }}
        >
          {(
            <ListItemButton
              onClick={() => handleClick(false, item)}
              sx={item.id === moduleExpanded ?
                { backgroundColor: 'white', borderRadius: '6px', '&:hover': { backgroundColor: 'rgba(255,255,255,0.8)' } }
                :
                { '&:hover': { backgroundColor: 'rgba(0,0,0,0.2)' } }}
            >
              <div style={{ width: '100%', display: 'flex' }}>
                <div style={{ margin: '0 auto', maxWidth: '85px' }}>
                  <div style={{ width: '100%', textAlign: 'center' }}>
                    <img
                      src={`${window.location.origin}/icons/${item.icon}`}
                      alt="icon"
                      style={item.id === moduleExpanded ? { width: '24px', color: '#243B7A' } : { filter: 'invert(100%)', width: '24px' }}
                    />
                  </div>
                  <div style={{ width: '100%', textAlign: 'center' }}>
                    <ListItemText
                      primary={item.description ? item.description : item.name}
                      primaryTypographyProps={item.id === moduleExpanded ? { fontSize: '14px' } : { color: 'white', fontSize: '14px' }}
                    />
                  </div>
                </div>

              </div>
            </ListItemButton>
          )}
        </ListItem>
      )
    }) 
  }

  return (
    <>
      <Drawer
        variant='permanent'
        anchor="left"
        sx={theme.drawer}
      >
        <Box sx={{ overflow: 'auto', marginTop: '12px' }}>
          <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => handleClick(true)}>
            <img
              src={`${window.location.origin}/vercel.svg`}
              alt=""
              style={{ width: '45px', height: '20px' }}
            />
          </div>
          <List sx={{ padding: 0, margin: 0, marginTop: '24px' }}>
            {renderItems()}
          </List>
        </Box>
      </Drawer>
    </>
  )
}

Menu.propTypes = {
  showMenu: PropTypes.bool,
  handleMenu: PropTypes.func,
}

export default Menu
