"use client"

import { useState, useEffect } from "react"
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader"

export function useModel(url: string | null) {
  const [model, setModel] = useState<GLTF | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!url) {
      setModel(null)
      setError(null)
      setLoading(false)
      return
    }

    let isMounted = true
    setLoading(true)

    // This is just a type definition, the actual loader is provided by drei's useGLTF
    const loader = {
      load: (
        url: string,
        onLoad: (gltf: GLTF) => void,
        onProgress: (event: ProgressEvent) => void,
        onError: (error: Error) => void,
      ) => {
        // This is a placeholder - the actual loading is done by useGLTF in the components
        return null
      },
    }

    // Clean up function
    return () => {
      isMounted = false
    }
  }, [url])

  return { model, loading, error }
}
