import { Box, styled } from '@mui/material'

export const RootContainer = styled(Box)(({ theme }) => ({
  display: 'block',
  backgroundColor: theme.palette.background.footer,
}))

export const SecondaryContainer = styled(Box)(() => ({
  margin: '0 auto',
  padding: '16px 0px 32px 0px',
  textAlign: 'center',
}))
