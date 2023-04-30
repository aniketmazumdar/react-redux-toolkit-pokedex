import Button from '@mui/material/Button';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { Placeholder } from '../../';


export const PokedexDetailsButtonGroup = (props) => {
  const { compData, changePokemonEvent = null, isLoading = false } = props;
  const { prevPokemonName, nextPokemonName } = compData;

  return (
    <div className="button-group">
      {
        isLoading ?
          <Placeholder variant="rounded" width={'100%'} height={'60px'} quantity={2} />
          :
          <>
            <Button
              variant="contained"
              className="btn-dark-blue"
              onClick={() => changePokemonEvent('prev')}
              data-testid="test-btn-prev-change-pokemon"
            >
              <WestIcon />&nbsp;&nbsp;&nbsp;&nbsp;{prevPokemonName ?? 'N/A'}
            </Button>

            <Button
              variant="contained"
              className="btn-dark-blue"
              onClick={() => changePokemonEvent('next')}
              data-testid="test-btn-next-change-pokemon"
            >
              {nextPokemonName ?? 'N/A'}&nbsp;&nbsp;&nbsp;&nbsp;<EastIcon />
            </Button>
          </>
      }

    </div>
  )
}