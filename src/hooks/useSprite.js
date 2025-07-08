// src/hooks/useSprite.js
import { useState, useEffect, useCallback } from 'react'
import spriteService from '../Services/SpriteService'

/**
 * Hook personalizado para manejar sprites de Pokémon
 * @param {number} pokemonId - ID del Pokémon
 * @param {string} type - Tipo de sprite ('official', 'front', 'back', 'shiny')
 * @param {string} size - Tamaño del sprite ('small', 'medium', 'large', 'xl')
 * @param {Object} options - Opciones adicionales
 * @returns {Object} Estado y funciones del sprite
 */
export function useSprite(pokemonId, type = 'official', size = 'medium', options = {}) {
  const [sprite, setSprite] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [placeholder, setPlaceholder] = useState(null)

  const {
    pokemonName = '',
    autoRetry = true,
    retryDelay = 1000,
    maxRetries = 3,
    enablePlaceholder = true
  } = options

  const [retryCount, setRetryCount] = useState(0)

  // Generar placeholder
  useEffect(() => {
    if (enablePlaceholder && pokemonName) {
      setPlaceholder(spriteService.generatePlaceholder(pokemonName, size))
    }
  }, [pokemonName, size, enablePlaceholder])

  // Cargar sprite
  const loadSprite = useCallback(async () => {
    if (!pokemonId) return

    setLoading(true)
    setError(null)

    try {
      const spriteUrl = await spriteService.getSprite(pokemonId, type, size)
      setSprite(spriteUrl)
      setRetryCount(0)
    } catch (err) {
      console.error('Error loading sprite:', err)
      setError(err)
      
      // Auto retry si está habilitado
      if (autoRetry && retryCount < maxRetries) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1)
          loadSprite()
        }, retryDelay)
      }
    } finally {
      setLoading(false)
    }
  }, [pokemonId, type, size, autoRetry, retryCount, maxRetries, retryDelay])

  // Efecto para cargar sprite cuando cambien las dependencias
  useEffect(() => {
    loadSprite()
  }, [loadSprite])

  // Función para recargar manualmente
  const reload = useCallback(() => {
    setRetryCount(0)
    loadSprite()
  }, [loadSprite])

  return {
    sprite,
    loading,
    error,
    placeholder,
    reload,
    retryCount,
    isRetrying: retryCount > 0 && retryCount < maxRetries
  }
}

/**
 * Hook para manejar múltiples sprites de un Pokémon
 * @param {number} pokemonId - ID del Pokémon
 * @param {Array<string>} types - Tipos de sprite a cargar
 * @param {string} size - Tamaño de los sprites
 * @param {Object} options - Opciones adicionales
 * @returns {Object} Estado y funciones de los sprites
 */
export function useMultipleSprites(pokemonId, types = ['official'], size = 'medium', options = {}) {
  const [sprites, setSprites] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { pokemonName = '' } = options

  const loadSprites = useCallback(async () => {
    if (!pokemonId || types.length === 0) return

    setLoading(true)
    setError(null)

    try {
      const spriteData = await spriteService.getPokemonSprites(pokemonId, types, size)
      setSprites(spriteData)
    } catch (err) {
      console.error('Error loading sprites:', err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [pokemonId, types, size])

  useEffect(() => {
    loadSprites()
  }, [loadSprites])

  const reload = useCallback(() => {
    loadSprites()
  }, [loadSprites])

  return {
    sprites,
    loading,
    error,
    reload,
    hasSprites: Object.keys(sprites).length > 0
  }
}

/**
 * Hook para precargar sprites
 * @param {Array<number>} pokemonIds - IDs de Pokémon a precargar
 * @param {string} type - Tipo de sprite
 * @param {string} size - Tamaño del sprite
 * @returns {Object} Estado de la precarga
 */
export function usePreloadSprites(pokemonIds = [], type = 'official', size = 'medium') {
  const [isPreloading, setIsPreloading] = useState(false)
  const [preloadProgress, setPreloadProgress] = useState(0)
  const [error, setError] = useState(null)

  const preload = useCallback(async () => {
    if (pokemonIds.length === 0) return

    setIsPreloading(true)
    setError(null)
    setPreloadProgress(0)

    try {
      // Simular progreso
      const progressInterval = setInterval(() => {
        setPreloadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 10
        })
      }, 200)

      await spriteService.preloadSprites(pokemonIds, type, size)
      
      clearInterval(progressInterval)
      setPreloadProgress(100)
    } catch (err) {
      console.error('Error preloading sprites:', err)
      setError(err)
    } finally {
      setIsPreloading(false)
    }
  }, [pokemonIds, type, size])

  useEffect(() => {
    preload()
  }, [preload])

  return {
    isPreloading,
    preloadProgress,
    error,
    reload: preload
  }
}

/**
 * Hook para obtener información del sprite
 * @param {number} pokemonId - ID del Pokémon
 * @param {string} type - Tipo de sprite
 * @param {string} size - Tamaño del sprite
 * @returns {Object} Información del sprite
 */
export function useSpriteInfo(pokemonId, type = 'official', size = 'medium') {
  const [spriteInfo, setSpriteInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadSpriteInfo = useCallback(async () => {
    if (!pokemonId) return

    setLoading(true)
    setError(null)

    try {
      const info = await spriteService.getSpriteInfo(pokemonId, type, size)
      setSpriteInfo(info)
    } catch (err) {
      console.error('Error loading sprite info:', err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [pokemonId, type, size])

  useEffect(() => {
    loadSpriteInfo()
  }, [loadSpriteInfo])

  return {
    spriteInfo,
    loading,
    error,
    reload: loadSpriteInfo
  }
}

/**
 * Hook para manejar el cache de sprites
 * @returns {Object} Funciones y estadísticas del cache
 */
export function useSpriteCache() {
  const [cacheStats, setCacheStats] = useState(null)

  const updateStats = useCallback(() => {
    const stats = spriteService.getCacheStats()
    setCacheStats(stats)
  }, [])

  const clearCache = useCallback((revokeUrls = true) => {
    spriteService.clearCache(revokeUrls)
    updateStats()
  }, [updateStats])

  const configureSpriteService = useCallback((config) => {
    spriteService.configure(config)
    updateStats()
  }, [updateStats])

  useEffect(() => {
    updateStats()
    // Actualizar stats cada 5 segundos
    const interval = setInterval(updateStats, 5000)
    return () => clearInterval(interval)
  }, [updateStats])

  return {
    cacheStats,
    clearCache,
    configureSpriteService,
    updateStats
  }
}
