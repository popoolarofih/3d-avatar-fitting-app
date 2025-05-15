import "./globals.css"
import type { Metadata } from "next"
import type React from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

export const metadata: Metadata = {
  title: "3D Avatar Fitting App",
  description: "Upload and fit 3D avatars with clothing",
    generator: 'v0.dev'
}

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Anta&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
