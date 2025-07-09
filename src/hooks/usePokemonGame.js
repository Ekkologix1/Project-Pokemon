import { useState, useEffect, useCallback } from 'react'

// Estado inicial del juego
const initialGameState = {
  playerData: {
    name: 'Entrenador',
    level: 1,
    experience: 0,
    collection: [],
    totalCaptured: 0,
    totalEncounters: 0,
    coins: 100,
    completedMissions: [],
    missionProgress: {},
    dailyCatches: {},
    consecutiveCatches: 0,
    inventory: {
      pokeball: 10,
      greatball: 2,
      ultraball: 1,
      potion: 3,
      superpotion: 1
    }
  },
  currentPokemon: null,
  missions: [],
  isLoading: false,
  isCapturing: false,
  captureResult: null,
  notification: null,
  gameReady: false
}

// Función para generar nuevas misiones
const generateNewMissions = (completedMissionIds = []) => {
  const allMissions = [
    // Misiones básicas
    { id: 'catch_5', type: 'catch', title: 'Primer Cazador', description: 'Captura 5 Pokémon diferentes', target: 5, reward: { exp: 50, coins: 100 } },
    { id: 'catch_10', type: 'catch', title: 'Coleccionista', description: 'Captura 10 Pokémon diferentes', target: 10, reward: { exp: 100, coins: 200 } },
    { id: 'catch_20', type: 'catch', title: 'Maestro Cazador', description: 'Captura 20 Pokémon diferentes', target: 20, reward: { exp: 200, coins: 400 } },
    
    { id: 'encounter_10', type: 'encounter', title: 'Explorador', description: 'Encuentra 10 Pokémon salvajes', target: 10, reward: { exp: 30, coins: 50 } },
    { id: 'encounter_25', type: 'encounter', title: 'Aventurero', description: 'Encuentra 25 Pokémon salvajes', target: 25, reward: { exp: 75, coins: 150 } },
    { id: 'encounter_50', type: 'encounter', title: 'Explorador Veterano', description: 'Encuentra 50 Pokémon salvajes', target: 50, reward: { exp: 150, coins: 300 } },
    
    { id: 'level_3', type: 'level', title: 'Novato', description: 'Alcanza el nivel 3', target: 3, reward: { exp: 100, coins: 150 } },
    { id: 'level_5', type: 'level', title: 'Entrenador', description: 'Alcanza el nivel 5', target: 5, reward: { exp: 200, coins: 300 } },
    { id: 'level_10', type: 'level', title: 'Experto', description: 'Alcanza el nivel 10', target: 10, reward: { exp: 500, coins: 750 } },
    
    // Misiones avanzadas
    { id: 'catch_legendary', type: 'catch_rarity', title: 'Leyenda Viviente', description: 'Captura un Pokémon legendario', target: 1, reward: { exp: 1000, coins: 1500 } },
    { id: 'catch_fire_5', type: 'catch_type', title: 'Maestro del Fuego', description: 'Captura 5 Pokémon de tipo Fuego', target: 5, subtype: 'fire', reward: { exp: 150, coins: 250 } },
    { id: 'catch_water_5', type: 'catch_type', title: 'Maestro del Agua', description: 'Captura 5 Pokémon de tipo Agua', target: 5, subtype: 'water', reward: { exp: 150, coins: 250 } },
    { id: 'catch_grass_5', type: 'catch_type', title: 'Maestro de la Naturaleza', description: 'Captura 5 Pokémon de tipo Planta', target: 5, subtype: 'grass', reward: { exp: 150, coins: 250 } },
    
    { id: 'daily_catch_3', type: 'daily_catch', title: 'Rutina Diaria', description: 'Captura 3 Pokémon en un día', target: 3, reward: { exp: 100, coins: 200 } },
    { id: 'perfect_catch_5', type: 'perfect_catch', title: 'Captura Perfecta', description: 'Realiza 5 capturas exitosas consecutivas', target: 5, reward: { exp: 200, coins: 400 } },
  ]
  
  // Filtrar misiones ya completadas y seleccionar algunas activas
  const availableMissions = allMissions.filter(mission => !completedMissionIds.includes(mission.id))
  
  // Seleccionar máximo 6 misiones activas
  const activeMissions = availableMissions.slice(0, 6)
  
  return activeMissions
}

export const usePokemonGame = () => {
  const [gameState, setGameState] = useState(initialGameState)

  // Función para mostrar notificaciones
  const showNotification = useCallback((message, type = 'info') => {
    setGameState(prev => ({
      ...prev,
      notification: { message, type }
    }))
    
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        notification: null
      }))
    }, 3000)
  }, [])

  // Función para cargar datos del localStorage
  const loadGameData = useCallback(() => {
    try {
      const savedData = localStorage.getItem('pokemonGameData')
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        setGameState(prev => ({
          ...prev,
          playerData: {
            ...prev.playerData,
            ...parsedData
          }
        }))
      }
    } catch (error) {
      console.error('Error loading game data:', error)
    }
  }, [])

  // Función para guardar datos en localStorage
  const saveGameData = useCallback((playerData) => {
    try {
      localStorage.setItem('pokemonGameData', JSON.stringify(playerData))
    } catch (error) {
      console.error('Error saving game data:', error)
    }
  }, [])

  // Función para obtener un Pokémon aleatorio
  const fetchRandomPokemon = useCallback(async () => {
    try {
      const randomId = Math.floor(Math.random() * 1010) + 1
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
      const data = await response.json()
      
      // Añadir timestamp para tracking
      data.encounteredAt = new Date().getTime()
      
      return data
    } catch (error) {
      console.error('Error fetching Pokemon:', error)
      return null
    }
  }, [])

  // Función para encontrar Pokémon salvaje
  const encounterWildPokemon = useCallback(async () => {
    setGameState(prev => ({
      ...prev,
      isLoading: true,
      captureResult: null
    }))

    const pokemon = await fetchRandomPokemon()
    
    if (pokemon) {
      setGameState(prev => ({
        ...prev,
        currentPokemon: pokemon,
        isLoading: false,
        playerData: {
          ...prev.playerData,
          totalEncounters: prev.playerData.totalEncounters + 1
        }
      }))
    } else {
      setGameState(prev => ({
        ...prev,
        isLoading: false
      }))
      showNotification('Error al encontrar Pokémon', 'error')
    }
  }, [fetchRandomPokemon, showNotification])

  // Función para intentar capturar Pokémon
  const attemptCapture = useCallback(async () => {
    if (!gameState.currentPokemon) return

    setGameState(prev => ({
      ...prev,
      isCapturing: true
    }))

    // Simular captura con probabilidad
    const baseSuccessRate = 0.6
    const levelBonus = gameState.playerData.level * 0.05
    const successRate = Math.min(baseSuccessRate + levelBonus, 0.9)
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const success = Math.random() < successRate
    
    if (success) {
      const capturedPokemon = {
        ...gameState.currentPokemon,
        capturedAt: new Date().getTime(),
        captureLevel: gameState.playerData.level
      }

      const today = new Date().toDateString()
      
      setGameState(prev => {
        const newPlayerData = {
          ...prev.playerData,
          collection: [...prev.playerData.collection, capturedPokemon],
          totalCaptured: prev.playerData.totalCaptured + 1,
          experience: prev.playerData.experience + 10,
          dailyCatches: {
            ...prev.playerData.dailyCatches,
            [today]: (prev.playerData.dailyCatches[today] || 0) + 1
          },
          consecutiveCatches: prev.playerData.consecutiveCatches + 1
        }
        
        // Calcular nuevo nivel
        const newLevel = Math.floor(newPlayerData.experience / 100) + 1
        if (newLevel > newPlayerData.level) {
          newPlayerData.level = newLevel
          showNotification(`¡Nivel ${newLevel} alcanzado!`, 'success')
        }
        
        return {
          ...prev,
          playerData: newPlayerData,
          isCapturing: false,
          captureResult: { success: true, pokemon: capturedPokemon },
          currentPokemon: null
        }
      })
      
      showNotification(`¡${gameState.currentPokemon.name} capturado!`, 'success')
    } else {
      setGameState(prev => ({
        ...prev,
        isCapturing: false,
        captureResult: { success: false, pokemon: prev.currentPokemon },
        playerData: {
          ...prev.playerData,
          consecutiveCatches: 0 // Resetear capturas consecutivas
        }
      }))
      
      showNotification('¡El Pokémon se escapó!', 'error')
    }
  }, [gameState.currentPokemon, gameState.playerData, showNotification])

  // Función para completar misión
  const completeMission = useCallback((missionId) => {
    const mission = gameState.missions.find(m => m.id === missionId)
    if (!mission) return

    setGameState(prevState => {
      const newCompletedMissions = [...prevState.playerData.completedMissions, missionId]
      const