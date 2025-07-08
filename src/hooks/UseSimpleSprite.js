// src/hooks/useSimpleSprite.js
import { useSprite } from './useSprite';

/**
 * Hook simple para compatibilidad con componentes existentes
 * @param {number} pokemonId - ID del Pokémon
 * @param {boolean} large - Si es true, devuelve sprite grande
 * @returns {string} URL del sprite
 */
export function useSimpleSprite(pokemonId, large = false) {
  const size = large ? 'xl' : 'medium';
  const type = 'official';
  
  const { sprite, loading, error, placeholder } = useSprite(pokemonId, type, size, {
    enablePlaceholder: true,
    autoRetry: true,
    maxRetries: 3
  });

  // Devolver placeholder si está cargando, o sprite si está disponible
  if (loading && placeholder) {
    return placeholder;
  }
  
  if (error) {
    // Devolver una imagen de error o placeholder genérico
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNmM2Y0ZjYiLz48dGV4dCB4PSI1MCIgeT0iNTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5Y2EzYWYiPj88L3RleHQ+PC9zdmc+';
  }

  return sprite || '';
}

export default useSimpleSprite;