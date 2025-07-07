import React, { useState, useMemo } from 'react'

// Funciones de utilidad integradas
const TYPE_COLORS = {
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

const getTypeColor = (type) => TYPE_COLORS[type] || '#68A090'

const getPokemonRarity = (pokemonId) => {
if (pokemonId <= 151) return 'común'
if (pokemonId <= 251) return 'poco común'
if (pokemonId <= 386) return 'raro'
if (pokemonId <= 493) return 'épico'
return 'legendario'
}

const getRarityEmoji = (rarity) => {
switch (rarity) {
    case 'común': return '⚪'
    case 'poco común': return '🟢'
    case 'raro': return '🔵'
    case 'épico': return '🟣'
    case 'legendario': return '🟠'
    default: return '⚪'
}
}

const Collection = ({ collection }) => {
  const [sortBy, setSortBy] = useState('name') // 'name', 'id', 'date', 'type'
  const [sortOrder, setSortOrder] = useState('asc') // 'asc', 'desc'
const [filterType, setFilterType] = useState('all')
const [searchTerm, setSearchTerm] = useState('')

  // Obtener Pokémon únicos
const uniquePokemon = useMemo(() => {
    return collection.reduce((unique, pokemon) => {
    if (!unique.some(p => p.id === pokemon.id)) {
        unique.push(pokemon)
    }
    return unique
    }, [])
}, [collection])

  // Obtener tipos únicos para el filtro
const availableTypes = useMemo(() => {
    const types = new Set()
    uniquePokemon.forEach(pokemon => {
    if (pokemon.types) {
        pokemon.types.forEach(type => types.add(type))
    }
    })
    return Array.from(types).sort()
}, [uniquePokemon])

  // Filtrar y ordenar Pokémon
const filteredAndSortedPokemon = useMemo(() => {
    let filtered = [...uniquePokemon]

    // Filtrar por término de búsqueda
    if (searchTerm) {
    filtered = filtered.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.id.toString().includes(searchTerm)
    )
    }

    // Filtrar por tipo
    if (filterType !== 'all') {
    filtered = filtered.filter(pokemon => 
        pokemon.types && pokemon.types.includes(filterType)
    )
    }

    // Ordenar
    filtered.sort((a, b) => {
    let compareValue = 0
    
    switch (sortBy) {
        case 'name':
        compareValue = a.name.localeCompare(b.name)
        break
        case 'id':
        compareValue = a.id - b.id
        break
        case 'date':
        compareValue = new Date(a.caughtAt) - new Date(b.caughtAt)
        break
        case 'type':
        const aType = a.types ? a.types[0] : 'unknown'
        const bType = b.types ? b.types[0] : 'unknown'
        compareValue = aType.localeCompare(bType)
        break
        default:
        compareValue = 0
    }

    return sortOrder === 'desc' ? -compareValue : compareValue
    })

    return filtered
}, [uniquePokemon, sortBy, sortOrder, filterType, searchTerm])

  // Función para cambiar el orden
const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
    setSortBy(newSortBy)
    setSortOrder('asc')
    }
}

  // Función para limpiar filtros
const clearFilters = () => {
    setSearchTerm('')
    setFilterType('all')
    setSortBy('name')
    setSortOrder('asc')
}

return (
    <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-6 shadow-xl border-4 border-yellow-300">
    <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-yellow-800">📚 Tu Colección</h2>
        <div className="text-sm text-yellow-700 bg-yellow-200 px-3 py-1 rounded-full">
        {filteredAndSortedPokemon.length} / {uniquePokemon.length} Pokémon
        </div>
    </div>

      {/* Controles de filtrado y ordenamiento */}
        <div className="mb-6 space-y-4">
        {/* Barra de búsqueda */}
        <div className="flex gap-2">
        <input
            type="text"
            placeholder="Buscar por nombre o ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        {(searchTerm || filterType !== 'all' || sortBy !== 'name' || sortOrder !== 'asc') && (
            <button
            onClick={clearFilters}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
            Limpiar
            </button>
        )}
        </div>

        {/* Filtros y ordenamiento */}
        <div className="flex flex-wrap gap-2">
          {/* Filtro por tipo */}
        <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
            <option value="all">Todos los tipos</option>
            {availableTypes.map(type => (
            <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
            ))}
        </select>

          {/* Botones de ordenamiento */}
        <div className="flex gap-1">
            <button
            onClick={() => handleSortChange('name')}
            className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                sortBy === 'name' 
                ? 'bg-yellow-500 text-white' 
                : 'bg-white text-yellow-700 hover:bg-yellow-200'
            }`}
            >
            Nombre {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            
            <button
            onClick={() => handleSortChange('id')}
            className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                sortBy === 'id' 
                ? 'bg-yellow-500 text-white' 
                : 'bg-white text-yellow-700 hover:bg-yellow-200'
            }`}
            >
            ID {sortBy === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            
            <button
            onClick={() => handleSortChange('date')}
            className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                sortBy === 'date' 
                ? 'bg-yellow-500 text-white' 
                : 'bg-white text-yellow-700 hover:bg-yellow-200'
            }`}
            >
            Fecha {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            
            <button
            onClick={() => handleSortChange('type')}
            className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                sortBy === 'type' 
                ? 'bg-yellow-500 text-white' 
                : 'bg-white text-yellow-700 hover:bg-yellow-200'
            }`}
            >
            Tipo {sortBy === 'type' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
        </div>
        </div>
    </div>

      {/* Lista de Pokémon */}
    <div className="max-h-96 overflow-y-auto space-y-3">
        {filteredAndSortedPokemon.length === 0 ? (
        <div className="text-center py-8">
            {uniquePokemon.length === 0 ? (
            <p className="text-gray-500 italic">
                Tu colección está vacía. ¡Captura tu primer Pokémon!
            </p>
            ) : (
            <p className="text-gray-500 italic">
                No se encontraron Pokémon con los filtros actuales.
            </p>
            )}
        </div>
        ) : (
        filteredAndSortedPokemon.map(pokemon => {
            const rarity = getPokemonRarity(pokemon.id)
            const rarityEmoji = getRarityEmoji(rarity)
            
            return (
            <div 
                key={pokemon.id} 
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
                <div className="flex items-center gap-4">
                  {/* Imagen del Pokémon */}
                <div className="relative">
                    <img 
                    src={pokemon.image} 
                    alt={pokemon.name}
                    className="w-16 h-16 object-contain rounded-full bg-gray-100 p-2"
                    onError={(e) => {
                        e.target.src = `https://via.placeholder.com/64x64?text=${pokemon.name}`
                    }}
                    />
                    <div className="absolute -top-1 -right-1 text-xs">
                    {rarityEmoji}
                    </div>
                </div>
                
                  {/* Información del Pokémon */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-800 capitalize">{pokemon.name}</h3>
                    <span className="text-xs text-gray-500">#{pokemon.id}</span>
                    </div>
                    
                    {/* Tipos */}
                    {pokemon.types && (
                    <div className="flex gap-1 mb-1">
                        {pokemon.types.map(type => (
                        <span
                            key={type}
                            className="text-xs px-2 py-1 rounded-full text-white font-medium"
                            style={{ backgroundColor: getTypeColor(type) }}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </span>
                        ))}
                    </div>
                    )}
                    
                    <p className="text-sm text-gray-600">
                    Capturado: {new Date(pokemon.caughtAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}
                    </p>
                </div>
                
                  {/* Estadísticas adicionales */}
                <div className="text-center">
                    <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-2">
                    #{pokemon.id}
                    </div>
                    <div className="text-xs text-gray-500 capitalize">
                    {rarity}
                    </div>
                </div>
                </div>
            </div>
            )
        })
        )}
    </div>

      {/* Resumen de filtros activos */}
    {(searchTerm || filterType !== 'all') && (
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="text-sm text-yellow-800">
            <strong>Filtros activos:</strong>
            {searchTerm && <span className="ml-2">Búsqueda: "{searchTerm}"</span>}
            {filterType !== 'all' && <span className="ml-2">Tipo: {filterType}</span>}
        </div>
        </div>
    )}
    </div>
)
}

export default Collection