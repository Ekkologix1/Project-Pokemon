import { useState, useEffect, useCallback } from 'react'

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
  const [isInitialized, setIsInitialized] = useState(false)

  const API_URL = 'https://pokeapi.co/api/v2/pokemon/'
  const MAX_POKEMON_ID = 1010 // Actualizado para incluir más Pokémon

  // Mostrar notificación
  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }, [])

  // Inicializar misiones
  const initializeMissions = useCallback(() => {
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

  // Añadir experiencia
  const addExp = useCallback((amount) => {
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
    setMissions(currentMissions => {
      return currentMissions.map(mission => {
        if (data.completedMissions.includes(mission.id)) {
          return { ...mission, progress: mission.target }
        }
        
        let progress = 0
        switch (mission.type) {
          case 'catch':
            // Contar Pokémon únicos
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

  // Encontrar Pokémon salvaje
  const encounterWildPokemon = useCallback(async () => {
    setIsLoading(true)
    setCaptureResult(null)
    
    try {
      const randomId = Math.floor(Math.random() * MAX_POKEMON_ID) + 1
      console.log('Buscando Pokémon con ID:', randomId)
      
      const response = await fetch(`${API_URL}${randomId}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const pokemon = await response.json()
      console.log('Pokémon encontrado:', pokemon)
      
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
      
      setCurrentPokemon(pokemonData)
      
      // Actualizar encuentros
      setPlayerData(currentData => {
        const newData = {
          ...currentData,
          totalEncounters: currentData.totalEncounters + 1
        }
        
        setTimeout(() => checkMissions(newData), 100)
        return newData
      })
      
    } catch (error) {
      console.error('Error fetching Pokemon:', error)
      showNotification('Error al buscar Pokémon. Intenta de nuevo.', 'error')
      
      // Intentar con un Pokémon de respaldo
      try {
        const fallbackId = Math.floor(Math.random() * 151) + 1 // Pokémon de la primera generación
        const fallbackResponse = await fetch(`${API_URL}${fallbackId}`)
        
        if (fallbackResponse.ok) {
          const fallbackPokemon = await fallbackResponse.json()
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
        }
      } catch (fallbackError) {
        console.error('Error with fallback Pokemon:', fallbackError)
      }
    } finally {
      setIsLoading(false)
    }
  }, [checkMissions, showNotification])

  // Intentar capturar Pokémon
  const attemptCapture = useCallback(async () => {
    if (!currentPokemon || isCapturing) return

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
          
          // Añadir experiencia
          const expAmount = alreadyCaught ? 10 : 25
          setTimeout(() => addExp(expAmount), 500)
          setTimeout(() => checkMissions(newData), 100)
          
          return newData
        })
        
        showNotification('¡Pokémon capturado con éxito!', 'success')
        
        // Buscar nuevo Pokémon después de un momento
        setTimeout(() => {
          encounterWildPokemon()
        }, 2000)
      } else {
        setCaptureResult('failed')
        showNotification('¡El Pokémon escapó! Intenta de nuevo.', 'error')
      }
      
      setIsCapturing(false)
    }, 1500)
  }, [currentPokemon, isCapturing, playerData.level, addExp, checkMissions, showNotification, encounterWildPokemon])

  // Inicializar el juego
  useEffect(() => {
    if (!isInitialized) {
      console.log('Inicializando juego...')
      const initialMissions = initializeMissions()
      setMissions(initialMissions)
      setIsInitialized(true)
      
      // Buscar el primer Pokémon
      setTimeout(() => {
        encounterWildPokemon()
      }, 1000)
    }
  }, [isInitialized, initializeMissions, encounterWildPokemon])

  // Verificar misiones cuando cambien los datos del jugador
  useEffect(() => {
    if (playerData && missions.length > 0) {
      checkMissions(playerData)
    }
  }, [playerData.collection.length, playerData.totalEncounters, playerData.level])

  return {
    playerData,
    currentPokemon,
    missions,
    notification,
    encounterWildPokemon,
    attemptCapture,
    isLoading,
    isCapturing,
    captureResult
  }
}