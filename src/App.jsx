import { useState, useEffect } from 'react'
import Header from './components/Header'
import PlayerStats from './components/PlayerStats'
import WildPokemon from './components/WildPokemon'
import Collection from './components/Collection'
import Missions from './components/Missions'
import Notification from './components/Notification'
import Pokedex from './components/Pokedex'
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
    isCapturing,
    captureResult,
    gameReady
  } = usePokemonGame()

  const [activeTab, setActiveTab] = useState('hunt')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Mostrar loading inicial solo hasta que el juego esté listo
  if (!gameReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mb-4 mx-auto"></div>
            <p className="text-lg font-bold">Inicializando Pokémon Hunter...</p>
            <p className="text-sm opacity-75 mt-2">Preparando tu aventura...</p>
          </div>
        </div>
      </div>
    )
  }

  const menuItems = [
    { id: 'hunt', label: 'Caza Pokémon', icon: '🎯', color: 'from-red-500 to-orange-500' },
    { id: 'collection', label: 'Colección', icon: '📚', color: 'from-green-500 to-teal-500' },
    { id: 'pokedex', label: 'Pokédex', icon: '📖', color: 'from-blue-500 to-indigo-500' },
    { id: 'missions', label: 'Misiones', icon: '🎯', color: 'from-purple-500 to-pink-500' },
    { id: 'storage', label: 'Almacén', icon: '🏪', color: 'from-yellow-500 to-amber-500' }
  ]

  const PokeBallButton = ({ onClick, disabled, capturing }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative w-24 h-24 rounded-full shadow-2xl transform transition-all duration-300
        ${capturing 
          ? 'animate-bounce bg-gradient-to-br from-red-400 to-red-600 scale-110' 
          : 'bg-gradient-to-br from-red-500 to-red-700 hover:scale-110 hover:shadow-3xl'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        border-4 border-white
      `}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-red-700"></div>
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-red-400 to-red-600 rounded-t-full"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-br from-white to-gray-200 rounded-b-full"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-800 rounded-full border-2 border-white"></div>
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800"></div>
      {capturing && (
        <div className="absolute inset-0 rounded-full bg-white/30 animate-pulse"></div>
      )}
    </button>
  )

  const Sidebar = () => (
    <div className={`
      fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-900 to-black 
      transform transition-transform duration-300 z-50 shadow-2xl
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-white">Menú</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white hover:text-gray-300 text-2xl"
          >
            ×
          </button>
        </div>
        
        <nav className="space-y-3">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id)
                setSidebarOpen(false)
              }}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left
                transition-all duration-200 transform hover:scale-105
                ${activeTab === item.id 
                  ? `bg-gradient-to-r ${item.color} text-white shadow-lg` 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
                }
              `}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )

  const MobileTabBar = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white/20 backdrop-blur-sm border-t border-white/20 md:hidden">
      <div className="flex justify-around items-center py-2">
        {menuItems.slice(0, 4).map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`
              flex flex-col items-center space-y-1 px-3 py-2 rounded-lg
              ${activeTab === item.id ? 'text-white bg-white/20' : 'text-white/70'}
            `}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <div className="relative z-10 p-4">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all duration-200"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-white"></div>
                <div className="w-full h-0.5 bg-white"></div>
                <div className="w-full h-0.5 bg-white"></div>
              </div>
            </button>
            
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                🎮 Pokémon Hunter
              </h1>
              <p className="text-lg text-white/90 drop-shadow hidden md:block">
                ¡Explora y captura Pokémon salvajes!
              </p>
            </div>
            
            <div className="w-12"> {/* Spacer */}</div>
          </div>

          {/* Player Stats */}
          <PlayerStats playerData={playerData} />
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4">
          {activeTab === 'hunt' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="space-y-6">
                <WildPokemon 
                  currentPokemon={currentPokemon}
                  onEncounter={encounterWildPokemon}
                  isLoading={isLoading}
                  captureResult={captureResult}
                />
                
                {/* Pokeball Button */}
                <div className="flex justify-center">
                  <PokeBallButton
                    onClick={attemptCapture}
                    disabled={!currentPokemon || isCapturing}
                    capturing={isCapturing}
                  />
                </div>
                
                {isCapturing && (
                  <div className="text-center text-white">
                    <p className="text-lg font-bold animate-pulse">
                      Capturando Pokémon...
                    </p>
                  </div>
                )}

                {/* Botón para buscar nuevo Pokémon */}
                <div className="flex justify-center">
                  <button
                    onClick={encounterWildPokemon}
                    disabled={isLoading}
                    className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all duration-200 disabled:opacity-50"
                  >
                    {isLoading ? 'Buscando...' : 'Buscar Nuevo Pokémon'}
                  </button>
                </div>
              </div>
              
              <div>
                <Collection collection={playerData.collection} />
              </div>
            </div>
          )}
          
          {activeTab === 'collection' && (
            <div className="max-w-6xl mx-auto">
              <Collection collection={playerData.collection} />
            </div>
          )}
          
          {activeTab === 'pokedex' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                  📖 Pokédex
                </h2>
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-xl mb-4">Funcionalidad próximamente</p>
                  <p className="text-gray-300">
                    Aquí podrás ver información detallada de todos los Pokémon
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'missions' && (
            <div className="max-w-4xl mx-auto">
              <Missions missions={missions} playerData={playerData} />
            </div>
          )}
          
          {activeTab === 'storage' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                  🏪 Almacén
                </h2>
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">📦</div>
                  <p className="text-xl mb-4">Almacén en construcción</p>
                  <p className="text-gray-300">
                    Próximamente podrás gestionar tus objetos y pokéballs
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Tab Bar */}
        <MobileTabBar />
      </div>

      {/* Notification */}
      <Notification notification={notification} />
    </div>
  )
}

export default App