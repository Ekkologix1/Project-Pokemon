import './PlayerStats.css'

function PlayerStats({ playerData }) {
if (!playerData) return null

const uniquePokemon = playerData.collection.reduce((unique, pokemon) => {
    if (!unique.some(p => p.id === pokemon.id)) {
    unique.push(pokemon)
    }
    return unique
}, [])

return (
    <div className="player-stats">
    <div className="stat-item">
        <span className="stat-value">{playerData.level}</span>
        <span className="stat-label">Nivel</span>
    </div>
    <div className="stat-item">
        <span className="stat-value">{playerData.exp}</span>
        <span className="stat-label">Experiencia</span>
    </div>
    <div className="stat-item">
        <span className="stat-value">{uniquePokemon.length}</span>
        <span className="stat-label">Únicos</span>
    </div>
    <div className="stat-item">
        <span className="stat-value">{playerData.pokemonCaught}</span>
        <span className="stat-label">Capturados</span>
    </div>
    <div className="stat-item">
        <span className="stat-value">{playerData.totalEncounters}</span>
        <span className="stat-label">Encuentros</span>
    </div>
    </div>
)
}

export default PlayerStats