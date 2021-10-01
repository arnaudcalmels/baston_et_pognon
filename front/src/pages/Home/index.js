import React from 'react';

import Title from '../../components/Title';
import Button from '../../components/Button';

import PropTypes from 'prop-types';

import styles from './home.module.scss';

const Home = ({ isRegisterModalOpen, isLoginModalOpen }) => {
  return (
    <div className={styles['main']}>
      <Title title="Bienvenue sur le site Baston & Pognon !" className={styles['title']}/>
      <div className={styles['paragraph']}>
        <p>Sur le thème du jeu de rôle, Baston & Pognon vous propose de créer un personnage parmi les quelques classes proposées et / ou de créer un scénario de jeu de rôle. </p>
        <p>A terme, ce site offrira la possibilité à un joueur de créer une partie en ligne à partir d’un scénario qu’il aura lui-même créé. Ce joueur deviendra alors un maître de jeu et pourra inviter des personnes à créer des personnages afin de se joindre à lui.</p>
        <p>Grâce aux illustrations et informations renseignées durant la création du scénario, le maître de jeu (comme pour un jeu de rôle papier) pourra alors raconter l’histoire et décrire les lieux visités par les personnages dans lesquels ils pourront être amenés à affronter d’effroyables monstres !</p>
        <p>Comme pour les jeux de rôles papier, les combats seront gérés au tour par tour.</p>
      </div>

      <div className={styles['paragraph']}>
        <p>Ce site est uniquement destiné à servir de démonstration.</p>
        <p>Un compte de démonstration est disponible pour les visiteurs. Les fonctionnalités de création, modification et suppression sont désactivées pour ce compte.</p>
        <p>identifiant : <em>visiteur@test.io</em> / mot de passe : <em>visiteur1*</em></p>
        <Button 
          color='#eee' 
          children='Se connecter' 
          onClick={() => {
            isLoginModalOpen(); 
          }} 
          shadow='#333 2px 2px 6px'
        />
      </div>

      <div className={styles['paragraph']}>
        <p>Vous pouvez si vous le souhaiter tester les fonctionnalités en créant un compte.</p>
        <p>Etant donné la nature démonstrative du site, la fonctionnalité de création de compte a été simplifiée.</p>
        <p>La fonctionnalité de validation de l’adresse email est désactivée, une adresse email fictive peut donc être utilisée tant que le format de celle-ci est correct.</p>
        <p>Les comptes créés par les utilisateurs sont régulièrement effacés, aucune donnée s’y rattachant n’est conservée.</p>
        <Button 
          color='#eee' 
          children='Créer un compte' 
          onClick={() => {
            isRegisterModalOpen(); 
          }} 
          shadow='#333 2px 2px 6px'
        />
      </div>
      <div className={styles['paragraph']}>
        <p><em>En version mobile, seule la consultation est possible. Les fonctionnalités de création, modification et suppression sont désactivées.</em></p>
      </div>

    </div>
  );
};

Home.propTypes = {
  isRegisterModalOpen: PropTypes.func, 
  isLoginModalOpen: PropTypes.func,
}

export default Home;
