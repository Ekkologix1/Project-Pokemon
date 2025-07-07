import React, { useState, useEffect } from 'react'
import SpriteService from './Services/SpriteService.js'

const PokemonImage = ({ 
  pokemon, 
  size = 'medium', 
  className = '',
  spriteType = 'official',
  showLoadingSpinner = true,
  showFallbackIndicator = true,
  onImageLoad = () => {},
  onImageError = () => {}
}) => {
  const [sprite, setSprite] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Mapeo de tamaños
  const sizeMap = {
    small: 'w-16 h-16',
    medium: 'w-32 h-32',
    large: 'w-48 h-48',
    xlarge: 'w-64 h-64'
  }

  useEffect(() => {
    if (pokemon) {
      loadSprite()
    }
  }, [pokemon, spriteType])

  const loadSprite = async () => {
    setIsLoading(true)
    setHasError(false)

    try {
      const spriteData = await spriteService.getSprite(pokemon, spriteType)
      setSprite(spriteData)
      onImageLoad(spriteData)
    } catch (error) {
      console.error('Error loading sprite:', error)
      setHasError(true)
      onImageError(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Renderizar placeholder de carga
  if (isLoading && showLoadingSpinner) {
    return (
      <div className={`${sizeMap[size]} ${className} flex items-center justify-center bg-gray-100 rounded-full`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Renderizar error
  if (hasError) {
    return (
      <div className={`${sizeMap[size]} ${className} flex items-center justify-center bg-gray-100 rounded-full`}>
        <div className="text-2xl">❌</div>
      </div>
    )
  }

  return (
    <div className={`${sizeMap[size]} ${className} relative`}>
      <img
        src={sprite?.url}
        alt={pokemon?.name || 'Pokemon'}
        className="w-full h-full object-contain"
        onLoad={() => onImageLoad(sprite)}
        onError={() => {
          setHasError(true)
          onImageError(new Error('Image failed to load'))
        }}
      />
      
      {/* Indicador de placeholder */}
      {sprite?.isPlaceholder && showFallbackIndicator && (
        <div className="absolute bottom-0 right-0 bg-yellow-500 text-white text-xs px-1 py-0.5 rounded-full">
          📷
        </div>
      )}
      
      {/* Indicador de tipo de sprite */}
      {sprite?.type && sprite.type !== 'official' && (
        <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-1 py-0.5 rounded-full">
          {sprite.type}
        </div>
      )}
    </div>
  )
}

export default PokemonImage