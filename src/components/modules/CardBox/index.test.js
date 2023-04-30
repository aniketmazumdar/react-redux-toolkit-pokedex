import { render, screen, fireEvent } from '@testing-library/react';
import { CardBox } from '.';
import { mockPropsData } from "./__mocks__";


const mockedHandleClickEvent = jest.fn();

describe("CardBox", () => {
    it('should render same name passed into props', () => {
        render(
            <CardBox
                compData={mockPropsData}
            />
        );
        const name = screen.queryAllByText(/charizard/i);
        expect(name.length).toBe(1);
    });

    it('should not rendered component if no data passed to compData props', () => {
        render(
            <CardBox
                compData={''}
            />
        );
        const name = screen.queryAllByText(/charizard/i);
        expect(name.length).toBe(0);
    });

    it('should be able to click card', () => {
        render(
            <CardBox
                compData={mockPropsData}
                handleClickEvent={mockedHandleClickEvent}
            />
        );

        const buttonElement = screen.getByRole("button");
        fireEvent.click(buttonElement)
        expect(mockedHandleClickEvent).toBeCalled()
    });
})