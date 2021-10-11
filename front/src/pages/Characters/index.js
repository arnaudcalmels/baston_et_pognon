import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import Title from '../../components/Title';
import Card from '../../components/Card';
import Loader from '../../components/Loader';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './characters.module.scss';
import example from '../../assets/images/creation_perso.png';

const Characters = ({ getCharacters, isLoggedIn, characters, isLoading }) => {
  let history = useHistory();

  const newCharacter = () => {
    history.push('/personnage/nouveau');
  };

  useEffect(() => {
    if (isLoggedIn ) {
      getCharacters();
    }
  }, 
  // eslint-disable-next-line
  []);

  return (
    <div className={styles['main']}>
      <div className={styles['title_container']}>
        <Title title='Personnages' />
        <FontAwesomeIcon 
          className={styles['plus']} 
          icon={faPlusCircle} 
          size="2x" 
          style={{cursor: 'pointer'}}
          onClick={() => newCharacter()}
          title="Créer un nouveau personnage"
        />
        <p className={styles['new']} onClick={() => newCharacter()}>Nouveau personnage</p>
      </div>

      {
        isLoggedIn && characters &&
        <div className={styles['card_container']}>
          {
            characters.map(character => (
              <Card 
                entity="character"
                image={character.picture?.base64}
                alt={character.picture?.name}
                name={character.name}
                profession={character.profession.name}
                level={character.level}
                id={character.id}
                key={character.id}
                onClick={() => {
                  history.push(`/personnage/${character.id}`);
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
        <p className={styles['text_container_title']}>Bienvenue dans la page de création de personnage.</p>
        <p>Vous allez pouvoir créer un personnage parmi les classes suivantes :</p>
        <ul className={styles['classes']}>
          <li><span className={styles['class']}>Guerrier</span> : Combattant au corps à corps, il est robuste et encaissera facilement les coups de ses adversaires.</li>
          <li><span className={styles['class']}>Archer</span> : Combattant à distance, il excelle au tir à l’arc, il peut néanmoins continuer à combattre lorsque ses ennemies fondent sur lui mais alors sa durée de survie n’est pas garantie.</li>
          <li><span className={styles['class']}>Clerc</span> : Aventurier équilibré, même si elle reste moins efficace que celle du guerrier, son armure résistante lui permet d’encaisser correctement les dégâts infligés par ses adversaires. Il combat au corps à corps et dispose de la faculté de pouvoir soigner en combat n’importe quel aventurier qui l’accompagne.</li>
          <li><span className={styles['class']}>Mage</span>: Adepte de la magie, celle-ci se révèle très efficace de près comme de loin. Mais la faible résistance du mage l’incite à devoir garder le plus possible ses distances.</li>
        </ul>

        <img src={example} alt="Page de création de personnage"/>
        <NavLink 
          className={styles['navlink']} 
          to="/personnage/nouveau" 
        >
          Créer mon 1er personnage
        </NavLink>  
        <p>Les boosters obtenus par les personnages tout au long de leurs aventures vont leur permettre de progresser et de devenir plus puissants. <br/>
        Attention à ne pas mourir car alors tous les boosters seraient perdus !</p>
        <p className={styles['mobile']}><em>En version mobile, seule la consultation est possible. Les fonctionnalités de création, modification et suppression sont désactivées.</em></p>

      </div>

    </div>
  );
};

Characters.propTypes = {
  getCharacters: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  characters: PropTypes.arrayOf(PropTypes.object,),
  isLoading: PropTypes.bool,
};

export default Characters;