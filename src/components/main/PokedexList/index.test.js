import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
import { PokedexList } from '.'
import { CardBox, Modal, PokedexDetails } from '../../';
import {
    fetchDataFromAPi,
    getAvatar,
    formatId,
    getTypes,
    getStats,
    getPokemonAndGenderMap,
    fetchPokemonListFromApi,
    getGendersByPokemon,
} from '../../../utils';
import { PokedexContext } from "../../../context";
import {
    mockContextData,
    mockFilteredPokemonsData,
    mockAllPokemonsData,
    mockGenderPokemonMapData,
    mockPokemonTypesData,
    mockPokemonDetailsData
} from "./__mocks__";

const setContextData = jest.fn();

describe("PokedexList", () => {
    beforeEach(() => {
        fetch.resetMocks()
    })

    it('should render componnet with context data', () => {
        render(
            <PokedexContext.Provider value={{ contextData: mockContextData, setContextData }}>
                <PokedexList />
            </PokedexContext.Provider>
        );
        const inputNode = screen.getByTestId('test-pokedex-list');
        expect(inputNode).toBeDefined();
    });

    it('should return value of getPokemonAndGenderMap method as mentioned', async () => {
        const asyncCall = async () => {
            const response = await getPokemonAndGenderMap();
            return await response;
        };
        await Promise.all([asyncCall]);
    });

    it('should return value of fetchPokemonListFromApi method as mentioned', async () => {
        await fetch.mockResponseOnce(JSON.stringify(mockAllPokemonsData));
        await fetchPokemonListFromApi(0, 30);
        await expect(fetch.mock.calls.length).toBeGreaterThan(0)
        await expect(fetch.mock.calls[0][0]).toEqual('https://pokeapi.co/api/v2/pokemon?offset=0&limit=30')
    });

    it('should return value of fetchDataFromAPi method as mentioned', async () => {
        await fetch.mockResponseOnce(JSON.stringify(mockPokemonDetailsData));
        await fetchDataFromAPi('https://pokeapi.co/api/v2/pokemon/1/');
        await expect(fetch.mock.calls.length).toBeGreaterThan(0);
        await expect(fetch.mock.calls[0][0]).toEqual('https://pokeapi.co/api/v2/pokemon/1/');
    });


    it('should return value of getTypes method as mentioned', async () => {
        const types = await getTypes(mockPokemonDetailsData?.types);
        await expect(types).toEqual(['Psychic', 'Fairy']);
    });

    it('should return value of formatId method as mentioned', async () => {
        const id = await formatId(38);
        await expect(id).toBe('038');
    });

    it('should return value of getAvatar method as mentioned', async () => {
        const img = await getAvatar(mockPokemonDetailsData?.sprites);
        await expect(img).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/38.svg');
    });

    it('should return value of getStats method as mentioned', async () => {
        const stats = await getStats(mockPokemonDetailsData?.stats);
        await expect(stats).toEqual({ "attack": 76, "defense": 75, "hp": 73, "special-attack": 81, "special-defense": 100, "speed": 100 });
    });

    it('should return value of getGendersByPokemon method as mentioned', async () => {
        const data = await getGendersByPokemon(mockGenderPokemonMapData, "bulbasaur");
        await expect(data).toEqual([
            "Female",
            "Male"
        ]);
    });
});
