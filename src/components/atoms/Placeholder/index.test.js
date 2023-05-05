import { render, screen } from '@testing-library/react';
import { Placeholder } from '.';


describe("Placeholder", () => {
    it('should render same text passed into props', () => {
        render(<Placeholder variant="rounded" width={'100%'} height={'300px'} />);
        const elements = screen.getAllByTestId('data-placeholder-0');
        expect(elements.length).toBe(1);
    });
})