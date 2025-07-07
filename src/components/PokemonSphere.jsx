import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const PokemonSphere = ({ isCapturing, pokemonName, captureResult }) => {
const mountRef = useRef(null)
const sceneRef = useRef(null)
const rendererRef = useRef(null)
const pokeball1Ref = useRef(null)
const pokeball2Ref = useRef(null)
const animationRef = useRef(null)
const [showFailure, setShowFailure] = useState(false)

useEffect(() => {
    if (!mountRef.current) return

    // Limpiar escena anterior
    if (mountRef.current.firstChild) {
    mountRef.current.removeChild(mountRef.current.firstChild)
    }

    // Configurar Three.js
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 300 / 200, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    
    renderer.setSize(300, 200)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    // Crear geometría de Pokéball
    const createPokeball = (position) => {
    const group = new THREE.Group()
    
      // Parte superior (roja)
      const topGeometry = new THREE.SphereGeometry(0.8, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2)
    const topMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 })
    const topHalf = new THREE.Mesh(topGeometry, topMaterial)
    group.add(topHalf)
    
      // Parte inferior (blanca)
      const bottomGeometry = new THREE.SphereGeometry(0.8, 16, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2)
    const bottomMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })
    const bottomHalf = new THREE.Mesh(bottomGeometry, bottomMaterial)
    group.add(bottomHalf)
    
      // Banda central (negra)
    const bandGeometry = new THREE.CylinderGeometry(0.81, 0.81, 0.1, 32)
    const bandMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 })
    const band = new THREE.Mesh(bandGeometry, bandMaterial)
    band.rotation.x = Math.PI / 2
    group.add(band)
    
      // Botón central
    const buttonGeometry = new THREE.SphereGeometry(0.15, 16, 16)
    const buttonMaterial = new THREE.MeshPhongMaterial({ color: 0x444444 })
    const button = new THREE.Mesh(buttonGeometry, buttonMaterial)
    button.position.z = 0.81
    group.add(button)
    
    group.position.set(position.x, position.y, position.z)
    return group
    }

    // Crear las dos Pokéballs
    const pokeball1 = createPokeball({ x: -1.5, y: 0, z: 0 })
    const pokeball2 = createPokeball({ x: 1.5, y: 0, z: 0 })
    
    scene.add(pokeball1)
    scene.add(pokeball2)

    // Añadir luces
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
    scene.add(ambientLight)
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0xffffff, 0.5)
    pointLight.position.set(0, 0, 5)
    scene.add(pointLight)

    camera.position.z = 5

    sceneRef.current = scene
    rendererRef.current = renderer
    pokeball1Ref.current = pokeball1
    pokeball2Ref.current = pokeball2

    // Función para crear la X de fallo
    const createFailureX = (pokeball) => {
    const xGroup = new THREE.Group()
    
      // Crear las dos líneas de la X
    const lineGeometry = new THREE.BoxGeometry(0.1, 1.5, 0.1)
    const lineMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 })
    
    const line1 = new THREE.Mesh(lineGeometry, lineMaterial)
    line1.rotation.z = Math.PI / 4
    
    const line2 = new THREE.Mesh(lineGeometry, lineMaterial)
    line2.rotation.z = -Math.PI / 4
    
    xGroup.add(line1)
    xGroup.add(line2)
    xGroup.position.set(0, 0, 1.2)
    
    pokeball.add(xGroup)
    return xGroup
    }

    // Animación
    const animate = () => {
    animationRef.current = requestAnimationFrame(animate)
    
    if (pokeball1Ref.current && pokeball2Ref.current) {
        // Rotación base
        pokeball1Ref.current.rotation.y += 0.02
        pokeball2Ref.current.rotation.y -= 0.02
        
        if (isCapturing) {
          // Animación de captura - las Pokéballs se mueven
          const time = Date.now() * 0.005
          pokeball1Ref.current.position.y = Math.sin(time) * 0.3
          pokeball2Ref.current.position.y = Math.sin(time + Math.PI) * 0.3
        
          // Efecto de escala pulsante
          const scale = 1 + Math.sin(time * 2) * 0.1
        pokeball1Ref.current.scale.set(scale, scale, scale)
        pokeball2Ref.current.scale.set(scale, scale, scale)
        } else {
          // Resetear posiciones
        pokeball1Ref.current.position.y = 0
        pokeball2Ref.current.position.y = 0
        pokeball1Ref.current.scale.set(1, 1, 1)
        pokeball2Ref.current.scale.set(1, 1, 1)
        }
    }
    
    renderer.render(scene, camera)
    }
    
    animate()

    // Manejar resultado de captura
    if (captureResult === 'failed' && !showFailure) {
    setShowFailure(true)
      // Añadir X a una de las Pokéballs
    const failureX = createFailureX(pokeball1)
    
      // Remover la X después de 3 segundos
    setTimeout(() => {
        pokeball1.remove(failureX)
        setShowFailure(false)
    }, 3000)
    } else if (captureResult === 'success') {
    setShowFailure(false)
    }

    return () => {
    if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
    }
    if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
    }
    renderer.dispose()
    }
}, [isCapturing, pokemonName, captureResult, showFailure])

return (
    <div className="flex justify-center items-center">
    <div ref={mountRef} className="rounded-lg shadow-lg bg-gradient-to-br from-blue-100 to-purple-100" />
    </div>
)
}

export default PokemonSphere