// src/services/SpriteService.js
class SpriteService {
  constructor() {
    this.imageCache = new Map()
    this.loadingPromises = new Map()
    this.preloadQueue = []
    this.isPreloading = false
    this.maxCacheSize = 100
    this.compressionQuality = 0.8
    
    // Configuración de sprites
    this.spriteConfig = {
      baseUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
      officialArtwork: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/',
      fallbackUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
      sizes: {
        small: { width: 64, height: 64 },
        medium: { width: 120, height: 120 },
        large: { width: 200, height: 200 },
        xl: { width: 300, height: 300 }
      }
    }
  }

  /**
   * Obtiene el sprite de un Pokémon
   * @param {number} pokemonId - ID del Pokémon
   * @param {string} type - Tipo de sprite ('official', 'front', 'back', 'shiny')
   * @param {string} size - Tamaño del sprite ('small', 'medium', 'large', 'xl')
   * @returns {Promise<string>} URL del sprite
   */
  async getSprite(pokemonId, type = 'official', size = 'medium') {
    const cacheKey = `${pokemonId}-${type}-${size}`
    
    // Verificar cache
    if (this.imageCache.has(cacheKey)) {
      return this.imageCache.get(cacheKey)
    }

    // Verificar si ya está cargando
    if (this.loadingPromises.has(cacheKey)) {
      return await this.loadingPromises.get(cacheKey)
    }

    // Crear promesa de carga
    const loadPromise = this._loadSprite(pokemonId, type, size)
    this.loadingPromises.set(cacheKey, loadPromise)

    try {
      const spriteUrl = await loadPromise
      this._addToCache(cacheKey, spriteUrl)
      return spriteUrl
    } catch (error) {
      console.error(`Error loading sprite for Pokemon ${pokemonId}:`, error)
      return this._getFallbackSprite(pokemonId, size)
    } finally {
      this.loadingPromises.delete(cacheKey)
    }
  }

  /**
   * Carga un sprite específico
   * @private
   */
  async _loadSprite(pokemonId, type, size) {
    const urls = this._getSpriteUrls(pokemonId, type)
    
    // Intentar cargar desde diferentes fuentes
    for (const url of urls) {
      try {
        const validUrl = await this._validateImage(url)
        if (validUrl) {
          return await this._processImage(validUrl, size)
        }
      } catch (error) {
        console.warn(`Failed to load sprite from ${url}:`, error)
        continue
      }
    }
    
    throw new Error(`No valid sprite found for Pokemon ${pokemonId}`)
  }

  /**
   * Obtiene las URLs posibles para un sprite
   * @private
   */
  _getSpriteUrls(pokemonId, type) {
    const urls = []
    
    switch (type) {
      case 'official':
        urls.push(`${this.spriteConfig.officialArtwork}${pokemonId}.png`)
        urls.push(`${this.spriteConfig.baseUrl}${pokemonId}.png`)
        break
      case 'front':
        urls.push(`${this.spriteConfig.baseUrl}${pokemonId}.png`)
        break
      case 'back':
        urls.push(`${this.spriteConfig.baseUrl}back/${pokemonId}.png`)
        break
      case 'shiny':
        urls.push(`${this.spriteConfig.baseUrl}shiny/${pokemonId}.png`)
        break
      default:
        urls.push(`${this.spriteConfig.baseUrl}${pokemonId}.png`)
    }
    
    return urls
  }

  /**
   * Valida si una imagen existe y es válida
   * @private
   */
  async _validateImage(url) {
    return new Promise((resolve) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      
      img.onload = () => {
        if (img.naturalWidth > 0 && img.naturalHeight > 0) {
          resolve(url)
        } else {
          resolve(null)
        }
      }
      
      img.onerror = () => resolve(null)
      img.src = url
    })
  }

  /**
   * Procesa una imagen para optimizarla
   * @private
   */
  async _processImage(url, size) {
    try {
      const targetSize = this.spriteConfig.sizes[size]
      if (!targetSize) return url

      // Crear canvas para redimensionar
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      img.crossOrigin = 'anonymous'

      return new Promise((resolve, reject) => {
        img.onload = () => {
          canvas.width = targetSize.width
          canvas.height = targetSize.height
          
          // Dibujar imagen redimensionada
          ctx.drawImage(img, 0, 0, targetSize.width, targetSize.height)
          
          // Convertir a blob optimizado
          canvas.toBlob((blob) => {
            if (blob) {
              const optimizedUrl = URL.createObjectURL(blob)
              resolve(optimizedUrl)
            } else {
              resolve(url) // Fallback a URL original
            }
          }, 'image/png', this.compressionQuality)
        }
        
        img.onerror = () => resolve(url) // Fallback a URL original
        img.src = url
      })
    } catch (error) {
      console.warn('Error processing image:', error)
      return url // Fallback a URL original
    }
  }

  /**
   * Obtiene un sprite de fallback
   * @private
   */
  _getFallbackSprite(pokemonId, size) {
    const targetSize = this.spriteConfig.sizes[size]
    const width = targetSize ? targetSize.width : 120
    const height = targetSize ? targetSize.height : 120
    
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f0f0f0" stroke="#ccc" stroke-width="2"/>
        <text x="50%" y="50%" text-anchor="middle" dy="0.3em" font-family="Arial" font-size="14" fill="#666">
          #${pokemonId}
        </text>
      </svg>
    `)}`
  }

  /**
   * Añade un sprite al cache
   * @private
   */
  _addToCache(key, value) {
    // Limpiar cache si está lleno
    if (this.imageCache.size >= this.maxCacheSize) {
      const firstKey = this.imageCache.keys().next().value
      const oldUrl = this.imageCache.get(firstKey)
      
      // Revocar blob URL si existe
      if (oldUrl && oldUrl.startsWith('blob:')) {
        URL.revokeObjectURL(oldUrl)
      }
      
      this.imageCache.delete(firstKey)
    }
    
    this.imageCache.set(key, value)
  }

  /**
   * Precarga sprites para mejorar el rendimiento
   * @param {Array<number>} pokemonIds - IDs de Pokémon a precargar
   * @param {string} type - Tipo de sprite
   * @param {string} size - Tamaño del sprite
   */
  async preloadSprites(pokemonIds, type = 'official', size = 'medium') {
    if (this.isPreloading) return

    this.isPreloading = true
    this.preloadQueue = pokemonIds.map(id => ({ id, type, size }))

    try {
      // Precargar en lotes pequeños para no sobrecargar
      const batchSize = 5
      for (let i = 0; i < this.preloadQueue.length; i += batchSize) {
        const batch = this.preloadQueue.slice(i, i + batchSize)
        
        await Promise.allSettled(
          batch.map(({ id, type, size }) => this.getSprite(id, type, size))
        )
        
        // Pequeña pausa entre lotes
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    } finally {
      this.isPreloading = false
    }
  }

  /**
   * Obtiene múltiples sprites de un Pokémon
   * @param {number} pokemonId - ID del Pokémon
   * @param {Array<string>} types - Tipos de sprite a obtener
   * @param {string} size - Tamaño del sprite
   * @returns {Promise<Object>} Objeto con los sprites
   */
  async getPokemonSprites(pokemonId, types = ['official'], size = 'medium') {
    const sprites = {}
    
    const spritePromises = types.map(async (type) => {
      try {
        sprites[type] = await this.getSprite(pokemonId, type, size)
      } catch (error) {
        console.warn(`Failed to load ${type} sprite for Pokemon ${pokemonId}:`, error)
        sprites[type] = this._getFallbackSprite(pokemonId, size)
      }
    })
    
    await Promise.allSettled(spritePromises)
    return sprites
  }

  /**
   * Obtiene información completa del sprite
   * @param {number} pokemonId - ID del Pokémon
   * @param {string} type - Tipo de sprite
   * @param {string} size - Tamaño del sprite
   * @returns {Promise<Object>} Información del sprite
   */
  async getSpriteInfo(pokemonId, type = 'official', size = 'medium') {
    const spriteUrl = await this.getSprite(pokemonId, type, size)
    const targetSize = this.spriteConfig.sizes[size]
    
    return {
      url: spriteUrl,
      pokemonId,
      type,
      size,
      width: targetSize?.width || 120,
      height: targetSize?.height || 120,
      cached: this.imageCache.has(`${pokemonId}-${type}-${size}`)
    }
  }

  /**
   * Limpia el cache de sprites
   * @param {boolean} revokeUrls - Si debe revocar las URLs de blob
   */
  clearCache(revokeUrls = true) {
    if (revokeUrls) {
      for (const url of this.imageCache.values()) {
        if (url && url.startsWith('blob:')) {
          URL.revokeObjectURL(url)
        }
      }
    }
    
    this.imageCache.clear()
    this.loadingPromises.clear()
  }

  /**
   * Obtiene estadísticas del cache
   * @returns {Object} Estadísticas del cache
   */
  getCacheStats() {
    return {
      cacheSize: this.imageCache.size,
      maxCacheSize: this.maxCacheSize,
      loadingCount: this.loadingPromises.size,
      isPreloading: this.isPreloading,
      preloadQueueSize: this.preloadQueue.length
    }
  }

  /**
   * Configura el servicio de sprites
   * @param {Object} config - Configuración
   */
  configure(config) {
    this.spriteConfig = { ...this.spriteConfig, ...config }
    if (config.maxCacheSize) {
      this.maxCacheSize = config.maxCacheSize
    }
    if (config.compressionQuality) {
      this.compressionQuality = config.compressionQuality
    }
  }

  /**
   * Genera un sprite placeholder mientras carga
   * @param {string} pokemonName - Nombre del Pokémon
   * @param {string} size - Tamaño del sprite
   * @returns {string} URL del placeholder
   */
  generatePlaceholder(pokemonName, size = 'medium') {
    const targetSize = this.spriteConfig.sizes[size]
    const width = targetSize ? targetSize.width : 120
    const height = targetSize ? targetSize.height : 120
    
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)" rx="10"/>
        <text x="50%" y="40%" text-anchor="middle" font-family="Arial" font-size="12" fill="white" opacity="0.8">
          ${pokemonName || 'Pokémon'}
        </text>
        <text x="50%" y="60%" text-anchor="middle" font-family="Arial" font-size="10" fill="white" opacity="0.6">
          Cargando...
        </text>
      </svg>
    `)}`
  }
}

// Crear instancia singleton
const spriteService = new SpriteService()

export default SpriteService