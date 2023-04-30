import { useEffect, useState, memo } from "react";
import Button from '@mui/material/Button';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { DoubleRangeSlider } from "../../";
import { statNameConstants } from '../../../utils';


const StatRanges = ({
    dataList = {},
    minLevel = 0,
    maxLevel = 0,
    closeModalEvent = () => { },
    onSubmitEvent = () => { },
    onChangeStat = () => { }
}) => {
    const [statList, setStatList] = useState({});

    const onChangeEvent = (name, value) => {
        let newstatList = { ...statList };
        newstatList[name]['min'] = value[0];
        newstatList[name]['max'] = value[1];
        setStatList(newstatList);
        onChangeStat(newstatList);  // for Mobile Filter Popup
    }

    const onResetEvent = () => {
        let newstatList = { ...statList };
        Object.keys(newstatList).forEach((name) => {
            newstatList[name]['min'] = minLevel;
            newstatList[name]['max'] = maxLevel;
        });
        setStatList(newstatList);
        onSubmitEvent(statList);
    }

    useEffect(() => {
        setStatList(dataList)
    }, [JSON.stringify(dataList)]);


    return (
        <div className="stat-ranges">
            <div className="title-level">
                <span>Select Stats</span>
                <a href='#' onClick={() => closeModalEvent(false)} data-testid="test-btn-close-modal"><CancelOutlinedIcon /></a>
            </div>

            <div className="range-level">
                {
                    Object.keys(statList).length && Object.keys(statList).map((name, indx) => (
                        <div className="range-slider-wrap" key={indx}>
                            <div className="stat-label">
                                {statNameConstants[name]}
                            </div>
                            <DoubleRangeSlider
                                indexNo={indx}
                                name={name}
                                minLevel={minLevel}
                                maxLevel={maxLevel}
                                values={[statList[name]['min'], statList[name]['max']]}
                                onAfterChangeHandler={(name, value) => onChangeEvent(name, value)}
                                data-testid={"test-rangeslider-" + indx}
                            />
                        </div>
                    ))
                }
            </div>

            <div className="button-level">
                <Button
                    onClick={() => onResetEvent()}
                    variant="outlined"
                    className="btn-dark-blue-outlined"
                    data-testid="test-btn-reset-stat-range"
                >
                    Reset
                </Button>

                <Button
                    onClick={() => onSubmitEvent(statList)}
                    variant="contained"
                    className="btn-dark-blue"
                    data-testid="test-btn-apply-stat-range"
                >
                    Apply
                </Button>
            </div>
        </div>
    );
}

export const FilterStatRanges = memo(StatRanges);