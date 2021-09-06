import React, { useState } from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import Modal from '../../components/Modal';
import DeleteConfirm from '../../components/DeleteConfirm';
import EditMonster from '../../containers/components/EditMonster';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkull, faStar, faHeart, faShieldAlt, faCheck, faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import styles from './detail.module.scss';

const Detail = ( { item, type, deleteMonster } ) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false); 
  const [openEditMonsterModal, setOpenEditMonsterModal] = useState(false);

  const handleDeleteMonster = (id) => {
    deleteMonster(id, setOpenDeleteModal(false));
  };

  const rowDataMonster = [];
  item.caracteristics?.actions.forEach(action => {
    rowDataMonster.push({action: 'Attaque/Soin', damages: action.damages, cac: !action.distance, distance: action.distance, frequency: action.frequency}); 
  });

  const trueFalseRenderer = params => {
    if (params.value) {
      return (
        <FontAwesomeIcon 
          className={styles['icon_check']}
          icon={faCheck} 
          size="2x" 
          title="Oui"
        />
      )
    } else {
      return '';
    }
  }

  
  return (
    
    <div className={styles['main']}>

    {
      type === 'monster' && 
      <FontAwesomeIcon 
        className={styles['icon_pen']}
        icon={faPen} 
        size="2x" 
        title="Modifier"
        onClick={() => setOpenEditMonsterModal(true)}
        style={{cursor: 'pointer'}}
      />

    } 

    {
      type && 
      <FontAwesomeIcon 
        className={styles['icon_trash']}
        icon={faTrashAlt} 
        size="2x" 
        title="Supprimer"
        onClick={() => setOpenDeleteModal(true)}
        style={{cursor: 'pointer'}}
      />
    }

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
            <AgGridReact rowData={rowDataMonster} frameworkComponents={{trueFalseRenderer: trueFalseRenderer}}>
              <AgGridColumn headerName="Action" field="action"></AgGridColumn>
              <AgGridColumn headerName="Dégâts / Soin" field="damages"></AgGridColumn>
              <AgGridColumn headerName="Corps à corps" field="cac" cellRenderer="trueFalseRenderer"></AgGridColumn>
              <AgGridColumn headerName="Distance" field="distance" cellRenderer="trueFalseRenderer"></AgGridColumn>
              <AgGridColumn headerName="Fréquence" field="frequency"></AgGridColumn>
            </AgGridReact>
          </div>
      }

      <Modal 
        isOpen={openDeleteModal} 
        closeModal={() => {
          setOpenDeleteModal(false);
        }}
        title={type === 'monster' ? 'Supprimer le monstre ?' : 'Supprimer le lieu ?'}
        children={
          <DeleteConfirm 
            cancelAction={() => setOpenDeleteModal(false)} 
            confirmAction={() => {
              if (type === 'monster') {
                handleDeleteMonster(item.id);
              }
            }}
          />}
      />

      <Modal 
        isOpen={openEditMonsterModal}
        closeModal={() => {
          setOpenEditMonsterModal(false)
        }}
        title='Modifier un monstre'
        children={
          <EditMonster 
            closeModal={() => {
              setOpenEditMonsterModal(false)
            }}
            monsterId={item.id}
          />}
      />


    </div>
  );
};

Detail.propTypes = {
  item: PropTypes.object,
  deleteMonster: PropTypes.func,
};

export default Detail;