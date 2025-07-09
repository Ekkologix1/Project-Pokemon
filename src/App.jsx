import { useState, useEffect } from 'react'
import Header from './components/Header'
import PlayerStats from './components/PlayerStats'
import WildPokemon from './components/WildPokemon'
import Collection from './components/Collection'
import Missions from './components/Missions'
import Notification from './components/Notification'
import Pokedex from './components/Pokedex'
import { usePokemonGame } from './hooks/usePokemonGame'
import Storage from './components/Storage'

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
    gameReady,
    purchaseItem,
    useItem
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

  // Iconos SVG temáticos de Pokémon
  const PokemonIcons = {
    hunt: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="pokeball-hunt" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff6b6b"/>
            <stop offset="50%" stopColor="#ff5252"/>
            <stop offset="50%" stopColor="#f5f5f5"/>
            <stop offset="100%" stopColor="#e0e0e0"/>
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="10" fill="url(#pokeball-hunt)" stroke="currentColor" strokeWidth="2"/>
        <path d="M2 12h20" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="3" fill="currentColor"/>
        <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      </svg>
    ),
    collection: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="2" fill="currentColor" opacity="0.2"/>
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M7 8h10M7 12h10M7 16h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="17" cy="16" r="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="17" cy="16" r="1" fill="currentColor"/>
        <path d="M15 14l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    pokedex: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="18" rx="2" fill="currentColor" opacity="0.2"/>
        <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <rect x="5" y="7" width="6" height="4" rx="1" fill="currentColor" opacity="0.4"/>
        <circle cx="8" cy="9" r="1" fill="currentColor"/>
        <path d="M14 8h5M14 11h5M14 14h4M14 17h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <circle cx="18" cy="6" r="1" fill="#ef4444"/>
        <circle cx="20" cy="6" r="0.5" fill="#22c55e"/>
        <path d="M5 15h6" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <path d="M5 17h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    missions: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
              fill="currentColor" opacity="0.8"/>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
              stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
        <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
      </svg>
    ),
    storage: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="7" width="18" height="10" rx="2" fill="currentColor" opacity="0.2"/>
        <rect x="3" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
        <rect x="7" y="10" width="10" height="4" rx="1" fill="currentColor" opacity="0.4"/>
        <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
        <path d="M12 5v2M8 5v2M16 5v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 17v2M12 17v2M18 17v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="9" y="11" width="6" height="2" rx="0.5" fill="currentColor" opacity="0.6"/>
      </svg>
    )
  }

  const menuItems = [
    { id: 'hunt', label: 'Caza Pokémon', icon: PokemonIcons.hunt, color: 'from-red-500 to-orange-500' },
    { id: 'collection', label: 'Colección', icon: PokemonIcons.collection, color: 'from-green-500 to-teal-500' },
    { id: 'pokedex', label: 'Pokédex', icon: PokemonIcons.pokedex, color: 'from-blue-500 to-indigo-500' },
    { id: 'missions', label: 'Misiones', icon: PokemonIcons.missions, color: 'from-purple-500 to-pink-500' },
    { id: 'storage', label: 'Almacén', icon: PokemonIcons.storage, color: 'from-yellow-500 to-amber-500' }
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
              <span className="text-xl flex items-center justify-center">{item.icon}</span>
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
            <span className="text-lg flex items-center justify-center">{item.icon}</span>
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
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg flex items-center justify-center gap-3">
                <svg className="w-8 h-8 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="url(#pokeball-gradient)" stroke="white" strokeWidth="2"/>
                  <path d="M2 12h20" stroke="white" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="3" fill="white" stroke="#333" strokeWidth="1"/>
                  <defs>
                    <linearGradient id="pokeball-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff6b6b"/>
                      <stop offset="50%" stopColor="#ff5252"/>
                      <stop offset="50%" stopColor="#f5f5f5"/>
                      <stop offset="100%" stopColor="#e0e0e0"/>
                    </linearGradient>
                  </defs>
                </svg>
                Pokémon Hunter
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
            <div className="max-w-6xl mx-auto">
              <Pokedex />
            </div>
          )}
          
          {activeTab === 'missions' && (
            <div className="max-w-4xl mx-auto">
              <Missions missions={missions} playerData={playerData} />
            </div>
          )}
          
          {activeTab === 'storage' && (
            <div className="max-w-6xl mx-auto">
              <Storage 
                playerData={playerData} 
                onPurchaseItem={purchaseItem}
                onUseItem={useItem}
              />
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