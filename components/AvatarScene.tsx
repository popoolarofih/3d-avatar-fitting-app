"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Center, Environment, PerspectiveCamera, Html, useProgress } from "@react-three/drei"
import { Box, CircularProgress, Typography } from "@mui/material"
import { ErrorBoundary } from "react-error-boundary"

// Loading indicator component with progress
function LoadingIndicator() {
  const { progress } = useProgress()
  return (
    <Html center>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <CircularProgress variant="determinate" value={progress} />
        <Box sx={{ mt: 1, color: "white" }}>Loading model... {Math.round(progress)}%</Box>
      </Box>
    </Html>
  )
}

// Placeholder component when no models are loaded
function Placeholder() {
  return (
    <Html center>
      <Box
        sx={{
          p: 3,
          bgcolor: "rgba(0,0,0,0.5)",
          borderRadius: 2,
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="body1">Upload an avatar and clothing models to get started</Typography>
        <Typography variant="body2" sx={{ mt: 2, opacity: 0.7 }}>
          Supported formats: GLB, GLTF
        </Typography>
      </Box>
    </Html>
  )
}

// Error fallback component
function ErrorFallback() {
  return (
    <Html center>
      <Box
        sx={{
          p: 3,
          bgcolor: "rgba(0,0,0,0.7)",
          borderRadius: 2,
          color: "white",
          textAlign: "center",
          maxWidth: "80%",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Error Loading Model
        </Typography>
        <Typography variant="body2">
          There was an error loading the 3D model. Please try a different file or format.
        </Typography>
      </Box>
    </Html>
  )
}

// Avatar model - simple geometric shape
function SimpleAvatarModel() {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
        <meshStandardMaterial color="#5c6bc0" />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1, 0]} castShadow>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#5c6bc0" />
      </mesh>

      {/* Arms */}
      <mesh position={[0.7, 0.2, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.8, 16]} />
        <meshStandardMaterial color="#3949ab" />
      </mesh>
      <mesh position={[-0.7, 0.2, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.8, 16]} />
        <meshStandardMaterial color="#3949ab" />
      </mesh>

      {/* Legs */}
      <mesh position={[0.3, -1, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.8, 16]} />
        <meshStandardMaterial color="#3949ab" />
      </mesh>
      <mesh position={[-0.3, -1, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.8, 16]} />
        <meshStandardMaterial color="#3949ab" />
      </mesh>
    </group>
  )
}

// Clothing model - simple geometric shape
function SimpleClothingModel({ color }) {
  return (
    <mesh position={[0, 0.1, 0.3]} castShadow>
      <boxGeometry args={[1, 0.8, 0.2]} />
      <meshStandardMaterial color={color} transparent opacity={0.8} />
    </mesh>
  )
}

// Main scene component
export default function AvatarScene({
  avatarUrl,
  clothingUrl,
  showClothing,
  clothingColor,
  isLoading,
}: {
  avatarUrl: string | null
  clothingUrl: string | null
  showClothing: boolean
  clothingColor: string
  isLoading: boolean
}) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "#2a2a2a",
      }}
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 1, 3]} />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          <Suspense fallback={isLoading ? <LoadingIndicator /> : <Placeholder />}>
            {/* Always render basic models instead of trying to load external ones */}
            {avatarUrl ? (
              <Center>
                <SimpleAvatarModel />
              </Center>
            ) : null}

            {clothingUrl && showClothing ? (
              <Center>
                <SimpleClothingModel color={clothingColor} />
              </Center>
            ) : null}

            {!avatarUrl && !clothingUrl && !isLoading && <Placeholder />}
          </Suspense>

          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} minDistance={1} maxDistance={10} />
          <Environment preset="studio" />
        </Canvas>
      </ErrorBoundary>
    </Box>
  )
}
