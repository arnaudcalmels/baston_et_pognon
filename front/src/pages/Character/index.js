import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import FileBase64 from 'react-file-base64';

import Button from '../../components/Button';
import Modal from '../../components/Modal';
import DeleteConfirm from '../../components/DeleteConfirm';
import Loader from '../../components/Loader';
import Title from '../../components/Title';
import Section from '../../components/Section';
import Column from '../../components/Column';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus, faHeart, faShieldAlt, faStar, faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons';

import { getIcon, getTitle } from '../../utils/getIcons';

import styles from './character.module.scss';

const Character = ({ deleteCharacter, editCharacter, character, getProfessions, getRaces, professions, races, getCharacters, isLoggedIn }) => { 
  useEffect(() => {
    if (isLoggedIn ) {
      getCharacters();
      getProfessions();
      getRaces();
    } 
  },
  // eslint-disable-next-line
  []);
  
  const showForm = () => {
    const block_form = document.getElementById(styles['block_form']);
    const block_character = document.getElementById(styles['block_character']);
    
    block_form.classList.toggle(styles['show_form']);
    block_character.classList.toggle(styles['hide_character']);
    block_character.classList.toggle(styles['show_character']);

    window.scrollTo(0, 0);
  };
  
  let [newPicture, setNewPicture] = useState();
  // let [newProfession, setNewProfession] = useState();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);  

  const getFile = (props, file) => {
    props.setFieldValue("picture", file);
    setNewPicture(file);
  };

  const handleDeleteCharacter = (id) => {
    deleteCharacter(id);
  };

  const handleSubmit = (values) => {
    console.log(JSON.stringify(values, null, 2));
    editCharacter(character.id, JSON.stringify(values, null, 2), showForm);
  };

  return (
    <div className={styles['main']}>

    {
      isLoggedIn && character ?
      <>
        <div className={styles['show_character']} id={styles['block_character']}>

          <Title title={character.name} id={styles['title']}/>

          <span className={styles['character_level']}>Niveau {character.level}</span>


          {/* eslint-disable-next-line */}
          <img id={styles['image']} src={character.picture?.base64} alt={character.picture?.name}/>  


          <div className={styles['identity']}>
            <div className={styles['character_profession']}>
              {character.profession.name}
            </div>

            <div className={styles['character_race']}>
              {character.race.name}
            </div>

            {
              character.sex === "M" ?
              <FontAwesomeIcon 
                icon={faMars} 
                size="2x" 
              />
              :
              <FontAwesomeIcon 
                icon={faVenus} 
                size="2x" 
              />
            }
          </div>

          {
            character.profession?.caracteristics &&
            <div className={styles['caracteristics']}>
              <FontAwesomeIcon 
                className={styles['icon_lifepoints']}
                icon={faHeart} 
                title="Points de vie"
              />
              <span className={styles['icon_value']}>
                {character.profession?.caracteristics?.lifePoints}
              </span>

              <FontAwesomeIcon 
                className={styles['icon_armor']}
                icon={faShieldAlt} 
                title="Armure"
              />
              <span className={styles['icon_value']}>
                {character.profession?.caracteristics?.armor}
              </span>
            </div>
          }
          
          {/* La modification du personnage ne sera plus possible dès lors qu'il a été joué */}
            <FontAwesomeIcon 
              className={styles['icon_pen']}
              icon={faPen} 
              size="1x" 
              title="Editer le personnage"
              style={{cursor: 'pointer'}}
              onClick={() => {
                showForm();
              }} 
            />

            <FontAwesomeIcon 
              className={styles['icon_trash']}
              icon={faTrashAlt} 
              size="1x" 
              title="Supprimer le personnage"
              style={{cursor: 'pointer'}}
              onClick={() => {
                setOpenDeleteModal(true);
              }} 
            />

          <div className={styles['block_skills_inventory']}>
            <Section title="Compétences" >
              <Column dynamicClassName='skills'>
                {
                  character.profession?.caracteristics?.actions.map(action => (
                    <div className={styles['action']} key={action.id}>
                      <div className={`${styles['icon_action']} ${styles[getIcon(action, character.profession.name)]}`} title={getTitle(action, character.profession.name)}></div>
                      <span className={styles['icon_value']} title="Dégats / Soins">
                        {action.damages}
                      </span>
                      <p title="Fréquence d'utilisation">Tous les {action.frequency > 1 ? action.frequency : ''} tours</p>
                    </div>
                    )
                    
                  )
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
                  <span className={styles['item_number']}>{character.inventory.boostersCount} </span>
                </div>
              </Column>
            </Section>
          </div>


        </div>

        <div id={styles['block_form']} className={styles['hide_form']}>
          <Formik
            initialValues={{
            name: character.name,
            sex: character.sex,
            professionId: character.profession.id,
            raceId: character.race.id,
            picture: character.picture,
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

                <div className={styles['new-character_name']}>
                  <label htmlFor="name" className={styles['form_label']}>Nom :</label>
                  <Field
                    className={styles['form_field']}
                    id="name"
                    name="name"
                    type="text"
                  />
                </div>

                <span className={styles['character_level']}>Niveau 1</span>

                <div className={styles['character_picture']}>
                  <label htmlFor="picture" className={styles['form_label']}>Image :</label>
                  <FileBase64
                    multiple={false}
                    onDone={getFile.bind(this, props)}
                  />
                </div>

                {
                  newPicture ?
                    <img id={styles['new-image_preview']} src={newPicture.base64} alt={newPicture.name}/>
                    : 
                    // eslint-disable-next-line
                    <img id={styles['image_preview']} src={character.picture?.base64} alt={character.picture?.name}/>
                }

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
                          <option value={profession.id} key={profession.id}>{profession.name}</option>
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
                          <option value={race.id} key={race.id}>{race.name}</option>
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

                <div className={styles['new-caracteristics']}>
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
                  onClick={() => showForm()}
                  shadow='#333 2px 2px 6px'
                />

                <Button
                  id={styles['submit_button']}
                  type="submit"
                  color='#eee'
                  children='Valider'
                  shadow='#333 2px 2px 6px'
                />
            
                <div className={styles['block_skills_inventory']}>
                  <Section title="Compétences" >
                    <Column dynamicClassName='skills'>
                      {
                        professions.find(profession => profession.id === parseInt(props.values.professionId, 10))?.caracteristics?.actions.map(action => (
                          <div className={styles['action']} key={action.id}>
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
                        <span className={styles['item_number']}>{character.inventory.boostersCount} </span>
                      </div>
                    </Column>
                  </Section>
                </div>

              </Form>

              

            )
          }
          </Formik>
        </div>

        <Modal 
          isOpen={openDeleteModal} 
          closeModal={() => {
            setOpenDeleteModal(false);
          }}
          title='Supprimer le personnage ?' 
          children={
            <DeleteConfirm 
              cancelAction={() => setOpenDeleteModal(false)} 
              confirmAction={() => {
                handleDeleteCharacter(character.id);
                setOpenDeleteModal(false);
              }}
            />}
        />
      </>
      :
      <Loader />
    }

    </div>
  );
};

Character.propTypes = {
  deleteCharacter: PropTypes.func,
  editCharacter: PropTypes.func,
  character: PropTypes.object,
  getProfessions: PropTypes.func,
  getRaces: PropTypes.func,
  professions: PropTypes.arrayOf(PropTypes.object,),
  races: PropTypes.arrayOf(PropTypes.object,),
  getCharacters: PropTypes.func,
  isLoggedIn: PropTypes.bool,
};

export default Character;