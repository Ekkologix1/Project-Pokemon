import { useState } from 'react'

const Storage = ({ playerData, onPurchaseItem, onUseItem }) => {
  const [activeCategory, setActiveCategory] = useState('pokeballs')
  const [showShop, setShowShop] = useState(false)

  // Inventario del jugador (esto debería venir de playerData)
  const playerInventory = playerData.inventory || {
    pokeballs: 10,
    greatballs: 5,
    ultraballs: 2,
    potions: 15,
    superPotions: 8,
    berries: 20,
    rareCandy: 3
  }

  // Tienda de objetos
  const shopItems = {
    pokeballs: [
      { id: 'pokeball', name: 'Pokébola', price: 200, description: 'Pokébola básica para capturar Pokémon' },
      { id: 'greatball', name: 'Super Ball', price: 600, description: 'Pokébola mejorada con mayor tasa de captura' },
      { id: 'ultraball', name: 'Ultra Ball', price: 1200, description: 'Pokébola avanzada con alta tasa de captura' },
      { id: 'masterball', name: 'Master Ball', price: 10000, description: 'Pokébola definitiva, nunca falla' }
    ],
    items: [
      { id: 'potion', name: 'Poción', price: 300, description: 'Restaura 20 HP a un Pokémon' },
      { id: 'superPotion', name: 'Super Poción', price: 700, description: 'Restaura 50 HP a un Pokémon' },
      { id: 'hyperPotion', name: 'Hiper Poción', price: 1200, description: 'Restaura 200 HP a un Pokémon' },
      { id: 'rareCandy', name: 'Caramelo Raro', price: 5000, description: 'Sube un nivel a cualquier Pokémon' }
    ],
    berries: [
      { id: 'oran', name: 'Baya Aranja', price: 100, description: 'Restaura 10 HP cuando el Pokémon está herido' },
      { id: 'pecha', name: 'Baya Meloc', price: 150, description: 'Cura el envenenamiento' },
      { id: 'rawst', name: 'Baya Safre', price: 150, description: 'Cura las quemaduras' },
      { id: 'chesto', name: 'Baya Perasi', price: 150, description: 'Cura el sueño' }
    ]
  }

  const categories = [
    { id: 'pokeballs', name: 'Pokébolas', icon: '⚽', color: 'from-red-500 to-red-600' },
    { id: 'items', name: 'Objetos', icon: '🧪', color: 'from-blue-500 to-blue-600' },
    { id: 'berries', name: 'Bayas', icon: '🍓', color: 'from-green-500 to-green-600' },
    { id: 'key', name: 'Objetos Clave', icon: '🔑', color: 'from-yellow-500 to-yellow-600' }
  ]

  const getItemIcon = (itemId) => {
    const icons = {
      pokeball: '⚽',
      greatball: '🟠',
      ultraball: '🔵',
      masterball: '🟣',
      potion: '🧪',
      superPotion: '💊',
      hyperPotion: '🍼',
      rareCandy: '🍬',
      oran: '🍊',
      pecha: '🍑',
      rawst: '🍎',
      chesto: '🫐'
    }
    return icons[itemId] || '📦'
  }

  const getItemQuantity = (itemId) => {
    const quantities = {
      pokeball: playerInventory.pokeballs,
      greatball: playerInventory.greatballs,
      ultraball: playerInventory.ultraballs,
      potion: playerInventory.potions,
      superPotion: playerInventory.superPotions,
      rareCandy: playerInventory.rareCandy,
      oran: playerInventory.berries
    }
    return quantities[itemId] || 0
  }

  const ItemCard = ({ item, quantity, isShop = false }) => (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{getItemIcon(item.id)}</span>
          <div>
            <h3 className="text-white font-bold">{item.name}</h3>
            {!isShop && (
              <p className="text-gray-300 text-sm">Cantidad: {quantity}</p>
            )}
          </div>
        </div>
        
        {isShop && (
          <div className="text-right">
            <div className="text-yellow-400 font-bold">💰 {item.price}</div>
            <button
              onClick={() => onPurchaseItem && onPurchaseItem(item)}
              disabled={playerData.money < item.price}
              className="mt-2 px-3 py-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded-lg text-sm transition-colors"
            >
              {playerData.money >= item.price ? 'Comprar' : 'Sin dinero'}
            </button>
          </div>
        )}
        
        {!isShop && quantity > 0 && (
          <button
            onClick={() => onUseItem && onUseItem(item)}
            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors"
          >
            Usar
          </button>
        )}
      </div>
      
      <p className="text-gray-300 text-sm">{item.description}</p>
    </div>
  )

  const InventoryView = () => (
    <div className="space-y-6">
      {/* Estadísticas del inventario */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4">📊 Resumen del Inventario</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl mb-2">⚽</div>
            <div className="text-white font-bold">{playerInventory.pokeballs}</div>
            <div className="text-gray-300 text-sm">Pokébolas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🧪</div>
            <div className="text-white font-bold">{playerInventory.potions}</div>
            <div className="text-gray-300 text-sm">Pociones</div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🍓</div>
            <div className="text-white font-bold">{playerInventory.berries}</div>
            <div className="text-gray-300 text-sm">Bayas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🍬</div>
            <div className="text-white font-bold">{playerInventory.rareCandy}</div>
            <div className="text-gray-300 text-sm">Caramelos</div>
          </div>
        </div>
      </div>

      {/* Categorías */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200
              ${activeCategory === category.id 
                ? `bg-gradient-to-r ${category.color} text-white shadow-lg` 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }
            `}
          >
            <span className="text-lg">{category.icon}</span>
            <span className="font-medium">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Items de la categoría activa */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeCategory === 'pokeballs' && (
          <>
            <ItemCard item={{ id: 'pokeball', name: 'Pokébola', description: 'Pokébola básica para capturar Pokémon' }} quantity={playerInventory.pokeballs} />
            <ItemCard item={{ id: 'greatball', name: 'Super Ball', description: 'Pokébola mejorada con mayor tasa de captura' }} quantity={playerInventory.greatballs} />
            <ItemCard item={{ id: 'ultraball', name: 'Ultra Ball', description: 'Pokébola avanzada con alta tasa de captura' }} quantity={playerInventory.ultraballs} />
          </>
        )}
        
        {activeCategory === 'items' && (
          <>
            <ItemCard item={{ id: 'potion', name: 'Poción', description: 'Restaura 20 HP a un Pokémon' }} quantity={playerInventory.potions} />
            <ItemCard item={{ id: 'superPotion', name: 'Super Poción', description: 'Restaura 50 HP a un Pokémon' }} quantity={playerInventory.superPotions} />
            <ItemCard item={{ id: 'rareCandy', name: 'Caramelo Raro', description: 'Sube un nivel a cualquier Pokémon' }} quantity={playerInventory.rareCandy} />
          </>
        )}
        
        {activeCategory === 'berries' && (
          <>
            <ItemCard item={{ id: 'oran', name: 'Baya Aranja', description: 'Restaura 10 HP cuando el Pokémon está herido' }} quantity={playerInventory.berries} />
          </>
        )}
        
        {activeCategory === 'key' && (
          <div className="col-span-full text-center text-white">
            <div className="text-6xl mb-4">🔑</div>
            <p className="text-xl mb-4">No tienes objetos clave</p>
            <p className="text-gray-300">Los objetos especiales aparecerán aquí</p>
          </div>
        )}
      </div>
    </div>
  )

  const ShopView = () => (
    <div className="space-y-6">
      {/* Header de la tienda */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white">🏪 Tienda Pokémon</h3>
            <p className="text-gray-300">Compra objetos útiles para tu aventura</p>
          </div>
          <div className="text-right">
            <div className="text-yellow-400 font-bold text-xl">💰 {playerData.money}</div>
            <div className="text-gray-300 text-sm">Tu dinero</div>
          </div>
        </div>
      </div>

      {/* Categorías de la tienda */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.slice(0, 3).map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200
              ${activeCategory === category.id 
                ? `bg-gradient-to-r ${category.color} text-white shadow-lg` 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }
            `}
          >
            <span className="text-lg">{category.icon}</span>
            <span className="font-medium">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Items de la tienda */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shopItems[activeCategory]?.map(item => (
          <ItemCard key={item.id} item={item} isShop={true} />
        ))}
      </div>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">
            🏪 Almacén
          </h2>
          
          {/* Toggle entre inventario y tienda */}
          <div className="flex bg-white/10 rounded-xl p-1">
            <button
              onClick={() => setShowShop(false)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                !showShop ? 'bg-white/20 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              📦 Inventario
            </button>
            <button
              onClick={() => setShowShop(true)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                showShop ? 'bg-white/20 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              🏪 Tienda
            </button>
          </div>
        </div>

        {/* Contenido */}
        {showShop ? <ShopView /> : <InventoryView />}
      </div>
    </div>
  )
}

export default Storage