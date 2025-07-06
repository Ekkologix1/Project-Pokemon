import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const PokemonSphere = ({ isCapturing, pokemonName }) => {
const mountRef = useRef(null)
const sceneRef = useRef(null)
const rendererRef = useRef(null)
const sphereRef = useRef(null)
const animationRef = useRef(null)

useEffect(() => {
    if (!mountRef.current) return

    // Configurar Three.js
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 200 / 200, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    
    renderer.setSize(200, 200)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    // Crear esfera
    const geometry = new THREE.SphereGeometry(1, 32, 32)
    const material = new THREE.MeshPhongMaterial({ 
    color: 0x4facfe,
    shininess: 100,
    transparent: true,
    opacity: 0.8
    })
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    // Añadir luces
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
    scene.add(ambientLight)
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    camera.position.z = 3

    sceneRef.current = scene
    rendererRef.current = renderer
    sphereRef.current = sphere

    // Animación
    const animate = () => {
    animationRef.current = requestAnimationFrame(animate)
    
    if (sphereRef.current) {
        sphereRef.current.rotation.x += 0.01
        sphereRef.current.rotation.y += 0.01
        
        if (isCapturing) {
          sphereRef.current.scale.x = 1 + Math.sin(Date.now() * 0.01) * 0.3
          sphereRef.current.scale.y = 1 + Math.sin(Date.now() * 0.01) * 0.3
          sphereRef.current.scale.z = 1 + Math.sin(Date.now() * 0.01) * 0.3
        } else {
        sphereRef.current.scale.set(1, 1, 1)
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
}, [isCapturing, pokemonName])

return <div ref={mountRef} className="flex justify-center items-center w-50 h-50" />
}

export default PokemonSphere