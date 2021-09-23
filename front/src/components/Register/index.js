import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '../Button';

import PropTypes from 'prop-types';

import styles from './register.module.scss';

const Register = ({ closeModal, registerSubmit }) => {
  const handleSubmit = (values) => {
    registerSubmit(JSON.stringify(values, null, 2));
    closeModal();
  };
  return (
    <>
      <Formik
        initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
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
          if(!values.confirmPassword) {
            errors.confirmPassword = 'Veuillez remplir ce champ !';
          } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(values.confirmPassword)) {
            errors.confirmPassword = 'Ce champ doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial';
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


          <label htmlFor="confirmPassword" className={styles['form_label']}>Confirmation mot de passe :</label>
          <Field
            className={styles['form_field']}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Veuillez confirmer le mot de passe"
          />
          <ErrorMessage name='confirmPassword' component='div' className={styles['error_message']}/>

          <div className={styles['buttons']}>
            <Button id={styles['close_button']} type='button' color='#eee' children='Annuler' onClick={closeModal}/>
            <Button id={styles['submit_button']} type="submit" color='#eee' children='Valider'/>
          </div>
          
        </Form>
      </Formik>
    </>
  );
};

Register.propTypes = {
  closeModal: PropTypes.func,
  registerSubmit: PropTypes.func,
};

export default Register;
