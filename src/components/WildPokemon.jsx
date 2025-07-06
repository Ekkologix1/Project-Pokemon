import './WildPokemon.css'

function WildPokemon({ currentPokemon, onEncounter, onCapture, isLoading, isCapturing }) {
const getTypeColor = (type) => {
    const typeColors = {
    normal: '#A8A878', fighting: '#C03028', flying: '#A890F0', poison: '#A040A0',
    ground: '#E0C068', rock: '#B8A038', bug: '#A8B820', ghost: '#705898',
    steel: '#B8B8D0', fire: '#F08030', water: '#6890F0', grass: '#78C850',
    electric: '#F8D030', psychic: '#F85888', ice: '#98D8D8', dragon: '#7038F8',
    dark: '#705848', fairy: '#EE99AC'
    }
    return typeColors[type] || '#68A090'
}

return (
    <div className="wild-pokemon">
    <div className="pokemon-container">
        {isLoading ? (
        <div className="loading">🔍 Buscando Pokémon salvajes...</div>
        ) : currentPokemon ? (
        <>
            <div className="pokemon-image">
            <img 
                src={currentPokemon.image} 
                alt={currentPokemon.name}
                onError={(e) => {
                e.target.src = 'https://via.placeholder.com/120x120?text=Pokemon'
                }}
            />
            </div>
            <div className="pokemon-info">
            <div className="pokemon-name">{currentPokemon.name}</div>
            <div className="pokemon-types">
                {currentPokemon.types.map(type => (
                <span 
                    key={type} 
                    className="pokemon-type" 
                    style={{ backgroundColor: getTypeColor(type) }}
                >
                    {type}
                </span>
                ))}
            </div>
            <div className="pokemon-stats">
                Altura: {currentPokemon.height / 10}m | Peso: {currentPokemon.weight / 10}kg
            </div>
            </div>
            <div 
            className={`pokeball ${isCapturing ? 'capturing' : ''}`}
            onClick={onCapture}
            >
            <div className="pokeball-center"></div>
            </div>
        </>
        ) : (
        <div className="loading">❌ Error al cargar Pokémon</div>
        )}
    </div>
    
    <button 
        className="encounter-btn" 
        onClick={onEncounter}
        disabled={isLoading || isCapturing}
    >
        🌿 Buscar Pokémon
    </button>
    </div>
)
}

export default WildPokemon