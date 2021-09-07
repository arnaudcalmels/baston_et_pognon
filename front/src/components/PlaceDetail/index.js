import React, { useState } from 'react';
// import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import Modal from '../Modal';
import DeleteConfirm from '../DeleteConfirm';
import EditPlace from '../../containers/components/EditPlace';

import Loader from '../Loader';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import styles from './placeDetail.module.scss';

const PlaceDetail = ( { item, isLoading, deletePlace, scenarioId } ) => {

const [openEditPlaceModal, setOpenEditPlaceModal] = useState(false);
const [openDeleteModal, setOpenDeleteModal] = useState(false); 

const handleDeletePlace = (id) => {
  deletePlace(id, setOpenDeleteModal(false));
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
          style={{cursor: 'pointer'}}
          onClick={() => setOpenEditPlaceModal(true)}
        />

        <FontAwesomeIcon 
          className={styles['icon_trash']}
          icon={faTrashAlt} 
          size="2x" 
          title="Supprimer"
          style={{cursor: 'pointer'}}
          onClick={() => setOpenDeleteModal(true)}
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

      <Modal 
        isOpen={openDeleteModal} 
        closeModal={() => {
          setOpenDeleteModal(false);
        }}
        title='Supprimer le lieu ?' 
        children={
          <DeleteConfirm 
            cancelAction={() => setOpenDeleteModal(false)} 
            confirmAction={() => {
              handleDeletePlace(item.id, scenarioId);
            }}
            context='place'
          />}
      />

      <Modal 
        isOpen={openEditPlaceModal}
        closeModal={() => {
          setOpenEditPlaceModal(false)
        }}
        title='Modifier un lieu'
        children={
          <EditPlace 
            scenarioId={scenarioId}
            placeId={item.id}
            closeModal={() => {
              setOpenEditPlaceModal(false)
            }}
          />}
      />


    </div>
  );
};

PlaceDetail.propTypes = {
  item: PropTypes.object,
  isLoading: PropTypes.bool,
  deletePlace: PropTypes.func,
  scenarioId: PropTypes.number,
};

export default PlaceDetail;