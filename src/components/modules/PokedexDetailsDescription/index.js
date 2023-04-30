import CloseIcon from '@mui/icons-material/Close';

export const PokedexDetailsDescription = ({ content = '', setIsMount }) => {
  return (
    <div className='basic-info-desc-popup'>
      <a href='#' className="cross-icon" onClick={() => setIsMount(false)} data-testid="test-btn-close-description-modal"><CloseIcon /></a>
      {content ?? 'N/A'}
    </div>
  )
}