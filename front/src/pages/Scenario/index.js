import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import useMediaQuery from '../../utils/useMediaQuery';

import Title from '../../components/Title';
import Card from '../../components/Card';
import Button from '../../components/Button';

// import PropTypes from 'prop-types';

import 'pure-react-carousel/dist/react-carousel.es.css';
import styles from './scenario.module.scss';

const Scenario = props => {
  
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
      <Title title='Nom Scénario' id={styles['title']}/>

      <img className={styles['picture']} src="https://cdn.pixabay.com/photo/2021/04/22/06/40/duck-6198196__340.jpg" alt="photo_scenario"/>

      <table className={styles['table']} id={styles['caracteristics']}>
        <tbody className={styles['table_content']}>
          <tr className={styles['table_row']}>
            <td className={styles['table_cell-name']}>Nombre de joueurs :</td>
            <td className={styles['table_cell-value']}>{4}</td>
          </tr>
          <tr className={styles['table_row']}>
            <td className={styles['table_cell-name']}>Niveau de départ :</td>
            <td className={styles['table_cell-value']}>{1}</td>
          </tr>
        </tbody>
      </table>


      <div className={styles['description']}>
        <h3>Description</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam dicta sed esse, sapiente dolorum illum, dolore doloribus quos natus dolorem aliquid sequi quae dolores recusandae cupiditate porro blanditiis deserunt atque! <br/> <br/>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam dicta sed esse, sapiente dolorum illum, dolore doloribus quos natus dolorem aliquid sequi quae dolores recusandae cupiditate porro blanditiis deserunt atque!<br/> <br/>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam dicta sed esse, sapiente dolorum illum, dolore doloribus quos natus dolorem aliquid sequi quae dolores recusandae cupiditate porro blanditiis deserunt atque!</p>
      </div>

      <CarouselProvider
        className={styles['carousel']}
        naturalSlideWidth={250}
        naturalSlideHeight={350}
        totalSlides={3}
        visibleSlides={visibleSlides}
      >
        <Slider className={styles['slider']}>
          <Slide index={0}>
            <Card
                image={'https://cdn.pixabay.com/photo/2021/04/22/06/40/duck-6198196__340.jpg'}
                name={'Mare aux canards'}
                subtitle={`Nombre de monstres : 1`}
                // level={`Niveau ${character.level}`}
                // id={scenario.id}
                // key={scenario.id}
                // onClick={() => {
                //   history.push(`/personnage/${character.id}`);
                // }}
            />
          </Slide>
          <Slide index={1}>
            <Card
                image={'https://cdn.pixabay.com/photo/2021/04/22/06/40/duck-6198196__340.jpg'}
                name={'Etang magique'}
                subtitle={`Nombre de monstres : `}
                // level={`Niveau ${character.level}`}
                // id={scenario.id}
                // key={scenario.id}
                // onClick={() => {
                //   history.push(`/personnage/${character.id}`);
                // }}
            />
          </Slide>
          <Slide index={3}>
            <Card
                image={'https://cdn.pixabay.com/photo/2021/04/22/06/40/duck-6198196__340.jpg'}
                name={'Champ maléfique'}
                subtitle={`Nombre de monstres : 4`}
                // level={`Niveau ${character.level}`}
                // id={scenario.id}
                // key={scenario.id}
                // onClick={() => {
                //   history.push(`/personnage/${character.id}`);
                // }}
            />
          </Slide>
        </Slider>
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
      </CarouselProvider>

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

// Scenario.propTypes = {
  
// };

export default Scenario;