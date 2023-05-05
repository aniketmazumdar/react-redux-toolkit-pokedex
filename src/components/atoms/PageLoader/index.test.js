import { render, screen } from '@testing-library/react';
import { PageLoader } from '.';



describe("PageLoader", () => {
    it('should render same text passed into props', () => {
        render(<PageLoader text="Loading..." />);
        const elements = screen.getAllByText(/Loading/i);
        expect(elements.length).toBe(1);
    });
})