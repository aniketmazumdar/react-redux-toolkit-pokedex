import { render, screen } from '@testing-library/react';
import { Badge } from '.';
import { getColorCodeByType } from '../../../utils';



describe("Badge", () => {
    it('should render same text passed into props', () => {
        render(<Badge title="Poison" />);
        const elements = screen.getAllByText(/Poison/i);
        expect(elements.length).toBe(1);
    });

    it('should have class as badge', () => {
        render(<Badge title="Poison" />);
        const elements = screen.getAllByText(/Poison/i);
        expect(elements[0]).toHaveClass('badge');
    });

    it('should return value of getColorCodeByType method as mentioned', () => {
        const colorCode = getColorCodeByType('Fire');
        expect(colorCode).toEqual('#EDC2C4');
    });
})