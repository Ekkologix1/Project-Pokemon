// Constantes del juego Pokémon Hunter

// API Configuration
export const API_CONFIG = {
BASE_URL: 'https://pokeapi.co/api/v2/pokemon/',
MAX_POKEMON_ID: 898,
TIMEOUT: 10000,
RETRY_ATTEMPTS: 3
}

// Game Balance
export const GAME_BALANCE = {
BASE_CAPTURE_RATE: 0.7,
LEVEL_CAPTURE_BONUS: 0.02,
MAX_LEVEL_BONUS: 0.2,
RARE_POKEMON_PENALTY: 0.1,
MAX_CAPTURE_RATE: 0.95,

  // Experience
EXP_FOR_NEW_CAPTURE: 25,
EXP_FOR_DUPLICATE: 10,
EXP_FOR_RARE_BONUS: 10,
EXP_FOR_LEGENDARY_BONUS: 15,
EXP_PER_LEVEL: 100,

  // Capture Animation
CAPTURE_ANIMATION_DURATION: 1500,
NOTIFICATION_DURATION: 3000
}

// Storage Keys
export const STORAGE_KEYS = {
PLAYER_DATA: 'pokemonGameData',
SETTINGS: 'pokemonGameSettings',
STATISTICS: 'pokemonGameStats'
}

// Default Missions
export const DEFAULT_MISSIONS = [
{
    id: 'first_catch',
    title: 'Primer Captura',
    description: 'Captura tu primer Pokémon',
    target: 1,
    reward: 100,
    type: 'catch',
    icon: '🎣'
},
{
    id: 'collector',
    title: 'Coleccionista',
    description: 'Captura 5 Pokémon diferentes',
    target: 5,
    reward: 250,
    type: 'catch',
    icon: '📚'
},
{
    id: 'explorer',
    title: 'Explorador',
    description: 'Realiza 10 encuentros',
    target: 10,
    reward: 150,
    type: 'encounter',
    icon: '🔍'
},
{
    id: 'veteran',
    title: 'Veterano',
    description: 'Captura 15 Pokémon',
    target: 15,
    reward: 500,
    type: 'catch',
    icon: '🏆'
},
{
    id: 'master',
    title: 'Maestro Pokémon',
    description: 'Alcanza el nivel 5',
    target: 5,
    reward: 1000,
    type: 'level',
    icon: '⭐'
},
{
    id: 'dedicated',
    title: 'Dedicado',
    description: 'Realiza 25 encuentros',
    target: 25,
    reward: 300,
    type: 'encounter',
    icon: '🎯'
},
{
    id: 'elite',
    title: 'Entrenador Elite',
    description: 'Captura 25 Pokémon diferentes',
    target: 25,
    reward: 750,
    type: 'catch',
    icon: '👑'
}
]

// Notification Types
export const NOTIFICATION_TYPES = {
SUCCESS: 'success',
ERROR: 'error',
WARNING: 'warning',
INFO: 'info'
}

// Messages
export const MESSAGES = {
POKEMON_CAPTURED: '¡Pokémon capturado!',
POKEMON_ESCAPED: '¡El Pokémon escapó!',
LEVEL_UP: '¡Subiste al nivel {level}!',
MISSION_COMPLETED: '¡Misión completada: {title}! +{reward} EXP',
LOADING_POKEMON: 'Buscando Pokémon salvajes...',
ERROR_LOADING: 'Error al buscar Pokémon. Intenta de nuevo.',
FIRST_CAPTURE: '¡Felicidades por tu primera captura!',
RARE_POKEMON: '¡Has encontrado un Pokémon raro!',
DUPLICATE_POKEMON: 'Ya tienes este Pokémon en tu colección',
COLLECTION_MILESTONE: '¡Has capturado {count} Pokémon diferentes!'
}

// Pokemon Rarity Thresholds
export const RARITY_THRESHOLDS = {
COMMON: 151,
UNCOMMON: 251,
RARE: 386,
EPIC: 493,
LEGENDARY: 898
}

// UI Constants
export const UI_CONSTANTS = {
MOBILE_BREAKPOINT: 768,
TABLET_BREAKPOINT: 1024,
DESKTOP_BREAKPOINT: 1200,