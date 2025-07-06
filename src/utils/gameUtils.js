// Utilidades para el juego de Pokémon

// Colores para cada tipo de Pokémon
export const TYPE_COLORS = {
normal: '#A8A878',
fighting: '#C03028',
flying: '#A890F0',
poison: '#A040A0',
ground: '#E0C068',
rock: '#B8A038',
bug: '#A8B820',
ghost: '#705898',
steel: '#B8B8D0',
fire: '#F08030',
water: '#6890F0',
grass: '#78C850',
electric: '#F8D030',
psychic: '#F85888',
ice: '#98D8D8',
dragon: '#7038F8',
dark: '#705848',
fairy: '#EE99AC'
}

// Obtener color de tipo
export const getTypeColor = (type) => {
return TYPE_COLORS[type] || '#68A090'
}

// Calcular tasa de captura basada en factores
export const calculateCaptureRate = (pokemon, playerLevel) => {
  const baseRate = 0.7 // 70% base
  const levelBonus = Math.min(playerLevel * 0.02, 0.2) // Hasta 20% de bonus por nivel
  const rarityPenalty = pokemon.id > 600 ? 0.1 : 0 // Pokémon más raros son más difíciles

return Math.min(baseRate + levelBonus - rarityPenalty, 0.95)
}

// Calcular experiencia ganada
export const calculateExpGain = (pokemon, isNewCapture, isShiny = false) => {
let baseExp = isNewCapture ? 25 : 10

  // Bonus por rareza
if (pokemon.id > 600) baseExp += 10
if (pokemon.id > 800) baseExp += 15

  // Bonus por shiny (si implementamos)
  if (isShiny) baseExp *= 2

return baseExp
}

// Formatear fecha
export const formatDate = (dateString) => {
const date = new Date(dateString)
return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
})
}

// Formatear números grandes
export const formatNumber = (num) => {
if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
}
if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
}
return num.toString()
}

// Generar estadísticas de Pokémon
export const generatePokemonStats = (pokemon) => {
return {
    hp: Math.floor(Math.random() * 100) + 50,
    attack: Math.floor(Math.random() * 100) + 50,
    defense: Math.floor(Math.random() * 100) + 50,
    speed: Math.floor(Math.random() * 100) + 50
}
}

// Determinar rareza de Pokémon
export const getPokemonRarity = (pokemonId) => {
if (pokemonId <= 151) return 'common'
if (pokemonId <= 251) return 'uncommon'
if (pokemonId <= 386) return 'rare'
if (pokemonId <= 493) return 'epic'
return 'legendary'
}

// Obtener emoji de rareza
export const getRarityEmoji = (rarity) => {
switch (rarity) {
    case 'common': return '⚪'
    case 'uncommon': return '🟢'
    case 'rare': return '🔵'
    case 'epic': return '🟣'
    case 'legendary': return '🟠'
    default: return '⚪'
}
}

// Validar imagen de Pokémon
export const validatePokemonImage = (imageUrl) => {
return new Promise((resolve) => {
    if (!imageUrl) {
    resolve(false)
    return
    }
    
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = imageUrl
})
}

// Obtener imagen de fallback
export const getFallbackImage = (pokemonName, size = 120) => {
return `https://via.placeholder.com/${size}x${size}?text=${pokemonName || 'Pokemon'}`
}

// Calcular progreso de nivel
export const calculateLevelProgress = (currentExp, level) => {
  const expForNextLevel = level * 100
  const expForCurrentLevel = (level - 1) * 100
  const progress = ((currentExp - expForCurrentLevel) / (expForNextLevel - expForCurrentLevel)) * 100

return Math.max(0, Math.min(100, progress))
}

// Generar misiones aleatorias
export const generateRandomMissions = (playerData) => {
const missions = [
    {
    id: 'catch_fire',
    title: 'Maestro del Fuego',
    description: 'Captura 3 Pokémon de tipo Fuego',
    target: 3,
    reward: 200,
    type: 'type_catch',
    targetType: 'fire'
    },
    {
    id: 'catch_water',
    title: 'Navegante Acuático',
    description: 'Captura 3 Pokémon de tipo Agua',
    target: 3,
    reward: 200,
    type: 'type_catch',
    targetType: 'water'
    },
    {
    id: 'streak_capture',
    title: 'Racha de Suerte',
    description: 'Captura 5 Pokémon seguidos',
    target: 5,
    reward: 300,
    type: 'streak'
    }
]

return missions.filter(mission => !playerData.completedMissions.includes(mission.id))
}

// Validar datos del jugador
export const validatePlayerData = (data) => {
const defaultData = {
    level: 1,
    exp: 0,
    pokemonCaught: 0,
    totalEncounters: 0,
    collection: [],
    completedMissions: []
}

if (!data || typeof data !== 'object') {
    return defaultData
}

return {
    level: Math.max(1, data.level || 1),
    exp: Math.max(0, data.exp || 0),
    pokemonCaught: Math.max(0, data.pokemonCaught || 0),
    totalEncounters: Math.max(0, data.totalEncounters || 0),
    collection: Array.isArray(data.collection) ? data.collection : [],
    completedMissions: Array.isArray(data.completedMissions) ? data.completedMissions : []
}
}