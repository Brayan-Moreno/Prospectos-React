const { TableRow, TextField, Select, styled } = require('@mui/material')

export const StyledTableRow = styled(TableRow)(() => ({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(142, 142, 141, 0.3)',
  },
  '&.active': {
    backgroundColor: '#B5C4EC',
  },
}))

export const RoundedTextField = styled(TextField)(() => ({
  '>.MuiInputBase-root': {
    borderRadius: '10px',
  },
}))

export const RoundedSelect = styled(Select)(() => ({
  borderRadius: '10px',
}))
