import { useState, useEffect } from 'react'
import Header from './components/Header'
import PlayerStats from './components/PlayerStats'
import WildPokemon from './components/WildPokemon'
import Collection from './components/Collection'
import Missions from './components/Missions'
import Notification from './components/Notification'
import { usePokemonGame } from './hooks/usePokemonGame'
import './App.css'

function App() {
  const {
    playerData,
    currentPokemon,
    missions,
    notification,
    encounterWildPokemon,
    attemptCapture,
    isLoading,
    isCapturing
  } = usePokemonGame()

  const [hasInitialized, setHasInitialized] = useState(false)

  useEffect(() => {
    // Cargar primer Pokémon solo una vez al iniciar
    if (playerData && !hasInitialized) {
      encounterWildPokemon()
      setHasInitialized(true)
    }
  }, [playerData, hasInitialized, encounterWildPokemon])

  // Mostrar loading si no hay datos del jugador
  if (!playerData) {
    return (
      <div className="app">
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '200px',
            fontSize: '18px',
            color: '#666'
          }}>
            Cargando juego...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="container">
        <Header />
        
        <PlayerStats playerData={playerData} />
        
        <div className="game-area">
          <WildPokemon 
            currentPokemon={currentPokemon}
            onEncounter={encounterWildPokemon}
            onCapture={attemptCapture}
            isLoading={isLoading}
            isCapturing={isCapturing}
          />
          
          <Collection collection={playerData.collection} />
        </div>
        
        <Missions 
          missions={missions}
          playerData={playerData}
        />
      </div>
      
      <Notification notification={notification} />
    </div>
  )
}

export default App