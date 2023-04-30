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
} from "../actions/actionType";
import { checkArrayIntersect, checkStatIntersect } from "../../utils/index";

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
  IS_POKEMON_LIST_PROCESSING: false,
  IS_POKEMON_BASIC_DETAILS_PROCESSING: false,
  IS_SUCCESS: false,
  ERROR: ''
};


const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GENDER_LIST_FETCH:
      return {
        ...state,
        allGenders: action?.payload?.result
      };

    case POKEMON_AND_GENDER_MAP:
      return {
        ...state,
        genderPokemonMap: action.payload.result,
      };

    case POKEMON_LIST_FETCH_START:
      return {
        ...state,
        IS_POKEMON_LIST_PROCESSING: true,
      };

    case POKEMON_LIST_FETCH_END:
      return {
        ...state,
        IS_POKEMON_LIST_PROCESSING: false,
        allPokemons: [...state.allPokemons, ...action.payload.pList],
        pokemonListOffset: action.payload.offset,
      };

    case TYPE_LIST_FETCH:
      return {
        ...state,
        allTypes: action?.payload?.result
      };

    case STAT_LIST_SET:
      return {
        ...state,
        statList: action?.payload?.result
      };

    case FILTER_ATTR_UPDATE:
      return {
        ...state,
        [action.payload.type]: action.payload.data,
      };

    case FILTER_DATA_UPDATE:
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
      return {
        ...state,
        filteredPokemons: filterPokemons,
      };

    case POKEMON_BASIC_DETAILS_FETCH_START:
      return {
        ...state,
        IS_POKEMON_BASIC_DETAILS_PROCESSING: true,
      };

    case POKEMON_BASIC_DETAILS_FETCH_END:
      return {
        ...state,
        IS_POKEMON_BASIC_DETAILS_PROCESSING: false,
      };

    default:
      return state;
  }
};

export default rootReducer;
