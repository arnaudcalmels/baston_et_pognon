import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';
import FormData from 'form-data';

import Title from '../../components/Title';
import Button from '../../components/Button';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import 'pure-react-carousel/dist/react-carousel.es.css';
import styles from './newScenario.module.scss';

const NewScenario = ({ newScenario }) => {
  let history = useHistory(); 

  const backToList = () => {
    history.push('/scenario');
  };

  const handleSubmit = (values) => {
    let data = new FormData();
    data.append('name', values.name);
    data.append('picture', values.picture);
    data.append('description', values.description);
    data.append('maxPlayers', values.maxPlayers);
    data.append('characterLevel', values.characterLevel);
    console.log(data);
    newScenario(data);
  };

  return (
    <div className={styles['main']}>
      <Title title={'Créer un nouveau scénario'} id={styles['title']}/>

      <Formik
        initialValues={{
          name: '',
          description: '',
          maxPlayers: 1,
          characterLevel: 1,
          picture: ''
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
            <div className={styles['overlay-image']}>
              <img src="https://cdn.pixabay.com/photo/2020/06/21/17/06/village-5325891__340.png" alt="photo_scenario"/>  
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

            <input 
            name="picture" 
            type="file" 
            onChange={(event) => {
              props.setFieldValue("picture", event.currentTarget.files[0]);
              console.log(event.currentTarget);
            }}
            />

            <div className={styles['scenario_name']}>
              <label htmlFor="name" className={styles['form_label']}>Nom * :</label>
              <Field
                className={styles['form_field']}
                id="name"
                name="name"
                type="text"
              />
              <ErrorMessage name='name' component='div' className={styles['error_message']}/>
            </div>

            <div className={styles['description']}>
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
          onClick={() => backToList()}
        />

    </div>
  );
};

NewScenario.propTypes = {
  newScenario: PropTypes.func,
};

export default NewScenario;