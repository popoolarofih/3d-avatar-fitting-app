"use client"

import { useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import {
  OrbitControls,
  Environment,
  Center,
  useGLTF,
  AccumulativeShadows,
  RandomizedLight,
  Html,
} from "@react-three/drei"
import { ErrorBoundary } from "react-error-boundary"
import LoadingSpinner from "./LoadingSpinner"
import * as THREE from "three"

// Model component for both avatar and clothing
const Model = ({ url, color = null, modelType }) => {
  const [error, setError] = useState(null)
  const { scene } = useGLTF(url, undefined, (e) => {
    console.error(`Error loading ${modelType} model:`, e)
    setError(e)
  })

  // Function to normalize model size
  const normalizeModel = (model) => {
    try {
      // Calculate bounding box
      const box = new THREE.Box3().setFromObject(model)
      const size = box.getSize(new THREE.Vector3())
      const center = box.getCenter(new THREE.Vector3())

      // Get model height
      const height = size.y

      // Target height (standard human height in Three.js units)
      const targetHeight = 1.7

      // Calculate scale factor
      const scale = targetHeight / height

      // Apply uniform scaling
      model.scale.set(scale, scale, scale)

      // Center the model
      model.position.set(-center.x * scale, -center.y * scale, -center.z * scale)

      // Adjust position so the model stands on the ground
      const newBox = new THREE.Box3().setFromObject(model)
      model.position.y -= newBox.min.y

      console.log(`${modelType} model normalized. Original height: ${height}, Scale: ${scale}`)
    } catch (err) {
      console.error("Error normalizing model:", err)
    }
  }

  if (error) {
    return (
      <Html center>
        <div
          style={{
            padding: "12px",
            backgroundColor: "rgba(0,0,0,0.7)",
            borderRadius: "8px",
            color: "white",
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          <h3>Error Loading Model</h3>
          <p>{error.message || `Failed to load ${modelType} model`}</p>
        </div>
      </Html>
    )
  }

  if (!scene) return null

  const clonedScene = scene.clone()

  // Normalize model size
  normalizeModel(clonedScene)

  // Apply material color to clothing
  if (modelType === "clothing" && color) {
    clonedScene.traverse((node) => {
      if (node.isMesh && node.material) {
        node.material = node.material.clone()
        node.material.color.set(color)
      }
    })
  }

  // Basic positioning for clothing based on avatar
  if (modelType === "clothing") {
    // The positioning will depend on your models
    // This is a basic example - adjust as needed
    clonedScene.position.y += 0.02 // Slight upward adjustment to avoid z-fighting
  }

  return <primitive object={clonedScene} />
}

// Floor component
const Floor = () => {
  return (
    <AccumulativeShadows temporal frames={30} alphaTest={0.85} scale={10} position={[0, -0.5, 0]}>
      <RandomizedLight amount={8} radius={5} intensity={0.25} ambient={0.5} position={[5, 5, -10]} />
    </AccumulativeShadows>
  )
}

// Placeholder component when no models are loaded
function Placeholder() {
  return (
    <Html center>
      <div
        style={{
          padding: "12px",
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: "8px",
          color: "white",
          textAlign: "center",
        }}
      >
        <h3>No Models Loaded</h3>
        <p>Upload an avatar and clothing models to get started</p>
        <p style={{ opacity: 0.7, fontSize: "0.9em", marginTop: "10px" }}>Supported formats: GLB, GLTF</p>
        <p style={{ opacity: 0.7, fontSize: "0.9em", marginTop: "5px" }}>
          Models will be automatically normalized to standard size
        </p>
      </div>
    </Html>
  )
}

// Error fallback component
function ErrorFallback({ error }) {
  return (
    <div
      style={{
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        textAlign: "center",
        backgroundColor: "#2a2a2a",
        color: "white",
      }}
    >
      <h3>Something went wrong</h3>
      <p>{error.message || "An unexpected error occurred"}</p>
      <button
        onClick={() => window.location.reload()}
        style={{
          marginTop: "20px",
          padding: "8px 16px",
          background: "#5c6bc0",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  )
}

export default function AvatarScene({
  avatarUrl,
  clothingUrl,
  showClothing,
  clothingColor,
  isLoading,
  setIsLoading,
}: {
  avatarUrl: string | null
  clothingUrl: string | null
  showClothing: boolean
  clothingColor: string
  isLoading: boolean
  setIsLoading?: (loading: boolean) => void
}) {
  // Unload previous models when URLs change
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

  // Handle model loading completion
  useEffect(() => {
    if (setIsLoading && isLoading) {
      // Add a small delay to ensure the model has time to load
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isLoading, setIsLoading])

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "#e0e0e0",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {isLoading && <LoadingSpinner />}

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Canvas
          shadows
          camera={{ position: [0, 1.5, 3], fov: 50 }}
          onCreated={({ gl }) => {
            gl.setClearColor("#e0e0e0")
            gl.shadowMap.enabled = true
          }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          <Center>
            {avatarUrl ? <Model url={avatarUrl} modelType="avatar" /> : <Placeholder />}

            {clothingUrl && showClothing && avatarUrl && (
              <Model url={clothingUrl} color={clothingColor} modelType="clothing" />
            )}
          </Center>

          <Floor />
          <Environment preset="city" />
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} minDistance={1} maxDistance={10} />
        </Canvas>
      </ErrorBoundary>
    </div>
  )
}
