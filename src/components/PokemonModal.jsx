// src/components/PokemonModal.jsx
import { useState } from 'react';

function PokemonModal({ pokemon, id, caught, onClose, onToggleCaught }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // URL del sprite oficial de Pokémon en alta resolución
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  const fallbackImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
  const secondFallbackUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = (e) => {
    // Intentar con URLs de fallback
    if (e.target.src === imageUrl) {
      e.target.src = fallbackImageUrl;
    } else if (e.target.src === fallbackImageUrl) {
      e.target.src = secondFallbackUrl;
    } else {
      setImageError(true);
      setImageLoading(false);
    }
  };

  const handleRetry = () => {
    setImageError(false);
    setImageLoading(true);
    // Forzar recarga de la imagen
    const imgElement = document.querySelector('#pokemon-modal-image');
    if (imgElement) {
      imgElement.src = imageUrl;
    }
  };

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
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            )}
            
            {imageError && !imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-600 rounded">
                <div className="text-center">
                  <span className="text-red-400 text-sm block mb-2">Error al cargar</span>
                  <button 
                    onClick={handleRetry}
                    className="text-blue-400 text-xs hover:underline"
                  >
                    Reintentar
                  </button>
                </div>
              </div>
            )}
            
            {!imageError && (
              <img 
                id="pokemon-modal-image"
                src={imageUrl} 
                alt={pokemon.name} 
                className={`w-full h-full object-contain ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                onLoad={handleImageLoad}
                onError={handleImageError}
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