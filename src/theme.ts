import { createTheme } from '@mui/material/styles'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2'
    }
  }
})

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2'
    }
  }
})
