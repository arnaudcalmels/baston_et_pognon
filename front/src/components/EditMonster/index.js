import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import FileBase64 from 'react-file-base64';

import Button from '../Button';
import Loader from '../Loader';

import PropTypes from 'prop-types';

import styles from './editMonster.module.scss';

const EditMonster = ({ closeModal, scenarioId, placeId, wanderGroupId, slug, getMonster, monsterId, currentMonster, isLoading }) => {
  useEffect(() => {
    getMonster(monsterId);
  },
  // eslint-disable-next-line
  []);

  let [ picture, setPicture ] = useState();

  const getFile = (props, file) => {
    props.setFieldValue("picture", file);
    setPicture(file);
  };

  const handleSubmit = (values) => {
    console.log(JSON.stringify(values, null, 2));
    // editMonster(slug, JSON.stringify(values, null, 2));
    closeModal();
  };

  return (
    isLoading ?
      <Loader/>
    :
      <div>
        <Formik
          initialValues={{
            scenarioId,
            placeId,
            wanderGroupId,
            name: currentMonster.name,
            isBoss: currentMonster.isBoss,
            hasBooster: currentMonster.hasBooster,
            level: currentMonster.level,
            picture: currentMonster.picture,
            caracteristics: {
              armor: currentMonster.caracteristics?.armor,
              lifePoints: currentMonster.caracteristics?.lifePoints,
              actions: currentMonster.caracteristics?.actions
            },
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
              {/* <h3 className={styles['form_title']}>Je crée un nouveau monstre</h3> */}

              <div className={styles['form_content']}>

                <div className={`${styles['newMonster_name']} ${styles['form_item']}`}>
                  <label htmlFor="name" className={styles['form_label']}>Nom * :</label>
                  <Field
                    className={styles['form_field']}
                    id="name"
                    name="name"
                    type="text"
                  />
                  <ErrorMessage name='name' component='div' className={styles['error_message']}/>
                </div>

                <div className={`${styles['newMonster_picture']} ${styles['form_item']}`}>
                  <label htmlFor="picture" className={styles['form_label']}>Image :</label>
                  <FileBase64
                    multiple={false}
                    onDone={getFile.bind(this, props)}
                  />
                </div>

                {/* eslint-disable-next-line */}
                <img id={styles['image_preview']} src={picture?.base64} alt={picture?.name}/>

                <div className={`${styles['newMonster_isBoss']} ${styles['form_checkbox']}`}>
                  <div className={styles['form_label']}>Boss :</div>
                  <label>
                    <Field type="checkbox" name="isBoss" className={styles['form_checkbox-input']}/>
                    {
                      props.values.isBoss ? "oui" : "non"
                    }
                  </label>
                </div>

                <div className={`${styles['newMonster_hasBooster']} ${styles['form_checkbox']}`}>
                  <div className={styles['form_label']}>Booster :</div>
                  <label> 
                    <Field type="checkbox" name="hasBooster" className={styles['form_checkbox-input']}/>
                    {
                      props.values.hasBooster ? "oui" : "non"
                    }
                  </label>
                </div>

                <div className={styles['newMonster_level']}>
                  <label htmlFor="level" className={styles['form_label']}>Niveau :</label>
                  <Field
                    className={styles['form_field']}
                    id="level"
                    name="level"
                    type="number"
                    min={1}
                  />
                </div>

                <div className={styles['newMonster_caracteristics']}>
                  <h3 className={styles['form_title']}>Caractéristiques :</h3>
                  <div className={styles['newMonster_armor']}>
                    <label htmlFor="armor" className={styles['form_label']}>Armure :</label>
                    <Field
                      className={styles['form_field']}
                      id="armor"
                      name="caracteristics.armor"
                      type="number"
                      min={1}
                    />
                  </div>

                  <div className={styles['newMonster_lifePoints']}>
                    <label htmlFor="armor" className={styles['form_label']}>Points de vie :</label>
                    <Field
                      className={styles['form_field']}
                      id="lifePoints"
                      name="caracteristics.lifePoints"
                      type="number"
                      min={1}
                    />
                  </div>
                </div>

                <div className={styles['newMonster_actions']}>
                  <h3 className={styles['form_title']}>Actions : </h3>
                  <FieldArray name="caracteristics.actions">
                  {
                    ({ insert, remove, push }) => (
                      <div>
                        {props.values.caracteristics.actions.length > 0 &&
                        props.values.caracteristics.actions.map((action, index) => (
                          <div className="" key={index}>
                            Action {index+1}
                            <div className="">
                              <label htmlFor={`caracteristics.actions.${index}.damages`} className={styles['form_label']}>Dégâts :</label>
                              <Field
                                className={styles['form_field']}  
                                name={`caracteristics.actions.${index}.damages`}
                                type="number"
                                min={1}
                              />
                            </div>

                            <div className={styles['form_checkbox']}>
                              <div className={styles['form_label']}>Distance :</div>
                              <label>
                                <Field type="checkbox" name={`caracteristics.actions.${index}.distance`} className={styles['form_checkbox-input']}/> 
                                {
                                  props.values.caracteristics.actions[index].distance ? "oui" : "non"
                                }
                              </label>
                            </div>

                            <div className="">
                              <label htmlFor={`caracteristics.actions.${index}.frequency`} className={styles['form_label']}>Fréquence :</label>
                              <Field
                                className={styles['form_field']}
                                name={`caracteristics.actions.${index}.frequency`}
                                type="number"
                                min={1}
                              />
                            </div>

                            <div className={styles['form_checkbox']}>
                              <div className={styles['form_label']}>Soin :</div>
                              <label>
                                <Field type="checkbox" name={`caracteristics.actions.${index}.heal`} className={styles['form_checkbox-input']}/>
                                {
                                  props.values.caracteristics.actions[index].heal ? "oui" : "non"
                                }
                              </label>
                            </div>

                            <div className={styles['form_checkbox']}>
                              <div className={styles['form_label']}>Spéciale :</div>
                              <label>
                                <Field type="checkbox" name={`caracteristics.actions.${index}.isSpecial`} className={styles['form_checkbox-input']}/>
                                {
                                  props.values.caracteristics.actions[index].isSpecial ? "oui" : "non"
                                }
                              </label>
                            </div>

                            <div className="">
                              <button
                                type="button"
                                className="secondary"
                                onClick={() => remove(index)}
                              >
                                Supprimer l'action
                              </button>
                            </div>
                          </div>
                        ))}

                      <button
                        type="button"
                        className="secondary"
                        onClick={() => push({ damages: 1, distance: false, frequency: 1, heal: false, isSpecial: false })}
                      >
                        Ajouter une action
                      </button>
                    </div>
                    )
                  }
                  </FieldArray>              
                </div>

              </div>

              <Button 
                id={styles['submit_button']} 
                type="submit" 
                color='#eee' 
                children='Modifier'
              />
            </Form>
          )
        }
      </Formik>

      <Button 
        id={styles['cancel_button']} 
        color='#eee' 
        children='Annuler' 
        onClick={closeModal}
      />

      </div>
  );
};

EditMonster.propTypes = {
  closeModal: PropTypes.func,
  scenarioId: PropTypes.number,  
  placeId: PropTypes.number,
  wanderGroupId: PropTypes.number,
  slug: PropTypes.string,
  getMonster: PropTypes.func,
  monsterId: PropTypes.number,
  monster: PropTypes.object,
  isLoading: PropTypes.bool, 
};

export default EditMonster;