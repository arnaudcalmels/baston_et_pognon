import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '../Button';

import PropTypes from 'prop-types';

import styles from './login.module.css';

const Login = ({ closeModal, loginSubmit }) => {
  const handleSubmit = (values) => {
    loginSubmit(JSON.stringify(values, null, 2));
    closeModal();
  };
  return (
    <>
      <Formik
        initialValues={{
        username: '',
        password: '',
        }}
        validate={values => {
          const errors = {};
          if (!values.username) {
            errors.username = 'Veuillez remplir ce champ !';
          } 
          if(!values.password) {
            errors.password = 'Veuillez remplir ce champ !';
          } 
          return errors;
        }}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form className={styles['form']}>
          <label htmlFor="username" className={styles['form_label']}>Adresse mail :</label>
          <Field 
            className={styles['form_field']}
            id="username" 
            name="username" 
            type="email" 
            placeholder="Veuillez saisir une adresse mail" 
          />
          <ErrorMessage name='username' component='div' className={styles['error_message']}/>

          <label htmlFor="password" className={styles['form_label']}>Mot de passe :</label>
          <Field 
            className={styles['form_field']}
            id="password" 
            name="password" 
            type="password"
            placeholder="Veuillez saisir un mot de passe" 
          />
          <ErrorMessage name='password' component='div' className={styles['error_message']}/>

          <Button id={styles['submit_button']} type="submit" color='#eee' children='Se connecter'/>

        </Form>
      </Formik>
      <Button id={styles['close_button']} color='#eee' children='Annuler' onClick={closeModal}/>
    </>

  );
};

Login.propTypes = {
  closeModal: PropTypes.func,
  loginSubmit: PropTypes.func,
};

export default Login;
