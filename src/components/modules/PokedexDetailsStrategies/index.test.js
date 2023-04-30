import { render, screen } from '@testing-library/react';
import { PokedexDetailsStrategies } from ".";
import { mockStrategiesPropsData, } from "./__mocks__";

describe("PokedexDetailsStrategies", () => {
    it('should render the title', () => {
        render(<PokedexDetailsStrategies />);
        const elm = screen.getByText(/Stats/i);
        expect(elm).toBeTruthy();
    });

    it('should render stat child when props data is passed', async () => {
        render(<PokedexDetailsStrategies stats={mockStrategiesPropsData} />);
        const elm = await screen.getByTestId('test-stat-child-0');
        await expect(elm).toBeTruthy();
    });
});


