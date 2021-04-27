import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Button';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './newCharacter.module.scss';

const Character = ({ newCharacter }) => {
  let history = useHistory(); 

  const backToList = () => {
    history.push('/personnage');
  };

  const handleSubmit = (values) => {
    console.log(JSON.stringify(values, null, 2));
    newCharacter(JSON.stringify(values, null, 2));
  };

  return (
    <div className={styles['main']}>
      <div className={styles['overlay-image']}>
        <img src="https://cdn.pixabay.com/photo/2017/07/14/16/48/skeleton-2504341__340.jpg" alt="photo_perso"/>  
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

      <h2 className={styles['name']}>{'Créer un nouveau personnage'}</h2>

      <div id={styles['block_form']} className={styles['show_form']}>
        <Formik
          initialValues={{
          name: '',
          sex: '',
          professionId: '',
          raceId: '',
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
              type="select"
            />
              {/* <option value='1'>Guerrier</option> */}

            <label htmlFor="raceId" className={styles['form_label']}>Race :</label>
            <Field
              className={styles['form_field']}
              id="raceId"
              name="raceId"
              type="select"
            />
              {/* <option value='1'>Humain</option> */}

          <span className={styles['info']}>Tous les champs sont obligatoires.</span>

            <Button
              id={styles['submit_button']}
              type="submit"
              color='#eee'
              children='Valider'
            />
        
          </Form>
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

Character.propTypes = {
  id: PropTypes.number,
  newCharacter: PropTypes.func,
};

export default Character;