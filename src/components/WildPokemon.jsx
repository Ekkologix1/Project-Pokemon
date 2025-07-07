import React, { useState, useEffect } from 'react'
import { useSprite } from '../hooks/useSprite'

const WildPokemon = ({ currentPokemon, onEncounter, isLoading, captureResult }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  // Usar el hook de sprite como fallback
  const { sprite, loading: spriteLoading, error: spriteError } = useSprite(
    currentPokemon?.id,
    'official',
    'large',
    { pokemonName: currentPokemon?.name, enablePlaceholder: true }
  )

  // Reset estados cuando cambia el Pokémon
  useEffect(() => {
    if (currentPokemon) {
      setImageLoaded(false)
      setImageError(false)
    }
  }, [currentPokemon?.id])

  const handleImageLoad = () => {
    setImageLoaded(true)
    setImageError(false)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(false)
  }

  // Función para obtener la imagen correcta
  const getImageUrl = () => {
    if (!currentPokemon) return null
    
    // Prioridad: imagen del Pokémon actual, luego sprite del servicio
    if (currentPokemon.image && !imageError) {
      return currentPokemon.image
    }
    
    if (sprite && !spriteError) {
      return sprite
    }
    
    // Fallback final
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${currentPokemon.id}.png`
  }

  const imageUrl = getImageUrl()

  if (isLoading) {
    return (
      <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
        <div className="text-center">
          <div className="mb-6">
            <div className="w-48 h-48 mx-auto bg-white/10 rounded-2xl flex items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
            </div>
          </div>
          <p className="text-xl text-white font-bold animate-pulse">
            Buscando Pokémon salvaje...
          </p>
          <p className="text-white/70 mt-2">
            Explorando la zona...
          </p>
        </div>
      </div>
    )
  }

  if (!currentPokemon) {
    return (
      <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
        <div className="text-center">
          <div className="mb-6">
            <div className="w-48 h-48 mx-auto bg-white/10 rounded-2xl flex items-center justify-center">
              <div className="text-6xl">🔍</div>
            </div>
          </div>
          <p className="text-xl text-white font-bold">
            No hay Pokémon en la zona
          </p>
          <p className="text-white/70 mt-2">
            Presiona "Buscar Nuevo Pokémon" para explorar
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
      <div className="text-center">
        <div className="mb-6">
          <div className="w-48 h-48 mx-auto bg-white/10 rounded-2xl overflow-hidden relative">
            {/* Imagen del Pokémon */}
            {imageUrl && (
              <img
                src={imageUrl}
                alt={currentPokemon.name}
                onLoad={handleImageLoad}
                onError={handleImageError}
                className={`
                  w-full h-full object-contain transition-opacity duration-300
                  ${imageLoaded ? 'opacity-100' : 'opacity-0'}
                `}
                loading="lazy"
              />
            )}
            
            {/* Loading spinner para la imagen */}
            {(!imageLoaded || spriteLoading) && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            )}
            
            {/* Fallback si no hay imagen */}
            {imageError && spriteError && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                <div className="text-center text-white/70">
                  <div className="text-4xl mb-2">❓</div>
                  <div className="text-sm">#{currentPokemon.id}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Información del Pokémon */}
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-white capitalize mb-2">
              {currentPokemon.name}
            </h3>
            <p className="text-white/70">
              #{currentPokemon.id.toString().padStart(3, '0')}
            </p>
          </div>

          {/* Tipos */}
          <div className="flex justify-center gap-2">
            {currentPokemon.types?.map((type, index) => (
              <span
                key={index}
                className={`
                  px-3 py-1 rounded-full text-sm font-medium text-white
                  ${getTypeColor(type)}
                `}
              >
                {type}
              </span>
            ))}
          </div>

          {/* Estadísticas básicas */}
          <div className="grid grid-cols-2 gap-4 text-white/80">
            <div>
              <p className="text-sm opacity-75">Altura</p>
              <p className="font-bold">{(currentPokemon.height / 10).toFixed(1)}m</p>
            </div>
            <div>
              <p className="text-sm opacity-75">Peso</p>
              <p className="font-bold">{(currentPokemon.weight / 10).toFixed(1)}kg</p>
            </div>
          </div>

          {/* Efecto de captura */}
          {captureResult && (
            <div className={`
              p-4 rounded-xl font-bold text-center
              ${captureResult === 'success' 
                ? 'bg-green-500/20 text-green-100' 
                : 'bg-red-500/20 text-red-100'
              }
            `}>
              {captureResult === 'success' ? '¡Capturado!' : '¡Escapó!'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Función para obtener el color del tipo
const getTypeColor = (type) => {
  const colors = {
    normal: 'bg-gray-500',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-500',
    grass: 'bg-green-500',
    ice: 'bg-blue-300',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-700',
    flying: 'bg-indigo-400',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-800',
    ghost: 'bg-purple-700',
    dragon: 'bg-purple-800',
    dark: 'bg-gray-800',
    steel: 'bg-gray-400',
    fairy: 'bg-pink-300'
  }
  return colors[type] || 'bg-gray-500'
}

export default WildPokemon