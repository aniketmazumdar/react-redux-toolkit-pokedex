import { Progress, Placeholder } from '../../';
import { statNameConstants } from '../../../utils';


export const PokedexDetailsStrategies = (props) => {
  const { stats = {}, isLoading = false } = props;

  return (
    <div className="row strategies">
      <div className='col-12 mb-4'>
        <span className='stat-tile'>Stats</span>
      </div>

      <div className='stats'>
        {
          isLoading ?
            <Placeholder variant="rounded" width={'100%'} height={'24px'} quantity={Object.keys(stats).length} />
            :
            stats && Object.keys(stats)?.map((stat, indx) => (
              <div className='stat-child' key={indx} data-testid={'test-stat-child-' + indx}>
                <span>{statNameConstants[stat] ?? 'N/A'}</span>
                <Progress
                  rate={stats[stat] ?? 0}
                />
              </div>
            ))
        }
      </div>
    </div>
  )
}