import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '.';

describe("Input", () => {
    it('should render same text passed into props', () => {
        render(<Input label={'Search'} />);
        const elements = screen.getAllByText('Search');
        expect(elements.length).toBe(1);
    });

    it('should return the same value as passed by clicking', () => {
        render(<Input placeholder={'Enter your search...'} />);
        const inputElm = screen.getByPlaceholderText('Enter your search...');
        fireEvent.change(inputElm, { target: { value: "SQUIRTLE" } })
        expect(inputElm.value).toBe("SQUIRTLE");
    });

    test('should fire onChange correctly', () => {
        const onChangeHandler = jest.fn();
        const inputValue = 'charme';
        render(<Input id="search" onChange={onChangeHandler} />);
        const input = screen.getByTestId('test-search').querySelector('input');
        fireEvent.change(input, { target: { value: inputValue } });
        expect(input.value).toBe(inputValue);
    });
})