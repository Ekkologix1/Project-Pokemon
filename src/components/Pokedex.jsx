  // src/components/Pokedex.jsx
import { useState, useEffect, useMemo } from 'react'
import { useSprite } from '../hooks/useSprite'

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
  128: { name: 'Tauros', types: ['normal'], generation: 1, legendary: false },
  129: { name: 'Magikarp', types: ['water'], generation: 1, legendary: false },
  130: { name: 'Gyarados', types: ['water', 'flying'], generation: 1, legendary: false },
  131: { name: 'Lapras', types: ['water', 'ice'], generation: 1, legendary: false },
  132: { name: 'Ditto', types: ['normal'], generation: 1, legendary: false },
  133: { name: 'Eevee', types: ['normal'], generation: 1, legendary: false },
  134: { name: 'Vaporeon', types: ['water'], generation: 1, legendary: false },
  135: { name: 'Jolteon', types: ['electric'], generation: 1, legendary: false },
  136: { name: 'Flareon', types: ['fire'], generation: 1, legendary: false },
  137: { name: 'Porygon', types: ['normal'], generation: 1, legendary: false },
  138: { name: 'Omanyte', types: ['rock', 'water'], generation: 1, legendary: false },
  139: { name: 'Omastar', types: ['rock', 'water'], generation: 1, legendary: false },
  140: { name: 'Kabuto', types: ['rock', 'water'], generation: 1, legendary: false },
  141: { name: 'Kabutops', types: ['rock', 'water'], generation: 1, legendary: false },
  142: { name: 'Aerodactyl', types: ['rock', 'flying'], generation: 1, legendary: false },
  143: { name: 'Snorlax', types: ['normal'], generation: 1, legendary: false },
  144: { name: 'Articuno', types: ['ice', 'flying'], generation: 1, legendary: true },
  145: { name: 'Zapdos', types: ['electric', 'flying'], generation: 1, legendary: true },
  146: { name: 'Moltres', types: ['fire', 'flying'], generation: 1, legendary: true },
  147: { name: 'Dratini', types: ['dragon'], generation: 1, legendary: false },
  148: { name: 'Dragonair', types: ['dragon'], generation: 1, legendary: false },
  149: { name: 'Dragonite', types: ['dragon', 'flying'], generation: 1, legendary: false },
  150: { name: 'Mewtwo', types: ['psychic'], generation: 1, legendary: true },
  151: { name: 'Mew', types: ['psychic'], generation: 1, legendary: true },

  // Generación 2 - Johto (152-251)
  152: { name: 'Chikorita', types: ['grass'], generation: 2, legendary: false },
  153: { name: 'Bayleef', types: ['grass'], generation: 2, legendary: false },
  154: { name: 'Meganium', types: ['grass'], generation: 2, legendary: false },
  155: { name: 'Cyndaquil', types: ['fire'], generation: 2, legendary: false },
  156: { name: 'Quilava', types: ['fire'], generation: 2, legendary: false },
  157: { name: 'Typhlosion', types: ['fire'], generation: 2, legendary: false },
  158: { name: 'Totodile', types: ['water'], generation: 2, legendary: false },
  159: { name: 'Croconaw', types: ['water'], generation: 2, legendary: false },
  160: { name: 'Feraligatr', types: ['water'], generation: 2, legendary: false },
  161: { name: 'Sentret', types: ['normal'], generation: 2, legendary: false },
  162: { name: 'Furret', types: ['normal'], generation: 2, legendary: false },
  163: { name: 'Hoothoot', types: ['normal', 'flying'], generation: 2, legendary: false },
  164: { name: 'Noctowl', types: ['normal', 'flying'], generation: 2, legendary: false },
  165: { name: 'Ledyba', types: ['bug', 'flying'], generation: 2, legendary: false },
  166: { name: 'Ledian', types: ['bug', 'flying'], generation: 2, legendary: false },
  167: { name: 'Spinarak', types: ['bug', 'poison'], generation: 2, legendary: false },
  168: { name: 'Ariados', types: ['bug', 'poison'], generation: 2, legendary: false },
  169: { name: 'Crobat', types: ['poison', 'flying'], generation: 2, legendary: false },
  170: { name: 'Chinchou', types: ['water', 'electric'], generation: 2, legendary: false },
  171: { name: 'Lanturn', types: ['water', 'electric'], generation: 2, legendary: false },
  172: { name: 'Pichu', types: ['electric'], generation: 2, legendary: false },
  173: { name: 'Cleffa', types: ['fairy'], generation: 2, legendary: false },
  174: { name: 'Igglybuff', types: ['normal', 'fairy'], generation: 2, legendary: false },
  175: { name: 'Togepi', types: ['fairy'], generation: 2, legendary: false },
  176: { name: 'Togetic', types: ['fairy', 'flying'], generation: 2, legendary: false },
  177: { name: 'Natu', types: ['psychic', 'flying'], generation: 2, legendary: false },
  178: { name: 'Xatu', types: ['psychic', 'flying'], generation: 2, legendary: false },
  179: { name: 'Mareep', types: ['electric'], generation: 2, legendary: false },
  180: { name: 'Flaaffy', types: ['electric'], generation: 2, legendary: false },
  181: { name: 'Ampharos', types: ['electric'], generation: 2, legendary: false },
  182: { name: 'Bellossom', types: ['grass'], generation: 2, legendary: false },
  183: { name: 'Marill', types: ['water', 'fairy'], generation: 2, legendary: false },
  184: { name: 'Azumarill', types: ['water', 'fairy'], generation: 2, legendary: false },
  185: { name: 'Sudowoodo', types: ['rock'], generation: 2, legendary: false },
  186: { name: 'Politoed', types: ['water'], generation: 2, legendary: false },
  187: { name: 'Hoppip', types: ['grass', 'flying'], generation: 2, legendary: false },
  188: { name: 'Skiploom', types: ['grass', 'flying'], generation: 2, legendary: false },
  189: { name: 'Jumpluff', types: ['grass', 'flying'], generation: 2, legendary: false },
  190: { name: 'Aipom', types: ['normal'], generation: 2, legendary: false },
  191: { name: 'Sunkern', types: ['grass'], generation: 2, legendary: false },
  192: { name: 'Sunflora', types: ['grass'], generation: 2, legendary: false },
  193: { name: 'Yanma', types: ['bug', 'flying'], generation: 2, legendary: false },
  194: { name: 'Wooper', types: ['water', 'ground'], generation: 2, legendary: false },
  195: { name: 'Quagsire', types: ['water', 'ground'], generation: 2, legendary: false },
  196: { name: 'Espeon', types: ['psychic'], generation: 2, legendary: false },
  197: { name: 'Umbreon', types: ['dark'], generation: 2, legendary: false },
  198: { name: 'Murkrow', types: ['dark', 'flying'], generation: 2, legendary: false },
  199: { name: 'Slowking', types: ['water', 'psychic'], generation: 2, legendary: false },
  200: { name: 'Misdreavus', types: ['ghost'], generation: 2, legendary: false },
  201: { name: 'Unown', types: ['psychic'], generation: 2, legendary: false },
  202: { name: 'Wobbuffet', types: ['psychic'], generation: 2, legendary: false },
  203: { name: 'Girafarig', types: ['normal', 'psychic'], generation: 2, legendary: false },
  204: { name: 'Pineco', types: ['bug'], generation: 2, legendary: false },
  205: { name: 'Forretress', types: ['bug', 'steel'], generation: 2, legendary: false },
  206: { name: 'Dunsparce', types: ['normal'], generation: 2, legendary: false },
  207: { name: 'Gligar', types: ['ground', 'flying'], generation: 2, legendary: false },
  208: { name: 'Steelix', types: ['steel', 'ground'], generation: 2, legendary: false },
  209: { name: 'Snubbull', types: ['fairy'], generation: 2, legendary: false },
  210: { name: 'Granbull', types: ['fairy'], generation: 2, legendary: false },
  211: { name: 'Qwilfish', types: ['water', 'poison'], generation: 2, legendary: false },
  212: { name: 'Scizor', types: ['bug', 'steel'], generation: 2, legendary: false },
  213: { name: 'Shuckle', types: ['bug', 'rock'], generation: 2, legendary: false },
  214: { name: 'Heracross', types: ['bug', 'fighting'], generation: 2, legendary: false },
  215: { name: 'Sneasel', types: ['dark', 'ice'], generation: 2, legendary: false },
  216: { name: 'Teddiursa', types: ['normal'], generation: 2, legendary: false },
  217: { name: 'Ursaring', types: ['normal'], generation: 2, legendary: false },
  218: { name: 'Slugma', types: ['fire'], generation: 2, legendary: false },
  219: { name: 'Magcargo', types: ['fire', 'rock'], generation: 2, legendary: false },
  220: { name: 'Swinub', types: ['ice', 'ground'], generation: 2, legendary: false },
  221: { name: 'Piloswine', types: ['ice', 'ground'], generation: 2, legendary: false },
  222: { name: 'Corsola', types: ['water', 'rock'], generation: 2, legendary: false },
  223: { name: 'Remoraid', types: ['water'], generation: 2, legendary: false },
  224: { name: 'Octillery', types: ['water'], generation: 2, legendary: false },
  225: { name: 'Delibird', types: ['ice', 'flying'], generation: 2, legendary: false },
  226: { name: 'Mantine', types: ['water', 'flying'], generation: 2, legendary: false },
  227: { name: 'Skarmory', types: ['steel', 'flying'], generation: 2, legendary: false },
  228: { name: 'Houndour', types: ['dark', 'fire'], generation: 2, legendary: false },
  229: { name: 'Houndoom', types: ['dark', 'fire'], generation: 2, legendary: false },
  230: { name: 'Kingdra', types: ['water', 'dragon'], generation: 2, legendary: false },
  231: { name: 'Phanpy', types: ['ground'], generation: 2, legendary: false },
  232: { name: 'Donphan', types: ['ground'], generation: 2, legendary: false },
  233: { name: 'Porygon2', types: ['normal'], generation: 2, legendary: false },
  234: { name: 'Stantler', types: ['normal'], generation: 2, legendary: false },
  235: { name: 'Smeargle', types: ['normal'], generation: 2, legendary: false },
  236: { name: 'Tyrogue', types: ['fighting'], generation: 2, legendary: false },
  237: { name: 'Hitmontop', types: ['fighting'], generation: 2, legendary: false },
  238: { name: 'Smoochum', types: ['ice', 'psychic'], generation: 2, legendary: false },
  239: { name: 'Elekid', types: ['electric'], generation: 2, legendary: false },
  240: { name: 'Magby', types: ['fire'], generation: 2, legendary: false },
  241: { name: 'Miltank', types: ['normal'], generation: 2, legendary: false },
  242: { name: 'Blissey', types: ['normal'], generation: 2, legendary: false },
  243: { name: 'Raikou', types: ['electric'], generation: 2, legendary: true },
  244: { name: 'Entei', types: ['fire'], generation: 2, legendary: true },
  245: { name: 'Suicune', types: ['water'], generation: 2, legendary: true },
  246: { name: 'Larvitar', types: ['rock', 'ground'], generation: 2, legendary: false },
  247: { name: 'Pupitar', types: ['rock', 'ground'], generation: 2, legendary: false },
  248: { name: 'Tyranitar', types: ['rock', 'dark'], generation: 2, legendary: false },
  249: { name: 'Lugia', types: ['psychic', 'flying'], generation: 2, legendary: true },
  250: { name: 'Ho-Oh', types: ['fire', 'flying'], generation: 2, legendary: true },
  251: { name: 'Celebi', types: ['psychic', 'grass'], generation: 2, legendary: true },

  // Generación 3 - Hoenn (252-386)
  252: { name: 'Treecko', types: ['grass'], generation: 3, legendary: false },
  253: { name: 'Grovyle', types: ['grass'], generation: 3, legendary: false },
  254: { name: 'Sceptile', types: ['grass'], generation: 3, legendary: false },
  255: { name: 'Torchic', types: ['fire'], generation: 3, legendary: false },
  256: { name: 'Combusken', types: ['fire', 'fighting'], generation: 3, legendary: false },
  257: { name: 'Blaziken', types: ['fire', 'fighting'], generation: 3, legendary: false },
  258: { name: 'Mudkip', types: ['water'], generation: 3, legendary: false },
  259: { name: 'Marshtomp', types: ['water', 'ground'], generation: 3, legendary: false },
  260: { name: 'Swampert', types: ['water', 'ground'], generation: 3, legendary: false },
  261: { name: 'Poochyena', types: ['dark'], generation: 3, legendary: false },
  262: { name: 'Mightyena', types: ['dark'], generation: 3, legendary: false },
  263: { name: 'Zigzagoon', types: ['normal'], generation: 3, legendary: false },
  264: { name: 'Linoone', types: ['normal'], generation: 3, legendary: false },
  265: { name: 'Wurmple', types: ['bug'], generation: 3, legendary: false },
  266: { name: 'Silcoon', types: ['bug'], generation: 3, legendary: false },
  267: { name: 'Beautifly', types: ['bug', 'flying'], generation: 3, legendary: false },
  268: { name: 'Cascoon', types: ['bug'], generation: 3, legendary: false },
  269: { name: 'Dustox', types: ['bug', 'poison'], generation: 3, legendary: false },
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
  489: { name: 'Phione', types: ['water'], generation: 4, legendary: true },
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
  650: { name: 'Chespin', types: ['grass'], generation: 6, legendary: false },
  651: { name: 'Quilladin', types: ['grass'], generation: 6, legendary: false },
  652: { name: 'Chesnaught', types: ['grass', ' fighting'], generation: 6, legendary: false },
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
  675: { name: 'Pangoro', types: ['fighting', ' dark'], generation: 6, legendary: false },
  676: { name: 'Furfrou', types: ['normal'], generation: 6, legendary: false },
  677: { name: 'Espurr', types: ['psychic'], generation: 6, legendary: false },
  678: { name: 'Meowstic', types: ['psychic'], generation: 6, legendary: false },
  679: { name: 'Honedge', types: ['steel', 'ghost'], generation: 6, legendary: false },
  680: { name: 'Doublade', types: ['steel', 'ghost'], generation: 6, legendary: false },
  681: { name: 'Aegislash', types: ['steel', 'ghost'], generation: 6, legendary: false },
  682: { name: 'Spritzee', types: ['fairy'], generation: 6, legendary: false },
}
const TYPE_COLORS = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-cyan-300',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-400',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300'
}

const PokemonCard = ({ pokemon, id, caught, onClick }) => {
  const { sprite, loading, placeholder } = useSprite(id, 'official', 'small', { 
    pokemonName: pokemon.name 
  })

  return (
    <div 
      className={`
        relative bg-white/20 backdrop-blur-sm rounded-xl p-3 shadow-lg cursor-pointer
        transform transition-all duration-300 hover:scale-105 hover:shadow-xl
        ${caught ? 'ring-2 ring-green-400' : 'grayscale opacity-60'}
        ${pokemon.legendary ? 'ring-2 ring-yellow-400' : ''}
      `}
      onClick={() => onClick(pokemon, id)}
    >
      {pokemon.legendary && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
          <span className="text-xs">⭐</span>
        </div>
      )}
      
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center">
          {loading ? (
            <div className="w-16 h-16 bg-gray-300 rounded-lg animate-pulse"></div>
          ) : (
            <img 
              src={sprite || placeholder} 
              alt={pokemon.name}
              className="w-full h-full object-contain"
            />
          )}
        </div>
        
        <p className="text-xs font-bold text-white mb-1">
          #{id.toString().padStart(3, '0')}
        </p>
        
        <p className="text-sm font-semibold text-white mb-2 truncate">
          {caught ? pokemon.name : '???'}
        </p>
        
        <div className="flex justify-center space-x-1">
          {pokemon.types.map((type) => (
            <span 
              key={type}
              className={`
                px-2 py-1 rounded-full text-xs font-bold text-white
                ${TYPE_COLORS[type] || 'bg-gray-500'}
              `}
            >
              {caught ? type : '?'}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

const PokemonModal = ({ pokemon, id, onClose }) => {
  const { sprite, loading, placeholder } = useSprite(id, 'official', 'large', { 
    pokemonName: pokemon.name 
  })

  if (!pokemon) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            {pokemon.name}
            {pokemon.legendary && <span className="ml-2 text-yellow-400">⭐</span>}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="text-center mb-6">
          <div className="w-48 h-48 mx-auto mb-4 flex items-center justify-center">
            {loading ? (
              <div className="w-48 h-48 bg-gray-300 rounded-lg animate-pulse"></div>
            ) : (
              <img 
                src={sprite || placeholder} 
                alt={pokemon.name}
                className="w-full h-full object-contain"
              />
            )}
          </div>
          
          <p className="text-lg font-bold text-white mb-2">
            #{id.toString().padStart(3, '0')}
          </p>
          
          <div className="flex justify-center space-x-2 mb-4">
            {pokemon.types.map((type) => (
              <span 
                key={type}
                className={`
                  px-3 py-1 rounded-full font-bold text-white
                  ${TYPE_COLORS[type] || 'bg-gray-500'}
                `}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            ))}
          </div>
          
          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-white mb-2">
              <strong>Generación:</strong> {pokemon.generation}
            </p>
            <p className="text-white">
              <strong>Tipo:</strong> {pokemon.legendary ? 'Legendario' : 'Normal'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Pokedex({ collection = [] }) {
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [filter, setFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const caughtIds = useMemo(() => {
    return new Set(collection.map(pokemon => pokemon.id))
  }, [collection])

  const filteredPokemon = useMemo(() => {
    return Object.entries(POKEMON_DATA).filter(([id, pokemon]) => {
      const pokemonId = parseInt(id)
      const isCaught = caughtIds.has(pokemonId)
      
      // Filtro por capturado/no capturado
      if (filter === 'caught' && !isCaught) return false
      if (filter === 'uncaught' && isCaught) return false
      
      // Filtro por legendario
      if (filter === 'legendary' && !pokemon.legendary) return false
      
      // Filtro por tipo
      if (typeFilter !== 'all' && !pokemon.types.includes(typeFilter)) return false
      
      // Filtro por búsqueda
      if (searchTerm && !pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())) return false
      
      return true
    })
  }, [filter, typeFilter, searchTerm, caughtIds])

  const stats = useMemo(() => {
    const totalPokemon = Object.keys(POKEMON_DATA).length
    const caught = caughtIds.size
    const legendary = Object.values(POKEMON_DATA).filter(p => p.legendary).length
    const legendaryCanght = Object.entries(POKEMON_DATA)
      .filter(([id, pokemon]) => pokemon.legendary && caughtIds.has(parseInt(id)))
      .length
    
    return {
      total: totalPokemon,
      caught,
      percentage: Math.round((caught / totalPokemon) * 100),
      legendary,
      legendaryCanght
    }
  }, [caughtIds])

  const allTypes = useMemo(() => {
    const types = new Set()
    Object.values(POKEMON_DATA).forEach(pokemon => {
      pokemon.types.forEach(type => types.add(type))
    })
    return Array.from(types).sort()
  }, [])

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white flex items-center">
            📖 Pokédex Nacional
          </h2>
          <div className="text-right">
            <p className="text-white font-bold text-lg">
              {stats.caught}/{stats.total} ({stats.percentage}%)
            </p>
            <p className="text-yellow-400 font-bold">
              ⭐ {stats.legendaryCanght}/{stats.legendary} Legendarios
            </p>
          </div>
        </div>
        
        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-white font-bold mb-2">Filtrar por:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white"
            >
              <option value="all">Todos</option>
              <option value="caught">Capturados</option>
              <option value="uncaught">No Capturados</option>
              <option value="legendary">Legendarios</option>
            </select>
          </div>
          
          <div>
            <label className="block text-white font-bold mb-2">Tipo:</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white"
            >
              <option value="all">Todos los tipos</option>
              {allTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-white font-bold mb-2">Buscar:</label>
            <input
              type="text"
              placeholder="Nombre del Pokémon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white placeholder-white/70"
            />
          </div>
        </div>
        
        {/* Pokédex Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredPokemon.map(([id, pokemon]) => (
            <PokemonCard
              key={id}
              pokemon={pokemon}
              id={parseInt(id)}
              caught={caughtIds.has(parseInt(id))}
              onClick={(pokemon, id) => setSelectedPokemon({ pokemon, id })}
            />
          ))}
        </div>
        
        {filteredPokemon.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-white text-xl">No se encontraron Pokémon</p>
            <p className="text-white/70">Intenta cambiar los filtros de búsqueda</p>
          </div>
        )}
      </div>
      
      {/* Modal */}
      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon.pokemon}
          id={selectedPokemon.id}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  )
}