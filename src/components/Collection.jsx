import React from 'react'

const Collection = ({ collection }) => {
const uniquePokemon = collection.reduce((unique, pokemon) => {
    if (!unique.some(p => p.id === pokemon.id)) {
    unique.push(pokemon)
    }
    return unique
}, [])

return (
    <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-6 shadow-xl border-4 border-yellow-300">
    <h2 className="text-2xl font-bold text-center mb-6 text-yellow-800">📚 Tu Colección</h2>
    
    <div className="max-h-96 overflow-y-auto space-y-3">
        {uniquePokemon.length === 0 ? (
        <p className="text-center text-gray-500 py-8 italic">
            Tu colección está vacía. ¡Captura tu primer Pokémon!
        </p>
        ) : (
        uniquePokemon.map(pokemon => (
            <div key={pokemon.id} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-4">
                <img 
                src={pokemon.image} 
                alt={pokemon.name}
                className="w-16 h-16 object-contain rounded-full bg-gray-100 p-2"
                onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/64x64?text=Pokemon'
                }}
                />
                <div className="flex-1">
                <h3 className="font-bold text-gray-800 capitalize">{pokemon.name}</h3>
                <p className="text-sm text-gray-600">
                    Capturado: {new Date(pokemon.caughtAt).toLocaleDateString()}
                </p>
                </div>
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                #{pokemon.id}
                </div>
            </div>
            </div>
        ))
        )}
    </div>
    </div>
)
}

export default Collection