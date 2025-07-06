import React from 'react'
import PokemonSphere from './PokemonSphere'

const WildPokemon = ({ currentPokemon, onEncounter, onCapture, isLoading, isCapturing }) => {
const getTypeColor = (type) => {
    const typeColors = {
    normal: 'bg-gray-400', 
    fighting: 'bg-red-600', 
    flying: 'bg-indigo-400', 
    poison: 'bg-purple-600',
    ground: 'bg-yellow-600', 
    rock: 'bg-yellow-800', 
    bug: 'bg-green-400', 
    ghost: 'bg-purple-800',
    steel: 'bg-gray-500', 
    fire: 'bg-red-500', 
    water: 'bg-blue-500', 
    grass: 'bg-green-500',
    electric: 'bg-yellow-400', 
    psychic: 'bg-pink-500', 
    ice: 'bg-cyan-300', 
    dragon: 'bg-indigo-600',
    dark: 'bg-gray-800', 
    fairy: 'bg-pink-300'
    }
    return typeColors[type] || 'bg-gray-400'
}

return (
    <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-8 shadow-xl border-4 border-green-300">
    <h2 className="text-2xl font-bold text-center mb-6 text-green-800">🌿 Pokémon Salvaje</h2>
    
    <div className="flex flex-col items-center min-h-[400px] justify-center">
        {isLoading ? (
        <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mb-4"></div>
            <p className="text-gray-600">🔍 Buscando Pokémon salvajes...</p>
        </div>
        ) : currentPokemon ? (
        <>
            <div className="bg-white rounded-full p-6 mb-6 shadow-lg">
            <img 
                src={currentPokemon.image} 
                alt={currentPokemon.name}
                className="w-32 h-32 object-contain"
                onError={(e) => {
                e.target.src = 'https://via.placeholder.com/128x128?text=Pokemon'
                }}
            />
            </div>
            
            <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 capitalize mb-2">{currentPokemon.name}</h3>
            <div className="flex justify-center gap-2 mb-4">
                {currentPokemon.types.map(type => (
                <span 
                    key={type} 
                    className={`${getTypeColor(type)} text-white px-3 py-1 rounded-full text-sm font-semibold uppercase`}
                >
                    {type}
                </span>
                ))}
            </div>
            <p className="text-gray-600">
                Altura: {currentPokemon.height / 10}m | Peso: {currentPokemon.weight / 10}kg
            </p>
            </div>
            
            <div className="mb-6">
            <PokemonSphere isCapturing={isCapturing} pokemonName={currentPokemon.name} />
            </div>
            
            <button 
            onClick={onCapture}
            disabled={isCapturing}
            className={`bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg transform transition-all duration-300 ${
                isCapturing ? 'animate-pulse scale-110' : 'hover:scale-105'
            } disabled:opacity-50`}
            >
            {isCapturing ? '⚡ Capturando...' : '🎯 Capturar'}
            </button>
        </>
        ) : (
        <div className="text-center text-gray-500">
            ❌ Error al cargar Pokémon
        </div>
        )}
    </div>
    
    <button 
        onClick={onEncounter}
        disabled={isLoading || isCapturing}
        className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-xl font-bold text-lg mt-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
    >
        🌿 Buscar Pokémon
    </button>
    </div>
)
}

export default WildPokemon