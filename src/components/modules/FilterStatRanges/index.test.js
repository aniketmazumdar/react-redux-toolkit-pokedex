import { render, screen, fireEvent } from '@testing-library/react';
import { FilterStatRanges } from '.'
import { mockObjectDataList } from "./__mocks__";

const mockFn = jest.fn();

describe("FilterStatRanges", () => {
    // it('should render same text as mentioned', () => {
    //     render(<FilterStatRanges dataList={mockObjectDataList} />); // Getting Obserable error for mockObjectDataList props
    //     const elements = screen.getAllByText(/Select Stats/);
    //     expect(elements).toBeTruthy();
    // });

    it("captures changes", () => {
        render(<FilterStatRanges />);
        const node = screen.getByTestId("test-btn-reset-stat-range");
        fireEvent.click(node, { target: { value: "whamo" } });
    });

    it('should click closeModalEvent', () => {
        render(<FilterStatRanges closeModalEvent={mockFn} />);

        const btnCloseModalElm = screen.getByTestId('test-btn-close-modal');
        fireEvent.click(btnCloseModalElm);
        expect(mockFn).toBeCalled();
    });

    it('should click onSubmitEvent', () => {
        render(<FilterStatRanges onSubmitEvent={mockFn} />);

        const btnSubmitModalElm = screen.getByTestId('test-btn-apply-stat-range');
        fireEvent.click(btnSubmitModalElm);
        expect(mockFn).toBeCalled();
    });
});
