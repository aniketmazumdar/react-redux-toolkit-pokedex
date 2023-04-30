
export const statNameConstants = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'Sp. Attack',
    'special-defense': 'Sp. Def.',
    'speed': 'Speed',
    'accuracy': 'Accuracy',
    'evasion': 'Evasion',
}

export const typeAndColorCodeMap = {
    normal: '#DDCBD0',
    fighting: '#FCC1B0',
    flying: '#B2D2E8',
    poison: '#CFB7ED',
    ground: '#F4D1A6',
    rock: '#C5AEA8',
    bug: '#C1E0C8',
    ghost: '#D7C2D7',
    steel: '#C2D4CE',
    fire: '#EDC2C4',
    water: '#CBD5ED',
    grass: '#C0D4C8',
    electric: '#E2E2A0',
    psychic: '#DDC0CF',
    ice: '#C7D7DF',
    dragon: '#CADCDF',
    dark: '#C6C5E3',
    fairy: '#E4C0CF',
    unknown: '#C0DFDD',
    shadow: '#CACACA',
}


export const capitalizeEachWord = (str) => {
    return str?.replace(/\b\w/g, x => x.toUpperCase());
}


export const toFeetandInch = (inches) => {
    return ((parseInt(inches / 12) && parseInt(inches / 12) + `'`) + Math.round(inches % 12, 1) + `"`);
}


export const formatId = (id) => {
    return String(id).padStart(3, '0');
}


export const getAvatar = (sprites) => {
    return sprites?.other?.dream_world?.front_default || sprites?.front_default;
}


export const getPokemonDesc = (species) => {
    const flavorTextEntries = species?.flavor_text_entries;
    const filterList = flavorTextEntries?.filter(item => item?.language?.name === 'en');
    const content = filterList?.map(item => item?.flavor_text.replace(/\n|\f/g, " ")).join(' ');
    return content;
}


export const convertPoundsToKilograms = (pounds) => {
    const kilograms = pounds * 0.453592;
    return kilograms?.toFixed(1) + ' Kg';
}


export const getEggGroups = (species) => {
    return species?.egg_groups?.map(item => capitalizeEachWord(item?.name)).join(', ');
}


export const getAbilities = (abilities) => {
    return abilities?.map(item => capitalizeEachWord(item?.ability?.name).replace('-', ' ')).join(', ');
}


export const getTypes = (types) => {
    return types?.map(item => capitalizeEachWord(item?.type?.name));
}


export const getStats = (stats) => {
    const res = {};
    stats?.forEach(item => {
        res[item?.stat?.name] = item?.base_stat;
    });
    return res;
}


export const getWeakAgainst = (typeApiRes) => {
    return typeApiRes?.damage_relations?.double_damage_from?.map(item => capitalizeEachWord(item?.name));
}


export const getEvolutionChain = (response, pokemonList) => {
    const firstEvolutionName = response?.chain?.species?.name;
    const firstEvolutionBasicDetails = pokemonList?.find(item => item.name === firstEvolutionName);

    const secondEvolutionName = response?.chain?.evolves_to[0]?.species?.name;
    const secondEvolutionBasicDetails = pokemonList?.find(item => item.name === secondEvolutionName);

    const thirdEvolutionName = response?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name;
    const thirdEvolutionBasicDetails = pokemonList?.find(item => item.name === thirdEvolutionName);

    return { firstEvolutionBasicDetails, secondEvolutionBasicDetails, thirdEvolutionBasicDetails };
}


export const checkArrayIntersect = (arr1, arr2) => {
    return arr1.some(item => arr2.includes(item));
}

export const checkStatIntersect = (obj1, obj2) => {
    return Object.keys(obj1).every(item => (obj2[item]['min'] <= obj1[item] && obj1[item] <= obj2[item]['max']));
}


export const getColorCodeByType = (type) => {
    return typeAndColorCodeMap[type.toLowerCase()] ?? '#FFFFFF';
}


export const getGradientColorCodesByTypes = (types) => {
    const color1 = types[0] ? getColorCodeByType(types[0]) : '#FFFFFF';
    const color2 = types[1] ? getColorCodeByType(types[1]) : color1;
    return `linear-gradient(to bottom,  ${color1} 0%,${color2} 100%)`
}


export const getGendersByPokemon = (mapData, pokemonName) => {
    return mapData[pokemonName];
}


export const getPokemonBasicDetails = (allPokemons = [], pokemonId = null) => {
    return allPokemons?.find(item => item.id === pokemonId);
}


export const getSiblingPokemonBasicDetails = (allPokemons = [], selectedPokemonId = null, flag = null) => {
    const index = allPokemons?.findIndex(item => item.id === selectedPokemonId);
    const rqstIndex = flag === 'next' ? (index < (allPokemons.length - 1) ? index + 1 : (allPokemons.length - 1)) : (index > 0 ? index - 1 : 0);
    let siblingPokemonBasicDetails = {};
    if (rqstIndex !== index) {
        siblingPokemonBasicDetails = allPokemons[rqstIndex];
    } else {
        siblingPokemonBasicDetails = allPokemons[index];
    }
    return siblingPokemonBasicDetails;
}


export const getDropdownPlaceholder = (list) => {
    let placeholder = '';
    if (list === undefined) {
        return;
    }
    if (list?.length === undefined) {   // Object type
        placeholder = capitalizeEachWord(Object?.keys(list)[0]) + ' + ' + (Object?.keys(list)?.length - 1) + ' More';
    } else {    // Array type
        placeholder = capitalizeEachWord(list[0]) + ' + ' + (list?.length - 1) + ' More';
    }
    return placeholder;
}