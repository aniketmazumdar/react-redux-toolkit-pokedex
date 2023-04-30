import Skeleton from '@mui/material/Skeleton';

export const Placeholder = (props) => {
    const { variant, width, height, quantity = 1 } = props;

    let placeholders = [];
    for (let i = 0; i < quantity; i++) {
        placeholders.push(<Skeleton key={i} variant={variant} width={width} height={height} />);
    }
    return placeholders;
}