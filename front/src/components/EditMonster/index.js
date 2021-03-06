import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import FileBase64 from 'react-file-base64';

import Button from '../Button';

import PropTypes from 'prop-types';

import styles from './editMonster.module.scss';

const EditMonster = ({ closeModal, currentMonster, editMonster, context, placeId }) => {
  let [newPicture, setNewPicture] = useState();

  const getFile = (props, file) => {
    props.setFieldValue("picture", file);
    setNewPicture(file);
  };

  const handleSubmit = (values) => {
    editMonster(currentMonster.id, JSON.stringify(values, null, 2), closeModal, context, placeId);
  };

  return (
      <div>
        <Formik
          initialValues={{
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
              if (values.caracteristics.actions.length < 1) {
                errors.caracteristics = 'Veuillez ajouter au moins une action !';
              }
              return errors;
            }}
          onSubmit={(values) => handleSubmit(values)}
        >
        {
          (props) => (
            <Form className={styles['form']}>
              <div className={styles['form_content']}>

                {
                  newPicture ?
                    <img id={styles['new-image_preview']} src={newPicture.base64} alt={newPicture.name}/>
                    : 
                    // eslint-disable-next-line
                    <img id={styles['image_preview']} src={currentMonster.picture?.base64} alt={currentMonster.picture?.name}/>
                }

                <div className={styles['newMonster_picture']}>
                  <label htmlFor="picture" className={styles['form_label']}>Image :</label>
                  <FileBase64
                    multiple={false}
                    onDone={getFile.bind(this, props)}
                  />
                </div>

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


                <div className={styles['newMonster_caracteristics']}>
                  <h4 className={styles['form_title']}>Caract??ristiques :</h4>

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

                </div>

                <div className={styles['newMonster_actions']}>
                  <h4 className={styles['form_title']}>Actions : </h4>
                  <ErrorMessage name='caracteristics' component='div' className={styles['error_message']}/>

                  <FieldArray name="caracteristics.actions">
                  {
                    ({ insert, remove, push }) => (
                      <div>
                        {props.values.caracteristics.actions?.length > 0 &&
                        props.values.caracteristics.actions?.map((action, index) => (
                          <div className={styles['action']} key={index}>
                            <span className={styles['action_title']}>Action {index+1}</span>

                            <div className={styles['form_checkbox']}>
                              <div className={styles['form_label']}>Soin :</div>
                              <label>
                                <Field type="checkbox" name={`caracteristics.actions.${index}.heal`} className={styles['form_checkbox-input']}/>
                                {
                                  props.values.caracteristics.actions[index].heal ? "oui" : "non"
                                }
                              </label>
                            </div>

                            <div className="">
                              <label htmlFor={`caracteristics.actions.${index}.damages`} className={styles['form_label']}>D??g??ts / Soins :</label>
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
                              <label htmlFor={`caracteristics.actions.${index}.frequency`} className={styles['form_label']}>Fr??quence :</label>
                              <Field
                                className={styles['form_field']}
                                name={`caracteristics.actions.${index}.frequency`}
                                type="number"
                                min={1}
                              />
                            </div>


                            <div className={styles['form_checkbox']}>
                              <div className={styles['form_label']}>Sp??ciale :</div>
                              <label>
                                <Field type="checkbox" name={`caracteristics.actions.${index}.isSpecial`} className={styles['form_checkbox-input']}/>
                                {
                                  props.values.caracteristics.actions[index].isSpecial ? "oui" : "non"
                                }
                              </label>
                            </div>

                            <div className={styles['action_button']}>
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
                id={styles['cancel_button']} 
                type='button'
                color='#ddd' 
                children='Annuler' 
                onClick={closeModal}
              />

              <Button 
                id={styles['submit_button']} 
                type="submit" 
                color='#ddd' 
                children='Valider'
              />
            </Form>
          )
        }
      </Formik>


      </div>
  );
};

EditMonster.propTypes = {
  closeModal: PropTypes.func,
  currentMonster: PropTypes.object,
  editMonster: PropTypes.func,
  context: PropTypes.string,
  placeId: PropTypes.number,
};

export default EditMonster;