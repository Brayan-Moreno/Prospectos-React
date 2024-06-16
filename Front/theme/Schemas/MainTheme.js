import { createTheme, darken, lighten } from '@mui/material'

const themeColors = {
  primaryColor: '#243B7A',
  secondaryColor: '#F4F5F7',
  backgroundColor: '#F4F5F7',
  textMainColor: '#2F2F2F',
  textSecondaryColor: '#8e8e8e',
  textBlueColor: '#253E8B',
  success: '#57CA22',
  warning: '#FFA319',
  info: '#33C2FF',
  error: '#FF1943',
  black: '#252525',
  trueWhite: '#ffffff',
}

const theme = createTheme()

export const MainTheme = createTheme(theme, {
  components: {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          marginTop: '32px',
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'primary' },
          style: {
            textTransform: 'none',
            backgroundColor: themeColors.primaryColor,
            color: 'white',
            padding: '6px 16px',
            margin: 0,
            boxShadow:
              '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
            '&:hover': {
              backgroundColor: '#142758',
            },
            '&.Mui-disabled': {
              color: 'rgba(0, 0, 0, 0.26)',
              boxShadow: 'none',
              backgroundColor: 'rgba(0, 0, 0, 0.12)',
            },
          },
        },
        {
          props: { variant: 'secondary' },
          style: {
            backgroundColor: 'white',
            textTransform: 'none',
            color: themeColors.primaryColor,
            border: 'solid 1px',
            borderColor: themeColors.primaryColor,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
            '&.Mui-disabled': {
              color: 'rgba(0, 0, 0, 0.26)',
              boxShadow: 'none',
              backgroundColor: 'rgba(0, 0, 0, 0.12)',
              border: 'none',
            },
          },
        },
        {
          props: { variant: 'option' },
          style: {
            textTransform: 'none',
            color: themeColors.primaryColor,
            padding: '6px 12px',
            '&:hover': {
              color: '#142758',
            },
          },
        },
      ],
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: '7px',
            height: '7px',
            borderRadius: '10px',
            backgroundClip: 'padding-box',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            height: '7px',
            width: '7px',
            borderRadius: '10px',
            backgroundClip: 'padding-box',
            boxShadow: 'inset 0 0 0 100px',
          },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
          {
            color: 'rgba(0,0,0,.2)',
          },
        },
      },
    },
  },
  typography: {
    useNextVariants: true,
    htmlFontSize: 16,
    fontWeight: 400,
    fontFamily: 'Roboto',
    h1: {
      fontSize: 42,
      fontWeight: 800,
      color: themeColors.textMainColor,
    },
    h2: {
      fontWeight: 700,
      fontSize: 38,
      color: themeColors.textMainColor,
    },
    h3: {
      fontWeight: 700,
      fontSize: 34,
      color: themeColors.textMainColor,
    },
    h4: {
      fontWeight: 600,
      fontSize: 30,
      color: themeColors.textMainColor,
    },
    h5: {
      fontWeight: 600,
      fontSize: 26,
      color: themeColors.textMainColor,
    },
    h6: {
      fontWeight: 600,
      fontSize: 22,
      color: themeColors.textMainColor,
    },
    subtitle: {
      fontWeight: 500,
      fontSize: 18,
      color: themeColors.textMainColor,
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
      color: themeColors.textMainColor,
    },
    body2: {
      fontSize: 16,
      fontWeight: 300,
      color: themeColors.textSecondaryColor,
    },
    small: {
      fontSize: 12,
      fontWeight: 400,
      color: themeColors.textMainColor,
      display: 'block'
    },
    caption: {
      fontSize: 12,
      fontWeight: 600,
      color: themeColors.textSecondaryColor,
    },
    navbar: {
      fontSize: 16,
      fontWeight: 500,
      color: themeColors.textBlueColor,
    },
    drawer: {
      fontWeight: 400,
      fontSize: 14,
      color: themeColors.trueWhite,
    },
  },
  shape: {
    borderRadius: 3,
  },
  palette: {
    colors: {
      yellow: ['#ffd166', '#dc9a00'],
      red: '#ef476f',
      green: '#07d6a0',
      darkBlue: '#073b4c',
    },
    primary: {
      light: lighten(themeColors.primaryColor, 0.2),
      main: themeColors.primaryColor,
      dark: darken(themeColors.primaryColor, 0.2),
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: lighten(themeColors.secondaryColor, 0.2),
      main: themeColors.secondaryColor,
      dark: darken(themeColors.secondaryColor, 0.2),
    },
    success: {
      light: lighten(themeColors.success, 0.2),
      main: themeColors.success,
      dark: darken(themeColors.success, 0.2),
    },
    warning: {
      light: lighten(themeColors.warning, 0.2),
      main: themeColors.warning,
      dark: darken(themeColors.warning, 0.2),
    },
    info: {
      light: lighten(themeColors.info, 0.2),
      main: themeColors.info,
      dark: darken(themeColors.info, 0.2),
    },
    error: {
      light: lighten(themeColors.error, 0.2),
      main: themeColors.error,
      dark: darken(themeColors.error, 0.2),
    },
    background: {
      main: themeColors.backgroundColor,
      darkMain: '#DBDCDE',
      white: '#ffffff',
      navbar: '#ffffff',
      footer: '#dedede',
    },
    border: {
      main: '#D9DCE2',
    },
    icon: {
      main: '#3e3e3e',
    },
  },
  zIndex: {
    drawer: 100
  },
  main: {
    display: 'block',
    minHeight: '100vh',
    margin: '56px 68px 0px 68px',
    padding: '40px 48px 80px 48px',
    [theme.breakpoints.down('sm')]: {
      margin: '56px 12px 0px 12px',
      padding: '12px 12px 32px 12px',
    },
    [theme.breakpoints.down('md')]: {
      margin: '56px 24px 0px 24px',
    },
    [theme.breakpoints.up('xl')]: {
      margin: '56px 80px 0px 80px',
      padding: '40px 56px 80px 56px',
    },
  },
  root: {
    minHeight: '100vh',
    background: themeColors.trueWhite,
  },
  drawer: {
    width: '100px',
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: '120px',
      boxSizing: 'border-box',
      background: themeColors.primaryColor
    },
  },
  inline: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
  },
  boxShadow: [
    '0 2px 4px 0 rgba(214, 214, 214, 0.5)',
    '0 1px 1px 0 rgba(173, 173, 173, 0.5',
  ],
  scrollbar: {
    transition: 'color .3s ease',
  },
  scrollbarActivated: {
    color: 'rgba(0,0,0,.2)',
  },
  scrollbarDisabled: {
    color: '#fff',
  },
  newItem: {
    backgroundColor: themeColors.primaryColor,
    color: 'white',
    width: 120,
  },
  search: {
    backgroundColor: 'white',
    borderRadius: '10px',
    minHeight: '40px',
    '> .MuiInputBase-root': {
      height: '40px',
      padding: '0px',
      borderRadius: '10px',
      'fieldset': {
        border: 'solid 1px rgba(0, 0, 0, 0.23)'
      },
      '&.Mui-focused fieldset': {
        border: 'solid 1px rgba(0, 0, 0, 0.23)'
      }
    }
  }
})
