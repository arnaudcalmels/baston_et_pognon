import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import Title from '../../components/Title';
import Card from '../../components/Card';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './scenarios.module.scss';

const Scenarios = ({ isLoggedIn, scenarios, getScenarios, getPlaceSuccess, getMonsterSuccess }) => {
  let history = useHistory();

  const newScenario = () => {
    history.push('/scenario/nouveau');
  };

  useEffect(() => {
    if (isLoggedIn ) {
      getScenarios();
    }
  }, 
  // eslint-disable-next-line
  []);

  return (
    <div className={styles['main']}>
      <div className={styles['title_container']}>
        <Title title='Scénarios' />
        <FontAwesomeIcon 
          className={styles['plus']} 
          icon={faPlusCircle} 
          size="2x" 
          style={{cursor: 'pointer'}}
          onClick={() => newScenario()}
        />
        <p className={styles['new']} onClick={() => newScenario()}>Nouveau scénario</p>
      </div>

      {
        isLoggedIn && 
        <div className={styles['card_container']}>
          {
            scenarios.map(scenario => (
              <Card 
                image={scenario.picture?.base64}
                name={scenario.name}
                subtitle={`Nombre de joueurs : ${scenario.maxPlayers}`}
                level={`Niveau de départ : ${scenario.characterLevel}`}
                id={scenario.id}
                key={scenario.id}
                onClick={() => {
                  history.push(`/scenario/${scenario.id}`);
                  getPlaceSuccess({});
                  getMonsterSuccess({}, 'currentWanderingMonster');
                  getMonsterSuccess({}, 'currentMonsterInPlace');
                }}
              />
            ))
          }
        </div>
      }

      <div className={styles['text_container']}>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto autem officia eos cupiditate numquam sit neque ratione possimus blanditiis omnis voluptate repudiandae, doloremque fugiat, magnam voluptatem facilis quis tempora animi?</p>
        <img src="https://cdn.pixabay.com/photo/2016/04/30/13/12/sutterlin-1362879__340.jpg" alt="page"/>
        <NavLink 
          className={styles['navlink']} 
          to="/scenario/nouveau" 
        >
          Créer mon 1er scénario
        </NavLink>  
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste vel, error eligendi nam doloribus eum facilis saepe tempora distinctio odio enim. Animi distinctio natus perspiciatis sunt rem, aliquid hic voluptas!</p>
        <img src="https://cdn.pixabay.com/photo/2017/11/17/07/56/background-2956789__340.jpg" alt="page2"/>
      </div>

    </div>
  );
};

Scenarios.propTypes = {
    isLoggedIn: PropTypes.bool,
    scenarios: PropTypes.arrayOf(PropTypes.object,),
    getScenarios: PropTypes.func,
    getPlaceSuccess: PropTypes.func,
    getMonsterSuccess: PropTypes.func,
};

export default Scenarios;