import { useState, useEffect } from 'react'

export function usePokemonGame() {
  // Estado inicial con datos por defecto
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
  const [gameReady, setGameReady] = useState(false)

  const API_URL = 'https://pokeapi.co/api/v2/pokemon/'
  const MAX_POKEMON_ID = 1010

  // Mostrar notificación
  const showNotification = (message, type = 'success') => {
    console.log(`[NOTIFICATION] ${type}: ${message}`)
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  // Inicializar misiones
  const initializeMissions = () => {
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
  }

  // Añadir experiencia
  const addExp = (amount) => {
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
  }

  // Verificar y actualizar misiones
  const checkMissions = (data) => {
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
  }

  // Encontrar Pokémon salvaje
  const encounterWildPokemon = async () => {
    console.log('[POKEMON] Iniciando búsqueda de Pokémon salvaje...')
    setIsLoading(true)
    setCaptureResult(null)
    
    try {
      const randomId = Math.floor(Math.random() * MAX_POKEMON_ID) + 1
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
        image: pokemon.sprites.other['official-artwork']?.front_default || 
               pokemon.sprites.other['dream_world']?.front_default ||
               pokemon.sprites.front_default,
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
      showNotification('Error al buscar Pokémon. Intentando con uno de respaldo...', 'error')
      
      // Intentar con un Pokémon de respaldo
      try {
        const fallbackId = Math.floor(Math.random() * 151) + 1
        console.log('[POKEMON] Intentando con Pokémon de respaldo ID:', fallbackId)
        
        const fallbackResponse = await fetch(`${API_URL}${fallbackId}`)
        
        if (fallbackResponse.ok) {
          const fallbackPokemon = await fallbackResponse.json()
          console.log('[POKEMON] Pokémon de respaldo encontrado:', fallbackPokemon.name)
          
          const pokemonData = {
            id: fallbackPokemon.id,
            name: fallbackPokemon.name,
            image: fallbackPokemon.sprites.other['official-artwork']?.front_default || 
                   fallbackPokemon.sprites.front_default,
            types: fallbackPokemon.types.map(type => type.type.name),
            height: fallbackPokemon.height,
            weight: fallbackPokemon.weight,
            stats: fallbackPokemon.stats.map(stat => ({
              name: stat.stat.name,
              value: stat.base_stat
            }))
          }
          
          setCurrentPokemon(pokemonData)
          
          setPlayerData(currentData => {
            const newData = {
              ...currentData,
              totalEncounters: currentData.totalEncounters + 1
            }
            setTimeout(() => checkMissions(newData), 100)
            return newData
          })
        } else {
          throw new Error('Fallback también falló')
        }
      } catch (fallbackError) {
        console.error('[POKEMON] Error with fallback Pokemon:', fallbackError)
        // Crear un Pokémon de ejemplo para evitar que se rompa el juego
        const examplePokemon = {
          id: 1,
          name: 'bulbasaur',
          image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
          types: ['grass', 'poison'],
          height: 7,
          weight: 69,
          stats: [
            { name: 'hp', value: 45 },
            { name: 'attack', value: 49 },
            { name: 'defense', value: 49 }
          ]
        }
        
        console.log('[POKEMON] Usando Pokémon de ejemplo:', examplePokemon.name)
        setCurrentPokemon(examplePokemon)
        showNotification('Se encontró un Pokémon de ejemplo', 'success')
        
        setPlayerData(currentData => {
          const newData = {
            ...currentData,
            totalEncounters: currentData.totalEncounters + 1
          }
          setTimeout(() => checkMissions(newData), 100)
          return newData
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Intentar capturar Pokémon
  const attemptCapture = async () => {
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
  }

  // Función para huir del encuentro
  const fleeFromPokemon = () => {
    console.log('[FLEE] Huyendo del encuentro...')
    setCurrentPokemon(null)
    setCaptureResult(null)
    setTimeout(() => {
      encounterWildPokemon()
    }, 1000)
  }

  // Inicializar el juego - solo una vez
  useEffect(() => {
    console.log('[INIT] Inicializando juego...')
    const initialMissions = initializeMissions()
    setMissions(initialMissions)
    setGameReady(true)
    
    // Buscar el primer Pokémon
    setTimeout(() => {
      console.log('[INIT] Buscando primer Pokémon...')
      encounterWildPokemon()
    }, 500)
  }, []) // Sin dependencias para evitar bucles

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
    gameReady
  }
}