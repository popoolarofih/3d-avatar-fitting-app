"use client"

import { Box, CircularProgress, Typography } from "@mui/material"

export default function LoadingSpinner() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        zIndex: 10,
      }}
    >
      <CircularProgress size={60} thickness={4} />
      <Typography variant="body1" sx={{ mt: 2, color: "white" }}>
        Loading model...
      </Typography>
    </Box>
  )
}
