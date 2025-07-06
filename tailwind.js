import React, { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'

// Hook personalizado para el juego
const usePokemonGame = () => {
  const [playerData, setPlayerData] = useState({
    level: 1,
    exp: 0,
    pokemonCaught: 0,
    totalEncounters: 0,
    collection: [],
    completedMissions: []
  })
  
  const [currentPokemon, setCurrentPokemon] = useState(null)
  const [missions, setMissions] = useState([])
  const [notification, setNotification] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCapturing, setIsCapturing] = useState(false)
  const [activeTab, setActiveTab] = useState('hunt')

  const API_URL = 'https://pokeapi.co/api/v2/pokemon/'
  const MAX_POKEMON_ID = 898

  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }, [])

  const addExp = useCallback((amount, currentData) => {
    const newExp = currentData.exp + amount
    const expForNextLevel = currentData.level * 100
    
    if (newExp >= expForNextLevel) {
      const newLevel = currentData.level + 1
      showNotification(`¡Subiste al nivel ${newLevel}!`, 'success')
      return { ...currentData, level: newLevel, exp: 0 }
    }
    
    return { ...currentData, exp: newExp }
  }, [showNotification])

  const initializeMissions = useCallback(() => {
    return [
      {
        id: 'first_catch',
        title: 'Primer Captura',
        description: 'Captura tu primer Pokémon',
        target: 1,
        reward: 100,
        type: 'catch'
      },
      {
        id: 'collector',
        title: 'Coleccionista',
        description: 'Captura 5 Pokémon diferentes',
        target: 5,
        reward: 250,
        type: 'catch'
      },
      {
        id: 'explorer',
        title: 'Explorador',
        description: 'Realiza 10 encuentros',
        target: 10,
        reward: 150,
        type: 'encounter'
      }
    ]
  }, [])

  const encounterWildPokemon = useCallback(async () => {
    setIsLoading(true)
    
    try {
      const randomId = Math.floor(Math.random() * MAX_POKEMON_ID) + 1
      const response = await fetch(`${API_URL}${randomId}`)
      
      if (!response.ok) throw new Error('Pokemon not found')
      
      const pokemon = await response.json()
      const pokemonData = {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default,
        types: pokemon.types.map(type => type.type.name),
        height: pokemon.height,
        weight: pokemon.weight
      }
      
      setCurrentPokemon(pokemonData)
      
      setPlayerData(currentData => ({
        ...currentData,
        totalEncounters: currentData.totalEncounters + 1
      }))
      
    } catch (error) {
      console.error('Error fetching Pokemon:', error)
      showNotification('Error al buscar Pokémon. Intenta de nuevo.', 'error')
    } finally {
      setIsLoading(false)
    }
  }, [showNotification])

  const attemptCapture = useCallback(async () => {
    if (!currentPokemon || isCapturing) return

    setIsCapturing(true)

    setTimeout(() => {
      const success = Math.random() < 0.7
      
      if (success) {
        setPlayerData(currentData => {
          const alreadyCaught = currentData.collection.some(p => p.id === currentPokemon.id)
          
          const newCollection = alreadyCaught 
            ? currentData.collection
            : [...currentData.collection, { ...currentPokemon, caughtAt: new Date().toISOString() }]
          
          let newData = {
            ...currentData,
            pokemonCaught: currentData.pokemonCaught + 1,
            collection: newCollection
          }
          
          const expAmount = alreadyCaught ? 10 : 25
          newData = addExp(expAmount, newData)
          
          return newData
        })
        
        showNotification('¡Pokémon capturado!', 'success')
        setTimeout(() => encounterWildPokemon(), 1000)
      } else {
        showNotification('¡El Pokémon escapó!', 'error')
      }
      
      setIsCapturing(false)
    }, 1500)
  }, [currentPokemon, isCapturing, addExp, showNotification, encounterWildPokemon])

  useEffect(() => {
    setMissions(initializeMissions())
  }, [initializeMissions])

  useEffect(() => {
    encounterWildPokemon()
  }, [])

  return {
    playerData,
    currentPokemon,
    missions,
    notification,
    encounterWildPokemon,
    attemptCapture,
    isLoading,
    isCapturing,
    activeTab,
    setActiveTab
  }
}

// Componente de animación 3D
const PokemonSphere = ({ isCapturing, pokemonName }) => {
  const mountRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const sphereRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Configurar Three.js
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 200 / 200, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    
    renderer.setSize(200, 200)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    // Crear esfera
    const geometry = new THREE.SphereGeometry(1, 32, 32)
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x4facfe,
      shininess: 100,
      transparent: true,
      opacity: 0.8
    })
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    // Añadir luces
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
    scene.add(ambientLight)
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    camera.position.z = 3

    sceneRef.current = scene
    rendererRef.current = renderer
    sphereRef.current = sphere

    // Animación
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate)
      
      if (sphereRef.current) {
        sphereRef.current.rotation.x += 0.01
        sphereRef.current.rotation.y += 0.01
        
        if (isCapturing) {
          sphereRef.current.scale.x = 1 + Math.sin(Date.now() * 0.01) * 0.3
          sphereRef.current.scale.y = 1 + Math.sin(Date.now() * 0.01) * 0.3
          sphereRef.current.scale.z = 1 + Math.sin(Date.now() * 0.01) * 0.3
        } else {
          sphereRef.current.scale.set(1, 1, 1)
        }
      }
      
      renderer.render(scene, camera)
    }
    
    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [isCapturing, pokemonName])

  return <div ref={mountRef} className="flex justify-center items-center w-50 h-50" />
}

// Componente de notificación
const Notification = ({ notification }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (notification) {
      setIsVisible(true)
      const timer = setTimeout(() => setIsVisible(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  if (!notification || !isVisible) return null

  const getNotificationStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-gradient-to-r from-green-400 to-blue-500 text-white'
      case 'error':
        return 'bg-gradient-to-r from-red-400 to-pink-500 text-white'
      case 'warning':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900'
      default:
        return 'bg-gradient-to-r from-blue-400 to-purple-500 text-white'
    }
  }

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${getNotificationStyles(notification.type)} ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
      <div className="flex items-center gap-2">
        <span className="text-lg">
          {notification.type === 'success' ? '✅' : notification.type === 'error' ? '❌' : '📢'}
        </span>
        <span className="font-semibold">{notification.message}</span>
      </div>
    </div>
  )
}

// Componente de estadísticas del jugador
const PlayerStats = ({ playerData }) => {
  const uniquePokemon = playerData.collection.reduce((unique, pokemon) => {
    if (!unique.some(p => p.id === pokemon.id)) {
      unique.push(pokemon)
    }
    return unique
  }, [])

  const stats = [
    { label: 'Nivel', value: playerData.level, color: 'bg-purple-500', icon: '⭐' },
    { label: 'Experiencia', value: playerData.exp, color: 'bg-blue-500', icon: '💎' },
    { label: 'Únicos', value: uniquePokemon.length, color: 'bg-green-500', icon: '🎯' },
    { label: 'Capturados', value: playerData.pokemonCaught, color: 'bg-red-500', icon: '🎣' },
    { label: 'Encuentros', value: playerData.totalEncounters, color: 'bg-yellow-500', icon: '🔍' }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className={`${stat.color} text-white rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-300 shadow-lg`}>
          <div className="text-2xl mb-1">{stat.icon}</div>
          <div className="text-2xl font-bold">{stat.value}</div>
          <div className="text-sm opacity-90">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

// Componente de caza de Pokémon
const PokemonHunt = ({ currentPokemon, onEncounter, onCapture, isLoading, isCapturing }) => {
  const getTypeColor = (type) => {
    const typeColors = {
      normal: 'bg-gray-400', fighting: 'bg-red-600', flying: 'bg-indigo-400', poison: 'bg-purple-600',
      ground: 'bg-yellow-600', rock: 'bg-yellow-800', bug: 'bg-green-400', ghost: 'bg-purple-800',
      steel: 'bg-gray-500', fire: 'bg-red-500', water: 'bg-blue-500', grass: 'bg-green-500',
      electric: 'bg-yellow-400', psychic: 'bg-pink-500', ice: 'bg-cyan-300', dragon: 'bg-indigo-600',
      dark: 'bg-gray-800', fairy: 'bg-pink-300'
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

// Componente de colección
const Collection = ({ collection }) => {
  const uniquePokemon = collection.reduce((unique, pokemon) => {
    if (!unique.some(p => p.id === pokemon.id)) {
      unique.push(pokemon)
    }
    return unique
  }, [])

  return (
    <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-6 shadow-xl border-4 border-yellow-300">
      <h2 className="text-2xl font-bold text-center mb-6 text-yellow-800">📚 Tu Colección</h2>
      
      <div className="max-h-96 overflow-y-auto space-y-3">
        {uniquePokemon.length === 0 ? (
          <p className="text-center text-gray-500 py-8 italic">
            Tu colección está vacía. ¡Captura tu primer Pokémon!
          </p>
        ) : (
          uniquePokemon.map(pokemon => (
            <div key={pokemon.id} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-4">
                <img 
                  src={pokemon.image} 
                  alt={pokemon.name}
                  className="w-16 h-16 object-contain rounded-full bg-gray-100 p-2"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/64x64?text=Pokemon'
                  }}
                />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 capitalize">{pokemon.name}</h3>
                  <p className="text-sm text-gray-600">
                    Capturado: {new Date(pokemon.caughtAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  #{pokemon.id}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// Componente de misiones
const Missions = ({ missions, playerData }) => {
  const calculateProgress = (mission) => {
    let progress = 0
    switch (mission.type) {
      case 'catch':
        progress = playerData.collection.reduce((unique, pokemon) => {
          if (!unique.some(p => p.id === pokemon.id)) {
            unique.push(pokemon)
          }
          return unique
        }, []).length
        break
      case 'encounter':
        progress = playerData.totalEncounters
        break
      case 'level':
        progress = playerData.level
        break
      default:
        progress = 0
    }
    return Math.min(progress, mission.target)
  }

  const isCompleted = (mission) => {
    return playerData.completedMissions.includes(mission.id)
  }

  return (
    <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 shadow-xl border-4 border-purple-300">
      <h2 className="text-2xl font-bold text-center mb-6 text-purple-800">🎯 Misiones</h2>
      
      <div className="space-y-4">
        {missions.map(mission => {
          const progress = calculateProgress(mission)
          const completed = isCompleted(mission)
          const progressPercentage = Math.min((progress / mission.target) * 100, 100)
          
          return (
            <div 
              key={mission.id} 
              className={`bg-white rounded-xl p-4 shadow-md transition-all duration-300 ${
                completed ? 'bg-green-50 border-2 border-green-300' : 'hover:shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-800">{mission.title}</h3>
                {completed && <span className="text-green-500 text-xl">✅</span>}
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{mission.description}</p>
              
              <div className="mb-3">
                <div className="bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      completed ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 text-center">
                  {progress}/{mission.target} {completed ? '✓ Completada' : ''}
                </div>
              </div>
              
              <div className={`text-sm font-bold px-3 py-1 rounded-full text-center ${
                completed ? 'bg-green-500 text-white' : 'bg-yellow-400 text-gray-800'
              }`}>
                {completed ? '🎉 Recompensa obtenida' : `💰 ${mission.reward} EXP`}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Componente principal
const PokemonHunter = () => {
  const {
    playerData,
    currentPokemon,
    missions,
    notification,
    encounterWildPokemon,
    attemptCapture,
    isLoading,
    isCapturing,
    activeTab,
    setActiveTab
  } = usePokemonGame()

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
              <PokemonHunt 
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

export default PokemonHunter