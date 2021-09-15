import React from 'react';

import PropTypes from 'prop-types';

import { getIllustration } from '../../utils/getIllustration';

import styles from './place.module.scss';

const Place = ({ place, onClick}) => {

  return (
    <div 
      className={styles['overlay']}
      onClick={onClick} 
    >
      {
        place.picture ?
        <img 
          src={place.picture.base64} 
          alt={place.picture.name}
          className={styles['image']}
        />
        :
        <img 
          src={getIllustration(place.category.name)} 
          alt={place.category.name}
          className={styles['image']}
        />

      }

      <div className={styles['infos']}>
        <div className={styles['name']}>{place.name}</div>

        <div className={styles['monsters']}>
          {
            place.monsters?.length > 1 ?
            `${place.monsters?.length} monstres`
            :
            `${place.monsters?.length} monstre`
          } 
        </div>
      </div>
    </div>
  )
};

Place.propTypes = {
  place: PropTypes.object,
  onClick: PropTypes.func,
}

export default Place;
