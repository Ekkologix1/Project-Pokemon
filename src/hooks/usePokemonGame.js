import { useState, useEffect, useCallback } from 'react'

export function usePokemonGame() {
  // Estado inicial con datos por defecto - inicializado inmediatamente
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
  const [captureResult, setCaptureResult] = useState(null)
  const [gameInitialized, setGameInitialized] = useState(false)

  const API_URL = 'https://pokeapi.co/api/v2/pokemon/'
  const MAX_POKEMON_ID = 1010

  // Mostrar notificación
  const showNotification = useCallback((message, type = 'success') => {
    console.log(`[NOTIFICATION] ${type}: ${message}`)
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }, [])

  // Añadir experiencia
  const addExp = useCallback((amount) => {
    console.log(`[EXP] Añadiendo ${amount} experiencia`)
    setPlayerData(currentData => {
      const newExp = currentData.exp + amount
      const expForNextLevel = currentData.level * 100
      
      if (newExp >= expForNextLevel) {
        const newLevel = currentData.level + 1
        showNotification(`¡Subiste al nivel ${newLevel}!`, 'success')
        return { ...currentData, level: newLevel, exp: 0 }
      }
      
      return { ...currentData, exp: newExp }
    })
  }, [showNotification])

  // Verificar y actualizar misiones
  const checkMissions = useCallback((data) => {
    console.log('[MISSIONS] Verificando misiones con datos:', data)
    setMissions(currentMissions => {
      return currentMissions.map(mission => {
        if (data.completedMissions.includes(mission.id)) {
          return { ...mission, progress: mission.target }
        }
        
        let progress = 0
        switch (mission.type) {
          case 'catch':
            progress = data.collection.reduce((unique, pokemon) => {
              if (!unique.some(p => p.id === pokemon.id)) {
                unique.push(pokemon)
              }
              return unique
            }, []).length
            break
          case 'encounter':
            progress = data.totalEncounters
            break
          case 'level':
            progress = data.level
            break
          default:
            progress = 0
        }
        
        // Completar misión si alcanzó el objetivo
        if (progress >= mission.target && !data.completedMissions.includes(mission.id)) {
          console.log(`[MISSIONS] Completando misión: ${mission.title}`)
          setTimeout(() => {
            setPlayerData(prevData => {
              const newData = {
                ...prevData,
                completedMissions: [...prevData.completedMissions, mission.id]
              }
              addExp(mission.reward)
              showNotification(`¡Misión completada: ${mission.title}! +${mission.reward} EXP`, 'success')
              return newData
            })
          }, 100)
        }
        
        return { ...mission, progress }
      })
    })
  }, [addExp, showNotification])

  // Crear un Pokémon de emergencia
  const createFallbackPokemon = useCallback((id = 25) => {
    const fallbackPokemons = {
      25: {
        id: 25,
        name: 'pikachu',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        types: ['electric'],
        height: 4,
        weight: 60,
        stats: [
          { name: 'hp', value: 35 },
          { name: 'attack', value: 55 },
          { name: 'defense', value: 40 },
          { name: 'special-attack', value: 50 },
          { name: 'special-defense', value: 50 },
          { name: 'speed', value: 90 }
        ]
      },
      1: {
        id: 1,
        name: 'bulbasaur',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        types: ['grass', 'poison'],
        height: 7,
        weight: 69,
        stats: [
          { name: 'hp', value: 45 },
          { name: 'attack', value: 49 },
          { name: 'defense', value: 49 },
          { name: 'special-attack', value: 65 },
          { name: 'special-defense', value: 65 },
          { name: 'speed', value: 45 }
        ]
      }
    }
    
    return fallbackPokemons[id] || fallbackPokemons[25]
  }, [])

  // Encontrar Pokémon salvaje
  const encounterWildPokemon = useCallback(async () => {
    console.log('[POKEMON] Iniciando búsqueda de Pokémon salvaje...')
    setIsLoading(true)
    setCaptureResult(null)
    
    try {
      // Usar rango más pequeño para mayor confiabilidad
      const randomId = Math.floor(Math.random() * 151) + 1
      console.log('[POKEMON] Buscando Pokémon con ID:', randomId)
      
      const response = await fetch(`${API_URL}${randomId}`)
      console.log('[POKEMON] Respuesta de API:', response.status)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const pokemon = await response.json()
      console.log('[POKEMON] Pokémon encontrado:', pokemon.name, '#' + pokemon.id)
      
      const pokemonData = {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other?.['official-artwork']?.front_default || 
               pokemon.sprites.other?.['dream_world']?.front_default ||
               pokemon.sprites.front_default ||
               `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
        types: pokemon.types.map(type => type.type.name),
        height: pokemon.height,
        weight: pokemon.weight,
        stats: pokemon.stats.map(stat => ({
          name: stat.stat.name,
          value: stat.base_stat
        }))
      }
      
      console.log('[POKEMON] Datos del Pokémon procesados:', pokemonData)
      setCurrentPokemon(pokemonData)
      
      // Actualizar encuentros
      setPlayerData(currentData => {
        const newData = {
          ...currentData,
          totalEncounters: currentData.totalEncounters + 1
        }
        
        console.log('[POKEMON] Actualizando encuentros:', newData.totalEncounters)
        setTimeout(() => checkMissions(newData), 100)
        return newData
      })
      
    } catch (error) {
      console.error('[POKEMON] Error fetching Pokemon:', error)
      showNotification('Conexión lenta, usando Pokémon local...', 'info')
      
      // Usar Pokémon de emergencia inmediatamente
      const fallbackId = Math.floor(Math.random() * 2) === 0 ? 25 : 1
      const fallbackPokemon = createFallbackPokemon(fallbackId)
      
      console.log('[POKEMON] Usando Pokémon de emergencia:', fallbackPokemon.name)
      setCurrentPokemon(fallbackPokemon)
      
      setPlayerData(currentData => {
        const newData = {
          ...currentData,
          totalEncounters: currentData.totalEncounters + 1
        }
        setTimeout(() => checkMissions(newData), 100)
        return newData
      })
    } finally {
      setIsLoading(false)
    }
  }, [showNotification, checkMissions, createFallbackPokemon])

  // Intentar capturar Pokémon
  const attemptCapture = useCallback(async () => {
    if (!currentPokemon || isCapturing) {
      console.log('[CAPTURE] No se puede capturar - Pokémon:', !!currentPokemon, 'Capturando:', isCapturing)
      return
    }

    console.log('[CAPTURE] Iniciando captura de:', currentPokemon.name)
    setIsCapturing(true)
    setCaptureResult(null)

    // Simular animación de captura
    setTimeout(() => {
      // Calcular probabilidad de éxito
      const baseRate = 0.7
      const levelBonus = Math.min(playerData.level * 0.02, 0.2)
      const rarityPenalty = currentPokemon.id > 600 ? 0.1 : 0
      const captureRate = Math.min(baseRate + levelBonus - rarityPenalty, 0.95)
      
      const success = Math.random() < captureRate
      console.log('[CAPTURE] Probabilidad:', captureRate, 'Éxito:', success)
      
      if (success) {
        setCaptureResult('success')
        
        setPlayerData(currentData => {
          const alreadyCaught = currentData.collection.some(p => p.id === currentPokemon.id)
          
          const newCollection = alreadyCaught 
            ? currentData.collection
            : [...currentData.collection, { 
                ...currentPokemon, 
                caughtAt: new Date().toISOString() 
              }]
          
          const newData = {
            ...currentData,
            pokemonCaught: currentData.pokemonCaught + 1,
            collection: newCollection
          }
          
          console.log('[CAPTURE] Pokémon capturado. Nueva colección:', newData.collection.length)
          
          // Añadir experiencia
          const expAmount = alreadyCaught ? 10 : 25
          setTimeout(() => addExp(expAmount), 500)
          setTimeout(() => checkMissions(newData), 100)
          
          return newData
        })
        
        showNotification('¡Pokémon capturado con éxito!', 'success')
        
        // Buscar nuevo Pokémon después de un momento
        setTimeout(() => {
          console.log('[CAPTURE] Buscando nuevo Pokémon...')
          encounterWildPokemon()
        }, 2000)
      } else {
        setCaptureResult('failed')
        showNotification('¡El Pokémon escapó! Intenta de nuevo.', 'error')
      }
      
      setIsCapturing(false)
    }, 1500)
  }, [currentPokemon, isCapturing, playerData.level, addExp, checkMissions, showNotification, encounterWildPokemon])

  // Función para huir del encuentro
  const fleeFromPokemon = useCallback(() => {
    console.log('[FLEE] Huyendo del encuentro...')
    setCurrentPokemon(null)
    setCaptureResult(null)
    setTimeout(() => {
      encounterWildPokemon()
    }, 1000)
  }, [encounterWildPokemon])

  // Inicializar misiones - función separada para evitar recreación
  const initializeMissions = useCallback(() => {
    console.log('[MISSIONS] Inicializando misiones...')
    return [
      {
        id: 'first_catch',
        title: 'Primer Captura',
        description: 'Captura tu primer Pokémon',
        target: 1,
        reward: 100,
        type: 'catch',
        progress: 0
      },
      {
        id: 'collector',
        title: 'Coleccionista',
        description: 'Captura 5 Pokémon diferentes',
        target: 5,
        reward: 250,
        type: 'catch',
        progress: 0
      },
      {
        id: 'explorer',
        title: 'Explorador',
        description: 'Realiza 10 encuentros',
        target: 10,
        reward: 150,
        type: 'encounter',
        progress: 0
      },
      {
        id: 'veteran',
        title: 'Veterano',
        description: 'Captura 15 Pokémon',
        target: 15,
        reward: 500,
        type: 'catch',
        progress: 0
      },
      {
        id: 'master',
        title: 'Maestro Pokémon',
        description: 'Alcanza el nivel 5',
        target: 5,
        reward: 1000,
        type: 'level',
        progress: 0
      }
    ]
  }, [])

  // Inicializar el juego - solo una vez
  useEffect(() => {
    if (!gameInitialized) {
      console.log('[INIT] Inicializando juego...')
      const initialMissions = initializeMissions()
      setMissions(initialMissions)
      setGameInitialized(true)
      
      // Buscar el primer Pokémon
      setTimeout(() => {
        console.log('[INIT] Buscando primer Pokémon...')
        encounterWildPokemon()
      }, 1000)
    }
  }, [gameInitialized, initializeMissions, encounterWildPokemon])

  return {
    playerData,
    currentPokemon,
    missions,
    notification,
    encounterWildPokemon,
    attemptCapture,
    fleeFromPokemon,
    isLoading,
    isCapturing,
    captureResult,
    gameReady: gameInitialized
  }
}