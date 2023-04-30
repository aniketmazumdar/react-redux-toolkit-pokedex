import { render, screen } from '@testing-library/react';
import { Header } from './index';

describe("Header", () => {
    it('should render same text as mentioned', () => {
        render(<Header />);
        const title = screen.getByText(/Pokédex/i);
        expect(title).toBeInTheDocument();
    });
})