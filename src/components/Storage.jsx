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
    { id: 'pokeballs', name: 'Pokébolas', icon: 'pokeball', color: 'from-red-500 to-red-600' },
    { id: 'items', name: 'Objetos', icon: 'potion', color: 'from-blue-500 to-blue-600' },
    { id: 'berries', name: 'Bayas', icon: 'oran-berry', color: 'from-green-500 to-green-600' },
    { id: 'key', name: 'Objetos Clave', icon: 'key-item', color: 'from-yellow-500 to-yellow-600' }
  ]

  const getItemSprite = (itemId) => {
    const sprites = {
      pokeball: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',
      greatball: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png',
      ultraball: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png',
      masterball: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png',
      potion: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/potion.png',
      superPotion: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/super-potion.png',
      hyperPotion: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/hyper-potion.png',
      rareCandy: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png',
      oran: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/oran-berry.png',
      pecha: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/pecha-berry.png',
      rawst: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rawst-berry.png',
      chesto: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/chesto-berry.png'
    }
    return sprites[itemId] || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'
  }

  const getCategorySprite = (categoryIcon) => {
    const categorySprites = {
      pokeball: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',
      potion: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/potion.png',
      'oran-berry': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/oran-berry.png',
      'key-item': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/town-map.png'
    }
    return categorySprites[categoryIcon] || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'
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
          <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-full">
            <img 
              src={getItemSprite(item.id)} 
              alt={item.name}
              className="w-8 h-8 object-contain"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'block'
              }}
            />
            <span className="text-2xl hidden">📦</span>
          </div>
          <div>
            <h3 className="text-white font-bold">{item.name}</h3>
            {!isShop && (
              <p className="text-gray-300 text-sm">Cantidad: {quantity}</p>
            )}
          </div>
        </div>
        
        {isShop && (
          <div className="text-right">
            <div className="text-yellow-400 font-bold flex items-center justify-end">
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-dollar.png" 
                alt="Dinero"
                className="w-4 h-4 mr-1"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'inline'
                }}
              />
              <span className="hidden">💰</span>
              {item.price}
            </div>
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
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <img 
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/berry-pouch.png" 
            alt="Inventario"
            className="w-6 h-6 mr-2"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'inline'
            }}
          />
          <span className="hidden">📊</span>
          Resumen del Inventario
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" 
                alt="Pokébolas"
                className="w-8 h-8"
              />
            </div>
            <div className="text-white font-bold">{playerInventory.pokeballs}</div>
            <div className="text-gray-300 text-sm">Pokébolas</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/potion.png" 
                alt="Pociones"
                className="w-8 h-8"
              />
            </div>
            <div className="text-white font-bold">{playerInventory.potions}</div>
            <div className="text-gray-300 text-sm">Pociones</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/oran-berry.png" 
                alt="Bayas"
                className="w-8 h-8"
              />
            </div>
            <div className="text-white font-bold">{playerInventory.berries}</div>
            <div className="text-gray-300 text-sm">Bayas</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png" 
                alt="Caramelos"
                className="w-8 h-8"
              />
            </div>
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
            <img 
              src={getCategorySprite(category.icon)} 
              alt={category.name}
              className="w-5 h-5"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'inline'
              }}
            />
            <span className="text-lg hidden">📦</span>
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
            <div className="flex justify-center mb-4">
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/town-map.png" 
                alt="Objetos Clave"
                className="w-16 h-16"
              />
            </div>
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
            <h3 className="text-2xl font-bold text-white flex items-center">
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-mart.png" 
                alt="Tienda"
                className="w-8 h-8 mr-2"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'inline'
                }}
              />
              <span className="hidden">🏪</span>
              Tienda Pokémon
            </h3>
            <p className="text-gray-300">Compra objetos útiles para tu aventura</p>
          </div>
          <div className="text-right">
            <div className="text-yellow-400 font-bold text-xl flex items-center justify-end">
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-dollar.png" 
                alt="Dinero"
                className="w-6 h-6 mr-1"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'inline'
                }}
              />
              <span className="hidden">💰</span>
              {playerData.money}
            </div>
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
            <img 
              src={getCategorySprite(category.icon)} 
              alt={category.name}
              className="w-5 h-5"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'inline'
              }}
            />
            <span className="text-lg hidden">📦</span>
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
          <h2 className="text-3xl font-bold text-white flex items-center">
            <img 
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/bag.png" 
              alt="Almacén"
              className="w-10 h-10 mr-3"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'inline'
              }}
            />
            <span className="hidden"></span>
            Mochila
          </h2>
          
          {/* Toggle entre inventario y tienda */}
          <div className="flex bg-white/10 rounded-xl p-1">
            <button
              onClick={() => setShowShop(false)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                !showShop ? 'bg-white/20 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/bag.png" 
                alt="Inventario"
                className="w-5 h-5"
              />
              <span>Inventario</span>
            </button>
            <button
              onClick={() => setShowShop(true)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                showShop ? 'bg-white/20 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-mart.png" 
                alt="Tienda"
                className="w-5 h-5"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'inline'
                }}
              />
              <span className="hidden">🏪</span>
              <span>Tienda</span>
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