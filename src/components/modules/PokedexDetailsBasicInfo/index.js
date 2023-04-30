import { useState } from 'react';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { CardBox, Modal, PokedexDetailsDescription, Placeholder } from '../../';


export const PokedexDetailsBasicInfo = (props) => {
  const { compData = null, closeModalEvent = null, changePokemonEvent = null, isLoading = false } = props;
  const { id, formattedId, name, img, types, pokemonDesc } = compData;
  const [isMount, setIsMount] = useState(false);


  return (
    <>
      <div className="basic-info">
        <div className='basic-info-lg'>
          <div className="basic-info-cardbox">
            {
              isLoading ?
                <Placeholder variant="rounded" width={'100%'} height={'300px'} />
                :
                <CardBox
                  size={'lg'}
                  withCaption={false}
                  compData={{
                    id: id,
                    formattedId: formattedId,
                    name: name,
                    img: img,
                    types: types,
                  }}
                />
            }
          </div>

          <div className='basic-info-title'>
            {isLoading ? <Placeholder variant="rounded" width={'100%'} height={'100%'} /> : <b>{name ?? 'N/A'}</b>}
          </div>

          <div className="basic-info-id">
            {isLoading ? <Placeholder variant="rounded" width={'100%'} height={'100%'} /> : formattedId ?? 'N/A'}
          </div>

          <div className='basic-info-icons'>
            <a href='#' onClick={() => changePokemonEvent('prev')} data-testid="test-btn-prev-change-pokemon"><ArrowCircleLeftOutlinedIcon /></a>
            <a href='#' onClick={() => closeModalEvent(false)} data-testid="test-btn-close-modal-lg"><CancelOutlinedIcon /></a>
            <a href='#' onClick={() => changePokemonEvent('next')} data-testid="test-btn-next-change-pokemon"><ArrowCircleRightOutlinedIcon /></a>
          </div>

          <div className='basic-info-content'>
            {
              isLoading ?
                <Placeholder variant="rounded" width={'100%'} height={'220px'} />
                :
                <>
                  <div className='pokemon-description'>
                    {pokemonDesc ?? 'N/A'}
                  </div>
                  ... <a href='#' className='readmore' onClick={() => setIsMount(true)} data-testid="test-btn-readmore-lg">read more</a>
                </>
            }

          </div>
        </div>

        <div className='basic-info-sm'>
          <div className='basic-info-title'>
            {isLoading ? <Placeholder variant="rounded" width={'100%'} height={'100%'} /> : <b>{name ?? 'N/A'}</b>}
          </div>

          <div className='basic-info-icons'>
            <a href='#' onClick={() => closeModalEvent(false)} data-testid="test-btn-close-modal-sm"><CancelOutlinedIcon /></a>
          </div>

          <div className="basic-info-id">
            {isLoading ? <Placeholder variant="rounded" width={'100%'} height={'100%'} /> : formattedId ?? 'N/A'}
          </div>

          <div className="basic-info-cardbox">
            {
              isLoading ?
                <Placeholder variant="rounded" width={'100%'} height={'300px'} />
                :
                <CardBox
                  size={'lg'}
                  withCaption={false}
                  compData={{
                    id: id,
                    formattedId: formattedId,
                    name: name,
                    img: img,
                    types: types,
                  }}
                />
            }
          </div>

          <div className='basic-info-content'>
            {
              isLoading ?
                <Placeholder variant="rounded" width={'100%'} height={'220px'} />
                :
                <>
                  <div className='pokemon-description'>
                    {pokemonDesc ?? 'N/A'}
                  </div>
                  ... <a href='#' className='readmore' onClick={() => setIsMount(true)} data-testid="test-btn-readmore-sm">read more</a>
                </>
            }
          </div>
        </div>
      </div>

      {
        isMount && <Modal
          size='md'
          childComp={
            <PokedexDetailsDescription
              content={pokemonDesc}
              setIsMount={setIsMount}
            />
          }
        />
      }
    </>
  )
}