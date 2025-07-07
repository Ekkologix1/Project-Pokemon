// src/components/PokemonSprite.jsx
import React from 'react'
import { useSprite } from '../hooks/useSprite'

/**
 * Componente para mostrar sprites de Pokémon con carga optimizada
 * @param {Object} props - Propiedades del componente
 * @param {number} props.pokemonId - ID del Pokémon
 * @param {string} props.pokemonName - Nombre del Pokémon
 * @param {string} props.type - Tipo de sprite ('official', 'front', 'back', 'shiny')
 * @param {string} props.size - Tamaño del sprite ('small', 'medium', 'large', 'xl')
 * @param {string} props.className - Clases CSS adicionales
 * @param {string} props.alt - Texto alternativo para la imagen
 * @param {Function} props.onLoad - Callback cuando la imagen se carga
 * @param {Function} props.onError - Callback cuando hay error
 * @param {boolean} props.showPlaceholder - Si mostrar placeholder mientras carga
 * @param {boolean} props.lazy - Si usar lazy loading
 * @param {Object} props.spriteOptions - Opciones adicionales para el sprite
 * @returns {React.Component} Componente PokemonSprite
 */
const PokemonSprite = ({
  pokemonId,
  pokemonName = '',
  type = 'official',
  size = 'medium',
  className = '',
  alt,
  onLoad,
  onError,
  showPlaceholder = true,
  lazy = true,
  spriteOptions = {},
  ...props
}) => {
  const {
    sprite,
    loading,
    error,
    placeholder,
    reload,
    retryCount,
    isRetrying
  } = useSprite(pokemonId, type, size, {
    pokemonName,
    enablePlaceholder: showPlaceholder,
    ...spriteOptions
  })

  // Clases CSS base
  const baseClasses = 'pokemon-sprite transition-all duration-300'
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24 md:w-32 md:h-32',
    large: 'w-40 h-40 md:w-48 md:h-48',
    xl: 'w-56 h-56 md:w-64 md:h-64'
  }
  
  const finalClasses = `${baseClasses} ${sizeClasses[size]} ${className}`

  // Manejar eventos de carga
  const handleLoad = (e) => {
    if (onLoad) onLoad(e)
  }

  const handleError = (e) => {
    if (onError) onError(e)
    console.error(`Error loading sprite for Pokemon ${pokemonId}:`, error)
  }

  // Componente de loading
  const LoadingSprite = () => (
    <div className={`${finalClasses} bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border-2 border-white/30`}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-2 mx-auto"></div>
        <p className="text-white text-xs opacity-80">
          {isRetrying ? `Reintentando... (${retryCount})` : 'Cargando...'}
        </p>
      </div>
    </div>
  )

  // Componente de error
  const ErrorSprite = () => (
    <div className={`${finalClasses} bg-red-100 border-2 border-red-300 rounded-xl flex items-center justify-center cursor-pointer hover:bg-red-200 transition-colors`}
         onClick={reload}>
      <div className="text-center p-2">
        <div className="text-red-500 text-2xl mb-1">⚠️</div>
        <p className="text-red-600 text-xs font-medium">Error al cargar</p>
        <p className="text-red-500 text-xs">Toca para reintentar</p>
      </div>
    </div>
  )

  // Componente de placeholder
  const PlaceholderSprite = () => (
    <div className={`${finalClasses} overflow-hidden rounded-xl`}>
      <img
        src={placeholder}
        alt={alt || `${pokemonName} placeholder`}
        className="w-full h-full object-cover"
        loading={lazy ? 'lazy' : 'eager'}
      />
    </div>
  )

  // Renderizar según el estado
  if (loading) {
    return showPlaceholder && placeholder ? <PlaceholderSprite /> : <LoadingSprite />
  }

  if (error && !sprite) {
    return <ErrorSprite />
  }

  // Sprite principal
  return (
    <div className={`${finalClasses} overflow-hidden rounded-xl relative group`}>
      <img
        src={sprite}
        alt={alt || `${pokemonName} sprite`}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        onLoad={handleLoad}
        onError={handleError}
        loading={lazy ? 'lazy' : 'eager'}
        {...props}
      />
      
      {/* Overlay con información adicional */}
      {pokemonName && (
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-white text-center">
            <p className="font-bold text-sm capitalize">{pokemonName}</p>
            <p className="text-xs opacity-80">#{pokemonId}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default PokemonSprite