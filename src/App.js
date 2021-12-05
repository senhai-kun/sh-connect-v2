import React from 'react';
import Login from './pages/Login/Login';
import Room from './pages/Room/Room';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import ConnProvider from './pages/Room/context/ConnContext/ConnProvider';
import { StylesProvider } from '@mui/styles';

const theme = createTheme({
  palette: {
    mode: 'dark'
  },
  typography: {
    fontFamily: [
      'Lexend Deca',
      'sans-serif'
    ].join(','),
  }
})

function App() { 
 
  return (
    <ThemeProvider theme={theme} >
      <StylesProvider>
        <CssBaseline />
        <ConnProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/room" element={<Room />} />
            </Routes>
          </Router>
        </ConnProvider>
      </StylesProvider>
    </ThemeProvider>

  );
}

export default App;
