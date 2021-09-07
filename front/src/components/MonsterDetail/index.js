import React, { useState } from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import Modal from '../Modal';
import DeleteConfirm from '../DeleteConfirm';
import EditMonster from '../../containers/components/EditMonster';
import Loader from '../Loader';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkull, faStar, faHeart, faShieldAlt, faCheck, faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import styles from './monsterDetail.module.scss';

const MonsterDetail = ( { item, deleteMonster, isLoading, context, placeId } ) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false); 
  const [openEditMonsterModal, setOpenEditMonsterModal] = useState(false);

  const handleDeleteMonster = (id) => {
    deleteMonster(id, setOpenDeleteModal(false), context, placeId);
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
    isLoading ?
    <Loader/>
    :

    <div className={styles['main']}>

    {
      Object.keys(item).length > 0 && 
      <>
        <FontAwesomeIcon 
          className={styles['icon_pen']}
          icon={faPen} 
          size="2x" 
          title="Modifier"
          onClick={() => setOpenEditMonsterModal(true)}
          style={{cursor: 'pointer'}}
        />

        <FontAwesomeIcon 
          className={styles['icon_trash']}
          icon={faTrashAlt} 
          size="2x" 
          title="Supprimer"
          onClick={() => setOpenDeleteModal(true)}
          style={{cursor: 'pointer'}}
        />
      </>
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
        title={'Supprimer le monstre ?'}
        children={
          <DeleteConfirm 
            cancelAction={() => setOpenDeleteModal(false)} 
            confirmAction={() => {
                handleDeleteMonster(item.id);
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
            currentMonster={item}
            context={context}
            placeId={placeId}
          />}
      />


    </div>
  );
};

MonsterDetail.propTypes = {
  item: PropTypes.object,
  deleteMonster: PropTypes.func,
  isLoading: PropTypes.bool, 
  context: PropTypes.string,
  placeId: PropTypes.number,
};

export default MonsterDetail;