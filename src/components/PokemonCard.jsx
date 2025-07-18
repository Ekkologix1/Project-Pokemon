// src/components/PokemonCard.jsx
import { useState } from 'react';

function PokemonCard({ pokemon, id, caught, onClick }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // URL del sprite oficial de Pokémon
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  const fallbackImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  const cardClasses = `
    relative bg-gray-700/60 backdrop-blur-md rounded-lg shadow-xl p-4
    flex flex-col items-center justify-center text-white cursor-pointer
    transition-all duration-300 hover:scale-105 hover:shadow-2xl
    ${caught ? 'border-4 border-yellow-400' : 'border-4 border-transparent'}
  `;

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  return (
    <div className={cardClasses} onClick={() => onClick(pokemon, id)}>
      {caught && (
        <div className="absolute top-2 right-2 text-yellow-400 text-2xl">
          &#10003;
        </div>
      )}
      
      <div className="relative w-24 h-24 mb-2">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
        
        {imageError && !imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-600 rounded">
            <span className="text-red-400 text-xs">Error</span>
          </div>
        )}
        
        {!imageError && (
          <img 
            src={imageUrl} 
            alt={pokemon.name} 
            className={`w-full h-full object-contain ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
            onLoad={handleImageLoad}
            onError={(e) => {
              // Intentar con la imagen de fallback
              if (e.target.src === imageUrl) {
                e.target.src = fallbackImageUrl;
              } else {
                handleImageError();
              }
            }}
          />
        )}
      </div>
      
      <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
      <p className="text-sm text-gray-300">#{String(id).padStart(3, '0')}</p>
      
      <div className="flex space-x-2 mt-2">
        {pokemon.types.map(type => (
          <span
            key={type}
            className={`px-3 py-1 rounded-full text-xs font-semibold
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
    </div>
  );
}

export default PokemonCard;