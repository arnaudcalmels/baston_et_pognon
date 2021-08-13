import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import FileBase64 from 'react-file-base64';

import Button from '../../components/Button';

import PropTypes from 'prop-types';

import styles from './newCharacter.module.scss';

const NewCharacter = ({ newCharacter, getProfessions, getRaces, professions, races }) => {
  useEffect(() => {
    getProfessions();
    getRaces();
  },
  // eslint-disable-next-line
  []);

  let history = useHistory(); 

  let [ picture, setPicture ] = useState();

  const getFile = (props, file) => {
    props.setFieldValue("picture", file);
    setPicture(file);
  };

  const backToList = () => {
    history.push('/personnage');
  };

  const handleSubmit = (values) => {
    console.log(JSON.stringify(values, null, 2));
    newCharacter(JSON.stringify(values, null, 2));
  };

  return (
    <div className={styles['main']}>

      <h2 className={styles['name']}>{'Créer un nouveau personnage'}</h2>

      <div id={styles['block_form']} className={styles['show_form']}>
        <Formik
          initialValues={{
          name: '',
          sex: '',
          professionId: '',
          raceId: '',
          picture: null
          }}
          validate={values => {
            const errors = {};
            if (!values.name || !values.sex || !values.professionId || !values.raceId) {
              errors.all = 'Veuillez remplir tous les champs !';
            }
            return errors;
          }}
          onSubmit={(values) => handleSubmit(values)}
        >
        {
          (props) => (
            <Form className={styles['form']}>
              {/* <ErrorMessage name='all' component='div' className={styles['error_message']}/> */}

              <label htmlFor="name" className={styles['form_label']}>Nom :</label>
              <Field
                className={styles['form_field']}
                id="name"
                name="name"
                type="text"
              />

              <div className={styles['form_label']}>Sexe :</div>
              <div role="group" className={styles['form_group']}>
                <label className={styles['form_radio']}>
                  <Field type="radio" name="sex" value="M" className={styles['form_radio-input']}/>
                  M
                </label>
                <label className={styles['form_radio']}>
                  <Field type="radio" name="sex" value="F" className={styles['form_radio-input']}/>
                  F
                </label>
              </div>

              <label htmlFor="professionId" className={styles['form_label']}>Classe :</label>
              <Field
                className={styles['form_field']}
                id="professionId"
                name="professionId"
                as="select"
                onChange={props.handleChange}
              >
                <option defaultValue>Sélectionnez une classe</option>
                  {
                    professions.map(profession => (
                      <option value={profession.id}>{profession.name}</option>
                    ))
                  }
                </Field>


              <label htmlFor="raceId" className={styles['form_label']}>Race :</label>
              <Field
                className={styles['form_field']}
                id="raceId"
                name="raceId"
                as="select"
                onChange={props.handleChange}
              >
                <option defaultValue>Sélectionnez une race</option>
                  {
                    races.map(race => (
                      <option value={race.id}>{race.name}</option>
                    ))
                  }
              </Field>

            <span className={styles['info']}>Tous les champs sont obligatoires.</span>

            <div className={`${styles['newCharacter_picture']} ${styles['form_item']}`}>
                <label htmlFor="picture" className={styles['form_label']}>Image :</label>
                <FileBase64
                  multiple={false}
                  onDone={getFile.bind(this, props)}
                />
              </div>

              {/* eslint-disable-next-line */}
              <img id={styles['image_preview']} src={picture?.base64} alt={picture?.name}/>


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

      <div className={styles['profession_infos']}>
        Caractéristiques détaillées des classes
      </div>

    </div>
  );
};

NewCharacter.propTypes = {
  newCharacter: PropTypes.func,
  getProfessions: PropTypes.func,
  getRaces: PropTypes.func,
  professions: PropTypes.arrayOf(PropTypes.object,),
  races: PropTypes.arrayOf(PropTypes.object,),
};

export default NewCharacter;