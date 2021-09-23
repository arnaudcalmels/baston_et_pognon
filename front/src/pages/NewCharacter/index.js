import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import FileBase64 from 'react-file-base64';

import Button from '../../components/Button';
import Title from '../../components/Title';
import Section from '../../components/Section';
import Column from '../../components/Column';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShieldAlt, faStar } from '@fortawesome/free-solid-svg-icons';

import { getIcon, getTitle } from '../../utils/getIcons';

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

      <Title title={'Créer un nouveau personnage'} id={styles['title']}/>

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
            <div className={styles['character_name']}>
              <label htmlFor="name" className={styles['form_label']}>Nom :</label>
              <Field
                className={styles['form_field']}
                id="name"
                name="name"
                type="text"
              />

            </div>

            {/* eslint-disable-next-line */}
            <img id={styles['image_preview']} src={picture?.base64} alt={picture?.name}/>

            <div className={styles['character_picture']}>
              <label htmlFor="picture" className={styles['form_label']}>Ajouter une image  :</label>
              <FileBase64
                multiple={false}
                onDone={getFile.bind(this, props)}
              />
            </div>

            {/* eslint-disable-next-line */}
            <img id={styles['image_preview']} src={picture?.base64} alt={picture?.name}/>

            <div className={styles['new-identity']}>
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
            </div>  

            <div className={styles['caracteristics']}>
              <FontAwesomeIcon 
                className={styles['icon_lifepoints']}
                icon={faHeart} 
                title="Points de vie"
              />
                <span className={styles['icon_value']}>{professions.find(profession => profession.id === parseInt(props.values.professionId, 10))?.caracteristics?.lifePoints}</span>

              <FontAwesomeIcon 
                className={styles['icon_armor']}
                icon={faShieldAlt} 
                title="Armure"
              />
              <span className={styles['icon_value']}>{professions.find(profession => profession.id === parseInt(props.values.professionId, 10))?.caracteristics?.armor}</span>
            </div>


            <span className={styles['info']}>Tous les champs sont obligatoires.</span>

            <Button
              id={styles['cancel_button']}
              type='button'
              color='#eee'
              children='Annuler'
              onClick={() => backToList()}
            />

            <Button
              id={styles['submit_button']}
              type="submit"
              color='#eee'
              children='Valider'
            />
        
            <div className={styles['block_skills_inventory']}>
              <Section title="Compétences" >
                <Column dynamicClassName='skills'>
                  {
                    professions.find(profession => profession.id === parseInt(props.values.professionId, 10))?.caracteristics?.actions.map(action => (
                      <div className={styles['action']}>
                        <div className={`${styles['icon_action']} ${styles[getIcon(action, professions.find(profession => profession.id === parseInt(props.values.professionId, 10))?.name)]}`} title={getTitle(action, professions.find(profession => profession.id === parseInt(props.values.professionId, 10))?.name)}></div>
                        <span className={styles['icon_value']} title="Dégats / Soins">
                          {action.damages}
                        </span>
                        <p title="Fréquence d'utilisation">Tous les {action.frequency > 1 ? action.frequency : ''} tours</p>
                      </div>

                    ))
                  }
                </Column>
              </Section>

              <Section title="Inventaire">
                <Column dynamicClassName='inventory'>
                  <div className={styles['inventory']}>
                    <FontAwesomeIcon 
                      className={styles['icon_booster']}
                      icon={faStar} 
                      title="Booster"
                    />
                    <p className={styles['item_name']}>Booster(s)</p>
                    <span className={styles['item_number']}>0</span>
                  </div>
                </Column>
              </Section>
            </div>

          </Form>

        )
      }
      </Formik>

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