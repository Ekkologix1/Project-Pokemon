// hooks/usePokemonGame.js - Fragmento con las mejoras necesarias

// Añadir al estado inicial del juego
const initialGameState = {
  playerData: {
    // ... otros datos existentes
    coins: 100, // Añadir monedas iniciales
    completedMissions: [],
    missionProgress: {} // Para trackear progreso específico
  },
  // ... resto del estado
}

// Añadir estas funciones al hook usePokemonGame

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

// Función para completar misión
const completeMission = useCallback((missionId) => {
  const mission = missions.find(m => m.id === missionId)
  if (!mission) return

  setGameState(prevState => {
    const newCompletedMissions = [...prevState.playerData.completedMissions, missionId]
    const newPlayerData = {
      ...prevState.playerData,
      experience: prevState.playerData.experience + mission.reward.exp,
      coins: prevState.playerData.coins + mission.reward.coins,
      completedMissions: newCompletedMissions
    }

    // Calcular nuevo nivel
    const newLevel = Math.floor(newPlayerData.experience / 100) + 1
    newPlayerData.level = newLevel

    // Generar nuevas misiones
    const newMissions = generateNewMissions(newCompletedMissions)

    // Mostrar notificación
    showNotification(
      `🎉 ¡Misión completada! +${mission.reward.exp} EXP, +${mission.reward.coins} monedas`,
      'success'
    )

    return {
      ...prevState,
      playerData: newPlayerData,
      missions: newMissions
    }
  })
}, [missions, showNotification])

// Función mejorada para calcular progreso
const calculateMissionProgress = useCallback((mission, playerData) => {
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
      
    case 'catch_type':
      progress = playerData.collection.filter(pokemon => 
        pokemon.types && pokemon.types.some(type => 
          type.type.name.toLowerCase() === mission.subtype
        )
      ).length
      break
      
    case 'catch_rarity':
      // Pokémon legendarios tienen stats base muy altas
      progress = playerData.collection.filter(pokemon => 
        pokemon.base_experience > 250
      ).length
      break
      
    case 'daily_catch':
      // Necesitarías implementar tracking de capturas diarias
      const today = new Date().toDateString()
      progress = playerData.dailyCatches?.[today] || 0
      break
      
    case 'perfect_catch':
      progress = playerData.consecutiveCatches || 0
      break
      
    default:
      progress = 0
  }
  
  return Math.min(progress, mission.target)
}, [])

// Función para verificar misiones completadas
const checkMissionCompletion = useCallback(() => {
  missions.forEach(mission => {
    if (!playerData.completedMissions.includes(mission.id)) {
      const progress = calculateMissionProgress(mission, playerData)
      if (progress >= mission.target) {
        completeMission(mission.id)
      }
    }
  })
}, [missions, playerData, calculateMissionProgress, completeMission])

// Llamar a checkMissionCompletion cuando cambie el playerData
useEffect(() => {
  if (gameReady) {
    checkMissionCompletion()
  }
}, [playerData, checkMissionCompletion, gameReady])

// Inicializar misiones al cargar el juego
useEffect(() => {
  if (gameReady && missions.length === 0) {
    const initialMissions = generateNewMissions()
    setGameState(prevState => ({
      ...prevState,
      missions: initialMissions
    }))
  }
}, [gameReady, missions.length])

// Retornar las funciones necesarias del hook
return {
  // ... otras funciones existentes
  calculateMissionProgress,
  completeMission,
  // ... resto de returns
}