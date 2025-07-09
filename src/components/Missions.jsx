import React from 'react'

const Missions = ({ missions, playerData }) => {
const calculateProgress = (mission) => {
    let progress = 0
    switch (mission.type) {
    case 'catch':
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
    return playerData.completedMissions.includes(mission.id)
}

return (
    <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 shadow-xl border-4 border-purple-300">
    <h2 className="text-2xl font-bold text-center mb-6 text-purple-800">🎯 Misiones</h2>
    
    <div className="space-y-4">
        {missions.map(mission => {
        const progress = calculateProgress(mission)
        const completed = isCompleted(mission)
          const progressPercentage = Math.min((progress / mission.target) * 100, 100)
        
        return (
            <div 
            key={mission.id} 
            className={`bg-white rounded-xl p-4 shadow-md transition-all duration-300 ${
                completed ? 'bg-green-50 border-2 border-green-300' : 'hover:shadow-lg'
            }`}
            >
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-800">{mission.title}</h3>
                {completed && <span className="text-green-500 text-xl">✅</span>}
            </div>
            
            <p className="text-sm text-gray-600 mb-3">{mission.description}</p>
            
            <div className="mb-3">
                <div className="bg-gray-200 rounded-full h-2 mb-2">
                <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                    completed ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${progressPercentage}%` }}
                />
                </div>
                <div className="text-xs text-gray-500 text-center">
                {progress}/{mission.target} {completed ? '✓ Completada' : ''}
                </div>
            </div>
            
            <div className={`text-sm font-bold px-3 py-1 rounded-full text-center ${
                completed ? 'bg-green-500 text-white' : 'bg-yellow-400 text-gray-800'
            }`}>
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