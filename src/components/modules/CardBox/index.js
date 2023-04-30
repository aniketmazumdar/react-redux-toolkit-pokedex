import './index.css';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import { capitalizeEachWord, getGradientColorCodesByTypes } from '../../../utils';


export const CardBox = ({ compData, withCaption = true, size, handleClickEvent = () => {} }) => {
    if (!compData) {
        return;
    }
    let { id, formattedId, name, img, types } = compData;
    const cardboxHeight = size === 'sm' ? 'auto' : '100%';
    name = capitalizeEachWord(name);
    const bgColors = getGradientColorCodesByTypes(types);


    return (
        <>
            <Card
                className='cardbox'
                onClick={() => handleClickEvent(true, id)}
                style={{ background: bgColors, height: cardboxHeight ?? 'N/A' }}
            >
                <CardActionArea>
                    <div className='cardbox-img-wrapper'>
                        {
                            img && <img
                                className='cardbox-img'
                                alt={name ?? 'N/A'}
                                src={img}
                            />
                        }

                    </div>
                    {
                        withCaption && <>
                            <h2>{name ?? 'N/A'}</h2>
                            <h3>{formattedId ?? 'N/A'}</h3>
                        </>
                    }
                </CardActionArea>
            </Card>
        </>
    );
}