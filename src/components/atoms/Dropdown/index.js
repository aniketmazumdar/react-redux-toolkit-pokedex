import './index.css';
import { capitalizeEachWord, getDropdownPlaceholder } from '../../../utils';
import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
};


export const Dropdown = (props) => {
    const { name, id, classes, label, dataList, callback, selected = [] } = props;

    const [val, setVal] = useState([]);

    const handleChange = (event) => {
        const { target: { value } } = event;
        setVal(
            typeof value === 'string' ? value.split(',') : value,
        );
        callback(value)
    };


    useEffect(() => {
        if (val.toString() !== selected.toString()) {
            setVal(selected);
        }
    }, [selected.toString()])


    const menuItemList = dataList?.map(item => capitalizeEachWord(item));
    const placeholder = getDropdownPlaceholder(dataList);


    return (
        <FormControl sx={{ width: '100%' }}>
            <label htmlFor={id}>{label ?? 'Label'}</label>
            <Select
                id={id}
                name={name}
                className={classes}
                multiple
                value={val}
                onChange={handleChange}
                displayEmpty={true}
                renderValue={(selected) => selected?.length ? Array?.isArray(selected) ? selected?.join(', ') : selected : placeholder}
                MenuProps={MenuProps}
                data-testid={'test-'+id}
            >
                {menuItemList?.map((item) => (
                    <MenuItem key={item} value={item}>
                        <Checkbox checked={val?.indexOf(item) > -1} />
                        <ListItemText primary={item} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}