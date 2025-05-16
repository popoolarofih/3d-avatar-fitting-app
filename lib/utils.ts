import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import * as THREE from 'three';

/**
 * Normalizes a 3D model to a standard height and centers it
 * @param {THREE.Object3D} model - The model to normalize
 * @param {number} targetHeight - Desired height in units
 * @return {Object} Model information including bounds and scale
 */
export const normalizeModel = (model, targetHeight = 1.7) => {
  // Calculate bounding box
  const bbox = new THREE.Box3().setFromObject(model);
  const size = new THREE.Vector3();
  bbox.getSize(size);
  
  // Calculate center
  const center = new THREE.Vector3();
  bbox.getCenter(center);
  
  // Calculate scale to normalize height
  const modelHeight = size.y;
  const scale = targetHeight / modelHeight;
  
  // Apply scale
  model.scale.set(scale, scale, scale);
  
  // Re-center the model so it stands on the ground
  model.position.y = -bbox.min.y * scale;
  model.position.x = -center.x * scale;
  model.position.z = -center.z * scale;
  
  // Re-calculate bounding box after scaling
  const newBbox = new THREE.Box3().setFromObject(model);
  const newSize = new THREE.Vector3();
  newBbox.getSize(newSize);
  
  return {
    originalSize: size,
    normalizedSize: newSize,
    scale,
    boundingBox: newBbox
  };
};

/**
 * @param {THREE.Object3D} clothingModel - The clothing model
 * @param {THREE.Object3D} avatarModel - The avatar model
 * @return {boolean} Success or failure of the fitting
 */
export const fitClothingToAvatar = (clothingModel, avatarModel) => {
  try {
    const avatarBbox = new THREE.Box3().setFromObject(avatarModel);
    const avatarCenter = new THREE.Vector3();
    avatarBbox.getCenter(avatarCenter);
    
    clothingModel.position.set(0, 0, 0);
    clothingModel.rotation.set(0, 0, 0);
    
    const avatarSize = new THREE.Vector3();
    avatarBbox.getSize(avatarSize);
    
    const clothingBbox = new THREE.Box3().setFromObject(clothingModel);
    const clothingSize = new THREE.Vector3();
    clothingBbox.getSize(clothingSize);
    
    // Scale factors based on width and height ratios
    const widthRatio = avatarSize.x / clothingSize.x;
    const heightRatio = avatarSize.y / clothingSize.y;
    
    // Use the smaller ratio to avoid overstretching
    const scaleRatio = Math.min(widthRatio, heightRatio) * 0.95; // Slightly smaller to avoid clipping
    
    clothingModel.scale.set(scaleRatio, scaleRatio, scaleRatio);
    
    // Re-calculate clothing bounding box after scaling
    const newClothingBbox = new THREE.Box3().setFromObject(clothingModel);
    const clothingCenter = new THREE.Vector3();
    newClothingBbox.getCenter(clothingCenter);
    
    // Center the clothing on the avatar
    clothingModel.position.x = avatarCenter.x - clothingCenter.x;
    clothingModel.position.z = avatarCenter.z - clothingCenter.z;
    
    // Vertical alignment - match the bottoms if clothing is full-body
    const avatarBottom = avatarBbox.min.y;
    const clothingBottom = newClothingBbox.min.y;
    
    // Check if it's a top or full-body clothing by comparing heights
    const isTop = clothingSize.y < avatarSize.y * 0.5;
    
    if (isTop) {
      // For top clothing, position at shoulder height (approx upper third of avatar)
      const avatarShoulder = avatarBbox.min.y + (avatarSize.y * 0.7);
      const clothingMiddle = (newClothingBbox.max.y + newClothingBbox.min.y) / 2;
      clothingModel.position.y = avatarShoulder - clothingMiddle;
    } else {
      // For full body clothing, align at the bottom
      clothingModel.position.y = avatarBottom - clothingBottom;
    }
    
    return true;
  } catch (error) {
    console.error("Error fitting clothing to avatar:", error);
    return false;
  }
};

/**
 * Applies a color to a model's materials
 * @param {THREE.Object3D} model - The model to color
 * @param {string} hexColor - Color in hex format (e.g., #FF0000)
 */
export const applyColorToModel = (model, hexColor) => {
  const color = new THREE.Color(hexColor);
  
  model.traverse((child) => {
    if (child.isMesh && child.material) {
      // If material is an array, apply to all materials
      if (Array.isArray(child.material)) {
        child.material = child.material.map((mat) => {
          const newMat = mat.clone();
          newMat.color.set(color);
          return newMat;
        });
      } else {
        // Clone the material to avoid affecting other instances
        const newMaterial = child.material.clone();
        newMaterial.color.set(color);
        child.material = newMaterial;
      }
    }
  });
};

/**
 * Validates if the file is a supported 3D model format
 * @param {File} file - File to validate
 * @return {boolean} Is valid or not
 */
export const isValidModelFile = (file) => {
  const validExtensions = ['.glb', '.gltf'];
  const fileName = file.name.toLowerCase();
  return validExtensions.some(ext => fileName.endsWith(ext));
};
