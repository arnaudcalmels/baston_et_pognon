import React from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkull, faStar, faHeart, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import styles from './detail.module.scss';

const Detail = ( { item } ) => {
  const rowData = [];
  item.caracteristics?.actions.forEach(action => {
    rowData.push({action: 'Attaque/Soin', dégats: action.damages, cac: !action.distance, distance: action.distance, fréquence: action.frequency}); 
  });

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
              title="Booster(s)"
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
          <div className="ag-theme-material" style={{height: 200, width: 950}}>
            <AgGridReact rowData={rowData}>
              <AgGridColumn field="action"></AgGridColumn>
              <AgGridColumn field="dégats"></AgGridColumn>
              <AgGridColumn field="cac"></AgGridColumn>
              <AgGridColumn field="distance"></AgGridColumn>
              <AgGridColumn field="fréquence"></AgGridColumn>
            </AgGridReact>
          </div>
      }

    </div>
  );
};

Detail.propTypes = {
  item: PropTypes.object,
};

export default Detail;