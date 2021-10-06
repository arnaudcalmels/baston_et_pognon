import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';
import FileBase64 from 'react-file-base64';

import Title from '../../components/Title';
import Button from '../../components/Button';

import PropTypes from 'prop-types';

import styles from './newScenario.module.scss';

const NewScenario = ({ newScenario }) => {
  let history = useHistory(); 
  let [ picture, setPicture ] = useState();

  const backToList = () => {
    history.push('/scenario');
  };

  const getFile = (props, file) => {
    props.setFieldValue("picture", file);
    setPicture(file);
  };

  const handleSubmit = (values) => {
    console.log(JSON.stringify(values, null, 2));
    newScenario(JSON.stringify(values, null, 2));
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
          picture: null
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

            <div className={styles['image_container']}>
              {/* eslint-disable-next-line */}
              <img id={styles['image_preview']} src={picture?.base64} alt={picture?.name}/>
            </div>

            <div className={styles['scenario_picture']}>
              <label htmlFor="picture" className={styles['form_label']}>Ajouter une image :</label>
              <FileBase64
                multiple={false}
                onDone={getFile.bind(this, props)}
              />
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

            <div className={styles['description']}>
              <h4>Description :</h4>
              <Field as="textarea" name="description" className={styles['form_field']}/>
            </div>

            <span className={styles['info']}>Les champs marqués d'une * sont obligatoires.</span>

            <Button
              id={styles['cancel_button']}
              type='button'
              color='#eee'
              children='Annuler'
              onClick={() => backToList()}
              shadow='#333 2px 2px 6px'
            />

            <Button
              id={styles['submit_button']}
              type="submit"
              color='#eee'
              children='Valider'
              shadow='#333 2px 2px 6px'
            />
        
          </Form>

          )
        }
        </Formik>

    </div>
  );
};

NewScenario.propTypes = {
  newScenario: PropTypes.func,
};

export default NewScenario;