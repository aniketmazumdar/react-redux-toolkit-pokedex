import React from "react";
import { render, screen } from '@testing-library/react';
import { PokedexDetailsCharacteristics } from ".";
import { mockCharacteristicsPropsCompData, } from "./__mocks__";


describe("PokedexDetailsCharacteristics", () => {
    it('should render same weight passed into props', () => {
        render(<PokedexDetailsCharacteristics compData={mockCharacteristicsPropsCompData} />);
        const elements = screen.getAllByText(mockCharacteristicsPropsCompData?.weight);
        expect(elements.length).toBeGreaterThan(0);
    });
});