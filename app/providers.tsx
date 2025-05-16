"use client"

import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import type { ReactNode } from "react"

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: "#5c6bc0",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: '"Anta", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Anta", sans-serif',
    },
    h2: {
      fontFamily: '"Anta", sans-serif',
    },
    h3: {
      fontFamily: '"Anta", sans-serif',
    },
    h4: {
      fontFamily: '"Anta", sans-serif',
    },
    h5: {
      fontFamily: '"Anta", sans-serif',
    },
    h6: {
      fontFamily: '"Anta", sans-serif',
    },
    button: {
      fontFamily: '"Anta", sans-serif',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },
  },
})

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
