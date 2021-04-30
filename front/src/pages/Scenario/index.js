import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import useMediaQuery from '../../utils/useMediaQuery';

import Title from '../../components/Title';
import Card from '../../components/Card';
import Button from '../../components/Button';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpider } from '@fortawesome/free-solid-svg-icons';

import 'pure-react-carousel/dist/react-carousel.es.css';
import styles from './scenario.module.scss';

const Scenario = ({ scenario }) => {
  console.log(scenario);
  
  const [width] = useMediaQuery();
  let visibleSlides;
  if (width < 768) {
    visibleSlides = 1;
  } else if (width < 1200) {
    visibleSlides = 2;
  } else if (width < 1500) {
    visibleSlides = 3;
  } else {
    visibleSlides = 4;
  }

  return (
    <div className={styles['main']}>
      <Title title={scenario.name} id={styles['title']}/>

      <img className={styles['picture']} src={scenario.picture} alt="photo_scenario"/>

      <table className={styles['table']} id={styles['caracteristics']}>
        <tbody className={styles['table_content']}>
          <tr className={styles['table_row']}>
            <td className={styles['table_cell-name']}>Nombre de joueurs :</td>
            <td className={styles['table_cell-value']}>{scenario.maxPlayers}</td>
          </tr>
          <tr className={styles['table_row']}>
            <td className={styles['table_cell-name']}>Niveau de départ :</td>
            <td className={styles['table_cell-value']}>{scenario.characterLevel}</td>
          </tr>
        </tbody>
      </table>


      <div className={styles['description']}>
        <h3>Description</h3>
        <p>{scenario.description}</p>
      </div>

      <CarouselProvider
        className={styles['carousel']}
        naturalSlideWidth={250}
        naturalSlideHeight={350}
        totalSlides={scenario.places.length}
        visibleSlides={visibleSlides}
      >
        <Slider className={styles['slider']}>
          {
            scenario.places.map(place => (
              <Slide index={0}>
                <Card
                  image={place.picture}
                  name={place.name}
                  subtitle={`Nombre de monstres : ${place.monsters.length}`}
                  id={place.id}
                  key={place.id}
                  // onClick={() => {
                  //   history.push(`/personnage/${character.id}`);
                  // }}
                />
              </Slide>
            ))
          }
        </Slider>
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
      </CarouselProvider>

      <div className={styles['wanderingMonsters']}>
        <h3>Monstres errants</h3>
        <div className={styles['monsters']}>
          {
            scenario.wanderingMonsters.length > 0 ?
            scenario.wanderingMonsters.map(group => (
              <FontAwesomeIcon
                className={styles['monster_group']}
                // onClick={() => console.log('monstres')} 
                icon={faSpider} 
                size="2x" 
                style={{cursor: 'pointer'}}
                title={`${group.monsters.length} monstre(s)`}
              />
            ))
            : 
            <p>Aucun monstre</p>
          }
        </div>
      </div>

      <div className={styles['buttons']}>
        <Button 
          id={styles['edit_button']}
          color='#eee' 
          children='Editer le scénario' 
          // onClick={() => {
          //   console.log('editer perso');
          //   showForm();
          // }} 
        />

        <Button 
          color='#eee' 
          children='Supprimer le scénario' 
          // onClick={() => {
          //   setOpenDeleteModal(true);
          // }} 
        />
      </div>

    </div>
  );
};

Scenario.propTypes = {
  scenario: PropTypes.arrayOf(PropTypes.object,),
};

export default Scenario;