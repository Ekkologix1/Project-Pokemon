import React from 'react'
import PokemonSphere from './PokemonSphere'

const WildPokemon = ({ 
currentPokemon, 
onEncounter, 
onCapture, 
onPokemonEscape,
isLoading, 
isCapturing, 
captureResult,
captureAttempts
}) => {
  // Calcular probabilidad aproximada de captura
const calculateDisplayRate = (pokemon, attempts) => {
    if (!pokemon) return 0
    let baseRate = 70
    const attemptPenalty = attempts * 15
    const rarityPenalty = pokemon.id > 600 ? 20 : pokemon.id > 800 ? 30 : 0
    return Math.max(10, Math.min(90, baseRate - attemptPenalty - rarityPenalty))
}

return (
    <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-6 shadow-xl border-4 border-green-300">
    <h2 className="text-2xl font-bold text-center mb-6 text-green-800">
        🌿 Pokémon Salvaje
    </h2>
    
    {isLoading ? (
        <div className="text-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">Buscando Pokémon...</p>
        </div>
    ) : currentPokemon ? (
        <div className="text-center">
          {/* Imagen del Pokémon */}
        <div className="mb-6">
            <img 
            src={currentPokemon.image} 
            alt={currentPokemon.name}
            className="w-48 h-48 object-contain mx-auto rounded-lg bg-white/50 shadow-lg"
            onError={(e) => {
                e.target.src = 'https://via.placeholder.com/192x192?text=Pokemon'
            }}
            />
        </div>
        
          {/* Información del Pokémon */}
        <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray