import {
    GENDER_LIST_FETCH,
    POKEMON_LIST_FETCH_START,
    POKEMON_LIST_FETCH_END,
    POKEMON_AND_GENDER_MAP,
    TYPE_LIST_FETCH,
    STAT_LIST_SET,
    FILTER_ATTR_UPDATE,
    FILTER_DATA_UPDATE,
    POKEMON_BASIC_DETAILS_FETCH_START,
    POKEMON_BASIC_DETAILS_FETCH_END
} from "./actionType";

export const genderListFetch = (data) => ({
    type: GENDER_LIST_FETCH,
    payload: {
        result: data
    }
})

export const pokemonListFetchStart = () => ({
    type: POKEMON_LIST_FETCH_START,
})

export const pokemonListFetchEnd = (pList, offset) => ({
    type: POKEMON_LIST_FETCH_END,
    payload: {
        pList, offset
    }
})

export const pokemonAndGenderMap = data => ({
    type: POKEMON_AND_GENDER_MAP,
    payload: {
        result: data
    }
})

export const typeListFetch = data => ({
    type: TYPE_LIST_FETCH,
    payload: {
        result: data
    }
})

export const statListSet = data => ({
    type: STAT_LIST_SET,
    payload: {
        result: data
    }
})

export const filterAttrUpdate = payload => ({
    type: FILTER_ATTR_UPDATE,
    payload
})

export const filterDataUpdate = () => ({
    type: FILTER_DATA_UPDATE,
})

export const pokemonBasicDetailsFetchStart = () => ({
    type: POKEMON_BASIC_DETAILS_FETCH_START,
})

export const pokemonBasicDetailsFetchEnd = () => ({
    type: POKEMON_BASIC_DETAILS_FETCH_END,
})

