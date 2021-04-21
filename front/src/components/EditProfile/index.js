import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import Button from '../Button';

import PropTypes from 'prop-types';

import styles from './editProfile.module.css';

const EditProfile = ({ pseudo, email, id, avatar, cancelAction, editProfile }) => {

  const handleSubmit = (values) => {
    console.log(JSON.stringify(values, null, 2));
    editProfile(id, JSON.stringify(values, null, 2));
    cancelAction();
  };

  return (
    <>
      <Formik
        initialValues={{
          pseudo,
          avatar,
          email,
        }}
        validate={values => {
          const errors = {};
          if (values.mail && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Adresse mail invalide';
          }

          return errors;
        }}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form className={styles['form']}>
          <label htmlFor="pseudo" className={styles['form_label']}>Pseudo :</label>
          <Field 
            className={styles['form_field']}
            id="pseudo" 
            name="pseudo" 
            type="text" 
          />
          <ErrorMessage name='pseudo' component='div' className={styles['error_message']}/>

          <label htmlFor="avatar" className={styles['form_label']}>Avatar :</label>
          <Field 
            className={styles['form_field']}
            id="avatar" 
            name="avatar" 
            type="text" 

          />
          <ErrorMessage name='avatar' component='div' className={styles['error_message']}/>

          <label htmlFor="email" className={styles['form_label']}>Adresse mail :</label>
          <Field 
            className={styles['form_field']}
            id="email" 
            name="email" 
            type="email" 
          />
          <ErrorMessage name='email' component='div' className={styles['error_message']}/>

          <Button id={styles['submit_button']} type="submit" color='#eee' children='Valider'/>
        </Form>
      </Formik>
      <Button id={styles['close_button']} color='#eee' children='Annuler' onClick={cancelAction}/>
    </>
  );
};

EditProfile.propTypes = {
  pseudo: PropTypes.string,
  email: PropTypes.string,
  id: PropTypes.number,
  avatar: PropTypes.string,
  cancelAction: PropTypes.func,
  editProfile: PropTypes.func,
};

export default EditProfile;