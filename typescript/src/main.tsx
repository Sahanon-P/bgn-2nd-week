import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from '@routers/main'
import { ThemeProvider, createTheme } from '@mui/material'
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000281',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff8a00',
      contrastText: '#ffffff',
    },
  },
})
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
  </React.StrictMode>,
)
