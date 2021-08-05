import React, { useState } from 'react';

import Modal from '../Modal';
import AddMonster from '../../containers/components/AddMonster';
// import EditMonster from '../../containers/components/EditMonster';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './monsterGroup.module.scss';

const MonsterGroup = ({ wanderGroupId, monsters, setItem }) => {
  
  const [openAddMonsterModal, setOpenAddMonsterModal] = useState(false);
  // const [openEditMonsterModal, setOpenEditMonsterModal] = useState(false);

  // const [monsterId, setMonsterId] = useState();
  
  return (
    <div className={styles['content']}>
      {
        monsters.map(monster => (
          <div 
            key={monster.id}
            className={styles['monster']} 
            onClick={() => {
            setItem(monster);
            // setOpenEditMonsterModal(true);
            // setMonsterId(monster.id)
          }}>
            {monster.name}
          </div>
        ))
      }

      <FontAwesomeIcon 
        className={styles['add_group']}
        onClick={() => setOpenAddMonsterModal(true)} 
        icon={faPlusCircle} 
        size="2x" 
        style={{cursor: 'pointer'}}
        title="Ajouter un monstre"
      />

      <Modal 
        isOpen={openAddMonsterModal}
        closeModal={() => {
          setOpenAddMonsterModal(false)
        }}
        title='Ajouter un monstre errant'
        children={
          <AddMonster 
            scenarioId={null}
            placeId={null}
            wanderGroupId={wanderGroupId}
            slug="wanderGroup"
            closeModal={() => {
              setOpenAddMonsterModal(false)
            }}
          />}
      />

      {/* <Modal 
        isOpen={openEditMonsterModal}
        closeModal={() => {
          setOpenEditMonsterModal(false)
        }}
        title='Modifier un monstre'
        children={
          <EditMonster 
            scenarioId={null}
            placeId={null}
            wanderGroupId={wanderGroupId}
            slug="wanderGroup"
            closeModal={() => {
              setOpenEditMonsterModal(false)
            }}
            monsterId={monsterId}
          />}
      /> */}

    </div>
  )
};

MonsterGroup.propTypes = {
  wanderGroupId: PropTypes.number,
  monsters: PropTypes.arrayOf(PropTypes.object,),
  setItem: PropTypes.func,
}

export default MonsterGroup;
