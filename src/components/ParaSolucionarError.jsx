// src/components/PokemonCard.jsx
import { useSprite } from '../hooks/useSprite';

function PokemonCard({ pokemon, id, caught, onClick }) {
  const spriteUrl = useSprite(id);

  const cardClasses = `
    relative bg-gray-700/60 backdrop-blur-md rounded-lg shadow-xl p-4
    flex flex-col items-center justify-center text-white cursor-pointer
    transition-all duration-300 hover:scale-105 hover:shadow-2xl
    ${caught ? 'border-4 border-yellow-400' : 'border-4 border-transparent'}
  `;

  return (
    <div className={cardClasses} onClick={() => onClick(pokemon, id)}>
      {caught && (
        <div className="absolute top-2 right-2 text-yellow-400 text-2xl">
          &#10003;
        </div>
      )}
      <img src={spriteUrl} alt={pokemon.name} className="w-24 h-24 mb-2 pixelated" />
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

// src/components/PokemonModal.jsx
import { useSprite } from '../hooks/useSprite';

function PokemonModal({ pokemon, id, caught, onClose, onToggleCaught }) {
  const spriteUrl = useSprite(id, true); // large sprite

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
          <img src={spriteUrl} alt={pokemon.name} className="w-48 h-48 mb-4 pixelated" />
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

// src/hooks/useSprite.js
import { useState, useEffect } from 'react';

export function useSprite(id, large = false) {
  const [spriteUrl, setSpriteUrl] = useState('');

  useEffect(() => {
    const fetchSprite = async () => {
      const spriteId = String(id).padStart(3, '0');
      const url = large 
        ? `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${spriteId}.png`
        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
      
      setSpriteUrl(url);
    };

    fetchSprite();
  }, [id, large]);

  return spriteUrl;
}