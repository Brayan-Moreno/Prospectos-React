import { AppBar, styled } from '@mui/material'

export const RootContainer = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer - 1,
  background: theme.palette.background.navbar,
}))