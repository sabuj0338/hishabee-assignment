import { StyledEngineProvider } from '@mui/material/styles'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        {/* <MuiThemeProvider> */}
          <App />
        {/* </MuiThemeProvider> */}
      </StyledEngineProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
