import { render, screen, fireEvent } from '@testing-library/react';
import { PokedexDetailsButtonGroup } from '.'
import { mockButtonGroupPropsCompData } from "./__mocks__";


const mockFn = jest.fn();

describe("PokedexDetailsButtonGroup", () => {
    it('should render same pokemon name passed into props', () => {
        render(<PokedexDetailsButtonGroup compData={mockButtonGroupPropsCompData} />);
        const elements = screen.getAllByText(mockButtonGroupPropsCompData?.prevPokemonName);
        expect(elements.length).toBeGreaterThan(0);
    });

    it('should click Pokemon Change link', () => {
        render(<PokedexDetailsButtonGroup compData={mockButtonGroupPropsCompData} changePokemonEvent={mockFn} />);

        const btnPrevElm = screen.getByTestId('test-btn-prev-change-pokemon');
        fireEvent.click(btnPrevElm);
        expect(mockFn).toBeCalled();

        const btnNextElm = screen.getByTestId('test-btn-next-change-pokemon');
        fireEvent.click(btnNextElm);
        expect(mockFn).toBeCalled();
    });
});
