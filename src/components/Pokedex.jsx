  // src/components/Pokedex.jsx
import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import PokemonModal from './PokemonModal';
import pokemonData from '../data/pokemon.json';

const POKEMON_DATA = {
  1: { name: 'Bulbasaur', types: ['grass', 'poison'], generation: 1, legendary: false },
  2: { name: 'Ivysaur', types: ['grass', 'poison'], generation: 1, legendary: false },
  3: { name: 'Venusaur', types: ['grass', 'poison'], generation: 1, legendary: false },
  4: { name: 'Charmander', types: ['fire'], generation: 1, legendary: false },
  5: { name: 'Charmeleon', types: ['fire'], generation: 1, legendary: false },
  6: { name: 'Charizard', types: ['fire', 'flying'], generation: 1, legendary: false },
  7: { name: 'Squirtle', types: ['water'], generation: 1, legendary: false },
  8: { name: 'Wartortle', types: ['water'], generation: 1, legendary: false },
  9: { name: 'Blastoise', types: ['water'], generation: 1, legendary: false },
  10: { name: 'Caterpie', types: ['bug'], generation: 1, legendary: false },
  11: { name: 'Metapod', types: ['bug'], generation: 1, legendary: false },
  12: { name: 'Butterfree', types: ['bug', 'flying'], generation: 1, legendary: false },
  13: { name: 'Weedle', types: ['bug', 'poison'], generation: 1, legendary: false },
  14: { name: 'Kakuna', types: ['bug', 'poison'], generation: 1, legendary: false },
  15: { name: 'Beedrill', types: ['bug', 'poison'], generation: 1, legendary: false },
  16: { name: 'Pidgey', types: ['normal', 'flying'], generation: 1, legendary: false },
  17: { name: 'Pidgeotto', types: ['normal', 'flying'], generation: 1, legendary: false },
  18: { name: 'Pidgeot', types: ['normal', 'flying'], generation: 1, legendary: false },
  19: { name: 'Rattata', types: ['normal'], generation: 1, legendary: false },
  20: { name: 'Raticate', types: ['normal'], generation: 1, legendary: false },
  21: { name: 'Spearow', types: ['normal', 'flying'], generation: 1, legendary: false },
  22: { name: 'Fearow', types: ['normal', 'flying'], generation: 1, legendary: false },
  23: { name: 'Ekans', types: ['poison'], generation: 1, legendary: false },
  24: { name: 'Arbok', types: ['poison'], generation: 1, legendary: false },
  25: { name: 'Pikachu', types: ['electric'], generation: 1, legendary: false },
  26: { name: 'Raichu', types: ['electric'], generation: 1, legendary: false },
  27: { name: 'Sandshrew', types: ['ground'], generation: 1, legendary: false },
  28: { name: 'Sandslash', types: ['ground'], generation: 1, legendary: false },
  29: { name: 'Nidoran♀', types: ['poison'], generation: 1, legendary: false },
  30: { name: 'Nidorina', types: ['poison'], generation: 1, legendary: false },
  31: { name: 'Nidoqueen', types: ['poison', 'ground'], generation: 1, legendary: false },
  32: { name: 'Nidoran♂', types: ['poison'], generation: 1, legendary: false },
  33: { name: 'Nidorino', types: ['poison'], generation: 1, legendary: false },
  34: { name: 'Nidoking', types: ['poison', 'ground'], generation: 1, legendary: false },
  35: { name: 'Clefairy', types: ['fairy'], generation: 1, legendary: false },
  36: { name: 'Clefable', types: ['fairy'], generation: 1, legendary: false },
  37: { name: 'Vulpix', types: ['fire'], generation: 1, legendary: false },
  38: { name: 'Ninetales', types: ['fire'], generation: 1, legendary: false },
  39: { name: 'Jigglypuff', types: ['normal', 'fairy'], generation: 1, legendary: false },
  40: { name: 'Wigglytuff', types: ['normal', 'fairy'], generation: 1, legendary: false },
  41: { name: 'Zubat', types: ['poison', 'flying'], generation: 1, legendary: false },
  42: { name: 'Golbat', types: ['poison', 'flying'], generation: 1, legendary: false },
  43: { name: 'Oddish', types: ['grass', 'poison'], generation: 1, legendary: false },
  44: { name: 'Gloom', types: ['grass', 'poison'], generation: 1, legendary: false },
  45: { name: 'Vileplume', types: ['grass', 'poison'], generation: 1, legendary: false },
  46: { name: 'Paras', types: ['bug', 'grass'], generation: 1, legendary: false },
  47: { name: 'Parasect', types: ['bug', 'grass'], generation: 1, legendary: false },
  48: { name: 'Venonat', types: ['bug', 'poison'], generation: 1, legendary: false },
  49: { name: 'Venomoth', types: ['bug', 'poison'], generation: 1, legendary: false },
  50: { name: 'Diglett', types: ['ground'], generation: 1, legendary: false },
  51: { name: 'Dugtrio', types: ['ground'], generation: 1, legendary: false },
  52: { name: 'Meowth', types: ['normal'], generation: 1, legendary: false },
  53: { name: 'Persian', types: ['normal'], generation: 1, legendary: false },
  54: { name: 'Psyduck', types: ['water'], generation: 1, legendary: false },
  55: { name: 'Golduck', types: ['water'], generation: 1, legendary: false },
  56: { name: 'Mankey', types: ['fighting'], generation: 1, legendary: false },
  57: { name: 'Primeape', types: ['fighting'], generation: 1, legendary: false },
  58: { name: 'Growlithe', types: ['fire'], generation: 1, legendary: false },
  59: { name: 'Arcanine', types: ['fire'], generation: 1, legendary: false },
  60: { name: 'Poliwag', types: ['water'], generation: 1, legendary: false },
  61: { name: 'Poliwhirl', types: ['water'], generation: 1, legendary: false },
  62: { name: 'Poliwrath', types: ['water', 'fighting'], generation: 1, legendary: false },
  63: { name: 'Abra', types: ['psychic'], generation: 1, legendary: false },
  64: { name: 'Kadabra', types: ['psychic'], generation: 1, legendary: false },
  65: { name: 'Alakazam', types: ['psychic'], generation: 1, legendary: false },
  66: { name: 'Machop', types: ['fighting'], generation: 1, legendary: false },
  67: { name: 'Machoke', types: ['fighting'], generation: 1, legendary: false },
  68: { name: 'Machamp', types: ['fighting'], generation: 1, legendary: false },
  69: { name: 'Bellsprout', types: ['grass', 'poison'], generation: 1, legendary: false },
  70: { name: 'Weepinbell', types: ['grass', 'poison'], generation: 1, legendary: false },
  71: { name: 'Victreebel', types: ['grass', 'poison'], generation: 1, legendary: false },
  72: { name: 'Tentacool', types: ['water', 'poison'], generation: 1, legendary: false },
  73: { name: 'Tentacruel', types: ['water', 'poison'], generation: 1, legendary: false },
  74: { name: 'Geodude', types: ['rock', 'ground'], generation: 1, legendary: false },
  75: { name: 'Graveler', types: ['rock', 'ground'], generation: 1, legendary: false },
  76: { name: 'Golem', types: ['rock', 'ground'], generation: 1, legendary: false },
  77: { name: 'Ponyta', types: ['fire'], generation: 1, legendary: false },
  78: { name: 'Rapidash', types: ['fire'], generation: 1, legendary: false },
  79: { name: 'Slowpoke', types: ['water', 'psychic'], generation: 1, legendary: false },
  80: { name: 'Slowbro', types: ['water', 'psychic'], generation: 1, legendary: false },
  81: { name: 'Magnemite', types: ['electric', 'steel'], generation: 1, legendary: false },
  82: { name: 'Magneton', types: ['electric', 'steel'], generation: 1, legendary: false },
  83: { name: 'Farfetch\'d', types: ['normal', 'flying'], generation: 1, legendary: false },
  84: { name: 'Doduo', types: ['normal', 'flying'], generation: 1, legendary: false },
  85: { name: 'Dodrio', types: ['normal', 'flying'], generation: 1, legendary: false },
  86: { name: 'Seel', types: ['water'], generation: 1, legendary: false },
  87: { name: 'Dewgong', types: ['water', 'ice'], generation: 1, legendary: false },
  88: { name: 'Grimer', types: ['poison'], generation: 1, legendary: false },
  89: { name: 'Muk', types: ['poison'], generation: 1, legendary: false },
  90: { name: 'Shellder', types: ['water'], generation: 1, legendary: false },
  91: { name: 'Cloyster', types: ['water', 'ice'], generation: 1, legendary: false },
  92: { name: 'Gastly', types: ['ghost', 'poison'], generation: 1, legendary: false },
  93: { name: 'Haunter', types: ['ghost', 'poison'], generation: 1, legendary: false },
  94: { name: 'Gengar', types: ['ghost', 'poison'], generation: 1, legendary: false },
  95: { name: 'Onix', types: ['rock', 'ground'], generation: 1, legendary: false },
  96: { name: 'Drowzee', types: ['psychic'], generation: 1, legendary: false },
  97: { name: 'Hypno', types: ['psychic'], generation: 1, legendary: false },
  98: { name: 'Krabby', types: ['water'], generation: 1, legendary: false },
  99: { name: 'Kingler', types: ['water'], generation: 1, legendary: false },
  100: { name: 'Voltorb', types: ['electric'], generation: 1, legendary: false },
  101: { name: 'Electrode', types: ['electric'], generation: 1, legendary: false },
  102: { name: 'Exeggcute', types: ['grass', 'psychic'], generation: 1, legendary: false },
  103: { name: 'Exeggutor', types: ['grass', 'psychic'], generation: 1, legendary: false },
  104: { name: 'Cubone', types: ['ground'], generation: 1, legendary: false },
  105: { name: 'Marowak', types: ['ground'], generation: 1, legendary: false },
  106: { name: 'Hitmonlee', types: ['fighting'], generation: 1, legendary: false },
  107: { name: 'Hitmonchan', types: ['fighting'], generation: 1, legendary: false },
  108: { name: 'Lickitung', types: ['normal'], generation: 1, legendary: false },
  109: { name: 'Koffing', types: ['poison'], generation: 1, legendary: false },
  110: { name: 'Weezing', types: ['poison'], generation: 1, legendary: false },
  111: { name: 'Rhyhorn', types: ['ground', 'rock'], generation: 1, legendary: false },
  112: { name: 'Rhydon', types: ['ground', 'rock'], generation: 1, legendary: false },
  113: { name: 'Chansey', types: ['normal'], generation: 1, legendary: false },
  114: { name: 'Tangela', types: ['grass'], generation: 1, legendary: false },
  115: { name: 'Kangaskhan', types: ['normal'], generation: 1, legendary: false },
  116: { name: 'Horsea', types: ['water'], generation: 1, legendary: false },
  117: { name: 'Seadra', types: ['water'], generation: 1, legendary: false },
  118: { name: 'Goldeen', types: ['water'], generation: 1, legendary: false },
  119: { name: 'Seaking', types: ['water'], generation: 1, legendary: false },
  120: { name: 'Staryu', types: ['water'], generation: 1, legendary: false },
  121: { name: 'Starmie', types: ['water', 'psychic'], generation: 1, legendary: false },
  122: { name: 'Mr. Mime', types: ['psychic', 'fairy'], generation: 1, legendary: false },
  123: { name: 'Scyther', types: ['bug', 'flying'], generation: 1, legendary: false },
  124: { name: 'Jynx', types: ['ice', 'psychic'], generation: 1, legendary: false },
  125: { name: 'Electabuzz', types: ['electric'], generation: 1, legendary: false },
  126: { name: 'Magmar', types: ['fire'], generation: 1, legendary: false },
  127: { name: 'Pinsir', types: ['bug'], generation: 1, legendary: false },
  270: { name: 'Lotad', types: ['water', 'grass'], generation: 3, legendary: false },
  271: { name: 'Lombre', types: ['water', 'grass'], generation: 3, legendary: false },
  272: { name: 'Ludicolo', types: ['water', 'grass'], generation: 3, legendary: false },
  273: { name: 'Seedot', types: ['grass'], generation: 3, legendary: false },
  274: { name: 'Nuzleaf', types: ['grass', 'dark'], generation: 3, legendary: false },
  275: { name: 'Shiftry', types: ['grass', 'dark'], generation: 3, legendary: false },
  276: { name: 'Taillow', types: ['normal', 'flying'], generation: 3, legendary: false },
  277: { name: 'Swellow', types: ['normal', 'flying'], generation: 3, legendary: false },
  278: { name: 'Wingull', types: ['water', 'flying'], generation: 3, legendary: false },
  279: { name: 'Pelipper', types: ['water', 'flying'], generation: 3, legendary: false },
  280: { name: 'Ralts', types: ['psychic', 'fairy'], generation: 3, legendary: false },
  281: { name: 'Kirlia', types: ['psychic', 'fairy'], generation: 3, legendary: false },
  282: { name: 'Gardevoir', types: ['psychic', 'fairy'], generation: 3, legendary: false },
  283: { name: 'Surskit', types: ['bug', 'water'], generation: 3, legendary: false },
  284: { name: 'Masquerain', types: ['bug', 'flying'], generation: 3, legendary: false },
  285: { name: 'Shroomish', types: ['grass'], generation: 3, legendary: false },
  286: { name: 'Breloom', types: ['grass', 'fighting'], generation: 3, legendary: false },
  287: { name: 'Slakoth', types: ['normal'], generation: 3, legendary: false },
  288: { name: 'Vigoroth', types: ['normal'], generation: 3, legendary: false },
  289: { name: 'Slaking', types: ['normal'], generation: 3, legendary: false },
  290: { name: 'Nincada', types: ['bug', 'ground'], generation: 3, legendary: false },
  291: { name: 'Ninjask', types: ['bug', 'flying'], generation: 3, legendary: false },
  292: { name: 'Shedinja', types: ['bug', 'ghost'], generation: 3, legendary: false },
  293: { name: 'Whismur', types: ['normal'], generation: 3, legendary: false },
  294: { name: 'Loudred', types: ['normal'], generation: 3, legendary: false },
  295: { name: 'Exploud', types: ['normal'], generation: 3, legendary: false },
  296: { name: 'Makuhita', types: ['fighting'], generation: 3, legendary: false },
  297: { name: 'Hariyama', types: ['fighting'], generation: 3, legendary: false },
  298: { name: 'Azurill', types: ['normal', 'fairy'], generation: 3, legendary: false },
  299: { name: 'Nosepass', types: ['rock'], generation: 3, legendary: false },
  300: { name: 'Skitty', types: ['normal'], generation: 3, legendary: false },
  301: { name: 'Delcatty', types: ['normal'], generation: 3, legendary: false },
  302: { name: 'Sableye', types: ['dark', 'ghost'], generation: 3, legendary: false },
  303: { name: 'Mawile', types: ['steel', 'fairy'], generation: 3, legendary: false },
  304: { name: 'Aron', types: ['steel', 'rock'], generation: 3, legendary: false },
  305: { name: 'Lairon', types: ['steel', 'rock'], generation: 3, legendary: false },
  306: { name: 'Aggron', types: ['steel', 'rock'], generation: 3, legendary: false },
  307: { name: 'Meditite', types: ['fighting', 'psychic'], generation: 3, legendary: false },
  308: { name: 'Medicham', types: ['fighting', 'psychic'], generation: 3, legendary: false },
  309: { name: 'Electrike', types: ['electric'], generation: 3, legendary: false },
  310: { name: 'Manectric', types: ['electric'], generation: 3, legendary: false },
  311: { name: 'Plusle', types: ['electric'], generation: 3, legendary: false },
  312: { name: 'Minun', types: ['electric'], generation: 3, legendary: false },
  313: { name: 'Volbeat', types: ['bug'], generation: 3, legendary: false },
  314: { name: 'Illumise', types: ['bug'], generation: 3, legendary: false },
  315: { name: 'Roselia', types: ['grass', 'poison'], generation: 3, legendary: false },
  316: { name: 'Gulpin', types: ['poison'], generation: 3, legendary: false },
  317: { name: 'Swalot', types: ['poison'], generation: 3, legendary: false },
  318: { name: 'Carvanha', types: ['water', 'dark'], generation: 3, legendary: false },
  319: { name: 'Sharpedo', types: ['water', 'dark'], generation: 3, legendary: false },
  320: { name: 'Wailmer', types: ['water'], generation: 3, legendary: false },
  321: { name: 'Wailord', types: ['water'], generation: 3, legendary: false },
  322: { name: 'Numel', types: ['fire', 'ground'], generation: 3, legendary: false },
  323: { name: 'Camerupt', types: ['fire', 'ground'], generation: 3, legendary: false },
  324: { name: 'Torkoal', types: ['fire'], generation: 3, legendary: false },
  325: { name: 'Spoink', types: ['psychic'], generation: 3, legendary: false },
  326: { name: 'Grumpig', types: ['psychic'], generation: 3, legendary: false },
  327: { name: 'Spinda', types: ['normal'], generation: 3, legendary: false },
  328: { name: 'Trapinch', types: ['ground'], generation: 3, legendary: false },
  329: { name: 'Vibrava', types: ['ground', 'dragon'], generation: 3, legendary: false },
  330: { name: 'Flygon', types: ['ground', 'dragon'], generation: 3, legendary: false },
  331: { name: 'Cacnea', types: ['grass'], generation: 3, legendary: false },
  332: { name: 'Cacturne', types: ['grass', 'dark'], generation: 3, legendary: false },
  333: { name: 'Swablu', types: ['normal', 'flying'], generation: 3, legendary: false },
  334: { name: 'Altaria', types: ['dragon', 'flying'], generation: 3, legendary: false },
  335: { name: 'Zangoose', types: ['normal'], generation: 3, legendary: false },
  336: { name: 'Seviper', types: ['poison'], generation: 3, legendary: false },
  337: { name: 'Lunatone', types: ['rock', 'psychic'], generation: 3, legendary: false },
  338: { name: 'Solrock', types: ['rock', 'psychic'], generation: 3, legendary: false },
  339: { name: 'Barboach', types: ['water', 'ground'], generation: 3, legendary: false },
  340: { name: 'Whiscash', types: ['water', 'ground'], generation: 3, legendary: false },
  341: { name: 'Corphish', types: ['water'], generation: 3, legendary: false },
  342: { name: 'Crawdaunt', types: ['water', 'dark'], generation: 3, legendary: false },
  343: { name: 'Baltoy', types: ['ground', 'psychic'], generation: 3, legendary: false },
  344: { name: 'Claydol', types: ['ground', 'psychic'], generation: 3, legendary: false },
  345: { name: 'Lileep', types: ['rock', 'grass'], generation: 3, legendary: false },
  346: { name: 'Cradily', types: ['rock', 'grass'], generation: 3, legendary: false },
  347: { name: 'Anorith', types: ['rock', 'bug'], generation: 3, legendary: false },
  348: { name: 'Armaldo', types: ['rock', 'bug'], generation: 3, legendary: false },
  349: { name: 'Feebas', types: ['water'], generation: 3, legendary: false },
  350: { name: 'Milotic', types: ['water'], generation: 3, legendary: false },
  351: { name: 'Castform', types: ['normal'], generation: 3, legendary: false },
  352: { name: 'Kecleon', types: ['normal'], generation: 3, legendary: false },
  353: { name: 'Shuppet', types: ['ghost'], generation: 3, legendary: false },
  354: { name: 'Banette', types: ['ghost'], generation: 3, legendary: false },
  355: { name: 'Duskull', types: ['ghost'], generation: 3, legendary: false },
  356: { name: 'Dusclops', types: ['ghost'], generation: 3, legendary: false },
  357: { name: 'Tropius', types: ['grass', 'flying'], generation: 3, legendary: false },
  358: { name: 'Chimecho', types: ['psychic'], generation: 3, legendary: false },
  359: { name: 'Absol', types: ['dark'], generation: 3, legendary: false },
  360: { name: 'Wynaut', types: ['psychic'], generation: 3, legendary: false },
  361: { name: 'Snorunt', types: ['ice'], generation: 3, legendary: false },
  362: { name: 'Glalie', types: ['ice'], generation: 3, legendary: false },
  363: { name: 'Spheal', types: ['ice', 'water'], generation: 3, legendary: false },
  364: { name: 'Sealeo', types: ['ice', 'water'], generation: 3, legendary: false },
  365: { name: 'Walrein', types: ['ice', 'water'], generation: 3, legendary: false },
  366: { name: 'Clamperl', types: ['water'], generation: 3, legendary: false },
  367: { name: 'Huntail', types: ['water'], generation: 3, legendary: false },
  368: { name: 'Gorebyss', types: ['water'], generation: 3, legendary: false },
  369: { name: 'Relicanth', types: ['water', 'rock'], generation: 3, legendary: false },
  370: { name: 'Luvdisc', types: ['water'], generation: 3, legendary: false },
  371: { name: 'Bagon', types: ['dragon'], generation: 3, legendary: false },
  372: { name: 'Shelgon', types: ['dragon'], generation: 3, legendary: false },
  373: { name: 'Salamence', types: ['dragon', 'flying'], generation: 3, legendary: false },
  374: { name: 'Beldum', types: ['steel', 'psychic'], generation: 3, legendary: false },
  375: { name: 'Metang', types: ['steel', 'psychic'], generation: 3, legendary: false },
  376: { name: 'Metagross', types: ['steel', 'psychic'], generation: 3, legendary: false },
  377: { name: 'Regirock', types: ['rock'], generation: 3, legendary: true },
  378: { name: 'Regice', types: ['ice'], generation: 3, legendary: true },
  379: { name: 'Registeel', types: ['steel'], generation: 3, legendary: true },
  380: { name: 'Latias', types: ['dragon', 'psychic'], generation: 3, legendary: true },
  381: { name: 'Latios', types: ['dragon', 'psychic'], generation: 3, legendary: true },
  382: { name: 'Kyogre', types: ['water'], generation: 3, legendary: true },
  383: { name: 'Groudon', types: ['ground'], generation: 3, legendary: true },
  384: { name: 'Rayquaza', types: ['dragon', 'flying'], generation: 3, legendary: true },
  385: { name: 'Jirachi', types: ['steel', 'psychic'], generation: 3, legendary: true },
  386: { name: 'Deoxys', types: ['psychic'], generation: 3, legendary: true },

// Generación 4 - Sinnoh (387-493)
  387: { name: 'Turtwig', types: ['grass'], generation: 4, legendary: false },
  388: { name: 'Grotle', types: ['grass'], generation: 4, legendary: false },
  389: { name: 'Torterra', types: ['grass', 'ground'], generation: 4, legendary: false },
  390: { name: 'Chimchar', types: ['fire'], generation: 4, legendary: false },
  391: { name: 'Monferno', types: ['fire', 'fighting'], generation: 4, legendary: false },
  392: { name: 'Infernape', types: ['fire', 'fighting'], generation: 4, legendary: false },
  393: { name: 'Piplup', types: ['water'], generation: 4, legendary: false },
  394: { name: 'Prinplup', types: ['water'], generation: 4, legendary: false },
  395: { name: 'Empoleon', types: ['water', 'steel'], generation: 4, legendary: false },
  396: { name: 'Starly', types: ['normal', 'flying'], generation: 4, legendary: false },
  397: { name: 'Staravia', types: ['normal', 'flying'], generation: 4, legendary: false },
  398: { name: 'Staraptor', types: ['normal', 'flying'], generation: 4, legendary: false },
  399: { name: 'Bidoof', types: ['normal'], generation: 4, legendary: false },
  400: { name: 'Bibarel', types: ['normal', 'water'], generation: 4, legendary: false },
  401: { name: 'Kricketot', types: ['bug'], generation: 4, legendary: false },
  402: { name: 'Kricketune', types: ['bug'], generation: 4, legendary: false },
  403: { name: 'Shinx', types: ['electric'], generation: 4, legendary: false },
  404: { name: 'Luxio', types: ['electric'], generation: 4, legendary: false },
  405: { name: 'Luxray', types: ['electric'], generation: 4, legendary: false },
  406: { name: 'Budew', types: ['grass', 'poison'], generation: 4, legendary: false },
  407: { name: 'Roserade', types: ['grass', 'poison'], generation: 4, legendary: false },
  408: { name: 'Cranidos', types: ['rock'], generation: 4, legendary: false },
  409: { name: 'Rampardos', types: ['rock'], generation: 4, legendary: false },
  410: { name: 'Shieldon', types: ['rock', 'steel'], generation: 4, legendary: false },
  411: { name: 'Bastiodon', types: ['rock', 'steel'], generation: 4, legendary: false },
  412: { name: 'Burmy', types: ['bug'], generation: 4, legendary: false },
  413: { name: 'Wormadam', types: ['bug', 'grass'], generation: 4, legendary: false },
  414: { name: 'Mothim', types: ['bug', 'flying'], generation: 4, legendary: false },
  415: { name: 'Combee', types: ['bug', 'flying'], generation: 4, legendary: false },
  416: { name: 'Vespiquen', types: ['bug', 'flying'], generation: 4, legendary: false },
  417: { name: 'Pachirisu', types: ['electric'], generation: 4, legendary: false },
  418: { name: 'Buizel', types: ['water'], generation: 4, legendary: false },
  419: { name: 'Floatzel', types: ['water'], generation: 4, legendary: false },
  420: { name: 'Cherubi', types: ['grass'], generation: 4, legendary: false },
  421: { name: 'Cherrim', types: ['grass'], generation: 4, legendary: false },
  422: { name: 'Shellos', types: ['water'], generation: 4, legendary: false },
  423: { name: 'Gastrodon', types: ['water', 'ground'], generation: 4, legendary: false },
  424: { name: 'Ambipom', types: ['normal'], generation: 4, legendary: false },
  425: { name: 'Drifloon', types: ['ghost', 'flying'], generation: 4, legendary: false },
  426: { name: 'Drifblim', types: ['ghost', 'flying'], generation: 4, legendary: false },
  427: { name: 'Buneary', types: ['normal'], generation: 4, legendary: false },
  428: { name: 'Lopunny', types: ['normal'], generation: 4, legendary: false },
  429: { name: 'Mismagius', types: ['ghost'], generation: 4, legendary: false },
  430: { name: 'Honchkrow', types: ['dark', 'flying'], generation: 4, legendary: false },
  431: { name: 'Glameow', types: ['normal'], generation: 4, legendary: false },
  432: { name: 'Purugly', types: ['normal'], generation: 4, legendary: false },
  433: { name: 'Chingling', types: ['psychic'], generation: 4, legendary: false },
  434: { name: 'Stunky', types: ['poison', 'dark'], generation: 4, legendary: false },
  435: { name: 'Skuntank', types: ['poison', 'dark'], generation: 4, legendary: false },
  436: { name: 'Bronzor', types: ['steel', 'psychic'], generation: 4, legendary: false },
  437: { name: 'Bronzong', types: ['steel', 'psychic'], generation: 4, legendary: false },
  438: { name: 'Bonsly', types: ['rock'], generation: 4, legendary: false },
  439: { name: 'Mime Jr.', types: ['psychic', 'fairy'], generation: 4, legendary: false },
  440: { name: 'Happiny', types: ['normal'], generation: 4, legendary: false },
  441: { name: 'Chatot', types: ['normal', 'flying'], generation: 4, legendary: false },
  442: { name: 'Spiritomb', types: ['ghost', 'dark'], generation: 4, legendary: false },
  443: { name: 'Gible', types: ['dragon', 'ground'], generation: 4, legendary: false },
  444: { name: 'Gabite', types: ['dragon', 'ground'], generation: 4, legendary: false },
  445: { name: 'Garchomp', types: ['dragon', 'ground'], generation: 4, legendary: false },
  446: { name: 'Munchlax', types: ['normal'], generation: 4, legendary: false },
  447: { name: 'Riolu', types: ['fighting'], generation: 4, legendary: false },
  448: { name: 'Lucario', types: ['fighting', 'steel'], generation: 4, legendary: false },
  449: { name: 'Hippopotas', types: ['ground'], generation: 4, legendary: false },
  450: { name: 'Hippowdon', types: ['ground'], generation: 4, legendary: false },
  451: { name: 'Skorupi', types: ['poison', 'bug'], generation: 4, legendary: false },
  452: { name: 'Drapion', types: ['poison', 'dark'], generation: 4, legendary: false },
  453: { name: 'Croagunk', types: ['poison', 'fighting'], generation: 4, legendary: false },
  454: { name: 'Toxicroak', types: ['poison', 'fighting'], generation: 4, legendary: false },
  455: { name: 'Carnivine', types: ['grass'], generation: 4, legendary: false },
  456: { name: 'Finneon', types: ['water'], generation: 4, legendary: false },
  457: { name: 'Lumineon', types: ['water'], generation: 4, legendary: false },
  458: { name: 'Mantyke', types: ['water', 'flying'], generation: 4, legendary: false },
  459: { name: 'Snover', types: ['grass', 'ice'], generation: 4, legendary: false },
  460: { name: 'Abomasnow', types: ['grass', 'ice'], generation: 4, legendary: false },
  461: { name: 'Weavile', types: ['dark', 'ice'], generation: 4, legendary: false },
  462: { name: 'Magnezone', types: ['electric', 'steel'], generation: 4, legendary: false },
  463: { name: 'Lickilicky', types: ['normal'], generation: 4, legendary: false },
  464: { name: 'Rhyperior', types: ['ground', 'rock'], generation: 4, legendary: false },
  465: { name: 'Tangrowth', types: ['grass'], generation: 4, legendary: false },
  466: { name: 'Electivire', types: ['electric'], generation: 4, legendary: false },
  467: { name: 'Magmortar', types: ['fire'], generation: 4, legendary: false },
  468: { name: 'Togekiss', types: ['fairy', 'flying'], generation: 4, legendary: false },
  469: { name: 'Yanmega', types: ['bug', 'flying'], generation: 4, legendary: false },
  470: { name: 'Leafeon', types: ['grass'], generation: 4, legendary: false },
  471: { name: 'Glaceon', types: ['ice'], generation: 4, legendary: false },
  472: { name: 'Gliscor', types: ['ground', 'flying'], generation: 4, legendary: false },
  473: { name: 'Mamoswine', types: ['ice', 'ground'], generation: 4, legendary: false },
  474: { name: 'Porygon-Z', types: ['normal'], generation: 4, legendary: false },
  475: { name: 'Gallade', types: ['psychic', 'fighting'], generation: 4, legendary: false },
  476: { name: 'Probopass', types: ['rock', 'steel'], generation: 4, legendary: false },
  477: { name: 'Dusknoir', types: ['ghost'], generation: 4, legendary: false },
  478: { name: 'Froslass', types: ['ice', 'ghost'], generation: 4, legendary: false },
  479: { name: 'Rotom', types: ['electric', 'ghost'], generation: 4, legendary: false },
  480: { name: 'Uxie', types: ['psychic'], generation: 4, legendary: true },
  481: { name: 'Mesprit', types: ['psychic'], generation: 4, legendary: true },
  482: { name: 'Azelf', types: ['psychic'], generation: 4, legendary: true },
  483: { name: 'Dialga', types: ['steel', 'dragon'], generation: 4, legendary: true },
  484: { name: 'Palkia', types: ['water', 'dragon'], generation: 4, legendary: true },
  485: { name: 'Heatran', types: ['fire', 'steel'], generation: 4, legendary: true },
  486: { name: 'Regigigas', types: ['normal'], generation: 4, legendary: true },
  487: { name: 'Giratina', types: ['ghost', 'dragon'], generation: 4, legendary: true },
  488: { name: 'Cresselia', types: ['psychic'], generation: 4, legendary: true },
  489: { name: 'Phione', types: ['water'], generation: 4, legendary: false },
  490: { name: 'Manaphy', types: ['water'], generation: 4, legendary: true },
  491: { name: 'Darkrai', types: ['dark'], generation: 4, legendary: true },
  492: { name: 'Shaymin', types: ['grass'], generation: 4, legendary: true },
  493: { name: 'Arceus', types: ['normal'], generation: 4, legendary: true },

  // Generación 5 - Unova (494-649)
  494: { name: 'Victini', types: ['psychic', 'fire'], generation: 5, legendary: true },
  495: { name: 'Snivy', types: ['grass'], generation: 5, legendary: false },
  496: { name: 'Servine', types: ['grass'], generation: 5, legendary: false },
  497: { name: 'Serperior', types: ['grass'], generation: 5, legendary: false },
  498: { name: 'Tepig', types: ['fire'], generation: 5, legendary: false },
  499: { name: 'Pignite', types: ['fire', 'fighting'], generation: 5, legendary: false },
  500: { name: 'Emboar', types: ['fire', 'fighting'], generation: 5, legendary: false },
  501: { name: 'Oshawott', types: ['water'], generation: 5, legendary: false },
  502: { name: 'Dewott', types: ['water'], generation: 5, legendary: false },
  503: { name: 'Samurott', types: ['water'], generation: 5, legendary: false },
  504: { name: 'Patrat', types: ['normal'], generation: 5, legendary: false },
  505: { name: 'Watchog', types: ['normal'], generation: 5, legendary: false },
  506: { name: 'Lillipup', types: ['normal'], generation: 5, legendary: false },
  507: { name: 'Herdier', types: ['normal'], generation: 5, legendary: false },
  508: { name: 'Stoutland', types: ['normal'], generation: 5, legendary: false },
  509: { name: 'Purrloin', types: ['dark'], generation: 5, legendary: false },
  510: { name: 'Liepard', types: ['dark'], generation: 5, legendary: false },
  511: { name: 'Pansage', types: ['grass'], generation: 5, legendary: false },
  512: { name: 'Simisage', types: ['grass'], generation: 5, legendary: false },
  513: { name: 'Pansear', types: ['fire'], generation: 5, legendary: false },
  514: { name: 'Simisear', types: ['fire'], generation: 5, legendary: false },
  515: { name: 'Panpour', types: ['water'], generation: 5, legendary: false },
  516: { name: 'Simipour', types: ['water'], generation: 5, legendary: false },
  517: { name: 'Munna', types: ['psychic'], generation: 5, legendary: false },
  518: { name: 'Musharna', types: ['psychic'], generation: 5, legendary: false },
  519: { name: 'Pidove', types: ['normal', 'flying'], generation: 5, legendary: false },
  520: { name: 'Tranquill', types: ['normal', 'flying'], generation: 5, legendary: false },
  521: { name: 'Unfezant', types: ['normal', 'flying'], generation: 5, legendary: false },
  522: { name: 'Blitzle', types: ['electric'], generation: 5, legendary: false },
  523: { name: 'Zebstrika', types: ['electric'], generation: 5, legendary: false },
  524: { name: 'Roggenrola', types: ['rock'], generation: 5, legendary: false },
  525: { name: 'Boldore', types: ['rock'], generation: 5, legendary: false },
  526: { name: 'Gigalith', types: ['rock'], generation: 5, legendary: false },
  527: { name: 'Woobat', types: ['psychic', 'flying'], generation: 5, legendary: false },
  528: { name: 'Swoobat', types: ['psychic', 'flying'], generation: 5, legendary: false },
  529: { name: 'Drilbur', types: ['ground'], generation: 5, legendary: false },
  530: { name: 'Excadrill', types: ['ground', 'steel'], generation: 5, legendary: false },
  531: { name: 'Audino', types: ['normal'], generation: 5, legendary: false },
  532: { name: 'Timburr', types: ['fighting'], generation: 5, legendary: false },
  533: { name: 'Gurdurr', types: ['fighting'], generation: 5, legendary: false },
  534: { name: 'Conkeldurr', types: ['fighting'], generation: 5, legendary: false },
  535: { name: 'Tympole', types: ['water'], generation: 5, legendary: false },
  536: { name: 'Palpitoad', types: ['water', 'ground'], generation: 5, legendary: false },
  537: { name: 'Seismitoad', types: ['water', 'ground'], generation: 5, legendary: false },
  538: { name: 'Throh', types: ['fighting'], generation: 5, legendary: false },
  539: { name: 'Sawk', types: ['fighting'], generation: 5, legendary: false },
  540: { name: 'Sewaddle', types: ['bug', 'grass'], generation: 5, legendary: false },
  541: { name: 'Swadloon', types: ['bug', 'grass'], generation: 5, legendary: false },
  542: { name: 'Leavanny', types: ['bug', 'grass'], generation: 5, legendary: false },
  543: { name: 'Venipede', types: ['bug', 'poison'], generation: 5, legendary: false },
  544: { name: 'Whirlipede', types: ['bug', 'poison'], generation: 5, legendary: false },
  545: { name: 'Scolipede', types: ['bug', 'poison'], generation: 5, legendary: false },
  546: { name: 'Cottonee', types: ['grass', 'fairy'], generation: 5, legendary: false },
  547: { name: 'Whimsicott', types: ['grass', 'fairy'], generation: 5, legendary: false },
  548: { name: 'Petilil', types: ['grass'], generation: 5, legendary: false },
  549: { name: 'Lilligant', types: ['grass'], generation: 5, legendary: false },
  550: { name: 'Basculin', types: ['water'], generation: 5, legendary: false },
  551: { name: 'Sandile', types: ['ground', 'dark'], generation: 5, legendary: false },
  552: { name: 'Krokorok', types: ['ground', 'dark'], generation: 5, legendary: false },
  553: { name: 'Krookodile', types: ['ground', 'dark'], generation: 5, legendary: false },
  554: { name: 'Darumaka', types: ['fire'], generation: 5, legendary: false },
  555: { name: 'Darmanitan', types: ['fire'], generation: 5, legendary: false },
  556: { name: 'Maractus', types: ['grass'], generation: 5, legendary: false },
  557: { name: 'Dwebble', types: ['bug', 'rock'], generation: 5, legendary: false },
  558: { name: 'Crustle', types: ['bug', 'rock'], generation: 5, legendary: false },
  559: { name: 'Scraggy', types: ['dark', 'fighting'], generation: 5, legendary: false },
  560: { name: 'Scrafty', types: ['dark', 'fighting'], generation: 5, legendary: false },
  561: { name: 'Sigilyph', types: ['psychic', 'flying'], generation: 5, legendary: false },
  562: { name: 'Yamask', types: ['ghost'], generation: 5, legendary: false },
  563: { name: 'Cofagrigus', types: ['ghost'], generation: 5, legendary: false },
  564: { name: 'Tirtouga', types: ['water', 'rock'], generation: 5, legendary: false },
  565: { name: 'Carracosta', types: ['water', 'rock'], generation: 5, legendary: false },
  566: { name: 'Archen', types: ['rock', 'flying'], generation: 5, legendary: false },
  567: { name: 'Archeops', types: ['rock', 'flying'], generation: 5, legendary: false },
  568: { name: 'Trubbish', types: ['poison'], generation: 5, legendary: false },
  569: { name: 'Garbodor', types: ['poison'], generation: 5, legendary: false },
  570: { name: 'Zorua', types: ['dark'], generation: 5, legendary: false },
  571: { name: 'Zoroark', types: ['dark'], generation: 5, legendary: false },
  572: { name: 'Minccino', types: ['normal'], generation: 5, legendary: false },
  573: { name: 'Cinccino', types: ['normal'], generation: 5, legendary: false },
  574: { name: 'Gothita', types: ['psychic'], generation: 5, legendary: false },
  575: { name: 'Gothorita', types: ['psychic'], generation: 5, legendary: false },
  576: { name: 'Gothitelle', types: ['psychic'], generation: 5, legendary: false },
  577: { name: 'Solosis', types: ['psychic'], generation: 5, legendary: false },
  578: { name: 'Duosion', types: ['psychic'], generation: 5, legendary: false },
  579: { name: 'Reuniclus', types: ['psychic'], generation: 5, legendary: false },
  580: { name: 'Ducklett', types: ['water', 'flying'], generation: 5, legendary: false },
  581: { name: 'Swanna', types: ['water', 'flying'], generation: 5, legendary: false },
  582: { name: 'Vanillite', types: ['ice'], generation: 5, legendary: false },
  583: { name: 'Vanillish', types: ['ice'], generation: 5, legendary: false },
  584: { name: 'Vanilluxe', types: ['ice'], generation: 5, legendary: false },
  585: { name: 'Deerling', types: ['normal', 'grass'], generation: 5, legendary: false },
  586: { name: 'Sawsbuck', types: ['normal', 'grass'], generation: 5, legendary: false },
  587: { name: 'Emolga', types: ['electric', 'flying'], generation: 5, legendary: false },
  588: { name: 'Karrablast', types: ['bug'], generation: 5, legendary: false },
  589: { name: 'Escavalier', types: ['bug', 'steel'], generation: 5, legendary: false },
  590: { name: 'Foongus', types: ['grass', 'poison'], generation: 5, legendary: false },
  591: { name: 'Amoonguss', types: ['grass', 'poison'], generation: 5, legendary: false },
  592: { name: 'Frillish', types: ['water', 'ghost'], generation: 5, legendary: false },
  593: { name: 'Jellicent', types: ['water', 'ghost'], generation: 5, legendary: false },
  594: { name: 'Alomomola', types: ['water'], generation: 5, legendary: false },
  595: { name: 'Joltik', types: ['bug', 'electric'], generation: 5, legendary: false },
  596: { name: 'Galvantula', types: ['bug', 'electric'], generation: 5, legendary: false },
  597: { name: 'Ferroseed', types: ['grass', 'steel'], generation: 5, legendary: false },
  598: { name: 'Ferrothorn', types: ['grass', 'steel'], generation: 5, legendary: false },
  599: { name: 'Klink', types: ['steel'], generation: 5, legendary: false },
  600: { name: 'Klang', types: ['steel'], generation: 5, legendary: false },
  601: { name: 'Klinklang', types: ['steel'], generation: 5, legendary: false },
  602: { name: 'Tynamo', types: ['electric'], generation: 5, legendary: false },
  603: { name: 'Eelektrik', types: ['electric'], generation: 5, legendary: false },
  604: { name: 'Eelektross', types: ['electric'], generation: 5, legendary: false },
  605: { name: 'Elgyem', types: ['psychic'], generation: 5, legendary: false },
  606: { name: 'Beheeyem', types: ['psychic'], generation: 5, legendary: false },
  607: { name: 'Litwick', types: ['ghost', 'fire'], generation: 5, legendary: false },
  608: { name: 'Lampent', types: ['ghost', 'fire'], generation: 5, legendary: false },
  609: { name: 'Chandelure', types: ['ghost', 'fire'], generation: 5, legendary: false },
  610: { name: 'Axew', types: ['dragon'], generation: 5, legendary: false },
  611: { name: 'Fraxure', types: ['dragon'], generation: 5, legendary: false },
  612: { name: 'Haxorus', types: ['dragon'], generation: 5, legendary: false },
  613: { name: 'Cubchoo', types: ['ice'], generation: 5, legendary: false },
  614: { name: 'Beartic', types: ['ice'], generation: 5, legendary: false },
  615: { name: 'Cryogonal', types: ['ice'], generation: 5, legendary: false },
  616: { name: 'Shelmet', types: ['bug'], generation: 5, legendary: false },
  617: { name: 'Accelgor', types: ['bug'], generation: 5, legendary: false },
  618: { name: 'Stunfisk', types: ['ground', 'electric'], generation: 5, legendary: false },
  619: { name: 'Mienfoo', types: ['fighting'], generation: 5, legendary: false },
  620: { name: 'Mienshao', types: ['fighting'], generation: 5, legendary: false },
  621: { name: 'Druddigon', types: ['dragon'], generation: 5, legendary: false },
  622: { name: 'Golett', types: ['ground', 'ghost'], generation: 5, legendary: false },
  623: { name: 'Golurk', types: ['ground', 'ghost'], generation: 5, legendary: false },
  624: { name: 'Pawniard', types: ['dark', 'steel'], generation: 5, legendary: false },
  625: { name: 'Bisharp', types: ['dark', 'steel'], generation: 5, legendary: false },
  626: { name: 'Bouffalant', types: ['normal'], generation: 5, legendary: false },
  627: { name: 'Rufflet', types: ['normal', 'flying'], generation: 5, legendary: false },
  628: { name: 'Braviary', types: ['normal', 'flying'], generation: 5, legendary: false },
  629: { name: 'Vullaby', types: ['dark', 'flying'], generation: 5, legendary: false },
  630: { name: 'Mandibuzz', types: ['dark', 'flying'], generation: 5, legendary: false },
  631: { name: 'Heatmor', types: ['fire'], generation: 5, legendary: false },
  632: { name: 'Durant', types: ['bug', 'steel'], generation: 5, legendary: false },
  633: { name: 'Deino', types: ['dark', 'dragon'], generation: 5, legendary: false },
  634: { name: 'Zweilous', types: ['dark', 'dragon'], generation: 5, legendary: false },
  635: { name: 'Hydreigon', types: ['dark', 'dragon'], generation: 5, legendary: false },
  636: { name: 'Larvesta', types: ['bug', 'fire'], generation: 5, legendary: false },
  637: { name: 'Volcarona', types: ['bug', 'fire'], generation: 5, legendary: false },
  638: { name: 'Cobalion', types: ['steel', 'fighting'], generation: 5, legendary: true },
  639: { name: 'Terrakion', types: ['rock', 'fighting'], generation: 5, legendary: true },
  640: { name: 'Virizion', types: ['grass', 'fighting'], generation: 5, legendary: true },
  641: { name: 'Tornadus', types: ['flying'], generation: 5, legendary: true },
  642: { name: 'Thundurus', types: ['electric', 'flying'], generation: 5, legendary: true },
  643: { name: 'Reshiram', types: ['dragon', 'fire'], generation: 5, legendary: true },
  644: { name: 'Zekrom', types: ['dragon', 'electric'], generation: 5, legendary: true },
  645: { name: 'Landorus', types: ['ground', 'flying'], generation: 5, legendary: true },
  646: { name: 'Kyurem', types: ['dragon', 'ice'], generation: 5, legendary: true },
  647: { name: 'Keldeo', types: ['water', 'fighting'], generation: 5, legendary: true },
  648: { name: 'Meloetta', types: ['normal', 'psychic'], generation: 5, legendary: true },
  649: { name: 'Genesect', types: ['bug', 'steel'], generation: 5, legendary: true },

  // Generación 6 - Kalos (650-721)
  650: { name: 'Chespin', types: ['grass'], generation: 6, legendary: false },
  651: { name: 'Quilladin', types: ['grass'], generation: 6, legendary: false },
  652: { name: 'Chesnaught', types: ['grass', 'fighting'], generation: 6, legendary: false },
  653: { name: 'Fennekin', types: ['fire'], generation: 6, legendary: false },
  654: { name: 'Braixen', types: ['fire'], generation: 6, legendary: false },
  655: { name: 'Delphox', types: ['fire', 'psychic'], generation: 6, legendary: false },
  656: { name: 'Froakie', types: ['water'], generation: 6, legendary: false },
  657: { name: 'Frogadier', types: ['water'], generation: 6, legendary: false },
  658: { name: 'Greninja', types: ['water', 'dark'], generation: 6, legendary: false },
  659: { name: 'Bunnelby', types: ['normal'], generation: 6, legendary: false },
  660: { name: 'Diggersby', types: ['normal', 'ground'], generation: 6, legendary: false },
  661: { name: 'Fletchling', types: ['normal', 'flying'], generation: 6, legendary: false },
  662: { name: 'Fletchinder', types: ['fire', 'flying'], generation: 6, legendary: false },
  663: { name: 'Talonflame', types: ['fire', 'flying'], generation: 6, legendary: false },
  664: { name: 'Scatterbug', types: ['bug'], generation: 6, legendary: false },
  665: { name: 'Spewpa', types: ['bug'], generation: 6, legendary: false },
  666: { name: 'Vivillon', types: ['bug', 'flying'], generation: 6, legendary: false },
  667: { name: 'Litleo', types: ['fire', 'normal'], generation: 6, legendary: false },
  668: { name: 'Pyroar', types: ['fire', 'normal'], generation: 6, legendary: false },
  669: { name: 'Flabébé', types: ['fairy'], generation: 6, legendary: false },
  670: { name: 'Floette', types: ['fairy'], generation: 6, legendary: false },
  671: { name: 'Florges', types: ['fairy'], generation: 6, legendary: false },
  672: { name: 'Skiddo', types: ['grass'], generation: 6, legendary: false },
  673: { name: 'Gogoat', types: ['grass'], generation: 6, legendary: false },
  674: { name: 'Pancham', types: ['fighting'], generation: 6, legendary: false },
  675: { name: 'Pangoro', types: ['fighting', 'dark'], generation: 6, legendary: false },
  676: { name: 'Furfrou', types: ['normal'], generation: 6, legendary: false },
  677: { name: 'Espurr', types: ['psychic'], generation: 6, legendary: false },
  678: { name: 'Meowstic', types: ['psychic'], generation: 6, legendary: false },
  679: { name: 'Honedge', types: ['steel', 'ghost'], generation: 6, legendary: false },
  680: { name: 'Doublade', types: ['steel', 'ghost'], generation: 6, legendary: false },
  681: { name: 'Aegislash', types: ['steel', 'ghost'], generation: 6, legendary: false },
  682: { name: 'Spritzee', types: ['fairy'], generation: 6, legendary: false },
  683: { name: 'Aromatisse', types: ['fairy'], generation: 6, legendary: false },
  684: { name: 'Swirlix', types: ['fairy'], generation: 6, legendary: false },
  685: { name: 'Slurpuff', types: ['fairy'], generation: 6, legendary: false },
  686: { name: 'Inkay', types: ['dark', 'psychic'], generation: 6, legendary: false },
  687: { name: 'Malamar', types: ['dark', 'psychic'], generation: 6, legendary: false },
  688: { name: 'Binacle', types: ['rock', 'water'], generation: 6, legendary: false },
  689: { name: 'Barbaracle', types: ['rock', 'water'], generation: 6, legendary: false },
  690: { name: 'Skrelp', types: ['poison', 'water'], generation: 6, legendary: false },
  691: { name: 'Dragalge', types: ['poison', 'dragon'], generation: 6, legendary: false },
  692: { name: 'Clauncher', types: ['water'], generation: 6, legendary: false },
  693: { name: 'Clawitzer', types: ['water'], generation: 6, legendary: false },
  694: { name: 'Helioptile', types: ['electric', 'normal'], generation: 6, legendary: false },
  695: { name: 'Heliolisk', types: ['electric', 'normal'], generation: 6, legendary: false },
  696: { name: 'Tyrunt', types: ['rock', 'dragon'], generation: 6, legendary: false },
  697: { name: 'Tyrantrum', types: ['rock', 'dragon'], generation: 6, legendary: false },
  698: { name: 'Amaura', types: ['rock', 'ice'], generation: 6, legendary: false },
  699: { name: 'Aurorus', types: ['rock', 'ice'], generation: 6, legendary: false },
  700: { name: 'Sylveon', types: ['fairy'], generation: 6, legendary: false },
  701: { name: 'Hawlucha', types: ['fighting', 'flying'], generation: 6, legendary: false },
  702: { name: 'Dedenne', types: ['electric', 'fairy'], generation: 6, legendary: false },
  703: { name: 'Carbink', types: ['rock', 'fairy'], generation: 6, legendary: false },
  704: { name: 'Goomy', types: ['dragon'], generation: 6, legendary: false },
  705: { name: 'Sliggoo', types: ['dragon'], generation: 6, legendary: false },
  706: { name: 'Goodra', types: ['dragon'], generation: 6, legendary: false },
  707: { name: 'Klefki', types: ['steel', 'fairy'], generation: 6, legendary: false },
  708: { name: 'Phantump', types: ['ghost', 'grass'], generation: 6, legendary: false },
  709: { name: 'Trevenant', types: ['ghost', 'grass'], generation: 6, legendary: false },
  710: { name: 'Pumpkaboo', types: ['ghost', 'grass'], generation: 6, legendary: false },
  711: { name: 'Gourgeist', types: ['ghost', 'grass'], generation: 6, legendary: false },
  712: { name: 'Bergmite', types: ['ice'], generation: 6, legendary: false },
  713: { name: 'Avalugg', types: ['ice'], generation: 6, legendary: false },
  714: { name: 'Noibat', types: ['flying', 'dragon'], generation: 6, legendary: false },
  715: { name: 'Noivern', types: ['flying', 'dragon'], generation: 6, legendary: false },
  716: { name: 'Xerneas', types: ['fairy'], generation: 6, legendary: true },
  717: { name: 'Yveltal', types: ['dark', 'flying'], generation: 6, legendary: true },
  718: { name: 'Zygarde', types: ['dragon', 'ground'], generation: 6, legendary: true },
  719: { name: 'Diancie', types: ['rock', 'fairy'], generation: 6, legendary: true },
  720: { name: 'Hoopa', types: ['psychic', 'ghost'], generation: 6, legendary: true },
  721: { name: 'Volcanion', types: ['fire', 'water'], generation: 6, legendary: true },

  // Generación 7 - Alola (722-809)
  722: { name: 'Rowlet', types: ['grass', 'flying'], generation: 7, legendary: false },
  723: { name: 'Dartrix', types: ['grass', 'flying'], generation: 7, legendary: false },
  724: { name: 'Decidueye', types: ['grass', 'ghost'], generation: 7, legendary: false },
  725: { name: 'Litten', types: ['fire'], generation: 7, legendary: false },
  726: { name: 'Torracat', types: ['fire'], generation: 7, legendary: false },
  727: { name: 'Incineroar', types: ['fire', 'dark'], generation: 7, legendary: false },
  728: { name: 'Popplio', types: ['water'], generation: 7, legendary: false },
  729: { name: 'Brionne', types: ['water'], generation: 7, legendary: false },
  730: { name: 'Primarina', types: ['water', 'fairy'], generation: 7, legendary: false },
  731: { name: 'Pikipek', types: ['normal', 'flying'], generation: 7, legendary: false },
  732: { name: 'Trumbeak', types: ['normal', 'flying'], generation: 7, legendary: false },
  733: { name: 'Toucannon', types: ['normal', 'flying'], generation: 7, legendary: false },
  734: { name: 'Yungoos', types: ['normal'], generation: 7, legendary: false },
  735: { name: 'Gumshoos', types: ['normal'], generation: 7, legendary: false },
  736: { name: 'Grubbin', types: ['bug'], generation: 7, legendary: false },
  737: { name: 'Charjabug', types: ['bug', 'electric'], generation: 7, legendary: false },
  738: { name: 'Vikavolt', types: ['bug', 'electric'], generation: 7, legendary: false },
  739: { name: 'Crabrawler', types: ['fighting'], generation: 7, legendary: false },
  740: { name: 'Crabominable', types: ['fighting', 'ice'], generation: 7, legendary: false },
  741: { name: 'Oricorio', types: ['fire', 'flying'], generation: 7, legendary: false },
  742: { name: 'Cutiefly', types: ['bug', 'fairy'], generation: 7, legendary: false },
  743: { name: 'Ribombee', types: ['bug', 'fairy'], generation: 7, legendary: false },
  744: { name: 'Rockruff', types: ['rock'], generation: 7, legendary: false },
  745: { name: 'Lycanroc', types: ['rock'], generation: 7, legendary: false },
  746: { name: 'Wishiwashi', types: ['water'], generation: 7, legendary: false },
  747: { name: 'Mareanie', types: ['poison', 'water'], generation: 7, legendary: false },
  748: { name: 'Toxapex', types: ['poison', 'water'], generation: 7, legendary: false },
  749: { name: 'Mudbray', types: ['ground'], generation: 7, legendary: false },
  750: { name: 'Mudsdale', types: ['ground'], generation: 7, legendary: false },
  751: { name: 'Dewpider', types: ['water', 'bug'], generation: 7, legendary: false },
  752: { name: 'Araquanid', types: ['water', 'bug'], generation: 7, legendary: false },
  753: { name: 'Fomantis', types: ['grass'], generation: 7, legendary: false },
  754: { name: 'Lurantis', types: ['grass'], generation: 7, legendary: false },
  755: { name: 'Morelull', types: ['grass', 'fairy'], generation: 7, legendary: false },
  756: { name: 'Shiinotic', types: ['grass', 'fairy'], generation: 7, legendary: false },
  757: { name: 'Salandit', types: ['poison', 'fire'], generation: 7, legendary: false },
  758: { name: 'Salazzle', types: ['poison', 'fire'], generation: 7, legendary: false },
  759: { name: 'Stufful', types: ['normal', 'fighting'], generation: 7, legendary: false },
  760: { name: 'Bewear', types: ['normal', 'fighting'], generation: 7, legendary: false },
  761: { name: 'Bounsweet', types: ['grass'], generation: 7, legendary: false },
  762: { name: 'Steenee', types: ['grass'], generation: 7, legendary: false },
  763: { name: 'Tsareena', types: ['grass'], generation: 7, legendary: false },
  764: { name: 'Comfey', types: ['fairy'], generation: 7, legendary: false },
  765: { name: 'Oranguru', types: ['normal', 'psychic'], generation: 7, legendary: false },
  766: { name: 'Passimian', types: ['fighting'], generation: 7, legendary: false },
  767: { name: 'Wimpod', types: ['bug', 'water'], generation: 7, legendary: false },
  768: { name: 'Golisopod', types: ['bug', 'water'], generation: 7, legendary: false },
  769: { name: 'Sandygast', types: ['ghost', 'ground'], generation: 7, legendary: false },
  770: { name: 'Palossand', types: ['ghost', 'ground'], generation: 7, legendary: false },
  771: { name: 'Pyukumuku', types: ['water'], generation: 7, legendary: false },
  772: { name: 'Type: Null', types: ['normal'], generation: 7, legendary: false },
  773: { name: 'Silvally', types: ['normal'], generation: 7, legendary: false },
  774: { name: 'Minior', types: ['rock', 'flying'], generation: 7, legendary: false },
  775: { name: 'Komala', types: ['normal'], generation: 7, legendary: false },
  776: { name: 'Turtonator', types: ['fire', 'dragon'], generation: 7, legendary: false },
  777: { name: 'Togedemaru', types: ['electric', 'steel'], generation: 7, legendary: false },
  778: { name: 'Mimikyu', types: ['ghost', 'fairy'], generation: 7, legendary: false },
  779: { name: 'Bruxish', types: ['water', 'psychic'], generation: 7, legendary: false },
  780: { name: 'Drampa', types: ['normal', 'dragon'], generation: 7, legendary: false },
  781: { name: 'Dhelmise', types: ['ghost', 'grass'], generation: 7, legendary: false },
  782: { name: 'Jangmo-o', types: ['dragon'], generation: 7, legendary: false },
  783: { name: 'Hakamo-o', types: ['dragon', 'fighting'], generation: 7, legendary: false },
  784: { name: 'Kommo-o', types: ['dragon', 'fighting'], generation: 7, legendary: false },
  785: { name: 'Tapu Koko', types: ['electric', 'fairy'], generation: 7, legendary: true },
  786: { name: 'Tapu Lele', types: ['psychic', 'fairy'], generation: 7, legendary: true },
  787: { name: 'Tapu Bulu', types: ['grass', 'fairy'], generation: 7, legendary: true },
  788: { name: 'Tapu Fini', types: ['water', 'fairy'], generation: 7, legendary: true },
  789: { name: 'Cosmog', types: ['psychic'], generation: 7, legendary: true },
  790: { name: 'Cosmoem', types: ['psychic'], generation: 7, legendary: true },
  791: { name: 'Solgaleo', types: ['psychic', 'steel'], generation: 7, legendary: true },
  792: { name: 'Lunala', types: ['psychic', 'ghost'], generation: 7, legendary: true },
  793: { name: 'Nihilego', types: ['rock', 'poison'], generation: 7, legendary: true },
  794: { name: 'Buzzwole', types: ['bug', 'fighting'], generation: 7, legendary: true },
  795: { name: 'Pheromosa', types: ['bug', 'fighting'], generation: 7, legendary: true },
  796: { name: 'Xurkitree', types: ['electric'], generation: 7, legendary: true },
  797: { name: 'Celesteela', types: ['steel', 'flying'], generation: 7, legendary: true },
  798: { name: 'Kartana', types: ['grass', 'steel'], generation: 7, legendary: true },
  799: { name: 'Guzzlord', types: ['dark', 'dragon'], generation: 7, legendary: true },
  800: { name: 'Necrozma', types: ['psychic'], generation: 7, legendary: true },
  801: { name: 'Magearna', types: ['steel', 'fairy'], generation: 7, legendary: true },
  802: { name: 'Marshadow', types: ['fighting', 'ghost'], generation: 7, legendary: true },
  803: { name: 'Poipole', types: ['poison'], generation: 7, legendary: false },
  804: { name: 'Naganadel', types: ['poison', 'dragon'], generation: 7, legendary: false },
  805: { name: 'Stakataka', types: ['rock', 'steel'], generation: 7, legendary: true },
  806: { name: 'Blacephalon', types: ['fire', 'ghost'], generation: 7, legendary: true },
  807: { name: 'Zeraora', types: ['electric'], generation: 7, legendary: true },
  808: { name: 'Meltan', types: ['steel'], generation: 7, legendary: false },
  809: { name: 'Melmetal', types: ['steel'], generation: 7, legendary: false },

  // Generación 8 - Galar (810-905)
  810: { name: 'Grookey', types: ['grass'], generation: 8, legendary: false },
  811: { name: 'Thwackey', types: ['grass'], generation: 8, legendary: false },
  812: { name: 'Rillaboom', types: ['grass'], generation: 8, legendary: false },
  813: { name: 'Scorbunny', types: ['fire'], generation: 8, legendary: false },
  814: { name: 'Raboot', types: ['fire'], generation: 8, legendary: false },
  815: { name: 'Cinderace', types: ['fire'], generation: 8, legendary: false },
  816: { name: 'Sobble', types: ['water'], generation: 8, legendary: false },
  817: { name: 'Drizzile', types: ['water'], generation: 8, legendary: false },
  818: { name: 'Inteleon', types: ['water'], generation: 8, legendary: false },
  819: { name: 'Skwovet', types: ['normal'], generation: 8, legendary: false },
  820: { name: 'Greedent', types: ['normal'], generation: 8, legendary: false },
  821: { name: 'Rookidee', types: ['flying'], generation: 8, legendary: false },
  822: { name: 'Corvisquire', types: ['flying'], generation: 8, legendary: false },
  823: { name: 'Corviknight', types: ['flying', 'steel'], generation: 8, legendary: false },
  824: { name: 'Blipbug', types: ['bug'], generation: 8, legendary: false },
  825: { name: 'Dottler', types: ['bug', 'psychic'], generation: 8, legendary: false },
  826: { name: 'Orbeetle', types: ['bug', 'psychic'], generation: 8, legendary: false },
  827: { name: 'Nickit', types: ['dark'], generation: 8, legendary: false },
  828: { name: 'Thievul', types: ['dark'], generation: 8, legendary: false },
  829: { name: 'Gossifleur', types: ['grass'], generation: 8, legendary: false },
  830: { name: 'Eldegoss', types: ['grass'], generation: 8, legendary: false },
  831: { name: 'Wooloo', types: ['normal'], generation: 8, legendary: false },
  832: { name: 'Dubwool', types: ['normal'], generation: 8, legendary: false },
  833: { name: 'Chewtle', types: ['water'], generation: 8, legendary: false },
  834: { name: 'Drednaw', types: ['water', 'rock'], generation: 8, legendary: false },
  835: { name: 'Yamper', types: ['electric'], generation: 8, legendary: false },
  836: { name: 'Boltund', types: ['electric'], generation: 8, legendary: false },
  837: { name: 'Rolycoly', types: ['rock'], generation: 8, legendary: false },
  838: { name: 'Carkol', types: ['rock', 'fire'], generation: 8, legendary: false },
  839: { name: 'Coalossal', types: ['rock', 'fire'], generation: 8, legendary: false },
  840: { name: 'Applin', types: ['grass', 'dragon'], generation: 8, legendary: false },
  841: { name: 'Flapple', types: ['grass', 'dragon'], generation: 8, legendary: false },
  842: { name: 'Appletun', types: ['grass', 'dragon'], generation: 8, legendary: false },
  843: { name: 'Silicobra', types: ['ground'], generation: 8, legendary: false },
  844: { name: 'Sandaconda', types: ['ground'], generation: 8, legendary: false },
  845: { name: 'Cramorant', types: ['flying', 'water'], generation: 8, legendary: false },
  846: { name: 'Arrokuda', types: ['water'], generation: 8, legendary: false },
  847: { name: 'Barraskewda', types: ['water'], generation: 8, legendary: false },
  848: { name: 'Toxel', types: ['electric', 'poison'], generation: 8, legendary: false },
  849: { name: 'Toxtricity', types: ['electric', 'poison'], generation: 8, legendary: false },
  850: { name: 'Sizzlipede', types: ['fire', 'bug'], generation: 8, legendary: false },
  851: { name: 'Centiskorch', types: ['fire', 'bug'], generation: 8, legendary: false },
  852: { name: 'Clobbopus', types: ['fighting'], generation: 8, legendary: false },
  853: { name: 'Grapploct', types: ['fighting'], generation: 8, legendary: false },
  854: { name: 'Sinistea', types: ['ghost'], generation: 8, legendary: false },
  855: { name: 'Polteageist', types: ['ghost'], generation: 8, legendary: false },
  856: { name: 'Hatenna', types: ['psychic'], generation: 8, legendary: false },
  857: { name: 'Hattrem', types: ['psychic'], generation: 8, legendary: false },
  858: { name: 'Hatterene', types: ['psychic', 'fairy'], generation: 8, legendary: false },
  859: { name: 'Impidimp', types: ['dark', 'fairy'], generation: 8, legendary: false },
  860: { name: 'Morgrem', types: ['dark', 'fairy'], generation: 8, legendary: false },
  861: { name: 'Grimmsnarl', types: ['dark', 'fairy'], generation: 8, legendary: false },
  862: { name: 'Obstagoon', types: ['dark', 'normal'], generation: 8, legendary: false },
  863: { name: 'Perrserker', types: ['steel'], generation: 8, legendary: false },
  864: { name: 'Cursola', types: ['ghost'], generation: 8, legendary: false },
  865: { name: 'Sirfetch\'d', types: ['fighting'], generation: 8, legendary: false },
  866: { name: 'Mr. Rime', types: ['ice', 'psychic'], generation: 8, legendary: false },
  867: { name: 'Runerigus', types: ['ground', 'ghost'], generation: 8, legendary: false },
  868: { name: 'Milcery', types: ['fairy'], generation: 8, legendary: false },
  869: { name: 'Alcremie', types: ['fairy'], generation: 8, legendary: false },
  870: { name: 'Falinks', types: ['fighting'], generation: 8, legendary: false },
  871: { name: 'Pincurchin', types: ['electric'], generation: 8, legendary: false },
  872: { name: 'Snom', types: ['ice', 'bug'], generation: 8, legendary: false },
  873: { name: 'Frosmoth', types: ['ice', 'bug'], generation: 8, legendary: false },
  874: { name: 'Stonjourner', types: ['rock'], generation: 8, legendary: false },
  875: { name: 'Eiscue', types: ['ice'], generation: 8, legendary: false },
  876: { name: 'Indeedee', types: ['psychic', 'normal'], generation: 8, legendary: false },
  877: { name: 'Morpeko', types: ['electric', 'dark'], generation: 8, legendary: false },
  878: { name: 'Cufant', types: ['steel'], generation: 8, legendary: false },
  879: { name: 'Copperajah', types: ['steel'], generation: 8, legendary: false },
  880: { name: 'Dracozolt', types: ['electric', 'dragon'], generation: 8, legendary: false },
  881: { name: 'Arctozolt', types: ['electric', 'ice'], generation: 8, legendary: false },
  882: { name: 'Dracovish', types: ['water', 'dragon'], generation: 8, legendary: false },
  883: { name: 'Arctovish', types: ['water', 'ice'], generation: 8, legendary: false },
  884: { name: 'Duraludon', types: ['steel', 'dragon'], generation: 8, legendary: false },
  885: { name: 'Dreepy', types: ['dragon', 'ghost'], generation: 8, legendary: false },
  886: { name: 'Drakloak', types: ['dragon', 'ghost'], generation: 8, legendary: false },
  887: { name: 'Dragapult', types: ['dragon', 'ghost'], generation: 8, legendary: false },
  888: { name: 'Zacian', types: ['fairy', 'steel'], generation: 8, legendary: true },
  889: { name: 'Zamazenta', types: ['fighting', 'steel'], generation: 8, legendary: true },
  890: { name: 'Eternatus', types: ['poison', 'dragon'], generation: 8, legendary: true },
  891: { name: 'Kubfu', types: ['fighting'], generation: 8, legendary: false },
  892: { name: 'Urshifu', types: ['fighting', 'water'], generation: 8, legendary: false },
  893: { name: 'Zarude', types: ['dark', 'grass'], generation: 8, legendary: true },
  894: { name: 'Regieleki', types: ['electric'], generation: 8, legendary: true },
  895: { name: 'Regidrago', types: ['dragon'], generation: 8, legendary: true },
  896: { name: 'Glastrier', types: ['ice'], generation: 8, legendary: true },
  897: { name: 'Spectrier', types: ['ghost'], generation: 8, legendary: true },
  898: { name: 'Calyrex', types: ['psychic', 'grass'], generation: 8, legendary: true },
  899: { name: 'Wyrdeer', types: ['normal', 'psychic'], generation: 8, legendary: false },
  900: { name: 'Kleavor', types: ['bug', 'rock'], generation: 8, legendary: false },
  901: { name: 'Ursaluna', types: ['ground', 'normal'], generation: 8, legendary: false },
  902: { name: 'Basculegion', types: ['water', 'ghost'], generation: 8, legendary: false },
  903: { name: 'Sneasler', types: ['fighting', 'poison'], generation: 8, legendary: false },
  904: { name: 'Overqwil', types: ['dark', 'poison'], generation: 8, legendary: false },
  905: { name: 'Enamorus', types: ['fairy', 'flying'], generation: 8, legendary: true },

  // Generación 9 - Paldea (906-1025)
  906: { name: 'Sprigatito', types: ['grass'], generation: 9, legendary: false },
  907: { name: 'Floragato', types: ['grass'], generation: 9, legendary: false },
  908: { name: 'Meowscarada', types: ['grass', 'dark'], generation: 9, legendary: false },
  909: { name: 'Fuecoco', types: ['fire'], generation: 9, legendary: false },
  910: { name: 'Crocalor', types: ['fire'], generation: 9, legendary: false },
  911: { name: 'Skeledirge', types: ['fire', 'ghost'], generation: 9, legendary: false },
  912: { name: 'Quaxly', types: ['water'], generation: 9, legendary: false },
  913: { name: 'Quaxwell', types: ['water'], generation: 9, legendary: false },
  914: { name: 'Quaquaval', types: ['water', 'fighting'], generation: 9, legendary: false },
  915: { name: 'Lechonk', types: ['normal'], generation: 9, legendary: false },
  916: { name: 'Oinkologne', types: ['normal'], generation: 9, legendary: false },
  917: { name: 'Tarountula', types: ['bug'], generation: 9, legendary: false },
  918: { name: 'Spidops', types: ['bug'], generation: 9, legendary: false },
  919: { name: 'Nymble', types: ['bug'], generation: 9, legendary: false },
  920: { name: 'Lokix', types: ['bug', 'dark'], generation: 9, legendary: false },
  921: { name: 'Pawmi', types: ['electric'], generation: 9, legendary: false },
  922: { name: 'Pawmo', types: ['electric', 'fighting'], generation: 9, legendary: false },
  923: { name: 'Pawmot', types: ['electric', 'fighting'], generation: 9, legendary: false },
  924: { name: 'Tandemaus', types: ['normal', 'fairy'], generation: 9, legendary: false },
  925: { name: 'Maushold', types: ['normal', 'fairy'], generation: 9, legendary: false },
  926: { name: 'Fidough', types: ['fairy'], generation: 9, legendary: false },
  927: { name: 'Dachsbun', types: ['fairy'], generation: 9, legendary: false },
  928: { name: 'Smoliv', types: ['grass', 'normal'], generation: 9, legendary: false },
  929: { name: 'Dolliv', types: ['grass', 'normal'], generation: 9, legendary: false },
  930: { name: 'Arboliva', types: ['grass', 'normal'], generation: 9, legendary: false },
  931: { name: 'Squawkabilly', types: ['normal', 'flying'], generation: 9, legendary: false },
  932: { name: 'Nacli', types: ['rock'], generation: 9, legendary: false },
  933: { name: 'Naclstack', types: ['rock'], generation: 9, legendary: false },
  934: { name: 'Garganacl', types: ['rock'], generation: 9, legendary: false },
  935: { name: 'Charcadet', types: ['fire'], generation: 9, legendary: false },
  936: { name: 'Armarouge', types: ['fire', 'psychic'], generation: 9, legendary: false },
  937: { name: 'Ceruledge', types: ['fire', 'ghost'], generation: 9, legendary: false },
  938: { name: 'Tadbulb', types: ['electric'], generation: 9, legendary: false },
  939: { name: 'Bellibolt', types: ['electric'], generation: 9, legendary: false },
  940: { name: 'Wattrel', types: ['electric', 'flying'], generation: 9, legendary: false },
  941: { name: 'Kilowattrel', types: ['electric', 'flying'], generation: 9, legendary: false },
  942: { name: 'Maschiff', types: ['dark'], generation: 9, legendary: false },
  943: { name: 'Mabosstiff', types: ['dark'], generation: 9, legendary: false },
  944: { name: 'Shroodle', types: ['poison', 'normal'], generation: 9, legendary: false },
  945: { name: 'Grafaiai', types: ['poison', 'normal'], generation: 9, legendary: false },
  946: { name: 'Bramblin', types: ['grass', 'ghost'], generation: 9, legendary: false },
  947: { name: 'Brambleghast', types: ['grass', 'ghost'], generation: 9, legendary: false },
  948: { name: 'Toedscool', types: ['ground', 'grass'], generation: 9, legendary: false },
  949: { name: 'Toedscruel', types: ['ground', 'grass'], generation: 9, legendary: false },
  950: { name: 'Klawf', types: ['rock'], generation: 9, legendary: false },
  951: { name: 'Capsakid', types: ['grass'], generation: 9, legendary: false },
  952: { name: 'Scovillain', types: ['grass', 'fire'], generation: 9, legendary: false },
  953: { name: 'Rellor', types: ['bug'], generation: 9, legendary: false },
  954: { name: 'Rabsca', types: ['bug', 'psychic'], generation: 9, legendary: false },
  955: { name: 'Flittle', types: ['psychic'], generation: 9, legendary: false },
  956: { name: 'Espathra', types: ['psychic'], generation: 9, legendary: false },
  957: { name: 'Tinkatink', types: ['fairy', 'steel'], generation: 9, legendary: false },
  958: { name: 'Tinkatuff', types: ['fairy', 'steel'], generation: 9, legendary: false },
  959: { name: 'Tinkaton', types: ['fairy', 'steel'], generation: 9, legendary: false },
  960: { name: 'Wiglett', types: ['water'], generation: 9, legendary: false },
  961: { name: 'Wugtrio', types: ['water'], generation: 9, legendary: false },
  962: { name: 'Bombirdier', types: ['flying', 'dark'], generation: 9, legendary: false },
  963: { name: 'Finizen', types: ['water'], generation: 9, legendary: false },
  964: { name: 'Palafin', types: ['water'], generation: 9, legendary: false },
  965: { name: 'Varoom', types: ['steel', 'poison'], generation: 9, legendary: false },
  966: { name: 'Revavroom', types: ['steel', 'poison'], generation: 9, legendary: false },
  967: { name: 'Cyclizar', types: ['dragon', 'normal'], generation: 9, legendary: false },
  968: { name: 'Orthworm', types: ['steel'], generation: 9, legendary: false },
  969: { name: 'Glimmet', types: ['rock', 'poison'], generation: 9, legendary: false },
  970: { name: 'Glimmora', types: ['rock', 'poison'], generation: 9, legendary: false },
  971: { name: 'Greavard', types: ['ghost'], generation: 9, legendary: false },
  972: { name: 'Houndstone', types: ['ghost'], generation: 9, legendary: false },
  973: { name: 'Flamigo', types: ['flying', 'fighting'], generation: 9, legendary: false },
  974: { name: 'Cetoddle', types: ['ice'], generation: 9, legendary: false },
  975: { name: 'Cetitan', types: ['ice'], generation: 9, legendary: false },
  976: { name: 'Veluza', types: ['water', 'psychic'], generation: 9, legendary: false },
  977: { name: 'Dondozo', types: ['water'], generation: 9, legendary: false },
  978: { name: 'Tatsugiri', types: ['dragon', 'water'], generation: 9, legendary: false },
  979: { name: 'Annihilape', types: ['fighting', 'ghost'], generation: 9, legendary: false },
  980: { name: 'Clodsire', types: ['poison', 'ground'], generation: 9, legendary: false },
  981: { name: 'Farigiraf', types: ['normal', 'psychic'], generation: 9, legendary: false },
  982: { name: 'Dudunsparce', types: ['normal'], generation: 9, legendary: false },
  983: { name: 'Kingambit', types: ['dark', 'steel'], generation: 9, legendary: false },
  984: { name: 'Great Tusk', types: ['ground', 'fighting'], generation: 9, legendary: false },
  985: { name: 'Scream Tail', types: ['fairy', 'psychic'], generation: 9, legendary: false },
  986: { name: 'Brute Bonnet', types: ['grass', 'dark'], generation: 9, legendary: false },
  987: { name: 'Flutter Mane', types: ['ghost', 'fairy'], generation: 9, legendary: false },
  988: { name: 'Slither Wing', types: ['bug', 'fighting'], generation: 9, legendary: false },
  989: { name: 'Sandy Shocks', types: ['electric', 'ground'], generation: 9, legendary: false },
  990: { name: 'Iron Treads', types: ['ground', 'steel'], generation: 9, legendary: false },
  991: { name: 'Iron Bundle', types: ['ice', 'water'], generation: 9, legendary: false },
  992: { name: 'Iron Hands', types: ['fighting', 'electric'], generation: 9, legendary: false },
  993: { name: 'Iron Jugulis', types: ['dark', 'flying'], generation: 9, legendary: false },
  994: { name: 'Iron Moth', types: ['fire', 'poison'], generation: 9, legendary: false },
  995: { name: 'Iron Thorns', types: ['rock', 'electric'], generation: 9, legendary: false },
  996: { name: 'Frigibax', types: ['dragon', 'ice'], generation: 9, legendary: false },
  997: { name: 'Arctibax', types: ['dragon', 'ice'], generation: 9, legendary: false },
  998: { name: 'Baxcalibur', types: ['dragon', 'ice'], generation: 9, legendary: false },
  999: { name: 'Gimmighoul', types: ['ghost'], generation: 9, legendary: false },
  1000: { name: 'Gholdengo', types: ['steel', 'ghost'], generation: 9, legendary: false },
  1001: { name: 'Wo-Chien', types: ['dark', 'grass'], generation: 9, legendary: true },
  1002: { name: 'Chien-Pao', types: ['dark', 'ice'], generation: 9, legendary: true },
  1003: { name: 'Ting-Lu', types: ['dark', 'ground'], generation: 9, legendary: true },
  1004: { name: 'Chi-Yu', types: ['dark', 'fire'], generation: 9, legendary: true },
  1005: { name: 'Roaring Moon', types: ['dragon', 'dark'], generation: 9, legendary: false },
  1006: { name: 'Iron Valiant', types: ['fairy', 'fighting'], generation: 9, legendary: false },
  1007: { name: 'Koraidon', types: ['fighting', 'dragon'], generation: 9, legendary: true },
  1008: { name: 'Miraidon', types: ['electric', 'dragon'], generation: 9, legendary: true },
  1009: { name: 'Walking Wake', types: ['water', 'dragon'], generation: 9, legendary: false },
  1010: { name: 'Iron Leaves', types: ['grass', 'psychic'], generation: 9, legendary: false },
  1011: { name: 'Dipplin', types: ['grass', 'dragon'], generation: 9, legendary: false },
  1012: { name: 'Poltchageist', types: ['grass', 'ghost'], generation: 9, legendary: false },
  1013: { name: 'Sinistcha', types: ['grass', 'ghost'], generation: 9, legendary: false },
  1014: { name: 'Okidogi', types: ['poison', 'fighting'], generation: 9, legendary: true },
  1015: { name: 'Munkidori', types: ['poison', 'psychic'], generation: 9, legendary: true },
  1016: { name: 'Fezandipiti', types: ['poison', 'fairy'], generation: 9, legendary: true },
  1017: { name: 'Ogerpon', types: ['grass'], generation: 9, legendary: true },
  1018: { name: 'Archaludon', types: ['steel', 'dragon'], generation: 9, legendary: false },
  1019: { name: 'Hydrapple', types: ['grass', 'dragon'], generation: 9, legendary: false },
  1020: { name: 'Gouging Fire', types: ['fire', 'dragon'], generation: 9, legendary: false },
  1021: { name: 'Raging Bolt', types: ['electric', 'dragon'], generation: 9, legendary: false },
  1022: { name: 'Iron Boulder', types: ['rock', 'psychic'], generation: 9, legendary: false },
  1023: { name: 'Iron Crown', types: ['steel', 'psychic'], generation: 9, legendary: false },
  1024: { name: 'Terapagos', types: ['normal'], generation: 9, legendary: true },
  1025: { name: 'Pecharunt', types: ['poison', 'ghost'], generation: 9, legendary: true },
};
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
