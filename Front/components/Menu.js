import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useAuth } from '@hooks/useAuth'
import { useModule } from '@hooks/useModule'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

const Menu = () => {
  const [moduleExpanded, setModuleExpanded] = useState(null)
  const router = useRouter()
  const theme = useTheme()
  const auth = useAuth()
  const { set, clean } = useModule()

  const handleClick = (isHome = false, item) => {
    if (item && item.name) {
      if (item.name === 'Kelder') {
        set('Crédito Kelder')
      } else if (item.name === 'Empleado') {
        set('Crédito Empleado')
      } else if (item.name === 'Mayorista') {
        set('Crédito Mayorista')
      } else {
        set(item.name)
      }
    }
    if (isHome) {
      clean()
      router.push('/home')
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
    return auth.modules.map((item) => {
      const url = item.url
      let selected = false
      const temp = router.pathname.split('/')
      if (temp[1] === url) {
        selected = true
      } else {
        selected = false
      }
      let subSelected = null
      if (item.subModules && item.subModules.length > 0) {
        for (let idx = 0; idx < item.subModules.length; idx++) {
          const sub = item.subModules[idx]
          if (router.pathname === `/${sub.url}`) {
            subSelected = sub.id
          }
        }
      }

      return (
        <ListItem
          key={item.id}
          disablePadding
          sx={selected ? { backgroundColor: 'rgba(255,255,255,0.1)', display: 'block', width: '100%' } : { display: 'block' }}
        >
          {item.subModules.length > 0 || item.actions?.length > 0 ? (
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
                {item.subModules.length > 0 && (
                  <div style={{ marginLeft: '-24px' }}>
                    {item.id === moduleExpanded ? <ExpandLess /> : <ExpandMore sx={{ color: 'white' }} />}
                  </div>
                )}
              </div>
            </ListItemButton>
          ) : null}
          <Collapse in={item.id === moduleExpanded}>
            <List component="div" disablePadding>
              {item.subModules.map((subModule, jndex) => (
                <ListItemButton
                  key={jndex}
                  sx={
                    subSelected === subModule.id
                      ? { backgroundColor: 'rgba(255,255,255,0.1)', '&:hover': { backgroundColor: 'rgba(0,0,0,0.2)' } }
                      : { '&:hover': { backgroundColor: 'rgba(0,0,0,0.2)' } }
                  }
                  onClick={() => handleClick(false, subModule)}
                >
                  <div style={{ margin: '0 auto', maxWidth: '85px' }}>
                    <div style={{ width: '100%', textAlign: 'center' }}>
                      <img
                        src={`${window.location.origin}/icons/${subModule.icon}`}
                        alt="icon"
                      />
                    </div>
                    <div style={{ width: '100%', textAlign: 'center' }}>
                      <ListItemText
                        primary={subModule.name}
                        primaryTypographyProps={{ color: 'white', fontSize: '14px' }}
                      />
                    </div>
                  </div>
                </ListItemButton>
              ))}
            </List>
          </Collapse>
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
              src={`${window.location.origin}/icons/logo-calzzapato.svg`}
              alt=""
              style={{ width: '45px' }}
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
