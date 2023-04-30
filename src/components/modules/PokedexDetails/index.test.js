import React from "react";
import { render } from '@testing-library/react';
import { PokedexDetails } from '.';
import {
    getEggGroups,
    getWeakAgainst,
    getPokemonDesc,
    getEvolutionChain,
    fetchSpeciesDetailsFromApi,
    fetchDataFromAPi,
    fetchTypeDetailsFromApi,
    getSiblingPokemonBasicDetails,
} from '../../../utils';
import {
    mockAllPokemonsData,
    mockSpeciesData,
    mockPokemonDescData,
    mockEggGroupsData,
    mockTypeApiData,
    mockWeakAgainstsData,
    mockEvolutionChainApiData,
    mockEvolutionChainsData,
} from "./__mocks__";
import { PokedexContext } from "../../../context";


const mockFn = jest.fn();
const contextData = { allPokemons: mockAllPokemonsData };

describe("PokedexDetails", () => {
    beforeEach(() => {
        fetch.resetMocks()
    })


    it('should render PokedexDetails component with context data', () => {
        render(
            <PokedexContext.Provider value={{ contextData }}>
                <PokedexDetails pokemonId={5} closeModalEvent={mockFn} changePokemonEvent={mockFn} />
            </PokedexContext.Provider>
        );
    });


    it('should return value of fetchSpeciesDetailsFromApi method as mentioned', async () => {
        await fetch.mockResponseOnce(JSON.stringify(mockSpeciesData));
        const resp = await fetchSpeciesDetailsFromApi('6');
        await expect(resp).toEqual(mockSpeciesData);
        await expect(fetch.mock.calls.length).toEqual(1)
        await expect(fetch.mock.calls[0][0]).toEqual('https://pokeapi.co/api/v2/pokemon-species/6')
    });


    it('should return value of getPokemonDesc method as mentioned', async () => {
        const pokemonDesc = await getPokemonDesc(mockSpeciesData);
        await expect(pokemonDesc).toMatch(mockPokemonDescData);
    });


    it('should return value of getEggGroups method as mentioned', async () => {
        const eggGroups = await getEggGroups(mockSpeciesData);
        await expect(eggGroups).toEqual(mockEggGroupsData);
    });


    it('should return value of fetchDataFromAPi method as mentioned', async () => {
        await fetch.mockResponseOnce(JSON.stringify({ id: 2, chain: { species: { name: 'charmander' } } }));
        const resp = await fetchDataFromAPi('https://pokeapi.co/api/v2/evolution-chain/2/');
        await expect(resp?.chain?.species?.name).toEqual('charmander');
        await expect(fetch.mock.calls.length).toEqual(1);
        await expect(fetch.mock.calls[0][0]).toEqual('https://pokeapi.co/api/v2/evolution-chain/2/');
    });


    it('should return value of getEvolutionChain method as mentioned', async () => {
        const evolutionChains = await getEvolutionChain(mockEvolutionChainApiData, mockAllPokemonsData);
        await expect(evolutionChains).toEqual(mockEvolutionChainsData);
    });


    it('should return value of fetchTypeDetailsFromApi method as mentioned', async () => {
        await fetch.mockResponseOnce(JSON.stringify(mockTypeApiData));
        const resp = await fetchTypeDetailsFromApi('6');
        await expect(resp).toEqual(mockTypeApiData);
        await expect(fetch.mock.calls.length).toEqual(1);
        await expect(fetch.mock.calls[0][0]).toEqual('https://pokeapi.co/api/v2/type/6');
    });


    it('should return value of getWeakAgainst method as mentioned', async () => {
        const weakAgainsts = await getWeakAgainst(mockTypeApiData);
        await expect(weakAgainsts).toEqual(mockWeakAgainstsData);
    });


    it('should return value of getSiblingPokemonBasicDetails method as mentioned', () => {
        const prevPokemonBasicDetails = getSiblingPokemonBasicDetails(mockAllPokemonsData, 5, 'prev');
        expect(prevPokemonBasicDetails).toBe(mockAllPokemonsData[0]);

        const nextPokemonBasicDetails = getSiblingPokemonBasicDetails(mockAllPokemonsData, 6, 'next');
        expect(nextPokemonBasicDetails).toBe(mockAllPokemonsData[2]);
    });


    // it('should triggered setPokemonDetails', () => {
    //     const setPokemonDetails = jest.fn();
    //     jest.spyOn(React, "useState").mockImplementationOnce((pokemonDetails) => [pokemonDetails, setPokemonDetails]);
    //     expect(setPokemonDetails).toBeCalled();
    // });
})
