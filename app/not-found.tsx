"use client"

import { Box, Button, Container, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import { Home } from "lucide-react"

export default function NotFound() {
  const router = useRouter()

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
          py: 8,
        }}
      >
        <Typography variant="h1" component="h1" sx={{ mb: 4, fontSize: { xs: "4rem", md: "6rem" }, fontWeight: 700 }}>
          404
        </Typography>
        <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
          Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ mb: 6, maxWidth: 500 }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<Home />}
          onClick={() => router.push("/")}
          sx={{ px: 4, py: 1.5 }}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  )
}
