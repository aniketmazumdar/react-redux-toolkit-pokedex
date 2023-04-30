import './index.css';


export const Progress = (props) => {
    const { rate = 100 } = props;
    const percent = rate / 210 * 100;

    return (
        <div className="progress">
            <div className="bar" style={{ width: `${percent}%` }}>
                <p className="percent">{rate}</p>
            </div>
        </div>
    );
}