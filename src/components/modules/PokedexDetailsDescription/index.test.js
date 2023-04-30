import { render, screen, fireEvent } from '@testing-library/react';
import { PokedexDetailsDescription } from ".";


const mockFn = jest.fn();

describe("PokedexDetailsDescription", () => {
    it('should render same weight passed into props', () => {
        render(<PokedexDetailsDescription content='Lorem ipsum dolor sit amet, consectetur adipiscing elit' />);
        const elements = screen.getAllByText(/Lorem ipsum/i);
        expect(elements.length).toBeGreaterThan(0);
    });

    it('should click Close Description Modal link', () => {
        render(<PokedexDetailsDescription setIsMount={mockFn} />);
        const btnElm = screen.getByTestId('test-btn-close-description-modal');
        fireEvent.click(btnElm);
        expect(mockFn).toBeCalled();
    });
});
