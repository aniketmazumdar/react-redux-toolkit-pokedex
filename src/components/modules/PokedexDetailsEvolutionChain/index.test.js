import { render, screen } from '@testing-library/react';
import { PokedexDetailsEvolutionChain } from ".";
import { mockBasicInfoPropsCompData } from "../PokedexDetailsBasicInfo/__mocks__";


describe("PokedexDetailsEvolutionChain", () => {
    it('should render the title when props data is passed', () => {
        const mockEvolutionChainPropsCompData = {
            firstPokemonBasicDetails: mockBasicInfoPropsCompData,
            secondPokemonBasicDetails: mockBasicInfoPropsCompData,
            thirdPokemonBasicDetails: mockBasicInfoPropsCompData
        }

        render(<PokedexDetailsEvolutionChain compData={mockEvolutionChainPropsCompData} />);
        const elements = screen.getAllByText(/Evolution Chain/i);
        expect(elements.length).toBe(1);
    });

    it('should not render component while any props data is empty', () => {
        const mockEvolutionChainPropsCompData = {
            firstPokemonBasicDetails: '',
            secondPokemonBasicDetails: '',
            thirdPokemonBasicDetails: ''
        }

        render(<PokedexDetailsEvolutionChain compData={mockEvolutionChainPropsCompData} />);
        const elm = screen.queryByText(/Evolution Chain/i);
        expect(elm).toBeNull();
    });
});
