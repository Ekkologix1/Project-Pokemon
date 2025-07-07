import { useState, useEffect, useCallback } from 'react'

export function usePokemonGame() {
  // Inicializar con datos por defecto inmediatamente
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
  const [captureResult, setCaptureResult] = useState(null) // 'success', 'failed', o null

  const API_URL = 'https://pokeapi.co/api/v2/pokemon/'
  const MAX_POKEMON_ID = 898

  // Inicializar datos del jugador
  const initializePlayerData = useCallback(() => {
    const defaultData = {
      level: 1,
      exp: 0,
      pokemonCaught: 0,
      totalEncounters: 0,
      collection: [],
      completedMissions: []
    }
    
    try {
      // Usar variables en memoria en lugar de localStorage
      const saved = {}
      return { ...defaultData, ...saved }
    } catch (e) {
      console.error('Error loading data:', e)
      return defaultData
    }
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
      },
      {
        id: 'veteran',
        title: 'Veterano',
        description: 'Captura 15 Pokémon',
        target: 15,
        reward: 500,
        type: 'catch'
      },
      {
        id: 'master',
        title: 'Maestro Pokémon',
        description: 'Alcanza el nivel 5',
        target: 5,
        reward: 1000,
        type: 'level'
      }
    ]
  }, [])

  // Guardar datos del jugador (ahora solo en memoria)
  const savePlayerData = useCallback((data) => {
    try {
      // Los datos solo se mantienen en memoria durante la sesión
      console.log('Datos guardados:', data)
    } catch (e) {
      console.error('Error saving data:', e)
    }
  }, [])

  // Mostrar notificación
  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }, [])

  // Añadir experiencia
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

  // Verificar misiones
  const checkMissions = useCallback((data) => {
    setMissions(currentMissions => {
      const updatedMissions = currentMissions.map(mission => {
        if (data.completedMissions.includes(mission.id)) return mission
        
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
        
        return { ...mission, progress }
      })
      
      // Completar misiones
      updatedMissions.forEach(mission => {
        if (mission.progress >= mission.target && !data.completedMissions.includes(mission.id)) {
          const newData = {
            ...data,
            completedMissions: [...data.completedMissions, mission.id]
          }
          const dataWithExp = addExp(mission.reward, newData)
          setPlayerData(dataWithExp)
          savePlayerData(dataWithExp)
          showNotification(`¡Misión completada: ${mission.title}! +${mission.reward} EXP`, 'success')
        }
      })
      
      return updatedMissions
    })
  }, [addExp, savePlayerData, showNotification])

  // Encontrar Pokémon salvaje
  const encounterWildPokemon = useCallback(async () => {
    setIsLoading(true)
    setCaptureResult(null) // Resetear resultado anterior
    
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
      
      // Actualizar encuentros
      setPlayerData(currentData => {
        const newData = {
          ...currentData,
          totalEncounters: currentData.totalEncounters + 1
        }
        
        savePlayerData(newData)
        checkMissions(newData)
        return newData
      })
      
    } catch (error) {
      console.error('Error fetching Pokemon:', error)
      showNotification('Error al buscar Pokémon. Intenta de nuevo.', 'error')
    } finally {
      setIsLoading(false)
    }
  }, [savePlayerData, checkMissions, showNotification])

  // Intentar capturar Pokémon
  const attemptCapture = useCallback(async () => {
    if (!currentPokemon || isCapturing) return

    setIsCapturing(true)
    setCaptureResult(null)

    // Simular intento de captura
    setTimeout(() => {
      const success = Math.random() < 0.7 // 70% de probabilidad de éxito
      
      if (success) {
        setCaptureResult('success')
        
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
          
          // Añadir experiencia
          const expAmount = alreadyCaught ? 10 : 25
          newData = addExp(expAmount, newData)
          
          savePlayerData(newData)
          checkMissions(newData)
          
          return newData
        })
        
        showNotification('¡Pokémon capturado!', 'success')
        
        // Buscar nuevo Pokémon automáticamente
        setTimeout(() => {
          encounterWildPokemon()
        }, 1000)
      } else {
        setCaptureResult('failed')
        showNotification('¡El Pokémon escapó!', 'error')
      }
      
      setIsCapturing(false)
    }, 1500)
  }, [currentPokemon, isCapturing, addExp, savePlayerData, checkMissions, showNotification, encounterWildPokemon])

  // Inicializar al montar el componente
  useEffect(() => {
    const initialData = initializePlayerData()
    const initialMissions = initializeMissions()
    
    setPlayerData(initialData)
    setMissions(initialMissions)
  }, [initializePlayerData, initializeMissions])

  // Verificar misiones cuando playerData cambie
  useEffect(() => {
    if (playerData && missions.length > 0) {
      checkMissions(playerData)
    }
  }, [playerData, missions.length, checkMissions])

  return {
    playerData,
    currentPokemon,
    missions,
    notification,
    encounterWildPokemon,
    attemptCapture,
    isLoading,
    isCapturing,
    captureResult // Nuevo estado para el resultado de captura
  }
}