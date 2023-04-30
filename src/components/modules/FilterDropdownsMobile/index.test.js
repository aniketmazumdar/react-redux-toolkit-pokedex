import { render, screen, fireEvent } from '@testing-library/react';
import { FilterDropdownsMobile } from '.'

const mockFn = jest.fn();

describe("FilterDropdownsMobile", () => {
    it('should click closeModalEvent', () => {
        render(<FilterDropdownsMobile closeModalEvent={mockFn} />);
        const btnElm = screen.getByTestId('test-btn-close-modal');
        fireEvent.click(btnElm);
        expect(mockFn).toBeCalled();
    });

    it('should click submitFilterValues', () => {
        render(<FilterDropdownsMobile submitFilterValues={mockFn} />);
        const btnElm = screen.getByTestId('test-btn-apply');
        fireEvent.click(btnElm);
        expect(mockFn).toBeCalled();
    });

    it("should click resetFilterValues", () => {
        render(<FilterDropdownsMobile />);
        const node = screen.getByTestId("test-btn-reset");
        fireEvent.click(node);
        expect(mockFn).toBeCalled();
    });

    it('should click setShowStatDiv', () => {
        render(<FilterDropdownsMobile setShowStatDiv={mockFn} />);
        const btnElm = screen.getByTestId('test-div-filter-input');
        fireEvent.click(btnElm);
        expect(mockFn).toBeCalled();
    });
});
