import './Missions.css'

function Missions({ missions, playerData }) {
if (!missions || missions.length === 0) {
    return (
    <div className="missions">
        <h3>🎯 Misiones</h3>
        <div className="no-missions">
        No hay misiones disponibles
        </div>
    </div>
    )
}

const getMissionIcon = (type) => {
    switch (type) {
    case 'catch': return '🎣'
    case 'encounter': return '🔍'
    case 'level': return '⭐'
    default: return '🎯'
    }
}

const calculateProgress = (mission) => {
    if (!playerData) return 0
    
    let progress = 0
    switch (mission.type) {
    case 'catch':
        // Contar Pokémon únicos
        progress = playerData.collection.reduce((unique, pokemon) => {
        if (!unique.some(p => p.id === pokemon.id)) {
            unique.push(pokemon)
        }
        return unique
        }, []).length
        break
    case 'encounter':
        progress = playerData.totalEncounters
        break
    case 'level':
        progress = playerData.level
        break
    default:
        progress = 0
    }
    
    return Math.min(progress, mission.target)
}

const isCompleted = (mission) => {
    return playerData && playerData.completedMissions.includes(mission.id)
}

return (
    <div className="missions">
    <h3>🎯 Misiones</h3>
    <div className="missions-list">
        {missions.map(mission => {
        const progress = calculateProgress(mission)
        const completed = isCompleted(mission)
          const progressPercentage = Math.min((progress / mission.target) * 100, 100)
        
        return (
            <div 
            key={mission.id} 
            className={`mission-card ${completed ? 'completed' : ''}`}
            >
            <div className="mission-title">
                {getMissionIcon(mission.type)} {mission.title}
            </div>
            <div className="mission-description">
                {mission.description}
            </div>
            <div className="mission-progress">
                <div className="progress-bar">
                <div 
                    className="progress-fill" 
                    style={{ width: `${progressPercentage}%` }}
                />
                </div>
                <div className="progress-text">
                {progress}/{mission.target} {completed ? '✓ Completada' : ''}
                </div>
            </div>
            <div className="mission-reward">
                {completed ? '🎉 Recompensa obtenida' : `💰 ${mission.reward} EXP`}
            </div>
            </div>
        )
        })}
    </div>
    </div>
)
}

export default Missions