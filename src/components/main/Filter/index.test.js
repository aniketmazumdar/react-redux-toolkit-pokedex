import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import { Filter } from '.'
import {
    Input,
    Dropdown,
    Modal,
    FilterDropdownsMobile,
    FilterStatRanges,
} from "../../";
import { getDropdownPlaceholder } from "../../../utils";
import {
    fetchTypeListFromApi,
    getGenderNameList,
    fetchStatListFromApi,
    filterAttrUpdate,
    filterDataUpdate,
} from "../../../redux/slice/pokemonSlice";
import store from '../../../redux/store'

import { mockTypeApiResData, mockGenderApiResData, mockStatListApiResData, mockAllPokemonsData } from "./__mocks__";



const setContextData = jest.fn();

jest.mock("react-redux", () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

const useSelectorMock = reactRedux.useSelector;
const useDispatchMock = reactRedux.useDispatch;

const mockStore = {
    allPokemons: mockAllPokemonsData,
    genderPokemonMap: {},
    searchStr: "",
    selectedTypes: [],
    selectedGenders: [],
    statList: {},
    filteredPokemons: mockAllPokemonsData,
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
};

describe("Filter", () => {
    // beforeEach(() => {
    //     fetch.resetMocks()
    // })
    // beforeEach(() => {
    //     useDispatchMock.mockImplementation(() => () => { });
    //     useSelectorMock.mockImplementation(selector => selector(mockStore));
    // })
    // afterEach(() => {
    //     useDispatchMock.mockClear();
    //     useSelectorMock.mockClear();
    // })

    it('shows thing1 and thing2', () => {
        render(
            <reactRedux.Provider store={store}>
                <Filter />
            </reactRedux.Provider>
        );
        // expect(screen.getByText('this is thing1')).toBeInTheDocument();
        // expect(screen.getByText('and I am thing2!')).toBeInTheDocument();
    });


    // it('should click setShowStatDiv', () => {
    //     render(
    //         <PokedexContext.Provider value={{ contextData: mockContextData, setContextData }}>
    //             <Filter />
    //         </PokedexContext.Provider>
    //     );
    //     const inputNode = screen.getByTestId('test-stat-wrapper');
    //     fireEvent.click(inputNode);
    //     expect(setContextData).toBeCalled();
    // });

    // it('should click setIsOpenedModal', () => {
    //     render(
    //         <PokedexContext.Provider value={{ contextData: mockContextData, setContextData }}>
    //             <Filter />
    //         </PokedexContext.Provider>
    //     );
    //     const inputNode = screen.getByTestId('test-btn-open-modal');
    //     fireEvent.click(inputNode);
    // });

    it('should return value of fetchTypeListFromApi method as mentioned', async () => {
        await fetch.mockResponseOnce(JSON.stringify(mockTypeApiResData));
        await fetchTypeListFromApi();
        await expect(fetch.mock.calls.length).toEqual(1)
        await expect(fetch.mock.calls[0][0]).toEqual('https://pokeapi.co/api/v2/type')
    });

    it('should return value of getGenderNameList method as mentioned', async () => {
        await fetch.mockResponseOnce(JSON.stringify(mockGenderApiResData));
        await getGenderNameList();
        await expect(fetch.mock.calls.length).toEqual(1)
        await expect(fetch.mock.calls[0][0]).toEqual('https://pokeapi.co/api/v2/gender')
    });

    it('should return value of fetchStatListFromApi method as mentioned', async () => {
        await fetch.mockResponseOnce(JSON.stringify(mockStatListApiResData));
        await fetchStatListFromApi();
        await expect(fetch.mock.calls.length).toEqual(1);
        await expect(fetch.mock.calls[0][0]).toEqual('https://pokeapi.co/api/v2/stat')
    });

    it('input should change onChangeFilter', () => {
        const onChangeFilter = jest.fn();
        render(<Input onChangeHandler={onChangeFilter} id="name" />);
        const inputNode = screen.getByTestId('test-name').querySelector('input');
        expect(inputNode).toBeTruthy();

        // expect(inputNode.value).toBe("");
        // fireEvent.change(inputNode, { target: { value: 'su' } });
        // expect(inputNode.value).toBe('su');
    });
});
