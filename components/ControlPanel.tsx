"use client"

import { useCallback } from "react"
import { Box, Button, Paper, Typography, Switch, FormControlLabel, Divider, TextField } from "@mui/material"
import { useDropzone } from "react-dropzone"
import { CloudUpload as CloudUploadIcon, Refresh as RefreshIcon } from "@mui/icons-material"

interface ControlPanelProps {
  onAvatarUpload: (file: File) => void
  onClothingUpload: (file: File) => void
  showClothing: boolean
  setShowClothing: (show: boolean) => void
  onReset: () => void
  clothingColor: string
  setClothingColor: (color: string) => void
  hasAvatar: boolean
  hasClothing: boolean
}

export default function ControlPanel({
  onAvatarUpload,
  onClothingUpload,
  showClothing,
  setShowClothing,
  onReset,
  clothingColor,
  setClothingColor,
  hasAvatar,
  hasClothing,
}: ControlPanelProps) {
  // Dropzone for avatar upload
  const onAvatarDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onAvatarUpload(acceptedFiles[0])
      }
    },
    [onAvatarUpload],
  )

  const {
    getRootProps: getAvatarRootProps,
    getInputProps: getAvatarInputProps,
    isDragActive: isAvatarDragActive,
  } = useDropzone({
    onDrop: onAvatarDrop,
    accept: {
      "model/gltf-binary": [".glb"],
      "model/gltf+json": [".gltf"],
    },
  })

  // Dropzone for clothing upload
  const onClothingDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onClothingUpload(acceptedFiles[0])
      }
    },
    [onClothingUpload],
  )

  const {
    getRootProps: getClothingRootProps,
    getInputProps: getClothingInputProps,
    isDragActive: isClothingDragActive,
  } = useDropzone({
    onDrop: onClothingDrop,
    accept: {
      "model/gltf-binary": [".glb"],
      "model/gltf+json": [".gltf"],
    },
  })

  return (
    <Paper elevation={3} sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" gutterBottom>
        Controls
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Upload Avatar
        </Typography>
        <Box
          {...getAvatarRootProps()}
          sx={{
            border: "2px dashed #ccc",
            borderRadius: 2,
            p: 2,
            textAlign: "center",
            bgcolor: isAvatarDragActive ? "rgba(92, 107, 192, 0.1)" : "transparent",
            cursor: "pointer",
            "&:hover": {
              bgcolor: "rgba(92, 107, 192, 0.05)",
            },
          }}
        >
          <input {...getAvatarInputProps()} />
          <CloudUploadIcon sx={{ mb: 1, color: "primary.main" }} />
          <Typography variant="body2">
            {isAvatarDragActive ? "Drop avatar here" : "Drag & drop avatar or click to browse"}
          </Typography>
          <Typography variant="caption" display="block" color="text.secondary">
            Accepts GLB/GLTF files
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Upload Clothing
        </Typography>
        <Box
          {...getClothingRootProps()}
          sx={{
            border: "2px dashed #ccc",
            borderRadius: 2,
            p: 2,
            textAlign: "center",
            bgcolor: isClothingDragActive ? "rgba(92, 107, 192, 0.1)" : "transparent",
            cursor: "pointer",
            "&:hover": {
              bgcolor: "rgba(92, 107, 192, 0.05)",
            },
          }}
        >
          <input {...getClothingInputProps()} />
          <CloudUploadIcon sx={{ mb: 1, color: "primary.main" }} />
          <Typography variant="body2">
            {isClothingDragActive ? "Drop clothing here" : "Drag & drop clothing or click to browse"}
          </Typography>
          <Typography variant="caption" display="block" color="text.secondary">
            Accepts GLB/GLTF files
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={showClothing}
              onChange={(e) => setShowClothing(e.target.checked)}
              disabled={!hasAvatar || !hasClothing}
            />
          }
          label="Show Clothing"
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Clothing Color
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            type="color"
            value={clothingColor}
            onChange={(e) => setClothingColor(e.target.value)}
            sx={{ width: 56, mr: 2 }}
            disabled={!hasAvatar || !hasClothing}
          />
          <Typography variant="body2">{clothingColor}</Typography>
        </Box>
      </Box>

      <Box sx={{ mt: "auto" }}>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<RefreshIcon />}
          onClick={onReset}
          fullWidth
          disabled={!hasAvatar && !hasClothing}
        >
          Reset Scene
        </Button>
      </Box>
    </Paper>
  )
}
