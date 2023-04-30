import {
  pokemonListFetchStart,
  pokemonListFetchEnd,
  genderListFetch,
  pokemonAndGenderMap,
  statListSet,
  typeListFetch,
  pokemonBasicDetailsFetchStart,
  pokemonBasicDetailsFetchEnd,
} from "./";
import {
  capitalizeEachWord,
  getAvatar,
  formatId,
  getTypes,
  getStats,
  getGendersByPokemon,
  toFeetandInch,
  convertPoundsToKilograms,
  getAbilities,
  getEggGroups,
  getWeakAgainst,
  getPokemonDesc,
  getEvolutionChain,
  getPokemonBasicDetails,
  getSiblingPokemonBasicDetails,
} from "../../utils";


const API_BASE_URL = 'https://pokeapi.co/api/v2/';

export const fetchDataFromAPi = (url) => {
  return () => {
    url = url?.replace(API_BASE_URL, '');
    try {
      return fetch(API_BASE_URL + url)
        .then(res => res.json())
        .then(res => res)
        .catch(err => err);
    } catch (error) {
      console.log('error: ', error);
    }
  }
}


export const fetchGenderListFromApi = () => {
  return async (dispatch, getState) => {
    try {
      let genders = await getState().allGenders;
      if (!genders || !genders.length) {
        genders = await dispatch(fetchDataFromAPi("gender")).then(res => res?.results);
        await dispatch(genderListFetch(genders));
      }
      return genders;
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  }
};


export const getPokemonAndGenderMap = () => {
  return async (dispatch, getState) => {
    try {
      let mapRes = getState().genderPokemonMap;
      if (mapRes && Object.keys(mapRes).length > 0) {
        return mapRes;
      }

      let genders = await dispatch(fetchGenderListFromApi());
      const urls = await genders?.map(async (item) => await dispatch(fetchDataFromAPi(item.url)));
      await Promise.all(urls).then(res => {
        res?.forEach(response => {
          response?.pokemon_species_details.forEach(item => {
            mapRes[item?.pokemon_species?.name] = mapRes.hasOwnProperty(item?.pokemon_species?.name) ? [...mapRes[item?.pokemon_species?.name], capitalizeEachWord(response?.name)] : [capitalizeEachWord(response?.name)];
          });
        });
      });
      await dispatch(pokemonAndGenderMap(mapRes));
      return mapRes;
    } catch (error) {
      console.log('error: ', error);
    }
  };
};


export const getGenderNameList = () => {
  return async (dispatch) => {
    try {
      const genders = await dispatch(fetchGenderListFromApi());
      return await genders?.length && genders?.map(item => item.name);
    } catch (error) {
      console.log('error: ', error);
    }
  }
}


export const fetchPokemonListFromApi = (offset, limit) => {
  return (dispatch) => {
    try {
      return dispatch(fetchDataFromAPi('pokemon?offset=' + offset + '&limit=' + limit)).then(res => {
        return {
          results: res?.results,
          limit: limit,
          offset: offset + limit,
        }
      });
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  }
}


export const fetchTypeListFromApi = () => {
  return async (dispatch) => {
    try {
      const res = await dispatch(fetchDataFromAPi('type')).then(res => res?.results);
      const types = await res?.map(item => item.name);
      await dispatch(typeListFetch(types));
      return types;
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  }
}


export const fetchStatListFromApi = () => {
  return async (dispatch) => {
    try {
      const res = await dispatch(fetchDataFromAPi('stat')).then(res => res?.results);
      const statList = {};
      await res?.forEach(item => {
        if (!['accuracy', 'evasion'].includes(item?.name)) {
          statList[item?.name] = {
            min: 0,
            max: 210,
          }
        }
      });
      await dispatch(statListSet(statList));
      return statList;
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  }
}


export const fetchSpeciesDetailsFromApi = (id) => {
  if (!id) {
    console.log('ID is required for Pokemon Species API!!');
    return;
  }
  return async (dispatch) => {
    try {
      return dispatch(fetchDataFromAPi('pokemon-species/' + id)).then(res => res);
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  }
}


export const fetchTypeDetailsFromApi = (id) => {
  if (!id) {
    console.log('ID is required for Type Details API!!');
    return;
  }
  return async (dispatch) => {
    try {
      return dispatch(fetchDataFromAPi('type/' + id)).then(res => res);
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  }
}


export const getPokemonList = () => {
  return async (dispatch, getState) => {
    try {
      await dispatch(pokemonListFetchStart());

      // call action creator to fetch gender data from API
      const mapGenderPokemon = await dispatch(getPokemonAndGenderMap());

      // call action creator to fetch all pokemon list data from API
      const pokemonList = await dispatch(fetchPokemonListFromApi(getState()?.pokemonListOffset, getState()?.pokemonListLimit));

      const pList = await Promise.all(
        pokemonList?.results?.map(async (item) => {
          const details = await dispatch(fetchDataFromAPi(item.url)).then(res => res);
          const types = await getTypes(details?.types);
          const gender = await getGendersByPokemon(mapGenderPokemon, item.name);
          const fRes = await {
            id: details?.id,
            formattedId: formatId(details?.id),
            name: item.name,
            img: getAvatar(details?.sprites),
            types: types,
            gender: gender,
            height: details?.height,
            weight: details?.weight,
            abilities: details?.abilities,
            stats: getStats(details?.stats),
          };
          return await fRes;
        })
      );

      // Dispatch addPokemons action with new pokemonListdata and offset
      await dispatch(pokemonListFetchEnd(pList, pokemonList?.offset));
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  }
}


export const getPokemonBasicDetailsInfo = (pokemonId) => {
  return async (dispatch, getState) => {
    try {
      await dispatch(pokemonBasicDetailsFetchStart());
      const basicDetails = await getPokemonBasicDetails(getState()?.allPokemons, pokemonId);
      const {
        id,
        formattedId,
        name,
        img,
        gender,
        types,
        height,
        weight,
        abilities,
        stats,
      } = basicDetails;
      const formattedHeight = await toFeetandInch(height);
      const formattedWeight = await convertPoundsToKilograms(weight);
      const formattedAbilities = await getAbilities(abilities);

      let pokemonDesc, eggGroups, evolutionChains, weakAgainsts;

      const species = await dispatch(fetchSpeciesDetailsFromApi(id)); // pokemon-species API

      if (species) {
        pokemonDesc = await getPokemonDesc(species);
        eggGroups = await getEggGroups(species);

        const evolutionChainApiRes = await dispatch(fetchDataFromAPi(species?.evolution_chain?.url)); // evolution-chain API

        evolutionChains = await getEvolutionChain(
          evolutionChainApiRes,
          getState()?.allPokemons
        );
      }

      const {
        firstEvolutionBasicDetails,
        secondEvolutionBasicDetails,
        thirdEvolutionBasicDetails,
      } = await evolutionChains;

      const typeApiRes = await dispatch(fetchTypeDetailsFromApi(id)); // type API
      if (typeApiRes) {
        weakAgainsts = await getWeakAgainst(typeApiRes);
      }

      const prevPokemonBasicDetails = getSiblingPokemonBasicDetails(
        getState()?.allPokemons,
        id,
        "prev"
      );
      const nextPokemonBasicDetails = getSiblingPokemonBasicDetails(
        getState()?.allPokemons,
        id,
        "next"
      );

      await dispatch(pokemonBasicDetailsFetchEnd());
      const result = await {
        id,
        formattedId,
        name,
        img,
        gender,
        types,
        stats,
        pokemonDesc,
        height: formattedHeight,
        weight: formattedWeight,
        eggGroups,
        abilities: formattedAbilities,
        weakAgainsts,
        firstEvolutionBasicDetails,
        secondEvolutionBasicDetails,
        thirdEvolutionBasicDetails,
        prevPokemonName: prevPokemonBasicDetails?.name,
        nextPokemonName: nextPokemonBasicDetails?.name,
      }
      return result;
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  }
}