import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const PokemonSphere = ({ isCapturing, pokemonName, captureResult, onPokemonEscape }) => {
const mountRef = useRef(null)
const sceneRef = useRef(null)
const rendererRef = useRef(null)
const pokeballRef = useRef(null)
const animationRef = useRef(null)
const [showFailure, setShowFailure] = useState(false)
const [isAnimating, setIsAnimating] = useState(false)

useEffect(() => {
    if (!mountRef.current) return

    // Limpiar escena anterior
    if (mountRef.current.firstChild) {
    mountRef.current.removeChild(mountRef.current.firstChild)
    }

    // Configurar Three.js
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 400 / 250, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    
    renderer.setSize(400, 250)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    // Crear geometría de Pokéball
    const createPokeball = () => {
    const group = new THREE.Group()
    
      // Parte superior (roja)
      const topGeometry = new THREE.SphereGeometry(1.0, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2)
    const topMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 })
    const topHalf = new THREE.Mesh(topGeometry, topMaterial)
    group.add(topHalf)
    
      // Parte inferior (blanca)
      const bottomGeometry = new THREE.SphereGeometry(1.0, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2)
    const bottomMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })
    const bottomHalf = new THREE.Mesh(bottomGeometry, bottomMaterial)
    group.add(bottomHalf)
    
      // Banda central (negra)
    const bandGeometry = new THREE.CylinderGeometry(1.01, 1.01, 0.15, 32)
    const bandMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 })
    const band = new THREE.Mesh(bandGeometry, bandMaterial)
    band.rotation.x = Math.PI / 2
    group.add(band)
    
      // Botón central
    const buttonGeometry = new THREE.SphereGeometry(0.2, 16, 16)
    const buttonMaterial = new THREE.MeshPhongMaterial({ color: 0x444444 })
    const button = new THREE.Mesh(buttonGeometry, buttonMaterial)
    button.position.z = 1.01
    group.add(button)
    
    return group
    }

    // Crear la Pokéball
    const pokeball = createPokeball()
    scene.add(pokeball)

    // Añadir luces
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
    directionalLight.position.set(2, 2, 2)
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0xffffff, 0.7)
    pointLight.position.set(0, 0, 5)
    scene.add(pointLight)

    camera.position.z = 6

    sceneRef.current = scene
    rendererRef.current = renderer
    pokeballRef.current = pokeball

    // Función para crear la X de fallo
    const createFailureX = () => {
    const xGroup = new THREE.Group()
    
      // Crear las dos líneas de la X
    const lineGeometry = new THREE.BoxGeometry(0.15, 2.0, 0.15)
    const lineMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 })
    
    const line1 = new THREE.Mesh(lineGeometry, lineMaterial)
    line1.rotation.z = Math.PI / 4
    
    const line2 = new THREE.Mesh(lineGeometry, lineMaterial)
    line2.rotation.z = -Math.PI / 4
    
    xGroup.add(line1)
    xGroup.add(line2)
    xGroup.position.set(0, 0, 1.5)
    
    return xGroup
    }

    // Variables para animación
    let captureStartTime = null
    let capturePhase = 'idle' // 'idle', 'throwing', 'shaking', 'success', 'failed'
    let shakeCount = 0
    let maxShakes = 3
    let failureX = null

    // Animación
    const animate = () => {
    animationRef.current = requestAnimationFrame(animate)
    
    if (pokeballRef.current) {
        const currentTime = Date.now()
        
        if (isCapturing && !isAnimating) {
          // Iniciar animación de captura
        captureStartTime = currentTime
        capturePhase = 'throwing'
        shakeCount = 0
        setIsAnimating(true)
        
          // Remover X anterior si existe
        if (failureX) {
            pokeballRef.current.remove(failureX)
            failureX = null
        }
        }
        
        if (capturePhase === 'throwing') {
          // Animación de lanzamiento (0-500ms)
        const elapsed = currentTime - captureStartTime
        const progress = Math.min(elapsed / 500, 1)
        
          // Movimiento de lanzamiento
          const throwProgress = progress * progress // Ease in
          pokeballRef.current.position.y = Math.sin(throwProgress * Math.PI) * 2
          pokeballRef.current.rotation.x = throwProgress * Math.PI * 4
        
        if (progress >= 1) {
            capturePhase = 'shaking'
            captureStartTime = currentTime
        }
        }
        
        else if (capturePhase === 'shaking') {
          // Animación de temblor (500ms por shake)
        const elapsed = currentTime - captureStartTime
        const shakeProgress = (elapsed % 500) / 500
        
        if (shakeProgress < 0.8) {
            // Temblor
            const intensity = 0.3 * (1 - shakeProgress)
            pokeballRef.current.position.x = (Math.random() - 0.5) * intensity
            pokeballRef.current.position.y = (Math.random() - 0.5) * intensity
            pokeballRef.current.rotation.z = (Math.random() - 0.5) * intensity
        } else {
            // Resetear posición
            pokeballRef.current.position.x = 0
            pokeballRef.current.position.y = 0
            pokeballRef.current.rotation.z = 0
        }
        
        if (elapsed > 500) {
            shakeCount++
            captureStartTime = currentTime
            
            if (shakeCount >= maxShakes) {
              // Determinar resultado después de los shakes
            if (captureResult === 'success') {
                capturePhase = 'success'
            } else if (captureResult === 'failed') {
                capturePhase = 'failed'
            }
            captureStartTime = currentTime
            }
        }
        }
        
        else if (capturePhase === 'success') {
          // Animación de éxito
        const elapsed = currentTime - captureStartTime
        
        if (elapsed < 1000) {
            // Brillo de éxito
            const pulseIntensity = Math.sin(elapsed * 0.01) * 0.5 + 1
            pokeballRef.current.scale.set(pulseIntensity, pulseIntensity, pulseIntensity)
            
            // Efecto de partículas (simulado con escala)
            const sparkle = Math.sin(elapsed * 0.02) * 0.1 + 1
            pokeballRef.current.rotation.y = elapsed * 0.005
        } else {
            // Finalizar animación
            capturePhase = 'idle'
            setIsAnimating(false)
            pokeballRef.current.scale.set(1, 1, 1)
            pokeballRef.current.rotation.x = 0
            pokeballRef.current.rotation.y = 0
        }
        }
        
        else if (capturePhase === 'failed') {
          // Animación de fallo
        const elapsed = currentTime - captureStartTime
        
        if (elapsed < 500) {
            // Temblor violento antes de abrir
            const intensity = 0.5
            pokeballRef.current.position.x = (Math.random() - 0.5) * intensity
            pokeballRef.current.position.y = (Math.random() - 0.5) * intensity
            pokeballRef.current.rotation.z = (Math.random() - 0.5) * intensity
        } else if (elapsed < 1000) {
            // Mostrar X de fallo
            if (!failureX) {
            failureX = createFailureX()
            pokeballRef.current.add(failureX)
            setShowFailure(true)
            
              // Notificar escape del Pokémon
            if (onPokemonEscape) {
                onPokemonEscape()
            }
            }
            
            // Resetear posición
            pokeballRef.current.position.x = 0
            pokeballRef.current.position.y = 0
            pokeballRef.current.rotation.z = 0
        } else if (elapsed > 3000) {
            // Remover X después de 3 segundos
            if (failureX) {
            pokeballRef.current.remove(failureX)
            failureX = null
            }
            setShowFailure(false)
            capturePhase = 'idle'
            setIsAnimating(false)
            pokeballRef.current.rotation.x = 0
        }
        }
        
        else {
          // Animación idle (rotación suave)
        pokeballRef.current.rotation.y += 0.01
        }
    }
    
    renderer.render(scene, camera)
    }
    
    animate()

    return () => {
    if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
    }
    if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
    }
    renderer.dispose()
    }
}, [isCapturing, pokemonName, captureResult, onPokemonEscape, isAnimating])

return (
    <div className="flex flex-col items-center justify-center">
    <div ref={mountRef} className="rounded-lg shadow-lg bg-gradient-to-br from-blue-100 to-purple-100 mb-4" />
    
      {/* Indicador de estado */}
    <div className="text-center">
        {isCapturing && (
        <div className="text-lg font-bold text-blue-600 animate-pulse">
            {isAnimating ? '🎯 Capturando...' : '⚡ Preparando...'}
        </div>
        )}
        {showFailure && (
        <div className="text-lg font-bold text-red-600 animate-bounce">
            ❌ ¡El Pokémon escapó!
        </div>
        )}
        {captureResult === 'success' && !isCapturing && (
        <div className="text-lg font-bold text-green-600">
            ✅ ¡Capturado con éxito!
        </div>
        )}
    </div>
    </div>
)
}

export default PokemonSphere