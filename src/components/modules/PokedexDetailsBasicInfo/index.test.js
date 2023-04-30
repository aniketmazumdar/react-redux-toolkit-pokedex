import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import { PokedexDetailsBasicInfo } from '.';
import { mockBasicInfoPropsCompData } from "./__mocks__";


const mockFn = jest.fn();

describe("PokedexDetailsBasicInfo", () => {
    it('should render same label passed into props', () => {
        render(<PokedexDetailsBasicInfo compData={mockBasicInfoPropsCompData} />);
        const elements = screen.getAllByText(mockBasicInfoPropsCompData?.name);
        expect(elements.length).toBeGreaterThan(0);
    });

    it('should click close modal link', () => {
        render(<PokedexDetailsBasicInfo compData={mockBasicInfoPropsCompData} closeModalEvent={mockFn} />);
        const btnElmLg = screen.getByTestId('test-btn-close-modal-lg');
        fireEvent.click(btnElmLg);
        expect(mockFn).toBeCalled();

        const btnElmSm = screen.getByTestId('test-btn-close-modal-sm');
        fireEvent.click(btnElmSm);
        expect(mockFn).toBeCalled();
    });

    it('should click Pokemon Change link', () => {
        render(<PokedexDetailsBasicInfo compData={mockBasicInfoPropsCompData} changePokemonEvent={mockFn} />);

        const btnPrevElm = screen.getByTestId('test-btn-prev-change-pokemon');
        fireEvent.click(btnPrevElm);
        expect(mockFn).toBeCalled();

        const btnNextElm = screen.getByTestId('test-btn-next-change-pokemon');
        fireEvent.click(btnNextElm);
        expect(mockFn).toBeCalled();
    });

    it('should click readmore content link', () => {
        const setIsMount = jest.fn();
        jest.spyOn(React, "useState").mockImplementationOnce(isMount => [isMount, setIsMount]);

        render(<PokedexDetailsBasicInfo compData={mockBasicInfoPropsCompData} />);
        const btnElmLg = screen.getByTestId('test-btn-readmore-lg');
        fireEvent.click(btnElmLg);
        expect(setIsMount).toBeCalled();

        const btnElmSm = screen.getByTestId('test-btn-readmore-sm');
        fireEvent.click(btnElmSm);
        expect(setIsMount).toBeCalled();
    });
});

