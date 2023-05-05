import { createSlice } from '@reduxjs/toolkit' //next js redux toolkit  
import { checkArrayIntersect, checkStatIntersect } from "../../utils";
import { extraReducers } from "./apiAction";
export * from './apiAction'


const initialState = {
    allPokemons: [],
    genderPokemonMap: {},
    searchStr: "",
    selectedTypes: [],
    selectedGenders: [],
    statList: {},
    filteredPokemons: [],
    pokemonListLimit: 30,
    pokemonListOffset: 0,
    statRangeMinLevel: 0,
    statRangeMaxLevel: 210,
    allTypes: [],
    allGenders: [],
    is_pokemon_list_processing: false,
    is_pokemon_basic_details_processing: false,
    is_success: false,
    error: ''
}


const reducers = {
    genderListFetch: (state, action) => {
        state.allGenders = action?.payload?.result;
    },
    pokemonAndGenderMap: (state, action) => {
        state.genderPokemonMap = action.payload.result;
    },
    filterAttrUpdate: (state, action) => {
        state[action.payload.type] = action.payload.data;
    },
    filterDataUpdate: state => {
        const {
            allPokemons,
            searchStr,
            selectedTypes,
            selectedGenders,
            statList,
        } = state;
        let filterPokemons = allPokemons;

        if (searchStr) {
            filterPokemons = filterPokemons?.filter(
                (item) =>
                    item?.name?.includes(searchStr) ||
                    item?.formattedId?.includes(searchStr)
            );
        }
        if (selectedTypes.length) {
            filterPokemons = filterPokemons?.filter((item) =>
                checkArrayIntersect(item?.types, selectedTypes)
            );
        }
        if (selectedGenders.length) {
            filterPokemons = filterPokemons?.filter((item) =>
                checkArrayIntersect(item?.gender, selectedGenders)
            );
        }
        if (Object.keys(statList).length) {
            filterPokemons = filterPokemons?.filter((item) =>
                checkStatIntersect(item?.stats, statList)
            );
        }
        state.filteredPokemons = filterPokemons;
    },
}


export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: initialState,
    reducers: reducers,
    extraReducers: extraReducers,
})


export const {
    genderListFetch,
    pokemonAndGenderMap,
    filterAttrUpdate,
    filterDataUpdate,
} = pokemonSlice.actions

export default pokemonSlice.reducer;