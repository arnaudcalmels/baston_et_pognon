import React from 'react';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkull, faStar, faHeart, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

import styles from './detail.module.scss';

const Detail = ( { item } ) => {
  return (
    <div className={styles['main']}>

      { // Picture
        item.picture ?
          <img 
            id={styles['image']}
            src={item.picture?.base64} 
            alt={`illustration ${item.name}`}
          />
        :
        <div className={styles['image']}></div>
      }

      <h3 className={styles['name']}>{item.name}</h3>

      { // Monster Level 
        item.level &&
          <h4 className={styles['level']}>Niveau {item.level}</h4>
      }

      { // Monster is Boss
        item.isBoss &&
          <FontAwesomeIcon 
            className={styles['icon_boss']}
            icon={faSkull} 
            size="2x" 
            title="Boss"
          />
      }

      { // Monster Booster
        item.hasBooster &&
          <FontAwesomeIcon 
            className={styles['icon_booster']}
            icon={faStar} 
            size="2x" 
            title="Booster"
          />
      }

      { // Hidden Boosters in Place
        item.hiddenBoosterCount > 0 &&
          <span className="fa-layers fa-fw">
            <FontAwesomeIcon 
              className={styles['icon_booster']}
              icon={faStar} 
              size="2x" 
              title="Booster"
            />
            <span className="fa-layers-counter">
            {
              item.hiddenBoosterCount > 1 ? item.hiddenBoosterCount : ''
            }
            </span>
          </span>
      }

      { // Monster caracteristics
        item.caracteristics &&
          <div>
            <FontAwesomeIcon 
              className={styles['icon_lifepoints']}
              icon={faHeart} 
              size="2x" 
              title="Points de vie"
            />
            <span>{item.caracteristics.lifePoints}</span>
            <FontAwesomeIcon 
              className={styles['icon_armor']}
              icon={faShieldAlt} 
              size="2x" 
              title="Armure"
            />
            <span>{item.caracteristics.armor}</span>
          </div>
      }

      { // Monster Actions
        item.caracteristics?.actions &&
        item.caracteristics?.actions.map(action => (
          <p></p>
        ))
      }

    </div>
  );
};

Detail.propTypes = {
  item: PropTypes.object,
};

export default Detail;