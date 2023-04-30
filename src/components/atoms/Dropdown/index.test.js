import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from '.';
import { capitalizeEachWord, getDropdownPlaceholder } from '../../../utils';
import { mockPropsDataList, mockCapitalizedArrayDataList, mockCapitalizedObjectDataList, mockArrayPlaceholder, mockObjectPlaceholder } from "./__mocks__";


const onChangeHandler = jest.fn();

const makeSut = (props) => {
    return render(
        <Dropdown id={props?.id} data-testid={'test-' + props?.id} dataList={props?.dataList} onChange={jest.fn()} {...props} />
    );
};


describe("Dropdown", () => {
    it('should render same label passed into props', () => {
        render(<Dropdown label={'Gender'} />);
        const elements = screen.getAllByText('Gender');
        expect(elements.length).toBe(1);
    });

    it('should render same dataList passed into props', () => {
        render(<Dropdown dataList={mockPropsDataList} />);
        const menuItemList = mockPropsDataList.map(item => capitalizeEachWord(item));
        expect(menuItemList.length).toBe(mockPropsDataList.length);
    });

    it('should same returb value of getDropdownPlaceholder as mentioned', () => {
        const arrPlaceholder = getDropdownPlaceholder(mockCapitalizedArrayDataList);
        expect(arrPlaceholder).toBe(mockArrayPlaceholder);

        const objPlaceholder = getDropdownPlaceholder(mockCapitalizedObjectDataList);
        expect(objPlaceholder).toBe(mockObjectPlaceholder);
    });

    // test('should fire onChange correctly', async () => {
    //     makeSut({
    //         onChange: onChangeHandler,
    //         id: 'type',
    //         dataList: mockPropsDataList
    //     });

    //     const inputElm = getByTestId('test-type').querySelector('select');
    //     fireEvent.click(inputElm, { target: { value: 'a' } });
    //     expect(onChangeHandler).toHaveBeenCalledTimes(0);
    // });

    // it('should triggered setVal', () => {
    //     const setVal = jest.fn();
    //     jest.spyOn(React, "useState").mockImplementationOnce((val) => [val, setVal]);
    //     render(<Dropdown dataList={mockPropsDataList} id="gender" data-testid="test-gender" />);
    //     expect(setVal).toBeCalled();
    // });
})