import React, { useState } from 'react';
//import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FileBase64 from 'react-file-base64';

//import useMediaQuery from '../../utils/useMediaQuery';

import Title from '../../components/Title';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import DeleteConfirm from '../../components/DeleteConfirm';
import AddPlace from '../../containers/components/AddPlace';
import AddMonster from '../../containers/components/AddMonster'
import MonsterGroup from '../../containers/components/MonsterGroup';
import Section from '../../components/Section';
import Column from '../../components/Column';
import MonsterDetail from '../../containers/components/MonsterDetail';
import Place from '../../components/Place';
import PlaceDetail from '../../containers/components/PlaceDetail';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import 'pure-react-carousel/dist/react-carousel.es.css';
import styles from './scenario.module.scss';

const Scenario = ({ scenario, editScenario, deleteScenario, currentWanderingMonster, currentPlace, getPlace, currentMonsterInPlace, getMonsterSuccess }) => {
  const showForm = () => {
    const block_form = document.getElementById(styles['block_form']);
    const block_scenario = document.getElementById(styles['block_scenario']);
    
    block_form.classList.toggle(styles['show_form']);
    block_scenario.classList.toggle(styles['hide_scenario']);
    block_scenario.classList.toggle(styles['show_scenario']);

    
    window.scrollTo(0, 0);
  }

  const handleSubmit = (values) => {
    console.log(JSON.stringify(values, null, 2));
    editScenario(scenario.id, JSON.stringify(values, null, 2), showForm);
  };

  const [openDeleteModal, setOpenDeleteModal] = useState(false); 
  const [openAddPlaceModal, setOpenAddPlaceModal] = useState(false);
  const [openAddMonsterModal, setOpenAddMonsterModal] = useState(false);

  const handleDeleteScenario = (id) => {
    deleteScenario(id);
  }

  let [ newPicture, setNewPicture ] = useState();

  const getFile = (props, file) => {
    props.setFieldValue("picture", file);
    setNewPicture(file);
  };

  
  return (
    <div className={styles['main']}>
      <Title title={scenario.name} id={styles['title']}/>

      <div className={styles['show_scenario']} id={styles['block_scenario']}>
          <img id={styles['image']}src={scenario.picture?.base64} alt="photo_scenario"/>  
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

      </div>

      {/*
        Formulaire d'édition
      */}
      <div id={styles['block_form']} className={styles['hide_form']}>
        <Formik
          initialValues={{
            name: scenario.name,
            description: scenario.description,
            maxPlayers: scenario.maxPlayers,
            characterLevel: scenario.characterLevel,
            picture: scenario.picture
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
          {
            (props) => (
            <Form className={styles['form']}>
              {
                newPicture ?
                  <img id={styles['new_image_preview']} src={newPicture.base64} alt={newPicture.name}/>
                  : 
                  // eslint-disable-next-line
                  <img id={styles['image_preview']} src={scenario.picture?.base64} alt={scenario.picture?.name}/>
              }

              <div className={styles['scenario_picture']}>
                <label htmlFor="picture" className={styles['form_label']}>Image :</label>
                <FileBase64
                  multiple={false}
                  onDone={getFile.bind(this, props)}
                />
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

            </Form>
            )
          }
          </Formik>


          <Button
            id={styles['cancel_button']}
            color='#eee'
            children='Annuler'
            onClick={() => showForm()}
          />

        </div>

      <Section title='Monstres errants'>
        <Column>
          {
            scenario.wanderingMonsters.length > 0 ?
            scenario.wanderingMonsters.map(group => (
              <MonsterGroup 
                key={group.id}
                monsters={group.monsters}
                wanderGroupId={group.id}
              />
            ))
            : 
            <p>Aucun monstre</p>
          }
        <FontAwesomeIcon 
          className={styles['add_group']}
          onClick={() => setOpenAddMonsterModal(true)} 
          icon={faPlusCircle} 
          size="2x" 
          style={{cursor: 'pointer'}}
          title="Ajouter un monstre"
        />
        </Column>
        <Column>
          <MonsterDetail
            item={currentWanderingMonster}
            context={'currentWanderingMonster'}
          ></MonsterDetail>
        </Column>
      </Section>

      <Section title='Lieux'> 
        <Column>
          {
            scenario.places.length > 0 ?
            scenario.places.map(place => (
              <Place 
                key={place.id}
                place={place}
                onClick={() => {
                  getPlace(place.id);
                  getMonsterSuccess({}, 'currentMonsterInPlace');
                }}
              />
            ))
            :
            <p>Aucun lieu</p>        
          }
          <FontAwesomeIcon 
            className={styles['add_place']}
            onClick={() => setOpenAddPlaceModal(true)} 
            icon={faPlusCircle} 
            size="2x" 
            style={{cursor: 'pointer'}}
            title="Ajouter un lieu"
          />

        </Column>
        <Column>
        <PlaceDetail
            item={currentPlace}
            scenarioId={scenario.id}
          ></PlaceDetail>
        </Column>
        <Column>
          <MonsterDetail
            item={currentMonsterInPlace}
            context={'currentMonsterInPlace'}
            placeId={currentPlace.id}
          ></MonsterDetail>
        </Column>

      </Section>

      {/*
        Modales
      */}
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
            context='scenario'
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
        isOpen={openAddMonsterModal}
        closeModal={() => {
          setOpenAddMonsterModal(false)
        }}
        title='Ajouter un monstre errant'
        children={
          <AddMonster 
            scenarioId={scenario.id}
            placeId={null}
            wanderGroupId={null}
            slug="scenario"
            closeModal={() => {
              setOpenAddMonsterModal(false)
            }}
            context={'currentWanderingMonster'}
          />}
      />

    </div>
  );
};

Scenario.propTypes = {
  scenario: PropTypes.object,
  editScenario: PropTypes.func,
  deleteScenario: PropTypes.func,
  currentWanderingMonster: PropTypes.object,
  currentPlace: PropTypes.object,
  currentMonsterInPlace: PropTypes.object,
  getMonsterSuccess: PropTypes.func,
};

export default Scenario;