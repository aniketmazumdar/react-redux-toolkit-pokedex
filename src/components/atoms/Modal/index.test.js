import { render, screen } from '@testing-library/react';
import { Modal } from '.';

describe("Modal", () => {
    it('should render same text passed into props', () => {
        render(<Modal />);
        const elements = screen.getAllByRole('dialog');
        expect(elements.length).toBe(1);
    });
})