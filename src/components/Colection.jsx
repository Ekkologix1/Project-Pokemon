import './Collection.css'

function Collection({ collection }) {
const uniquePokemon = collection.reduce((unique, pokemon) => {
    if (!unique.some(p => p.id === pokemon.id)) {
    unique.push(pokemon)
    }
    return unique
}, [])

return (
    <div className="collection">
    <h3>📚 Tu Colección</h3>
    <div className="collection-container">
        {uniquePokemon.length === 0 ? (
        <p className="empty-collection">
            Tu colección está vacía. ¡Captura tu primer Pokémon!
        </p>
        ) : (
        uniquePokemon.map(pokemon => (
            <div key={pokemon.id} className="collected-pokemon">
            <img 
                src={pokemon.image} 
                alt={pokemon.name}
                onError={(e) => {
                e.target.src = 'https://via.placeholder.com/60x60?text=Pokemon'
                }}
            />
            <div className="collected-info">
                <div className="collected-name">{pokemon.name}</div>
                <div className="collected-date">
                Capturado: {new Date(pokemon.caughtAt).toLocaleDateString()}
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