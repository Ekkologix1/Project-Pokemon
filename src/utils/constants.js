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
MAX_CONTAINER_WIDTH: 1200,
GRID_GAP: 30,
BORDER_RADIUS: 20,
ANIMATION_DURATION: 300,
HOVER_SCALE: 1.05,
SHADOW_COLOR: 'rgba(0, 0, 0, 0.1)'
}

// Color Palette
export const COLORS = {
PRIMARY: '#667eea',
SECONDARY: '#764ba2',
SUCCESS: '#4CAF50',
ERROR: '#f44336',
WARNING: '#ff9800',
INFO: '#2196f3',
BACKGROUND: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
WHITE: '#ffffff',
BLACK: '#000000',
GRAY: {
    LIGHT: '#f5f5f5',
    MEDIUM: '#999999',
    DARK: '#333333'
}
}

// Animation Constants
export const ANIMATIONS = {
FADE_IN: 'fadeIn',
FADE_OUT: 'fadeOut',
SLIDE_IN: 'slideIn',
SLIDE_OUT: 'slideOut',
BOUNCE: 'bounce',
SHAKE: 'shake',
PULSE: 'pulse',
ROTATE: 'rotate'
}

// Sound Effects (if implemented)
export const SOUND_EFFECTS = {
CAPTURE_SUCCESS: 'capture_success.mp3',
CAPTURE_FAIL: 'capture_fail.mp3',
LEVEL_UP: 'level_up.mp3',
MISSION_COMPLETE: 'mission_complete.mp3',
BUTTON_CLICK: 'button_click.mp3',
POKEMON_APPEAR: 'pokemon_appear.mp3'
}

// Local Storage Keys
export const LOCAL_STORAGE = {
PLAYER_DATA: 'pokemonHunter_playerData',
SETTINGS: 'pokemonHunter_settings',
STATISTICS: 'pokemonHunter_statistics',
ACHIEVEMENTS: 'pokemonHunter_achievements'
}

// Achievement System
export const ACHIEVEMENTS = [
{
    id: 'first_steps',
    title: 'Primeros Pasos',
    description: 'Captura tu primer Pokémon',
    icon: '👶',
    requirement: { type: 'catch', count: 1 },
    reward: 50
},
{
    id: 'pokemon_trainer',
    title: 'Entrenador Pokémon',
    description: 'Captura 10 Pokémon',
    icon: '🎯',
    requirement: { type: 'catch', count: 10 },
    reward: 150
},
{
    id: 'gym_leader',
    title: 'Líder de Gimnasio',
    description: 'Alcanza el nivel 10',
    icon: '🏅',
    requirement: { type: 'level', count: 10 },
    reward: 500
},
{
    id: 'champion',
    title: 'Campeón',
    description: 'Captura 50 Pokémon diferentes',
    icon: '👑',
    requirement: { type: 'unique_catch', count: 50 },
    reward: 1000
}
]

// Default Player Stats
export const DEFAULT_PLAYER_DATA = {
level: 1,
exp: 0,
pokemonCaught: 0,
totalEncounters: 0,
collection: [],
completedMissions: [],
achievements: [],
stats: {
    captureRate: 0,
    favoriteType: null,
    playTime: 0,
    longestStreak: 0,
    currentStreak: 0
}
}

// Error Messages
export const ERROR_MESSAGES = {
NETWORK_ERROR: 'Error de conexión. Verifica tu internet.',
POKEMON_NOT_FOUND: 'No se pudo encontrar el Pokémon.',
SAVE_ERROR: 'Error al guardar los datos.',
LOAD_ERROR: 'Error al cargar los datos.',
INVALID_DATA: 'Datos inválidos detectados.',
TIMEOUT_ERROR: 'Tiempo de espera agotado.',
GENERIC_ERROR: 'Ha ocurrido un error inesperado.'
}

// Game Statistics
export const STATISTICS = {
TOTAL_POKEMON: 898,
GENERATION_RANGES: {
    1: { start: 1, end: 151 },
    2: { start: 152, end: 251 },
    3: { start: 252, end: 386 },
    4: { start: 387, end: 493 },
    5: { start: 494, end: 649 },
    6: { start: 650, end: 721 },
    7: { start: 722, end: 809 },
    8: { start: 810, end: 898 }
}
}

// Feature Flags
export const FEATURE_FLAGS = {
ENABLE_SOUND: false,
ENABLE_ANIMATIONS: true,
ENABLE_ACHIEVEMENTS: true,
ENABLE_STATISTICS: true,
ENABLE_DARK_MODE: false,
ENABLE_OFFLINE_MODE: false
}