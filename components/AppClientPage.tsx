"use client"

import { useState, useCallback, useEffect } from "react"
import { Container, Box, Typography, Button } from "@mui/material"
import AvatarScene from "@/components/AvatarScene"
import ControlPanel from "@/components/ControlPanel"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import ErrorBoundaryWrapper from "@/components/ErrorBoundaryWrapper"
import SimpleNotification from "@/components/SimpleNotification"

export default function AppClientPage() {
  const router = useRouter()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [clothingUrl, setClothingUrl] = useState<string | null>(null)
  const [showClothing, setShowClothing] = useState(true)
  const [clothingColor, setClothingColor] = useState("#5c6bc0")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Clean up blob URLs when component unmounts
  useEffect(() => {
    return () => {
      if (avatarUrl && avatarUrl.startsWith("blob:")) {
        URL.revokeObjectURL(avatarUrl)
      }
      if (clothingUrl && clothingUrl.startsWith("blob:")) {
        URL.revokeObjectURL(clothingUrl)
      }
    }
  }, [avatarUrl, clothingUrl])

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
        if (avatarUrl && avatarUrl.startsWith("blob:")) {
          URL.revokeObjectURL(avatarUrl)
        }

        const url = URL.createObjectURL(file)
        setAvatarUrl(url)
        setSuccess(`Avatar model "${file.name}" loaded successfully!`)
      } catch (err: any) {
        setError(err.message || "Failed to upload avatar")
        console.error("Avatar upload error:", err)
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
        if (clothingUrl && clothingUrl.startsWith("blob:")) {
          URL.revokeObjectURL(clothingUrl)
        }

        const url = URL.createObjectURL(file)
        setClothingUrl(url)
        setSuccess(`Clothing model "${file.name}" loaded successfully!`)
      } catch (err: any) {
        setError(err.message || "Failed to upload clothing")
        console.error("Clothing upload error:", err)
        setIsLoading(false)
      }
    },
    [clothingUrl],
  )

  const handleReset = useCallback(() => {
    if (avatarUrl && avatarUrl.startsWith("blob:")) URL.revokeObjectURL(avatarUrl)
    if (clothingUrl && clothingUrl.startsWith("blob:")) URL.revokeObjectURL(clothingUrl)
    setAvatarUrl(null)
    setClothingUrl(null)
    setShowClothing(true)
    setClothingColor("#5c6bc0")
    setError(null)
    setSuccess("Scene reset successfully")
  }, [avatarUrl, clothingUrl])

  const handleCloseError = () => {
    setError(null)
  }

  const handleCloseSuccess = () => {
    setSuccess(null)
  }

  const handleBackToHome = () => {
    router.push("/")
  }

  return (
    <ErrorBoundaryWrapper>
      <Container maxWidth="lg" sx={{ height: "100vh", py: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Button startIcon={<ArrowLeft />} onClick={handleBackToHome} sx={{ mr: 2 }}>
            Back to Home
          </Button>
          <Typography variant="h4" component="h1" align="center" sx={{ flexGrow: 1 }}>
            3D Avatar Fitting App
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, height: "calc(100% - 120px)" }}>
          <Box sx={{ flex: 1, height: { xs: "50vh", md: "100%" }, mb: { xs: 2, md: 0 } }}>
            <AvatarScene
              avatarUrl={avatarUrl}
              clothingUrl={clothingUrl}
              showClothing={showClothing}
              clothingColor={clothingColor}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
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
              isLoading={isLoading}
            />
          </Box>
        </Box>

        {/* Custom notifications instead of Material UI Snackbar */}
        <SimpleNotification message={error} type="error" onClose={handleCloseError} duration={6000} />

        <SimpleNotification message={success} type="success" onClose={handleCloseSuccess} duration={3000} />
      </Container>
    </ErrorBoundaryWrapper>
  )
}
