import { render, screen } from '@testing-library/react';
import { Progress } from '.';

describe("Progress", () => {
    it('should render same text passed into props', () => {
        render(<Progress rate={30} />);
        const elements = screen.getAllByText(/30/i);
        expect(elements.length).toBe(1);
    });

    it('should have class as percent', () => {
        render(<Progress rate={30} />);
        const elements = screen.getAllByText(/30/i);
        expect(elements[0]).toHaveClass('percent');
    });
})