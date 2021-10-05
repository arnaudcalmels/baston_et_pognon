import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import Title from '../../components/Title';
import Card from '../../components/Card';
import Loader from '../../components/Loader';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './scenarios.module.scss';
import example from '../../assets/images/creation_scenario.png';

const Scenarios = ({ isLoggedIn, scenarios, getScenarios, getPlaceSuccess, getMonsterSuccess, isLoading }) => {
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
          title="Créer un nouveau scénario"
        />
        <p className={styles['new']} onClick={() => newScenario()}>Nouveau scénario</p>
      </div>


      {
        isLoggedIn && scenarios && 
        <div className={styles['card_container']}>
          {
            scenarios.map(scenario => (
              <Card 
                entity="scenario"
                image={scenario.picture?.base64}
                alt={scenario.picture?.name}
                name={scenario.name}
                description={scenario.description}
                players={scenario.maxPlayers}
                level={scenario.characterLevel}
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

      {
        isLoading &&
        <Loader />
      }

      <div className={styles['text_container']}>
        <p className={styles['text_container_title']}>Bienvenue dans la page de création de scénario.</p>
        <p>Un futur maître de jeu peut créer un scénario qu’il pourra utiliser par la suite dans les parties en ligne (fonctionnalité non existante actuellement).</p>
        <p>Le scénario sera décrit par les différents lieux que les personnages seront amenés à traverser.<br/>
        Les lieux peuvent être un simple espace narratif ou un repère de monstres qui s’attaqueront aux intrépides aventuriers qui auront l’audace de s’aventurer jusque-là.</p>
        <p>Il est possible d’ajouter des monstres errants qui auront ou non la possibilité d’attaquer en groupe.</p>

        <img src={example} alt="Page de création de scénario"/>
        <NavLink 
          className={styles['navlink']} 
          to="/scenario/nouveau" 
        >
          Créer mon 1er scénario
        </NavLink>  
        <p>Pensez bien à répartir judicieusement des boosters sur les monstres et/ou à les cacher dans certains lieux.<br/>
        Ces boosters sont le témoignage de la réussite et de la bravoure des aventuriers qui gagneront en compétences au fur et à mesure qu’ils s’empareront de ces boosters.</p>
        <p>Le jeu en ligne n’étant pas encore implémenté, le nombre de booster requis par un personnage pour le faire progresser dans les niveaux n’est pas encore défini.</p>
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
    isLoading: PropTypes.bool,
};

export default Scenarios;