import "./index.css";
import ReactSlider from 'react-slider'

export const DoubleRangeSlider = (props) => {
  const { name = '', minLevel = 0, maxLevel = 100, values, onAfterChangeHandler } = props;


  return (
    <div className="range-slider-block">
      <div className="range-slider-level-indicators">{minLevel}</div>
      <ReactSlider
        className="range-slider"
        thumbClassName="range-slider-handle"
        trackClassName="range-slider-track"
        markClassName="range-slider-track-mark"
        ariaLabel={['Lower thumb', 'Upper thumb']}
        ariaValuetext={state => `Thumb value ${state.valueNow}`}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        pearling
        minDistance={10}
        min={minLevel}
        max={maxLevel}
        defaultValue={[minLevel, maxLevel]}
        value={values}
        onAfterChange={(value) => onAfterChangeHandler(name, value)}
        {...props}
      />
      <div className="range-slider-level-indicators">{maxLevel}</div>
    </div>
  )
};
