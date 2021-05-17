import React, { useState } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import useMediaQuery from '../../utils/useMediaQuery';

import Title from '../../components/Title';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import DeleteConfirm from '../../components/DeleteConfirm';
import AddPlace from '../../containers/components/AddPlace';
import EditPlace from '../../containers/components/EditPlace';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpider, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import 'pure-react-carousel/dist/react-carousel.es.css';
import styles from './scenario.module.scss';

const Scenario = ({ scenario, editScenario, deleteScenario }) => {
  const showForm = () => {
    const block_form = document.getElementById(styles['block_form']);
    const block_scenario = document.getElementById(styles['block_scenario']);
    
    block_form.classList.toggle(styles['show_form']);
    block_scenario.classList.toggle(styles['hide_scenario']);
    block_scenario.classList.toggle(styles['show_scenario']);

    
    window.scrollTo(0, 0);
  }

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

  const handleSubmit = (values) => {
    console.log(JSON.stringify(values, null, 2));
    editScenario(scenario.id, JSON.stringify(values, null, 2));
    showForm();
  };

  const [openDeleteModal, setOpenDeleteModal] = useState(false); 
  const [openAddPlaceModal, setOpenAddPlaceModal] = useState(false);
  const [openEditPlaceModal, setOpenEditPlaceModal] = useState(false);
  const [placeId, setPlaceId] = useState();

  const handleDeleteScenario = (id) => {
    deleteScenario(id);
  }
  

  return (
    <div className={styles['main']}>
      <Title title={scenario.name} id={styles['title']}/>

    <div className={styles['show_scenario']} id={styles['block_scenario']}>
      <div className={styles['overlay-image']}>
        <img src={scenario.picture.base64} alt="photo_scenario"/>  
        <div className={styles['hover']}>
          <FontAwesomeIcon 
            onClick={() => console.log('ajouter photo')} 
            icon={faPlusCircle} 
            size="2x" 
            style={{cursor: 'pointer'}}
            title="Modifier l'image"
          />
        </div>
      </div>
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
                key={group.id}
              />
            ))
            : 
            <p>Aucun monstre</p>
          }
          <FontAwesomeIcon 
            className={styles['add_group']}
            onClick={() => console.log('ajouter groupe monstre')} 
            icon={faPlusCircle} 
            size="2x" 
            style={{cursor: 'pointer'}}
            title="Ajouter un groupe de monstres"
          />

        </div>
      </div>

    </div>
      

      <div id={styles['block_form']} className={styles['hide_form']}>
      <Formik
          initialValues={{
            name: scenario.name,
            description: scenario.description,
            maxPlayers: scenario.maxPlayers,
            characterLevel: scenario.characterLevel,
          }}
          validate={values => {
            const errors = {};
            if (!values.name) {
              errors.name = 'Veuillez remplir ce champ !';
            }
            return errors;
          }}
          onSubmit={(values) => handleSubmit(values)}
        >

          <Form className={styles['form']}>
            <div className={styles['overlay-image']}>
              <img src={scenario.picture} alt="photo_scenario"/>  
              <div className={styles['hover']}>
                <FontAwesomeIcon 
                  onClick={() => console.log('ajouter photo')} 
                  icon={faPlusCircle} 
                  size="2x" 
                  style={{cursor: 'pointer'}}
                  title="Ajouter une image"
                />
              </div>
            </div>

            <div className={styles['new-scenario_name']}>
              <label htmlFor="name" className={styles['form_label']}>Nom * :</label>
              <Field
                className={styles['form_field']}
                id="name"
                name="name"
                type="text"
              />
              <ErrorMessage name='name' component='div' className={styles['error_message']}/>
            </div>

            <div className={styles['new-description']}>
              <h3>Description :</h3>
              <Field as="textarea" name="description" className={styles['form_field']}/>
            </div>

            <div className={styles['caracteristics']}>
              <label htmlFor="maxPlayers">Nombre de joueurs :</label>
              <Field
                className={styles['form_field']}
                id="maxPlayers"
                name="maxPlayers"
                type="number"
                min={1}
              />

              <label htmlFor="characterLevel">Niveau de départ :</label>
              <Field
                className={styles['form_field']}
                id="characterLevel"
                name="characterLevel"
                type="number"
                min={1}
              />
            </div>
            <span className={styles['info']}>Les champs marqués d'une * sont obligatoires.</span>

            <Button
              id={styles['submit_button']}
              type="submit"
              color='#eee'
              children='Valider'
            />
        
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

          </Form>
        </Formik>

        <Button
          id={styles['cancel_button']}
          color='#eee'
          children='Annuler'
          onClick={() => showForm()}
        />

      </div>

      <Title title={'Lieux'} id={styles['sub_title']}/>

      <CarouselProvider
        className={styles['carousel']}
        naturalSlideWidth={250}
        naturalSlideHeight={350}
        totalSlides={scenario.places.length + 1 }
        visibleSlides={visibleSlides}
      >
        <Slider className={styles['slider']}>
          {
            scenario.places.map(place => (
              <Slide index={0}>
                <Card
                  image={place.picture?.base64}
                  name={place.name}
                  subtitle={`Nombre de monstres : ${place.monsters.length}`}
                  id={place.id}
                  key={place.id}
                  alt={place.picture?.name}
                  onClick={() => {
                    setOpenEditPlaceModal(true);
                    setPlaceId(place.id)
                  }}
                />
              </Slide>
            ))
          }

          <Slide>
            <div className={styles['place']} key={'add_place'}>
              <FontAwesomeIcon 
                className={styles['add_place']}
                onClick={() => setOpenAddPlaceModal(true)} 
                icon={faPlusCircle} 
                size="2x" 
                style={{cursor: 'pointer'}}
                title="Ajouter un lieu"
              />
            </div>
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
          onClick={() => {
            console.log('editer scenario');
            showForm();
          }} 
        />

        <Button 
          color='#eee' 
          children='Supprimer le scénario' 
          onClick={() => {
            setOpenDeleteModal(true);
          }} 
        />
      </div>

      <Modal 
        isOpen={openDeleteModal} 
        closeModal={() => {
          setOpenDeleteModal(false);
        }}
        title='Supprimer le scénario ?' 
        children={
          <DeleteConfirm 
            cancelAction={() => setOpenDeleteModal(false)} 
            confirmAction={() => {
              handleDeleteScenario(scenario.id);
              setOpenDeleteModal(false);
            }}
          />}
      />

      <Modal 
        isOpen={openAddPlaceModal}
        closeModal={() => {
          setOpenAddPlaceModal(false)
        }}
        title='Ajouter un lieu'
        children={
          <AddPlace 
            scenarioId={scenario.id}
            closeModal={() => {
              setOpenAddPlaceModal(false)
            }}
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
            scenarioId={scenario.id}
            placeId={placeId}
            closeModal={() => {
              setOpenEditPlaceModal(false)
            }}
          />}
      />

    </div>
  );
};

Scenario.propTypes = {
  scenario: PropTypes.object,
  editScenario: PropTypes.func,
  deleteScenario: PropTypes.func,
};

export default Scenario;