import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import * as THREE from "three"

// Center a model in the scene
export function centerModel(model: THREE.Object3D) {
  try {
    const box = new THREE.Box3().setFromObject(model)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())

    // Position the model so its feet are at y=0
    model.position.set(-center.x, -center.y + size.y / 2, -center.z)

    // If the model is very large or very small, scale it appropriately
    const maxDimension = Math.max(size.x, size.y, size.z)
    if (maxDimension > 10) {
      const scale = 2 / maxDimension
      model.scale.set(scale, scale, scale)
    } else if (maxDimension < 0.1) {
      const scale = 2 / maxDimension
      model.scale.set(scale, scale, scale)
    }

    return { center, size }
  } catch (error) {
    console.error("Error in centerModel:", error)
    // Return default values if there's an error
    return {
      center: new THREE.Vector3(),
      size: new THREE.Vector3(1, 1, 1),
    }
  }
}

// Apply color to all meshes in a model
export function applyColorToModel(model: THREE.Object3D, color: string) {
  try {
    model.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        // Clone the material to avoid modifying the cached one
        if (Array.isArray(child.material)) {
          child.material = child.material.map((mat) => {
            const newMat = mat.clone()
            newMat.color.set(color)
            return newMat
          })
        } else {
          child.material = child.material.clone()
          child.material.color.set(color)
        }
      }
    })
  } catch (error) {
    console.error("Error in applyColorToModel:", error)
  }
}

// Create a blob URL from a file
export function createBlobUrl(file: File): string {
  return URL.createObjectURL(file)
}

// Revoke a blob URL to free memory
export function revokeBlobUrl(url: string | null) {
  if (url && url.startsWith("blob:")) {
    URL.revokeObjectURL(url)
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
