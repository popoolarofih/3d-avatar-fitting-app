import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import * as THREE from "three"

// Center a model in the scene
export function centerModel(model: THREE.Object3D) {
  const box = new THREE.Box3().setFromObject(model)
  const center = box.getCenter(new THREE.Vector3())
  const size = box.getSize(new THREE.Vector3())

  // Position the model so its feet are at y=0
  model.position.set(-center.x, -center.y + size.y / 2, -center.z)

  return { center, size }
}

// Apply color to all meshes in a model
export function applyColorToModel(model: THREE.Object3D, color: string) {
  model.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material) {
      // Clone the material to avoid modifying the cached one
      child.material = child.material.clone()
      child.material.color.set(color)
    }
  })
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
