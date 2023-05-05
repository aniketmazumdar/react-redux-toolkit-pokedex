import { createAsyncThunk } from '@reduxjs/toolkit' //next js redux toolkit  
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
import { genderListFetch, pokemonAndGenderMap } from './pokemonSlice';


const API_BASE_URL = 'https://pokeapi.co/api/v2/';

const fetchDataFromAPi = createAsyncThunk(
    'pokemon/fetchDataFromAPi',
    async (url) => {
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
);


const fetchGenderListFromApi = createAsyncThunk(
    'pokemon/fetchGenderListFromApi',
    async (arg, thunkAPI) => {
        const { dispatch, getState } = thunkAPI;
        try {
            let genders = await getState().allGenders;
            if (!genders || !genders.length) {
                genders = await dispatch(fetchDataFromAPi("gender")).then(res => res?.payload?.results);
                await dispatch(genderListFetch(genders));
            }
            return genders;
        } catch (error) {
            console.log('error: ', error);
            return error;
        }
    }
);


const getPokemonAndGenderMap = createAsyncThunk(
    'pokemon/getPokemonAndGenderMap',
    async (arg, thunkAPI) => {
        const { dispatch, getState } = thunkAPI;
        try {
            let mapRes = getState().genderPokemonMap ?? {};
            if (mapRes && Object.keys(mapRes).length > 0) {
                return mapRes;
            }

            let genders = await dispatch(fetchGenderListFromApi()).then(res => res?.payload);
            const urls = await genders?.map(async (item) => await dispatch(fetchDataFromAPi(item.url)).then(res => res?.payload));
            await Promise.all(urls).then(res => {
                res?.forEach(response => {
                    response?.pokemon_species_details.forEach((item) => {
                        const pokName = item?.pokemon_species?.name;
                        if (mapRes.hasOwnProperty(pokName)) {
                            mapRes = { ...mapRes, [pokName]: [...mapRes[pokName], capitalizeEachWord(response?.name)] }
                        } else {
                            mapRes = { ...mapRes, [pokName]: [capitalizeEachWord(response?.name)] }
                        }
                    });
                });
            });
            await dispatch(pokemonAndGenderMap(mapRes));
            return mapRes;
        } catch (error) {
            console.log('error: ', error);
        }
    }
);


const fetchPokemonListFromApi = createAsyncThunk(
    'pokemon/fetchPokemonListFromApi',
    async ({ offset, limit }, thunkAPI) => {
        const { dispatch } = thunkAPI;
        try {
            return dispatch(fetchDataFromAPi('pokemon?offset=' + offset + '&limit=' + limit)).then(res => res?.payload)
                .then(res => {
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
);


const fetchSpeciesDetailsFromApi = createAsyncThunk(
    'pokemon/fetchSpeciesDetailsFromApi',
    async (id, thunkAPI) => {
        const { dispatch } = thunkAPI;
        if (!id) {
            console.log('ID is required for Pokemon Species API!!');
            return;
        }
        try {
            return dispatch(fetchDataFromAPi('pokemon-species/' + id)).then(res => res?.payload);
        } catch (error) {
            console.log('error: ', error);
            return error;
        }
    }
);


const fetchTypeDetailsFromApi = createAsyncThunk(
    'pokemon/fetchTypeDetailsFromApi',
    async (id, thunkAPI) => {
        const { dispatch } = thunkAPI;
        if (!id) {
            console.log('ID is required for Type Details API!!');
            return;
        }
        try {
            return dispatch(fetchDataFromAPi('type/' + id)).then(res => res?.payload);
        } catch (error) {
            console.log('error: ', error);
            return error;
        }
    }
);


export const getGenderNameList = createAsyncThunk(
    'pokemon/getGenderNameList',
    async (arg, thunkAPI) => {
        const { dispatch } = thunkAPI;
        try {
            const genders = await dispatch(fetchGenderListFromApi()).then(res => res?.payload);
            return await genders?.length && genders?.map(item => item.name);
        } catch (error) {
            console.log('error: ', error);
        }
    }
);


export const fetchTypeListFromApi = createAsyncThunk(
    'pokemon/fetchTypeListFromApi',
    async (arg, thunkAPI) => {
        const { dispatch } = thunkAPI;
        try {
            const res = await dispatch(fetchDataFromAPi('type')).then(res => res?.payload?.results);
            return await res?.map(item => item.name);
        } catch (error) {
            console.log('error: ', error);
            return error;
        }
    }
);


export const fetchStatListFromApi = createAsyncThunk(
    'pokemon/fetchStatListFromApi',
    async (arg, thunkAPI) => {
        const { dispatch } = thunkAPI;
        try {
            const res = await dispatch(fetchDataFromAPi('stat')).then(res => res?.payload?.results);
            const statList = {};
            await res?.forEach(item => {
                if (!['accuracy', 'evasion'].includes(item?.name)) {
                    statList[item?.name] = {
                        min: 0,
                        max: 210,
                    }
                }
            });
            return statList;
        } catch (error) {
            console.log('error: ', error);
            return error;
        }
    }
);


export const getPokemonList = createAsyncThunk(
    'pokemon/getPokemonList',
    async (arg, thunkAPI) => {
        const { dispatch, getState } = thunkAPI;
        try {
            // call action creator to fetch gender data from API
            const mapGenderPokemon = await dispatch(getPokemonAndGenderMap()).then(res => res?.payload);

            // call action creator to fetch all pokemon list data from API
            const pokemonList = await dispatch(fetchPokemonListFromApi({
                offset: getState()?.pokemonListOffset,
                limit: getState()?.pokemonListLimit
            })).then(res => res?.payload);

            const pList = await Promise.all(
                pokemonList?.results?.map(async (item) => {
                    const details = await dispatch(fetchDataFromAPi(item.url)).then(res => res?.payload);
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
            return {
                pList,
                offset: pokemonList?.offset
            };
        } catch (error) {
            console.log('error: ', error);
            return error;
        }
    }
);


export const getPokemonBasicDetailsInfo = createAsyncThunk(
    'pokemon/getPokemonBasicDetailsInfo',
    async (pokemonId, thunkAPI) => {
        const { dispatch, getState } = thunkAPI;
        try {
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

            const species = await dispatch(fetchSpeciesDetailsFromApi(id)).then(res => res?.payload); // pokemon-species API

            if (species) {
                pokemonDesc = await getPokemonDesc(species);
                eggGroups = await getEggGroups(species);

                const evolutionChainApiRes = await dispatch(fetchDataFromAPi(species?.evolution_chain?.url)).then(res => res?.payload); // evolution-chain API

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

            const typeApiRes = await dispatch(fetchTypeDetailsFromApi(id)).then(res => res?.payload); // type API
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

            return {
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
            };
        } catch (error) {
            console.log('error: ', error);
            return error;
        }
    }
);



export const extraReducers = {
    [fetchTypeListFromApi.fulfilled]: (state, action) => {
        state.allTypes = action?.payload
    },
    [fetchTypeListFromApi.rejected]: (state, action) => {
        state.error = action.error.message
    },

    [fetchStatListFromApi.fulfilled]: (state, action) => {
        state.statList = action?.payload
    },
    [fetchStatListFromApi.rejected]: (state, action) => {
        state.error = action.error.message
    },

    [getPokemonList.pending]: (state) => {
        state.is_pokemon_list_processing = true;
    },
    [getPokemonList.fulfilled]: (state, action) => {
        state.is_pokemon_list_processing = false;
        state.allPokemons = [...state.allPokemons, ...action.payload.pList];
        state.pokemonListOffset = action.payload.offset;
    },
    [getPokemonList.rejected]: (state, action) => {
        state.is_pokemon_list_processing = false;
        state.error = action.error.message
    },

    [getPokemonBasicDetailsInfo.pending]: (state) => {
        state.is_pokemon_basic_details_processing = true;
    },
    [getPokemonBasicDetailsInfo.fulfilled]: (state, action) => {
        state.is_pokemon_basic_details_processing = false;
    },
    [getPokemonBasicDetailsInfo.rejected]: (state, action) => {
        state.is_pokemon_basic_details_processing = false;
        state.error = action.error.message
    },
}


