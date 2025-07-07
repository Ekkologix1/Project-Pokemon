import React, { useState, useEffect } from 'react'
import { getTypeColor, getPokemonRarity, getRarityEmoji } from '../utils/gameUtils.js'
import spriteService from "../Services/SpriteService.js";

const WildPokemon = ({ 
  pokemon, 
  onCapture, 
  onFlee, 
  isCapturing, 
  captureResult,
  playerLevel 
}) => {
  const [sprite, setSprite] = useState(null)
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const [showStats, setShowStats] = useState(false)

  // Cargar sprite cuando cambia el Pokémon
  useEffect(() => {
    if (pokemon) {
      loadPokemonSprite()
    }
  }, [pokemon])

  // Cargar sprite usando el servicio
  const loadPokemonSprite = async () => {
    setIsImageLoading(true)
    setImageError(false)

    try {
      const spriteData = await spriteService.getSprite(pokemon, 'official', 3000)
      setSprite(spriteData)
    } catch (error) {
      console.error('Error loading sprite:', error)
      setImageError(true)
    } finally {
      setIsImageLoading(false)
    }
  }

  // Animación de captura
  useEffect(() => {
    if (isCapturing) {
      setIsShaking(true)
      const timer = setTimeout(() => {
        setIsShaking(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [isCapturing])

  // Obtener información de rareza
  const rarity = getPokemonRarity(pokemon?.id)
  const rarityEmoji = getRarityEmoji(rarity)

  // Calcular tasa de captura estimada
  const calculateCaptureRate = () => {
    const baseRate = 0.7
    const levelBonus = Math.min(playerLevel * 0.02, 0.2)
    const rarityPenalty = pokemon.id > 600 ? 0.1 : 0
    return Math.min(baseRate + levelBonus - rarityPenalty, 0.95)
  }

  if (!pokemon) {
    return (
      <div className="flex items-center justify-center h-96 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-600 text-lg">Buscando Pokémon salvajes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header con información básica */}
      <div 
        className="px-6 py-4 text-white text-center"
        style={{
          background: `linear-gradient(135deg, ${getTypeColor(pokemon.types[0])} 0%, ${getTypeColor(pokemon.types[1] || pokemon.types[0])} 100%)`
        }}
      >
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h2 className="text-2xl font-bold capitalize">
              {pokemon.name}
            </h2>
            <p className="text-sm opacity-90">
              #{pokemon.id.toString().padStart(3, '0')}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl mb-1">{rarityEmoji}</div>
            <div className="text-sm opacity-90 capitalize">{rarity}</div>
          </div>
        </div>
      </div>

      {/* Imagen del Pokémon */}
      <div className="relative p-8 bg-gray-50">
        <div className="flex justify-center">
          <div 
            className={`relative transition-all duration-300 ${
              isShaking ? 'animate-bounce' : ''
            } ${isCapturing ? 'scale-110' : 'scale-100'}`}
          >
            {isImageLoading ? (
              <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center animate-pulse">
                <div className="text-4xl">⏳</div>
              </div>
            ) : (
              <img
                src={sprite?.url}
                alt={pokemon.name}
                className="w-48 h-48 object-contain drop-shadow-lg"
                onError={() => setImageError(true)}
              />
            )}
            
            {/* Indicador de sprite placeholder */}
            {sprite?.isPlaceholder && (
              <div className="absolute bottom-0 right-0 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                📷
              </div>
            )}
          </div>
        </div>

        {/* Efectos de captura */}
        {captureResult && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`text-6xl animate-bounce ${
              captureResult === 'success' ? 'text-green-500' : 'text-red-500'
            }`}>
              {captureResult === 'success' ? '✨' : '💨'}
            </div>
          </div>
        )}
      </div>

      {/* Información del Pokémon */}
      <div className="p-6">
        {/* Tipos */}
        <div className="flex flex-wrap gap-2 mb-4">
          {pokemon.types.map((type, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full text-white text-sm font-medium capitalize"
              style={{ backgroundColor: getTypeColor(type) }}
            >
              {type}
            </span>
          ))}
        </div>

        {/* Estadísticas básicas */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {(pokemon.height / 10).toFixed(1)}m
            </div>
            <div className="text-sm text-gray-600">Altura</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {(pokemon.weight / 10).toFixed(1)}kg
            </div>
            <div className="text-sm text-gray-600">Peso</div>
          </div>
        </div>

        {/* Tasa de captura */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Probabilidad de captura</span>
            <span className="text-sm font-bold text-gray-800">
              {(calculateCaptureRate() * 100).toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-red-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${calculateCaptureRate() * 100}%` }}
            />
          </div>
        </div>

        {/* Botón para mostrar/ocultar estadísticas */}
        <button
          onClick={() => setShowStats(!showStats)}
          className="w-full mb-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
        >
          {showStats ? 'Ocultar detalles' : 'Ver detalles'} 
          <span className="ml-2">{showStats ? '↑' : '↓'}</span>
        </button>

        {/* Estadísticas detalladas */}
        {showStats && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
            <div className="text-sm">
              <strong>Sprite:</strong> {sprite?.type || 'Cargando...'} 
              {sprite?.isPlaceholder && ' (Placeholder)'}
            </div>
            <div className="text-sm">
              <strong>Generación:</strong> {pokemon.id <= 151 ? 'I' : pokemon.id <= 251 ? 'II' : pokemon.id <= 386 ? 'III' : 'IV+'}
            </div>
            <div className="text-sm">
              <strong>Rareza:</strong> {rarity}
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex gap-3">
          <button
            onClick={onCapture}
            disabled={isCapturing}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-white transition-all duration-200 ${
              isCapturing 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-red-500 hover:bg-red-600 active:scale-95 shadow-lg hover:shadow-xl'
            }`}
          >
            {isCapturing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Capturando...
              </div>
            ) : (
              '🎯 Capturar'
            )}
          </button>
          
          <button
            onClick={onFlee}
            disabled={isCapturing}
            className={`px-4 py-3 rounded-xl font-bold transition-all duration-200 ${
              isCapturing 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700 active:scale-95'
            }`}
          >
            💨 Huir
          </button>
        </div>
      </div>
    </div>
  )
}

export default WildPokemon