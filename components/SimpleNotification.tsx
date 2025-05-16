"use client"

import { useEffect, useState } from "react"
import { Box, Typography } from "@mui/material"

interface NotificationProps {
  message: string | null
  type: "success" | "error" | "info"
  onClose: () => void
  duration?: number
}

export default function SimpleNotification({ message, type, onClose, duration = 3000 }: NotificationProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (message) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        setTimeout(onClose, 300) // Allow fade out animation to complete
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [message, duration, onClose])

  if (!message) return null

  const bgColor =
    type === "success"
      ? "rgba(76, 175, 80, 0.9)"
      : type === "error"
        ? "rgba(244, 67, 54, 0.9)"
        : "rgba(33, 150, 243, 0.9)"

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        zIndex: 9999,
        maxWidth: "80%",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      <Box
        sx={{
          bgcolor: bgColor,
          color: "white",
          p: 2,
          borderRadius: 1,
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        }}
      >
        <Typography variant="body1">{message}</Typography>
      </Box>
    </Box>
  )
}
