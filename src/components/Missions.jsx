// src/components/Missions.jsx - Componente actualizado

import React from 'react'

const Missions = ({ missions, playerData, calculateMissionProgress }) => {
  const isCompleted = (mission) => {
    return playerData.completedMissions.includes(mission.id)
  }

  const getTypeIcon = (type) => {
    const icons = {
      'catch': '🎯',
      'encounter': '🔍',
      'level': '⭐',
      'catch_type': '🔥',
      'catch_rarity': '👑',
      'daily_catch': '📅',
      'perfect_catch': '🎯'
    }
    return icons[type] || '🎯'
  }

  const getTypeColor = (type) => {
    const colors = {
      'catch': 'from-blue-500 to-blue-600',
      'encounter': 'from-green-500 to-green-600',
      'level': 'from-purple-500 to-purple-600',
      'catch_type': 'from-orange-500 to-orange-600',
      'catch_rarity': 'from-yellow-500 to-yellow-600',
      'daily_catch': 'from-pink-500 to-pink-600',
      'perfect_catch': 'from-red-500 to-red-600'
    }
    return colors[type] || 'from-gray-500 to-gray-600'
  }

  return (
    <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 shadow-xl border-4 border-purple-300">
      <h2 className="text-2xl font-bold text-center mb-6 text-purple-800">🎯 Misiones</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {missions.map(mission => {
          const progress = calculateMissionProgress ? calculateMissionProgress(mission, playerData) : 0
          const completed = isCompleted(mission)
          const progressPercentage = Math.min((progress / mission.target) * 100, 100)
          
          return (
            <div 
              key={mission.id} 
              className={`relative bg-white rounded-xl p-4 shadow-md transition-all duration-300 overflow-hidden ${
                completed ? 'bg-green-50 border-2 border-green-300 transform scale-105' : 'hover:shadow-lg hover:transform hover:scale-102'
              }`}
            >
              {/* Fondo animado para misiones completadas */}
              {completed && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-emerald-100 opacity-50 animate-pulse"></div>
              )}
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getTypeIcon(mission.type)}</span>
                    <h3 className="font-bold text-gray-800 text-sm">{mission.title}</h3>
                  </div>
                  {completed && <span className="text-green-500 text-xl animate-bounce">✅</span>}
                </div>
                
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{mission.description}</p>
                
                <div className="mb-3">
                  <div className="bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        completed ? 'bg-green-500' : `bg-gradient-to-r ${getTypeColor(mission.type)}`
                      }`}
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 text-center font-medium">
                    {progress}/{mission.target} {completed ? '✓ Completada' : ''}
                  </div>
                </div>
                
                {/* Recompensas */}
                <div className="flex justify-between items-center text-xs">
                  <div className={`px-2 py-1 rounded-full font-bold ${
                    completed ? 'bg-green-500 text-white' : 'bg-blue-100 text-blue-800'
                  }`}>
                    💎 {mission.reward.exp} EXP
                  </div>
                  <div className={`px-2 py-1 rounded-full font-bold ${
                    completed ? 'bg-green-500 text-white' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    💰 {mission.reward.coins} monedas
                  </div>
                </div>
                
                {completed && (
                  <div className="mt-2 text-center">
                    <span className="text-green-600 font-bold text-xs animate-pulse">
                      🎉 ¡Recompensa obtenida!
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      
      {missions.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🎯</div>
          <p className="text-gray-600">No hay misiones disponibles</p>
          <p className="text-sm text-gray-500 mt-2">Las misiones se generarán automáticamente</p>
        </div>
      )}
    </div>
  )
}

export default Missions

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