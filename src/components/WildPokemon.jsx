import React from 'react'
import PokemonSphere from './PokemonSphere'

const WildPokemon = ({ 
currentPokemon, 
onEncounter, 
onCapture, 
isLoading, 
isCapturing, 
captureResult 
}) => {
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
            <h3 className="text-2xl font-bold text-gray-800 capitalize mb-2">
            {currentPokemon.name}
            </h3>
            <p className="text-gray-600 mb-2">#{currentPokemon.id}</p>
            
            {/* Tipos */}
            <div className="flex justify-center gap-2 mb-4">
            {currentPokemon.types.map(type => (
                <span 
                key={type}
                className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-bold capitalize"
                >
                {type}
                </span>
            ))}
            </div>
            
            {/* Estadísticas */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
                <strong>Altura:</strong> {currentPokemon.height / 10} m
            </div>
            <div>
                <strong>Peso:</strong> {currentPokemon.weight / 10} kg
            </div>
            </div>
        </div>
        
          {/* Pokéballs animadas */}
        <div className="mb-6">
            <PokemonSphere 
            isCapturing={isCapturing}
            pokemonName={currentPokemon.name}
            captureResult={captureResult}
            />
        </div>
        
          {/* Botones de acción */}
        <div className="flex justify-center gap-4">
            <button
            onClick={onCapture}
            disabled={isCapturing}
            className={`px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 ${
                isCapturing 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-red-500 hover:bg-red-600 hover:scale-105 shadow-lg'
            }`}
            >
            {isCapturing ? (
                <>
                <span className="animate-spin mr-2">⚡</span>
                Capturando...
                </>
            ) : (
                <>
                🎯 Capturar
                </>
            )}
            </button>
            
            <button
            onClick={onEncounter}
            disabled={isCapturing}
            className={`px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 ${
                isCapturing 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 hover:scale-105 shadow-lg'
            }`}
            >
            🔄 Buscar Otro
            </button>
        </div>
        </div>
    ) : (
        <div className="text-center py-12">
        <p className="text-lg text-gray-600 mb-4">
            No hay Pokémon en el área
        </p>
        <button
            onClick={onEncounter}
            className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors"
        >
            🔍 Buscar Pokémon
        </button>
        </div>
    )}
    </div>
)
}

export default WildPokemon