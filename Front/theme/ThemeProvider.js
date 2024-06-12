import { createContext, useState } from 'react'
import { ThemeProvider } from '@mui/material'
import { themeCreator } from './base'

export const ThemeContext = createContext()

const ThemeProviderWrapper = ({ children }) => {
  const currenttheme = window.localStorage.getItem('theme')
  const [themeName, setThemeName] = useState(currenttheme || 'MainTheme')

  const theme = themeCreator(themeName)
  return (
    <ThemeContext.Provider value={{ themeName, setThemeName }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProviderWrapper
