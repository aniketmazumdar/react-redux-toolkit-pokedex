import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
import { Filter } from '.'
import { Input, Dropdown, Modal, FilterDropdownsMobile, FilterStatRanges } from '../../';
import { fetchTypeListFromApi, fetchStatListFromApi, filterPokemons, getGenderNameList, getDropdownPlaceholder } from '../../../utils';
import { PokedexContext } from "../../../context";
import { mockTypeApiResData, mockGenderApiResData, mockStatListApiResData, mockContextData } from "./__mocks__";

const setContextData = jest.fn();

describe("Filter", () => {
    beforeEach(() => {
        fetch.resetMocks()
    })

    it('should click setShowStatDiv', () => {
        render(
            <PokedexContext.Provider value={{ contextData: mockContextData, setContextData }}>
                <Filter />
            </PokedexContext.Provider>
        );
        const inputNode = screen.getByTestId('test-stat-wrapper');
        fireEvent.click(inputNode);
        expect(setContextData).toBeCalled();
    });

    it('should click setIsOpenedModal', () => {
        render(
            <PokedexContext.Provider value={{ contextData: mockContextData, setContextData }}>
                <Filter />
            </PokedexContext.Provider>
        );
        const inputNode = screen.getByTestId('test-btn-open-modal');
        fireEvent.click(inputNode);
    });

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
        expect(inputNode.value).toBe("");
        fireEvent.change(inputNode, { target: { value: 'su' } });
        expect(inputNode.value).toBe('su');
    });
});
