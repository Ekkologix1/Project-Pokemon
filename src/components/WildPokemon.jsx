import React, { useState, useEffect } from 'react'
import PokemonSphere from './PokemonSphere'
import { getTypeColor, getPokemonRarity, getRarityEmoji } from '../utils/gameUtils'
import './WildPokemon.css'

const WildPokemon = ({ 
  currentPokemon, 
  onEncounter, 
  onCapture, 
  isLoading, 
  isCapturing, 
  captureResult 
}) => {
  const [pokemonEscaped, setPokemonEscaped] = useState(false)
  const [captureAttempts, setCaptureAttempts] = useState(0)
  const [showEscapeAnimation, setShowEscapeAnimation] = useState(false)

  // Resetear estado cuando aparece un nuevo Pokémon
  useEffect(() => {
    if (currentPokemon) {
      setCaptureAttempts(0)
      setPokemonEscaped(false)
      setShowEscapeAnimation(false)
    }
  }, [currentPokemon?.id])

  // Calcular probabilidad de captura basada en intentos fallidos
  const calculateCaptureRate = () => {
    const baseRate = 0.7 // 70% base
    const attemptPenalty = captureAttempts * 0.1 // -10% por cada intento fallido
    const rarityPenalty = currentPokemon ? 
      (currentPokemon.id > 600 ? 0.2 : 0) : 0 // Pokémon más raros son más difíciles
    
    return Math.max(0.2, baseRate - attemptPenalty - rarityPenalty)
  }

  // Calcular probabilidad de escape total
  const calculateEscapeRate = () => {
    const baseEscape = 0.05 // 5% base
    const attemptIncrease = captureAttempts * 0.15 // +15% por cada intento
    const rarityIncrease = currentPokemon ? 
      (currentPokemon.id > 600 ? 0.1 : 0) : 0 // Pokémon raros escapan más
    
    return Math.min(0.6, baseEscape + attemptIncrease + rarityIncrease)
  }

  const handleCapture = async () => {
    if (!currentPokemon || isCapturing || pokemonEscaped) return

    const captureRate = calculateCaptureRate()
    const escapeRate = calculateEscapeRate()
    
    // Incrementar intentos
    setCaptureAttempts(prev => prev + 1)
    
    // Determinar resultado
    const captureSuccess = Math.random() < captureRate
    const willEscape = !captureSuccess && Math.random() < escapeRate
    
    if (willEscape) {
      // El Pokémon escapará después de la animación
      setShowEscapeAnimation(true)
      setTimeout(() => {
        setPokemonEscaped(true)
        setShowEscapeAnimation(false)
      }, 3000) // Esperar a que termine la animación de fallo
    }
    
    // Ejecutar la captura con resultado predeterminado
    if (typeof onCapture === 'function') {
      // Si onCapture acepta un parámetro de éxito, pasarlo
      onCapture(captureSuccess)
    } else {
      // Si no, simular la captura estándar
      onCapture()
    }
  }

  const handlePokemonEscape = () => {
    if (showEscapeAnimation) {
      setTimeout(() => {
        setPokemonEscaped(true)
        setShowEscapeAnimation(false)
      }, 1000)
    }
  }

  const handleFindNewPokemon = () => {
    setPokemonEscaped(false)
    setCaptureAttempts(0)
    setShowEscapeAnimation(false)
    onEncounter()
  }

  // Pantalla de carga
  if (isLoading) {
    return (
      <div className="wild-pokemon">