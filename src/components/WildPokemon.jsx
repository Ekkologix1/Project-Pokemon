import React, { useState, useEffect } from 'react'
import PokemonSphere from './PokemonSphere'
import { getTypeColor, getPokemonRarity, getRarityEmoji } from '../utils/gameUtils'
import './WildPokemon.css'

const WildPokemon = ({ 
  currentPokemon, 
  onEncounter, 
  onCapture, 
  isLoading, 
  isCapturing, 
  captureResult 
}) => {
  const [pokemonEscaped, setPokemonEscaped] = useState(false)
  const [captureAttempts, setCaptureAttempts] = useState(0)
  const [showEscapeAnimation, setShowEscapeAnimation] = useState(false)
  const [isShaking, setIsShaking] = useState(false)

  // Resetear estado cuando aparece un nuevo Pokémon
  useEffect(() => {
    if (currentPokemon) {
      setCaptureAttempts(0)
      setPokemonEscaped(false)
      setShowEscapeAnimation(false)
      setIsShaking(false)
    }
  }, [currentPokemon?.id])

  // Calcular probabilidad de captura basada en intentos fallidos
  const calculateCaptureRate = () => {
    const baseRate = 0.7 // 70% base
    const attemptPenalty = captureAttempts * 0.1 // -10% por cada intento fallido
    const rarityPenalty = currentPokemon ? 
      (currentPokemon.id > 600 ? 0.2 : 0) : 0 // Pokémon más raros son más difíciles
    
    return Math.max(0.2, baseRate - attemptPenalty - rarityPenalty)
  }

  // Calcular probabilidad de escape total
  const calculateEscapeRate = () => {
    const baseEscape = 0.05 // 5% base
    const attemptIncrease = captureAttempts * 0.15 // +15% por cada intento
    const rarityIncrease = currentPokemon ? 
      (currentPokemon.id > 600 ? 0.1 : 0) : 0 // Pokémon raros escapan más
    
    return Math.min(0.6, baseEscape + attemptIncrease + rarityIncrease)
  }

  const handleCapture = async () => {
    if (!currentPokemon || isCapturing || pokemonEscaped) return

    const captureRate = calculateCaptureRate()
    const escapeRate = calculateEscapeRate()
    
    // Incrementar intentos
    setCaptureAttempts(prev => prev + 1)
    
    // Determinar resultado
    const captureSuccess = Math.random() < captureRate
    const willEscape = !captureSuccess && Math.random() < escapeRate
    
    if (willEscape) {
      // El Pokémon escapará después de la animación
      setShowEscapeAnimation(true)
      setTimeout(() => {
        setPokemonEscaped(true)
        setShowEscapeAnimation(false)
      }, 3000) // Esperar a que termine la animación de fallo
    }
    
    // Ejecutar la captura con resultado predeterminado
    if (typeof onCapture === 'function') {
      // Si onCapture acepta un parámetro de éxito, pasarlo
      onCapture(captureSuccess)
    } else {
      // Si no, simular la captura estándar
      onCapture()
    }
  }

  const handlePokemonEscape = () => {
    if (showEscapeAnimation) {
      setTimeout(() => {
        setPokemonEscaped(true)
        setShowEscapeAnimation(false)
      }, 1000)
    }
  }

  const handleFindNewPokemon = () => {
    setPokemonEscaped(false)
    setCaptureAttempts(0)
    setShowEscapeAnimation(false)
    setIsShaking(false)
    onEncounter()
  }

  // Pantalla de carga
  if (isLoading) {
    return (
      <div className="wild-pokemon bg-white/20 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-800 mb-4 mx-auto"></div>
          <p className="text-gray-800 font-semibold text-lg">Buscando Pokémon salvajes...</p>
        </div>
      </div>
    )
  }

  // Pantalla cuando el Pokémon ha escapado
  if (pokemonEscaped) {
    return (
      <div className="wild-pokemon bg-white/20 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
        <div className="text-center">
          <div className="text-6xl mb-4">💨</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">¡El Pokémon escapó!</h3>
          <p className="text-gray-800 font-medium mb-6">
            {currentPokemon?.name} se ha escapado después de {captureAttempts} intentos de captura.
          </p>
          <button
            onClick={handleFindNewPokemon}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🔍 Buscar otro Pokémon
          </button>
        </div>
      </div>
    )
  }

  // Pantalla principal del Pokémon
  if (!currentPokemon) {
    return (
      <div className="wild-pokemon bg-white/20 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
        <div className="text-center">
          <p className="text-gray-800 font-semibold text-lg">No hay Pokémon salvajes cerca...</p>
          <button
            onClick={onEncounter}
            className="mt-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🔍 Buscar Pokémon
          </button>
        </div>
      </div>
    )
  }

  const rarity = getPokemonRarity(currentPokemon.id)
  const rarityEmoji = getRarityEmoji(rarity)
  const captureRate = Math.round(calculateCaptureRate() * 100)
  const escapeRate = Math.round(calculateEscapeRate() * 100)

  return (
    <div className="wild-pokemon bg-white/20 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
      <div className="text-center">
        <div className="mb-6">
          <div className="text-sm text-gray-800 font-semibold mb-2">¡Un Pokémon salvaje apareció!</div>
          <div className="flex justify-center items-center gap-2 mb-4">
            <span className="text-2xl">{rarityEmoji}</span>
            <h2 className="text-2xl font-bold text-gray-900 capitalize">
              {currentPokemon.name}
            </h2>
            <span className="text-2xl">{rarityEmoji}</span>
          </div>
        </div>

        {/* Imagen del Pokémon */}
        <div className={`relative mb-6 ${showEscapeAnimation ? 'animate-bounce' : ''} ${isShaking ? 'animate-pulse' : ''}`}>
          <div className="w-48 h-48 mx-auto bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
            {currentPokemon.image ? (
              <img 
                src={currentPokemon.image} 
                alt={currentPokemon.name}
                className="w-40 h-40 object-contain"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/160x160?text=${currentPokemon.name}`
                }}
              />
            ) : (
              <div className="w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-4xl">❓</span>
              </div>
            )}
          </div>
          
          {/* Indicador de escape */}
          {showEscapeAnimation && (
            <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
              💨
            </div>
          )}
        </div>

        {/* Información del Pokémon */}
        <div className="mb-6">
          <div className="flex justify-center gap-2 mb-4">
            {currentPokemon.types?.map(type => (
              <span
                key={type}
                className="px-3 py-1 rounded-full text-white text-sm font-bold"
                style={{ backgroundColor: getTypeColor(type) }}
              >
                {type}
              </span>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-gray-800 text-sm font-medium">
            <div>
              <span className="font-bold">Altura:</span> {currentPokemon.height / 10}m
            </div>
            <div>
              <span className="font-bold">Peso:</span> {currentPokemon.weight / 10}kg
            </div>
          </div>
        </div>

        {/* Estadísticas de captura */}
        <div className="mb-6 p-4 bg-white/30 rounded-xl border border-gray-300">
          <div className="grid grid-cols-2 gap-4 text-gray-800 text-sm font-medium">
            <div>
              <div className="font-bold text-gray-900">Prob. Captura</div>
              <div className={`text-2xl font-bold ${captureRate > 50 ? 'text-green-600' : captureRate > 30 ? 'text-yellow-600' : 'text-red-600'}`}>
                {captureRate}%
              </div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Prob. Escape</div>
              <div className={`text-2xl font-bold ${escapeRate > 40 ? 'text-red-600' : escapeRate > 20 ? 'text-yellow-600' : 'text-green-600'}`}>
                {escapeRate}%
              </div>
            </div>
          </div>
          
          {captureAttempts > 0 && (
            <div className="mt-2 text-gray-800 text-sm font-medium">
              Intentos de captura: {captureAttempts}
            </div>
          )}
        </div>

        {/* Botones de acción */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleCapture}
            disabled={isCapturing || showEscapeAnimation}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-lg ${
              isCapturing || showEscapeAnimation
                ? 'bg-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600'
            }`}
          >
            {isCapturing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Capturando...
              </>
            ) : (
              <>
                ⚾ Lanzar Pokéball
              </>
            )}
          </button>

          <button
            onClick={onEncounter}
            disabled={isCapturing || showEscapeAnimation}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-lg ${
              isCapturing || showEscapeAnimation
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600'
            }`}
          >
            🔍 Buscar otro
          </button>
        </div>

        {/* Mensaje de resultado */}
        {captureResult && (
          <div className="mt-4">
            {captureResult === 'success' ? (
              <div className="text-green-700 font-bold text-lg">¡Captura exitosa! 🎉</div>
            ) : (
              <div className="text-red-700 font-bold text-lg">¡El Pokémon se liberó! 💥</div>
            )}
          </div>
        )}

        {/* Advertencia de escape */}
        {escapeRate > 30 && !showEscapeAnimation && (
          <div className="mt-4 p-3 bg-red-100 rounded-lg border border-red-300">
            <div className="text-red-700 text-sm font-bold">
              ⚠️ ¡Cuidado! Este Pokémon tiene alta probabilidad de escapar
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WildPokemon