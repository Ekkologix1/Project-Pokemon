import { useState, useEffect } from 'react'
import Header from './components/Header'
import PlayerStats from './components/PlayerStats'
import WildPokemon from './components/WildPokemon'
import Collection from './components/Collection'
import Missions from './components/Missions'
import Notification from './components/Notification'
import PokemonSphere from './components/PokemonSphere'
import { usePokemonGame } from './hooks/usePokemonGame'

function App() {
  const {
    playerData,
    currentPokemon,
    missions,
    notification,
    encounterWildPokemon,
    attemptCapture,
    isLoading,
    isCapturing
  } = usePokemonGame()

  const [hasInitialized, setHasInitialized] = useState(false)
  const [activeTab, setActiveTab] = useState('hunt')

  useEffect(() => {
    // Cargar primer Pokémon solo una vez al iniciar
    if (playerData && !hasInitialized) {
      encounterWildPokemon()
      setHasInitialized(true)
    }
  }, [playerData, hasInitialized, encounterWildPokemon])

  // Mostrar loading si no hay datos del jugador
  if (!playerData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mb-4 mx-auto"></div>
            <p className="text-lg">Cargando juego...</p>
          </div>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'hunt', label: 'Cazar', icon: '🎯' },
    { id: 'collection', label: 'Colección', icon: '📚' },
    { id: 'missions', label: 'Misiones', icon: '🎯' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
            🎮 Pokémon Hunter
          </h1>
          <p className="text-xl text-white/90 drop-shadow">
            ¡Explora y captura Pokémon salvajes!
          </p>
        </div>

        {/* Stats */}
        <PlayerStats playerData={playerData} />

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white/30 shadow-lg transform scale-105'
                    : 'hover:bg-white/20'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {activeTab === 'hunt' && (
            <>
              <WildPokemon 
                currentPokemon={currentPokemon}
                onEncounter={encounterWildPokemon}
                onCapture={attemptCapture}
                isLoading={isLoading}
                isCapturing={isCapturing}
              />
              <Collection collection={playerData.collection} />
            </>
          )}
          
          {activeTab === 'collection' && (
            <div className="lg:col-span-2">
              <Collection collection={playerData.collection} />
            </div>
          )}
          
          {activeTab === 'missions' && (
            <div className="lg:col-span-2">
              <Missions missions={missions} playerData={playerData} />
            </div>
          )}
        </div>

        {/* Notification */}
        <Notification notification={notification} />
      </div>
    </div>
  )
}

export default App