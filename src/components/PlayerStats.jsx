import React from 'react'

const PlayerStats = ({ playerData }) => {
const uniquePokemon = playerData.collection.reduce((unique, pokemon) => {
    if (!unique.some(p => p.id === pokemon.id)) {
    unique.push(pokemon)
    }
    return unique
}, [])

const stats = [
    { label: 'Nivel', value: playerData.level, color: 'bg-purple-500', icon: '⭐' },
    { label: 'Experiencia', value: playerData.exp, color: 'bg-blue-500', icon: '💎' },
    { label: 'Únicos', value: uniquePokemon.length, color: 'bg-green-500', icon: '🎯' },
    { label: 'Capturados', value: playerData.pokemonCaught, color: 'bg-red-500', icon: '🎣' },
    { label: 'Encuentros', value: playerData.totalEncounters, color: 'bg-yellow-500', icon: '🔍' }
]

return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
    {stats.map((stat, index) => (
        <div key={index} className={`${stat.color} text-white rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-300 shadow-lg`}>
        <div className="text-2xl mb-1">{stat.icon}</div>
        <div className="text-2xl font-bold">{stat.value}</div>
        <div className="text-sm opacity-90">{stat.label}</div>
        </div>
    ))}
    </div>
)
}

export default PlayerStats