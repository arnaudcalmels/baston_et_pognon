import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '../Button';

import PropTypes from 'prop-types';

import styles from './login.module.css';

const Login = ({ closeModal, loginSubmit }) => {
  const handleSubmit = (values) => {
    console.log(JSON.stringify(values, null, 2));
    loginSubmit(JSON.stringify(values, null, 2));
    closeModal();
  };
  return (
    <Formik
      initialValues={{
      email: '',
      password: '',
      }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Veuillez remplir ce champ !';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Adresse mail invalide';
        }
        if(!values.password) {
          errors.password = 'Veuillez remplir ce champ !';
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(values.password)) {
          errors.password = 'Ce champ doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial';
        }
        return errors;
      }}
      onSubmit={(values) => handleSubmit(values)}
    >
      <Form className={styles['form']}>
        <label htmlFor="email" className={styles['form_label']}>Adresse mail :</label>
        <Field 
          className={styles['form_field']}
          id="email" 
          name="email" 
          type="email" 
          placeholder="Veuillez saisir une adresse mail" 
        />
        <ErrorMessage name='email' component='div' className={styles['error_message']}/>

        <label htmlFor="password" className={styles['form_label']}>Mot de passe :</label>
        <Field 
          className={styles['form_field']}
          id="password" 
          name="password" 
          type="password"
          placeholder="Veuillez saisir un mot de passe" 
        />
        <ErrorMessage name='password' component='div' className={styles['error_message']}/>

        <Button color='#eee' children='Annuler' onClick={closeModal}/>
        <Button type="submit" color='#eee' children='Se connecter'/>
      </Form>
    </Formik>
  );
};

Login.propTypes = {
  closeModal: PropTypes.func,
  loginSubmit: PropTypes.func,
};

export default Login;
