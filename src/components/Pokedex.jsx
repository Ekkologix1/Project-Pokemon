// Función para cargar datos de Pokémon dinámicamente
const loadPokemonData = async (id) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    if (!response.ok) throw new Error('Pokemon not found')
    
    const pokemon = await response.json()
    const speciesResponse = await fetch(pokemon.species.url)
    const species = await speciesResponse.json()
    
    return {
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types.map(type => type.type.name),
      generation: species.generation.name.replace('generation-', ''),
      legendary: species.is_legendary || species.is_mythical,
      height: pokemon.height,
      weight: pokemon.weight,
      sprites: pokemon.sprites
    }
  } catch (error) {
    console.error(`Error loading Pokemon ${id}:`, error)
    return null
  }
}

// Datos base completos de Pokémon (hasta la Generación 9)
const POKEMON_DATA = {
  // Generación 1 - Kanto (1-151)
  1: { name: 'Bulbasaur', types: ['grass', 'poison'], generation: 1, legendary: false },
  2: { name: 'Ivysaur', types: ['grass', 'poison'], generation: 1, legendary: false },
  3: { name: 'Venusaur', types: ['grass', 'poison'], generation: 1, legendary: false },
  4: { name: 'Charmander', types: ['fire'], generation: 1, legendary: false },
  5: { name: 'Charmeleon', types: ['fire'], generation: 1, legendary: false },
  6: { name: 'Charizard', types: ['fire', 'flying'], generation: 1, legendary: false },
  7: { name: 'Squirtle', types: ['water'], generation: 1, legendary: false },
  8: { name: 'Wartortle', types: ['water'], generation: 1, legendary: false },
  9: { name: 'Blastoise', types: ['water'], generation: 1, legendary: false },
  10: { name: 'Caterpie', types: ['bug'], generation: 1, legendary: false },
  11: { name: 'Metapod', types: ['bug'], generation: 1, legendary: false },
  12: { name: 'Butterfree', types: ['bug', 'flying'], generation: 1, legendary: false },
  13: { name: 'Weedle', types: ['bug', 'poison'], generation: 1, legendary: false },
  14: { name: 'Kakuna', types: ['bug', 'poison'], generation: 1, legendary: false },
  15: { name: 'Beedrill', types: ['bug', 'poison'], generation: 1, legendary: false },
  16: { name: 'Pidgey', types: ['normal', 'flying'], generation: 1, legendary: false },
  17: { name: 'Pidgeotto', types: ['normal', 'flying'], generation: 1, legendary: false },
  18: { name: 'Pidgeot', types: ['normal', 'flying'], generation: 1, legendary: false },
  19: { name: 'Rattata', types: ['normal'], generation: 1, legendary: false },
  20: { name: 'Raticate', types: ['normal'], generation: 1, legendary: false },
  21: { name: 'Spearow', types: ['normal', 'flying'], generation: 1, legendary: false },
  22: { name: 'Fearow', types: ['normal', 'flying'], generation: 1, legendary: false },
  23: { name: 'Ekans', types: ['poison'], generation: 1, legendary: false },
  24: { name: 'Arbok', types: ['poison'], generation: 1, legendary: false },
  25: { name: 'Pikachu', types: ['electric'], generation: 1, legendary: false },
  26: { name: 'Raichu', types: ['electric'], generation: 1, legendary: false },
  27: { name: 'Sandshrew', types: ['ground'], generation: 1, legendary: false },
  28: { name: 'Sandslash', types: ['ground'], generation: 1, legendary: false },
  29: { name: 'Nidoran♀', types: ['poison'], generation: 1, legendary: false },
  30: { name: 'Nidorina', types: ['poison'], generation: 1, legendary: false },
  31: { name: 'Nidoqueen', types: ['poison', 'ground'], generation: 1, legendary: false },
  32: { name: 'Nidoran♂', types: ['poison'], generation: 1, legendary: false },
  33: { name: 'Nidorino', types: ['poison'], generation: 1, legendary: false },
  34: { name: 'Nidoking', types: ['poison', 'ground'], generation: 1, legendary: false },
  35: { name: 'Clefairy', types: ['fairy'], generation: 1, legendary: false },
  36: { name: 'Clefable', types: ['fairy'], generation: 1, legendary: false },
  37: { name: 'Vulpix', types: ['fire'], generation: 1, legendary: false },
  38: { name: 'Ninetales', types: ['fire'], generation: 1, legendary: false },
  39: { name: 'Jigglypuff', types: ['normal', 'fairy'], generation: 1, legendary: false },
  40: { name: 'Wigglytuff', types: ['normal', 'fairy'], generation: 1, legendary: false },
  41: { name: 'Zubat', types: ['poison', 'flying'], generation: 1, legendary: false },
  42: { name: 'Golbat', types: ['poison', 'flying'], generation: 1, legendary: false },
  43: { name: 'Oddish', types: ['grass', 'poison'], generation: 1, legendary: false },
  44: { name: 'Gloom', types: ['grass', 'poison'], generation: 1, legendary: false },
  45: { name: 'Vileplume', types: ['grass', 'poison'], generation: 1, legendary: false },
  46: { name: 'Paras', types: ['bug', 'grass'], generation: 1, legendary: false },
  47: { name: 'Parasect', types: ['bug', 'grass'], generation: 1, legendary: false },
  48: { name: 'Venonat', types: ['bug', 'poison'], generation: 1, legendary: false },
  49: { name: 'Venomoth', types: ['bug', 'poison'], generation: 1, legendary: false },
  50: { name: 'Diglett', types: ['ground'], generation: 1, legendary: false },
  51: { name: 'Dugtrio', types: ['ground'], generation: 1, legendary: false },
  52: { name: 'Meowth', types: ['normal'], generation: 1, legendary: false },
  53: { name: 'Persian', types: ['normal'], generation: 1, legendary: false },
  54: { name: 'Psyduck', types: ['water'], generation: 1, legendary: false },
  55: { name: 'Golduck', types: ['water'], generation: 1, legendary: false },
  56: { name: 'Mankey', types: ['fighting'], generation: 1, legendary: false },
  57: { name: 'Primeape', types: ['fighting'], generation: 1, legendary: false },
  58: { name: 'Growlithe', types: ['fire'], generation: 1, legendary: false },
  59: { name: 'Arcanine', types: ['fire'], generation: 1, legendary: false },
  60: { name: 'Poliwag', types: ['water'], generation: 1, legendary: false },
  61: { name: 'Poliwhirl', types: ['water'], generation: 1, legendary: false },
  62: { name: 'Poliwrath', types: ['water', 'fighting'], generation: 1, legendary: false },
  63: { name: 'Abra', types: ['psychic'], generation: 1, legendary: false },
  64: { name: 'Kadabra', types: ['psychic'], generation: 1, legendary: false },
  65: { name: 'Alakazam', types: ['psychic'], generation: 1, legendary: false },
  66: { name: 'Machop', types: ['fighting'], generation: 1, legendary: false },
  67: { name: 'Machoke', types: ['fighting'], generation: 1, legendary: false },
  68: { name: 'Machamp', types: ['fighting'], generation: 1, legendary: false },
  69: { name: 'Bellsprout', types: ['grass', 'poison'], generation: 1, legendary: false },
  70: { name: 'Weepinbell', types: ['grass', 'poison'], generation: 1, legendary: false },
  71: { name: 'Victreebel', types: ['grass', 'poison'], generation: 1, legendary: false },
  72: { name: 'Tentacool', types: ['water', 'poison'], generation: 1, legendary: false },
  73: { name: 'Tentacruel', types: ['water', 'poison'], generation: 1, legendary: false },
  74: { name: 'Geodude', types: ['rock', 'ground'], generation: 1, legendary: false },
  75: { name: 'Graveler', types: ['rock', 'ground'], generation: 1, legendary: false },
  76: { name: 'Golem', types: ['rock', 'ground'], generation: 1, legendary: false },
  77: { name: 'Ponyta', types: ['fire'], generation: 1, legendary: false },
  78: { name: 'Rapidash', types: ['fire'], generation: 1, legendary: false },
  79: { name: 'Slowpoke', types: ['water', 'psychic'], generation: 1, legendary: false },
  80: { name: 'Slowbro', types: ['water', 'psychic'], generation: 1, legendary: false },
  81: { name: 'Magnemite', types: ['electric', 'steel'], generation: 1, legendary: false },
  82: { name: 'Magneton', types: ['electric', 'steel'], generation: 1, legendary: false },
  83: { name: 'Farfetch\'d', types: ['normal', 'flying'], generation: 1, legendary: false },
  84: { name: 'Doduo', types: ['normal', 'flying'], generation: 1, legendary: false },
  85: { name: 'Dodrio', types: ['normal', 'flying'], generation: 1, legendary: false },
  86: { name: 'Seel', types: ['water'], generation: 1, legendary: false },
  87: { name: 'Dewgong', types: ['water', 'ice'], generation: 1, legendary: false },
  88: { name: 'Grimer', types: ['poison'], generation: 1, legendary: false },
  89: { name: 'Muk', types: ['poison'], generation: 1, legendary: false },
  90: { name: 'Shellder', types: ['water'], generation: 1, legendary: false },
  91: { name: 'Cloyster', types: ['water', 'ice'], generation: 1, legendary: false },
  92: { name: 'Gastly', types: ['ghost', 'poison'], generation: 1, legendary: false },
  93: { name: 'Haunter', types: ['ghost', 'poison'], generation: 1, legendary: false },
  94: { name: 'Gengar', types: ['ghost', 'poison'], generation: 1, legendary: false },
  95: { name: 'Onix', types: ['rock', 'ground'], generation: 1, legendary: false },
  96: { name: 'Drowzee', types: ['psychic'], generation: 1, legendary: false },
  97: { name: 'Hypno', types: ['psychic'], generation: 1, legendary: false },
  98: { name: 'Krabby', types: ['water'], generation: 1, legendary: false },
  99: { name: 'Kingler', types: ['water'], generation: 1, legendary: false },
  100: { name: 'Voltorb', types: ['electric'], generation: 1, legendary: false },
  101: { name: 'Electrode', types: ['electric'], generation: 1, legendary: false },
  102: { name: 'Exeggcute', types: ['grass', 'psychic'], generation: 1, legendary: false },
  103: { name: 'Exeggutor', types: ['grass', 'psychic'], generation: 1, legendary: false },
  104: { name: 'Cubone', types: ['ground'], generation: 1, legendary: false },
  105: { name: 'Marowak', types: ['ground'], generation: 1, legendary: false },
  106: { name: 'Hitmonlee', types: ['fighting'], generation: 1, legendary: false },
  107: { name: 'Hitmonchan', types: ['fighting'], generation: 1, legendary: false },
  108: { name: 'Lickitung', types: ['normal'], generation: 1, legendary: false },
  109: { name: 'Koffing', types: ['poison'], generation: 1, legendary: false },
  110: { name: 'Weezing', types: ['poison'], generation: 1, legendary: false },
  111: { name: 'Rhyhorn', types: ['ground', 'rock'], generation: 1, legendary: false },
  112: { name: 'Rhydon', types: ['ground', 'rock'], generation: 1, legendary: false },
  113: { name: 'Chansey', types: ['normal'], generation: 1, legendary: false },
  114: { name: 'Tangela', types: ['grass'], generation: 1, legendary: false },
  115: { name: 'Kangaskhan', types: ['normal'], generation: 1, legendary: false },
  116: { name: 'Horsea', types: ['water'], generation: 1, legendary: false },
  117: { name: 'Seadra', types: ['water'], generation: 1, legendary: false },
  118: { name: 'Goldeen', types: ['water'], generation: 1, legendary: false },
  119: { name: 'Seaking', types: ['water'], generation: 1, legendary: false },
  120: { name: 'Staryu', types: ['water'], generation:  1, legendary: false },
  121: { name: 'Starmie', types: ['water', 'psychic'], generation: 1, legendary: false },
  122: { name: 'Mr. Mime', types: ['psychic', 'fairy'], generation: 1, legendary: false },
  123: { name: 'Scyther', types: ['bug', 'flying'], generation: 1, legendary: false },
  124: { name: 'Jynx', types: ['ice', 'psychic'], generation: 1, legendary: false },
  125: { name: 'Electabuzz', types: ['electric'], generation: 1, legendary: false },
  126: { name: 'Magmar', types: ['fire'], generation: 1, legendary: false },
  127: { name: 'Pinsir', types: ['bug'], generation: 1, legendary: false },

const TYPE_COLORS = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-cyan-300',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-400',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300'
}

const PokemonCard = ({ pokemon, id, caught, onClick }) => {
  const { sprite, loading, placeholder } = useSprite(id, 'official', 'small', { 
    pokemonName: pokemon.name 
  })

  return (
    <div 
      className={`
        relative bg-white/20 backdrop-blur-sm rounded-xl p-3 shadow-lg cursor-pointer
        transform transition-all duration-300 hover:scale-105 hover:shadow-xl
        ${caught ? 'ring-2 ring-green-400' : 'grayscale opacity-60'}
        ${pokemon.legendary ? 'ring-2 ring-yellow-400' : ''}
      `}
      onClick={() => onClick(pokemon, id)}
    >
      {pokemon.legendary && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
          <span className="text-xs">⭐</span>
        </div>
      )}
      
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center">
          {loading ? (
            <div className="w-16 h-16 bg-gray-300 rounded-lg animate-pulse"></div>
          ) : (
            <img 
              src={sprite || placeholder} 
              alt={pokemon.name}
              className="w-full h-full object-contain"
            />
          )}
        </div>
        
        <p className="text-xs font-bold text-white mb-1">
          #{id.toString().padStart(3, '0')}
        </p>
        
        <p className="text-sm font-semibold text-white mb-2 truncate">
          {caught ? pokemon.name : '???'}
        </p>
        
        <div className="flex justify-center space-x-1">
          {pokemon.types.map((type) => (
            <span 
              key={type}
              className={`
                px-2 py-1 rounded-full text-xs font-bold text-white
                ${TYPE_COLORS[type] || 'bg-gray-500'}
              `}
            >
              {caught ? type : '?'}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

const PokemonModal = ({ pokemon, id, onClose }) => {
  const { sprite, loading, placeholder } = useSprite(id, 'official', 'large', { 
    pokemonName: pokemon.name 
  })

  if (!pokemon) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            {pokemon.name}
            {pokemon.legendary && <span className="ml-2 text-yellow-400">⭐</span>}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="text-center mb-6">
          <div className="w-48 h-48 mx-auto mb-4 flex items-center justify-center">
            {loading ? (
              <div className="w-48 h-48 bg-gray-300 rounded-lg animate-pulse"></div>
            ) : (
              <img 
                src={sprite || placeholder} 
                alt={pokemon.name}
                className="w-full h-full object-contain"
              />
            )}
          </div>
          
          <p className="text-lg font-bold text-white mb-2">
            #{id.toString().padStart(3, '0')}
          </p>
          
          <div className="flex justify-center space-x-2 mb-4">
            {pokemon.types.map((type) => (
              <span 
                key={type}
                className={`
                  px-3 py-1 rounded-full font-bold text-white
                  ${TYPE_COLORS[type] || 'bg-gray-500'}
                `}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            ))}
          </div>
          
          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-white mb-2">
              <strong>Generación:</strong> {pokemon.generation}
            </p>
            <p className="text-white">
              <strong>Tipo:</strong> {pokemon.legendary ? 'Legendario' : 'Normal'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Pokedex({ collection = [] }) {
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [filter, setFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const caughtIds = useMemo(() => {
    return new Set(collection.map(pokemon => pokemon.id))
  }, [collection])

  const filteredPokemon = useMemo(() => {
    return Object.entries(POKEMON_DATA).filter(([id, pokemon]) => {
      const pokemonId = parseInt(id)
      const isCaught = caughtIds.has(pokemonId)
      
      // Filtro por capturado/no capturado
      if (filter === 'caught' && !isCaught) return false
      if (filter === 'uncaught' && isCaught) return false
      
      // Filtro por legendario
      if (filter === 'legendary' && !pokemon.legendary) return false
      
      // Filtro por tipo
      if (typeFilter !== 'all' && !pokemon.types.includes(typeFilter)) return false
      
      // Filtro por búsqueda
      if (searchTerm && !pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())) return false
      
      return true
    })
  }, [filter, typeFilter, searchTerm, caughtIds])

  const stats = useMemo(() => {
    const totalPokemon = Object.keys(POKEMON_DATA).length
    const caught = caughtIds.size
    const legendary = Object.values(POKEMON_DATA).filter(p => p.legendary).length
    const legendaryCanght = Object.entries(POKEMON_DATA)
      .filter(([id, pokemon]) => pokemon.legendary && caughtIds.has(parseInt(id)))
      .length
    
    return {
      total: totalPokemon,
      caught,
      percentage: Math.round((caught / totalPokemon) * 100),
      legendary,
      legendaryCanght
    }
  }, [caughtIds])

  const allTypes = useMemo(() => {
    const types = new Set()
    Object.values(POKEMON_DATA).forEach(pokemon => {
      pokemon.types.forEach(type => types.add(type))
    })
    return Array.from(types).sort()
  }, [])

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white flex items-center">
            📖 Pokédex Nacional
          </h2>
          <div className="text-right">
            <p className="text-white font-bold text-lg">
              {stats.caught}/{stats.total} ({stats.percentage}%)
            </p>
            <p className="text-yellow-400 font-bold">
              ⭐ {stats.legendaryCanght}/{stats.legendary} Legendarios
            </p>
          </div>
        </div>
        
        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-white font-bold mb-2">Filtrar por:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white"
            >
              <option value="all">Todos</option>
              <option value="caught">Capturados</option>
              <option value="uncaught">No Capturados</option>
              <option value="legendary">Legendarios</option>
            </select>
          </div>
          
          <div>
            <label className="block text-white font-bold mb-2">Tipo:</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white"
            >
              <option value="all">Todos los tipos</option>
              {allTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-white font-bold mb-2">Buscar:</label>
            <input
              type="text"
              placeholder="Nombre del Pokémon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white placeholder-white/70"
            />
          </div>
        </div>
        
        {/* Pokédex Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredPokemon.map(([id, pokemon]) => (
            <PokemonCard
              key={id}
              pokemon={pokemon}
              id={parseInt(id)}
              caught={caughtIds.has(parseInt(id))}
              onClick={(pokemon, id) => setSelectedPokemon({ pokemon, id })}
            />
          ))}
        </div>
        
        {filteredPokemon.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-white text-xl">No se encontraron Pokémon</p>
            <p className="text-white/70">Intenta cambiar los filtros de búsqueda</p>
          </div>
        )}
      </div>
      
      {/* Modal */}
      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon.pokemon}
          id={selectedPokemon.id}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  )
}