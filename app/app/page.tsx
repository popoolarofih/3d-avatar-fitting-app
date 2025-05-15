"use client"

import { useState, useCallback } from "react"
import { Container, Box, Typography, Alert, Snackbar, Button, Paper } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import AvatarScene from "@/components/AvatarScene"
import ControlPanel from "@/components/ControlPanel"
import { ArrowLeft, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"

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
  },
})

export default function AppPage() {
  const router = useRouter()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [clothingUrl, setClothingUrl] = useState<string | null>(null)
  const [showClothing, setShowClothing] = useState(true)
  const [clothingColor, setClothingColor] = useState("#ffffff")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAvatarUpload = useCallback(
    (file: File) => {
      try {
        setIsLoading(true)
        setError(null)

        // Validate file type
        if (!file.name.toLowerCase().endsWith(".glb") && !file.name.toLowerCase().endsWith(".gltf")) {
          throw new Error("Please upload a valid GLB or GLTF file")
        }

        // Revoke previous URL if exists
        if (avatarUrl) {
          URL.revokeObjectURL(avatarUrl)
        }

        const url = URL.createObjectURL(file)
        setAvatarUrl(url)
      } catch (err) {
        setError(err.message || "Failed to upload avatar")
        console.error("Avatar upload error:", err)
      } finally {
        setIsLoading(false)
      }
    },
    [avatarUrl],
  )

  const handleClothingUpload = useCallback(
    (file: File) => {
      try {
        setIsLoading(true)
        setError(null)

        // Validate file type
        if (!file.name.toLowerCase().endsWith(".glb") && !file.name.toLowerCase().endsWith(".gltf")) {
          throw new Error("Please upload a valid GLB or GLTF file")
        }

        // Revoke previous URL if exists
        if (clothingUrl) {
          URL.revokeObjectURL(clothingUrl)
        }

        const url = URL.createObjectURL(file)
        setClothingUrl(url)
      } catch (err) {
        setError(err.message || "Failed to upload clothing")
        console.error("Clothing upload error:", err)
      } finally {
        setIsLoading(false)
      }
    },
    [clothingUrl],
  )

  const handleReset = useCallback(() => {
    if (avatarUrl) URL.revokeObjectURL(avatarUrl)
    if (clothingUrl) URL.revokeObjectURL(clothingUrl)
    setAvatarUrl(null)
    setClothingUrl(null)
    setShowClothing(true)
    setClothingColor("#ffffff")
    setError(null)
  }, [avatarUrl, clothingUrl])

  const handleCloseError = () => {
    setError(null)
  }

  const handleBackToHome = () => {
    router.push("/")
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ height: "100vh", py: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Button startIcon={<ArrowLeft />} onClick={handleBackToHome} sx={{ mr: 2 }}>
            Back to Home
          </Button>
          <Typography variant="h4" component="h1" align="center" sx={{ flexGrow: 1 }}>
            3D Avatar Fitting App
          </Typography>
        </Box>

        <Paper elevation={2} sx={{ p: 2, mb: 3, bgcolor: "#fff8e1", display: "flex", alignItems: "center" }}>
          <AlertTriangle size={24} color="#ff9800" style={{ marginRight: 12 }} />
          <Typography variant="body2">
            <strong>Note:</strong> Due to compatibility issues with certain 3D models, we're currently showing
            simplified placeholder models. We're working on fixing this in a future update.
          </Typography>
        </Paper>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, height: "calc(100% - 120px)" }}>
          <Box sx={{ flex: 1, height: { xs: "50vh", md: "100%" }, mb: { xs: 2, md: 0 } }}>
            <AvatarScene
              avatarUrl={avatarUrl}
              clothingUrl={clothingUrl}
              showClothing={showClothing}
              clothingColor={clothingColor}
              isLoading={isLoading}
            />
          </Box>

          <Box sx={{ width: { xs: "100%", md: "300px" }, ml: { md: 2 } }}>
            <ControlPanel
              onAvatarUpload={handleAvatarUpload}
              onClothingUpload={handleClothingUpload}
              showClothing={showClothing}
              setShowClothing={setShowClothing}
              onReset={handleReset}
              clothingColor={clothingColor}
              setClothingColor={setClothingColor}
              hasAvatar={!!avatarUrl}
              hasClothing={!!clothingUrl}
            />
          </Box>
        </Box>

        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  )
}
