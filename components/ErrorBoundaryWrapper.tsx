"use client"

import { ErrorBoundary } from "react-error-boundary"
import { Box, Button, Typography } from "@mui/material"

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Box
      sx={{
        p: 4,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f5f5",
        color: "#333",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom color="error">
        Something went wrong
      </Typography>
      
      <Typography variant="body1" sx={{ maxWidth: "600px", mb: 4 }}>
        {error.message || "An unexpected error occurred in the application"}
      </Typography>
      
      <pre style={{ 
        backgroundColor: "#f1f1f1", 
        padding: "15px", 
        borderRadius: "4px", 
        maxWidth: "80%", 
        overflow: "auto",
        fontSize: "0.9rem",
        maxHeight: "200px"
      }}>
        {error.stack}
      </pre>
      
      <Button 
        variant="contained" 
        color="primary"
        onClick={resetErrorBoundary}
        sx={{ mt: 4 }}
      >
        Try again
      </Button>
    </Box>
  )
}

export default function ErrorBoundaryWrapper({ children }) {
  return (
    <ErrorBoundary 
      FallbackComponent={ErrorFallback}
      onReset={() => {
        window.location.reload()
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
