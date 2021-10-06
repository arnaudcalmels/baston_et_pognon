import React, { useState } from 'react';

import Modal from '../Modal';
import DeleteConfirm from '../DeleteConfirm';
import EditPlace from '../../containers/components/EditPlace';
import AddMonster from '../../containers/components/AddMonster'

import Loader from '../Loader';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrashAlt, faPen, faPlusCircle, faSkull } from '@fortawesome/free-solid-svg-icons';

import { getIcon, getTitle } from '../../utils/getIcons';

import { getIllustration } from '../../utils/getIllustration';

import styles from './placeDetail.module.scss';

const PlaceDetail = ( { item, isLoading, deletePlace, scenarioId, getMonster } ) => {

  const [openEditPlaceModal, setOpenEditPlaceModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false); 
  const [openAddMonsterModal, setOpenAddMonsterModal] = useState(false);

  const handleDeletePlace = (id) => {
    deletePlace(id, setOpenDeleteModal(false));
  }

  return (
    isLoading ?
    <Loader/>
    :
    <div className={styles['main']}>

      <div className={styles['section']}>

        {
          Object.keys(item).length > 0 &&      
          <>
            <FontAwesomeIcon 
              className={styles['icon_pen']}
              icon={faPen} 
              size="1x" 
              title="Modifier"
              style={{cursor: 'pointer'}}
              onClick={() => setOpenEditPlaceModal(true)}
            />

            <FontAwesomeIcon 
              className={styles['icon_trash']}
              icon={faTrashAlt} 
              size="1x" 
              title="Supprimer"
              style={{cursor: 'pointer'}}
              onClick={() => setOpenDeleteModal(true)}
            />
          </>
        }

        { // Picture
          item.picture ?
            <img 
              className={styles['image']}
              src={item.picture?.base64} 
              alt={`illustration ${item.name}`}
            />
          :
          item.category &&
            <img 
              src={getIllustration(item.category?.name)} 
              alt={item.category?.name}
              className={styles['image']}
            />
        }

        <h3 className={styles['name']}>{item.name}</h3>

        { // Hidden Boosters in Place
          item.hiddenBoosterCount > 0 &&
            <span className="fa-layers fa-fw">
              <FontAwesomeIcon 
                className={styles['icon_booster']}
                icon={faStar} 
                title="Booster(s)"
              />
              <span className="fa-layers-counter" style={{color: 'black', backgroundColor: 'gold', fontSize: '2.5rem', top: '1px', left:'-32px'}} title={`${item.hiddenBoosterCount} booster(s)`}>
              {
                item.hiddenBoosterCount > 1 ? item.hiddenBoosterCount : ''
              }
              </span>
            </span>
        }

        { // Description
          item.description &&
          <div className={styles['description']}>
            {item.description}
          </div>
        }

        { // Category
          item.category &&
          <div className={styles['category']}>
            {item.category.name}
          </div>
        }

      </div>

      { // Monsters
        item.monsters?.length > 0 &&
        <>
          <div className={styles['monsters']}>Monstres</div>
          {
            item.monsters.map(monster => (
            <div 
              className={styles['monster']} 
              key={monster.id}
              onClick={() => getMonster(monster.id, 'currentMonsterInPlace')}
            >
              <p className={styles['monster_name']}>{monster.name}</p>

              <div className={styles['actions']}>
                {
                  monster.caracteristics.actions.map(action => (
                    <div className={`${styles['icon_action']} ${styles[getIcon(action,)]}`} title={getTitle(action)}></div>

                  ))
                }
              </div>

              {
                monster.isBoss &&
                <FontAwesomeIcon 
                  className={styles['icon_boss']}
                  icon={faSkull} 
                  size="1x" 
                  title="Boss"
                />
              }
            </div>
            ))
          }
        </>
      }

      {
        Object.keys(item).length > 0 &&      
        <FontAwesomeIcon 
          className={styles['add_monster']}
          onClick={() => setOpenAddMonsterModal(true)} 
          icon={faPlusCircle} 
          size="2x" 
          style={{cursor: 'pointer'}}
          title="Ajouter un monstre"
        />

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

      <Modal 
        isOpen={openAddMonsterModal}
        closeModal={() => {
          setOpenAddMonsterModal(false)
        }}
        title='Ajouter un monstre'
        children={
          <AddMonster 
            scenarioId={null}
            placeId={item.id}
            wanderGroupId={null}
            slug="place"
            closeModal={() => {
              setOpenAddMonsterModal(false)
            }}
            context={'currentMonsterInPlace'}
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
  getMonster: PropTypes.func,
};

export default PlaceDetail;