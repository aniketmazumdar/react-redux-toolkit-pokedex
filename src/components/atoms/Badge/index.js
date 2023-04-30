import { getColorCodeByType } from '../../../utils';
import './index.css';

export const Badge = (props) => {
    const { title } = props;
    const colorCode = getColorCodeByType(title);

    return (
        <span className='badge' style={{backgroundColor: colorCode}} {...props}>
            {title}
        </span>
    );
}