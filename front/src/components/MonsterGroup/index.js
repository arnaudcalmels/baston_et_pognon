import React, { useState } from 'react';

import Modal from '../Modal';
import AddMonster from '../../containers/components/AddMonster';
import Button from '../Button';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './monsterGroup.module.scss';

const MonsterGroup = ({ closeModal, wanderGroupId, monsters }) => {
  
  const [openAddMonsterModal, setOpenAddMonsterModal] = useState(false);
  
  return (
    <div className={styles['content']}>
      {
        monsters.map(monster => (
          <div className={styles['monster']}>
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


      <Button 
        // id={styles['cancel_button']} 
        color='#eee' 
        children='Fermer' 
        onClick={closeModal}
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

    </div>
  )
};

MonsterGroup.propTypes = {
  closeModal: PropTypes.func,
  wanderGroupId: PropTypes.number,
  monsters: PropTypes.arrayOf(PropTypes.object,),
}

export default MonsterGroup;
