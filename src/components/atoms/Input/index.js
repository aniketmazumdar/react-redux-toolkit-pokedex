import './index.css';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';


export const Input = (props) => {
    const { name, id, classes, label, placeholder, onChangeHandler = () => { }, isSearch = false, readOnly = false } = props;

    return (
        <FormControl sx={{ width: '100%' }} variant="outlined">
            <label htmlFor={''}>{label}</label>
            <OutlinedInput
                id={id}
                name={name}
                className={classes}
                endAdornment={isSearch && <InputAdornment position="end"><SearchIcon /></InputAdornment>}
                aria-describedby="inp"
                placeholder={placeholder}
                onChange={onChangeHandler}
                readOnly={readOnly}
                data-testid={'test-' + id}
            />
        </FormControl>
    );
}