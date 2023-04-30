import { Badge, Placeholder } from '../../';


export const PokedexDetailsCharacteristics = (props) => {
  const { compData = null, isLoading = false } = props;
  const { height, weight, gender, eggGroups, abilities, types, weakAgainsts } = compData;

  return (
    <div className="characteristics">
      {
        isLoading ?
          <>
            <Placeholder variant="rounded" width={'100%'} height={'80px'} quantity={6} />
            <Placeholder variant="rounded" width={'220%'} height={'80px'} />
          </>
          :
          <>
            <div>
              <h4>Height</h4>
              <span>{height ?? 'N/A'}</span>
            </div>

            <div>
              <h4>Weight</h4>
              <span>{weight ?? 'N/A'}</span>
            </div>

            <div>
              <h4>Gender(s)</h4>
              <span>{gender ? gender.join(', ') : 'N/A'}</span>
            </div>

            <div>
              <h4>Egg Groups</h4>
              <span>{eggGroups ?? 'N/A'}</span>
            </div>

            <div>
              <h4>Abilities</h4>
              <span>{abilities ?? 'N/A'}</span>
            </div>

            <div>
              <h4>Types</h4>
              {
                types?.length ? types.map((type, indx) => (
                  <Badge
                    key={indx}
                    title={type}
                  />
                ))
                  :
                  'N/A'
              }
            </div>

            <div className="weak-against">
              <h4>Weak Against</h4>
              {
                weakAgainsts?.length ? weakAgainsts.map((item, indx) => (
                  <Badge
                    key={indx}
                    title={item}
                  />
                ))
                  :
                  'N/A'
              }
            </div>
          </>
      }

    </div>
  )
}