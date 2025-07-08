// src/components/PokemonModal.jsx
import { useSprite } from '../hooks/useSimpleSprite';

function PokemonModal({ pokemon, id, caught, onClose, onToggleCaught }) {
  const { sprite, loading, error, placeholder, reload } = useSprite(id, 'official', 'xl', {
    pokemonName: pokemon.name,
    enablePlaceholder: true,
    autoRetry: true,
    maxRetries: 3
  });

  // Determinar qué imagen mostrar
  const imageUrl = sprite || placeholder || '';
  const imageAlt = pokemon.name;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 relative w-11/12 max-w-md">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl font-bold leading-none hover:text-gray-400"
        >
          &times;
        </button>

        <div className="flex flex-col items-center">
          <div className="relative w-48 h-48 mb-4">
            {loading && !placeholder && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            )}
            
            {error && !placeholder && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-600 rounded">
                <div className="text-center">
                  <span className="text-red-400 text-sm block mb-2">Error al cargar</span>
                  <button 
                    onClick={reload}
                    className="text-blue-400 text-xs hover:underline"
                  >
                    Reintentar
                  </button>
                </div>
              </div>
            )}
            
            {imageUrl && (
              <img 
                src={imageUrl} 
                alt={imageAlt} 
                className={`w-full h-full pixelated ${loading ? 'opacity-50' : ''}`}
                onError={() => console.warn(`Failed to load large sprite for ${pokemon.name}`)}
              />
            )}
          </div>
          
          <h2 className="text-4xl font-bold capitalize text-white mb-2">{pokemon.name}</h2>
          <p className="text-xl text-gray-300 mb-4">#{String(id).padStart(3, '0')}</p>
          
          <div className="flex space-x-3 mb-4">
            {pokemon.types.map(type => (
              <span
                key={type}
                className={`px-4 py-2 rounded-full text-lg font-semibold text-white
                  ${type === 'grass' ? 'bg-green-600' : ''}
                  ${type === 'fire' ? 'bg-red-600' : ''}
                  ${type === 'water' ? 'bg-blue-600' : ''}
                  ${type === 'bug' ? 'bg-lime-600' : ''}
                  ${type === 'normal' ? 'bg-gray-500' : ''}
                  ${type === 'poison' ? 'bg-purple-600' : ''}
                  ${type === 'electric' ? 'bg-yellow-500' : ''}
                  ${type === 'ground' ? 'bg-yellow-800' : ''}
                  ${type === 'fairy' ? 'bg-pink-400' : ''}
                  ${type === 'fighting' ? 'bg-orange-700' : ''}
                  ${type === 'psychic' ? 'bg-fuchsia-600' : ''}
                  ${type === 'rock' ? 'bg-amber-800' : ''}
                  ${type === 'ghost' ? 'bg-indigo-700' : ''}
                  ${type === 'ice' ? 'bg-cyan-400' : ''}
                  ${type === 'dragon' ? 'bg-indigo-900' : ''}
                  ${type === 'steel' ? 'bg-blue-gray-400' : ''}
                  ${type === 'dark' ? 'bg-gray-900' : ''}
                  ${type === 'flying' ? 'bg-indigo-400' : ''}
                `}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            ))}
          </div>

          <p className="text-white text-lg mb-2">Generación: {pokemon.generation}</p>
          <p className="text-white text-lg mb-4">Legendario: {pokemon.legendary ? 'Sí' : 'No'}</p>

          <button
            onClick={onToggleCaught}
            className={`w-full py-3 rounded-lg text-xl font-bold
              ${caught ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'}
              text-white transition-colors duration-200
            `}
          >
            {caught ? 'Liberar Pokémon' : 'Atrapar Pokémon'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PokemonModal;