import React, { useState } from 'react';

import Modal from '../Modal';
import DeleteConfirm from '../DeleteConfirm';
import EditMonster from '../../containers/components/EditMonster';
import Loader from '../Loader';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkull, faStar, faHeart, faShieldAlt, faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons';

import { getIcon, getTitle } from '../../utils/getIcons';

import styles from './monsterDetail.module.scss';

const MonsterDetail = ( { item, deleteMonster, isLoading, context, placeId } ) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false); 
  const [openEditMonsterModal, setOpenEditMonsterModal] = useState(false);

  const handleDeleteMonster = (id) => {
    deleteMonster(id, setOpenDeleteModal(false), context, placeId);
  };
  
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
            onClick={() => setOpenEditMonsterModal(true)}
            style={{cursor: 'pointer'}}
          />

          <FontAwesomeIcon 
            className={styles['icon_trash']}
            icon={faTrashAlt} 
            size="1x"
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

        <h4 className={styles['name']}>{item.name}</h4>

        { // Monster Level 
          item.level &&
            <h5 className={styles['level']}>Niveau {item.level}</h5>
        }

        { // Monster is Boss
          item.isBoss &&
            <FontAwesomeIcon 
              className={styles['icon_boss']}
              icon={faSkull} 
              title="Boss"
            />
        }

        { // Monster Booster
          item.hasBooster &&
            <FontAwesomeIcon 
              className={styles['icon_booster']}
              icon={faStar} 
              title="Booster"
            />
        }

        { // Monster caracteristics
          item.caracteristics &&
            <div className={styles['caracteristics']}>
              <FontAwesomeIcon 
                className={styles['icon_lifepoints']}
                icon={faHeart} 
                title="Points de vie"
              />
              <span className={styles['icon_value']}>
                {item.caracteristics.lifePoints}
              </span>

              <FontAwesomeIcon 
                className={styles['icon_armor']}
                icon={faShieldAlt} 
                title="Armure"
              />
              <span className={styles['icon_value']}>
                {item.caracteristics.armor}
              </span>
            </div>
        }
      </div>


      { // Monster Actions
        item.caracteristics?.actions &&
        <>
          <div className={styles['actions']}>
            {
              item.caracteristics.actions.map(action => (
                <div className={styles['action']} key={action.id}>
                  <div className={`${styles['icon_action']} ${styles[getIcon(action)]}`} title={getTitle(action)}></div>
                  <span className={styles['icon_value']} title="Dégats / Soins">
                    {action.damages}
                  </span>
                  <p title="Fréquence d'utilisation">Tous les {action.frequency > 1 ? action.frequency : ''} tours</p>
                </div>
              ))
            }
          </div>
        </>
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