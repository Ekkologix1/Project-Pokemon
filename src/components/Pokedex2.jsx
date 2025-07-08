// src/components/Pokedex.jsx
import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import PokemonModal from './PokemonModal';
import pokemonData from '../data/pokemon.json';

function Pokedex() {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [caughtPokemon, setCaughtPokemon] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedGeneration, setSelectedGeneration] = useState('all');
  const [loading, setLoading] = useState(true);

  const POKEMON_PER_PAGE = 24;

  // Cargar datos de Pokémon
  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        // Simular carga de datos
        await new Promise(resolve => setTimeout(resolve, 500));
        setPokemon(pokemonData);
        setFilteredPokemon(pokemonData);
      } catch (error) {
        console.error('Error cargando Pokémon:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, []);

  // Filtrar Pokémon
  useEffect(() => {
    let filtered = pokemon;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toString().includes(searchTerm)
      );
    }

    // Filtrar por tipo
    if (selectedType !== 'all') {
      filtered = filtered.filter(p => 
        p.types.includes(selectedType)
      );
    }

    // Filtrar por generación
    if (selectedGeneration !== 'all') {
      filtered = filtered.filter(p => 
        p.generation.toString() === selectedGeneration
      );
    }

    setFilteredPokemon(filtered);
    setCurrentPage(1); // Resetear a primera página cuando se filtra
  }, [searchTerm, selectedType, selectedGeneration, pokemon]);

  // Obtener tipos únicos
  const uniqueTypes = [...new Set(pokemon.flatMap(p => p.types))].sort();

  // Obtener generaciones únicas
  const uniqueGenerations = [...new Set(pokemon.map(p => p.generation))].sort((a, b) => a - b);

  // Calcular paginación
  const totalPages = Math.ceil(filteredPokemon.length / POKEMON_PER_PAGE);
  const startIndex = (currentPage - 1) * POKEMON_PER_PAGE;
  const endIndex = startIndex + POKEMON_PER_PAGE;
  const currentPokemon = filteredPokemon.slice(startIndex, endIndex);

  // Funciones de navegación
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Manejar selección de Pokémon
  const handlePokemonClick = (pokemon, id) => {
    setSelectedPokemon({ ...pokemon, id });
  };

  // Manejar captura/liberación
  const handleToggleCaught = () => {
    if (selectedPokemon) {
      const newCaughtPokemon = new Set(caughtPokemon);
      if (newCaughtPokemon.has(selectedPokemon.id)) {
        newCaughtPokemon.delete(selectedPokemon.id);
      } else {
        newCaughtPokemon.add(selectedPokemon.id);
      }
      setCaughtPokemon(newCaughtPokemon);
    }
  };

  // Generar números de página para navegación
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (loading) {
    return (
      <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mb-4 mx-auto"></div>
          <p className="text-lg font-bold">Cargando Pokédex...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        📖 Pokédex Nacional
      </h2>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Búsqueda */}
        <div>
          <input
            type="text"
            placeholder="Buscar Pokémon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-white/90 text-gray-900 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filtro por tipo */}
        <div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-4 py-2 bg-white/90 text-gray-900 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos los tipos</option>
            {uniqueTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por generación */}
        <div>
          <select
            value={selectedGeneration}
            onChange={(e) => setSelectedGeneration(e.target.value)}
            className="w-full px-4 py-2 bg-white/90 text-gray-900 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todas las generaciones</option>
            {uniqueGenerations.map(gen => (
              <option key={gen} value={gen}>
                Generación {gen}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Información de resultados */}
      <div className="text-center text-white mb-6">
        <p className="text-lg">
          Mostrando {startIndex + 1}-{Math.min(endIndex, filteredPokemon.length)} de {filteredPokemon.length} Pokémon
        </p>
        <p className="text-sm text-white/80">
          Página {currentPage} de {totalPages}
        </p>
      </div>

      {/* Grid de Pokémon */}
      {currentPokemon.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {currentPokemon.map((p) => (
            <PokemonCard
              key={p.id}
              pokemon={p}
              id={p.id}
              caught={caughtPokemon.has(p.id)}
              onClick={handlePokemonClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-white py-12">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl">No se encontraron Pokémon</p>
          <p className="text-gray-300">Intenta con otros filtros de búsqueda</p>
        </div>
      )}

      {/* Controles de paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 flex-wrap">
          {/* Botón Primera página */}
          <button
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-white/20 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/30 transition-colors"
          >
            ««
          </button>

          {/* Botón Anterior */}
          <button
            onClick={goToPrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white/20 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/30 transition-colors"
          >
            « Anterior
          </button>

          {/* Números de página */}
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && goToPage(page)}
              disabled={page === '...'}
              className={`px-3 py-2 rounded-lg transition-colors ${
                page === currentPage
                  ? 'bg-blue-500 text-white'
                  : page === '...'
                  ? 'text-white cursor-default'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {page}
            </button>
          ))}

          {/* Botón Siguiente */}
          <button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white/20 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/30 transition-colors"
          >
            Siguiente »
          </button>

          {/* Botón Última página */}
          <button
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-white/20 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/30 transition-colors"
          >
            »»
          </button>
        </div>
      )}

      {/* Modal de Pokémon */}
      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          id={selectedPokemon.id}
          caught={caughtPokemon.has(selectedPokemon.id)}
          onClose={() => setSelectedPokemon(null)}
          onToggleCaught={handleToggleCaught}
        />
      )}
    </div>
  );
}

export default Pokedex;