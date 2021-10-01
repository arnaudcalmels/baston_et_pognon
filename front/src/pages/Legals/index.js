import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import styles from './legals.module.scss';

const Legals = () => {
  return (
    <div className={styles['main']}>
      <div className={styles['infos']}>
        <h4 className={styles['title']}>Technologies utilisées pour développer ce site</h4>
        <h5>Front : </h5>
        <ul>
          <li>React</li>
          <li>Redux</li>
          <li>React-router</li>
          <li>Axios</li>
          <li>Formik</li>
          <li>Sass</li>
        </ul>
        <h5>Back : </h5>
        <ul>
          <li>Symfony</li>
          <li>Nelmio Cors</li>
          <li>Lexik JWT</li>
        </ul>
      </div>
      
      <div className={styles['legals']}>
        <h4 className={styles['title']}>Propriétaires et hébergeurs du site</h4>
        <div className={styles['mail']}>
          <FontAwesomeIcon
            className={styles['icon']}
            icon={faEnvelope}
            size="1x"
          />
          <span>Arnaud et Stéphanie CALMELS <br/>
          1 bis route de Nemours <br/>
          77890 BEAUMONT DU GATINAIS <br/>
          </span>
        </div>

        <div className={styles['phone']}>
          <FontAwesomeIcon
            className={styles['icon']}
            icon={faPhone}
            size="1x"
          />
          <span>01 64 29 42 68</span>
        </div>

        <h4 className={styles['title']}>Utilisation des données personnelles</h4>
        <p>Ce site est uniquement destiné à la démonstration. La fonctionnalité de validation de l’adresse email étant désactivée, une adresse email fictive peut donc être utilisée. <br/> 
        Les comptes créés par les utilisateurs sont régulièrement effacés, aucune donnée s’y rattachant n’est conservée. </p>
        <p>Pour tout renseignement, merci de nous contacter aux coordonnées ci-dessous.</p>
      </div>

      <div className={styles['contact']}>
        <h5 className={styles['title']}>Contacter Arnaud</h5>
        <div className={styles['details']}>
          <div className={styles['mail']}>
            <FontAwesomeIcon
              className={styles['icon']}
              icon={faEnvelope}
              size="1x"
            />
            <a href="mailto:calmelsarnaud@gmail.com">calmelsarnaud@gmail.com</a>
          </div>
          <div className={styles['phone']}>
            <FontAwesomeIcon
              className={styles['icon']}
              icon={faPhone}
              size="1x"
            />
            <span>06 88 01 10 60</span>
          </div>
        </div>
        
        <h5 className={styles['title']}>Contacter Stéphanie</h5>
        <div className={styles['details']}>
          <div className={styles['mail']}>
            <FontAwesomeIcon
              className={styles['icon']}
              icon={faEnvelope}
              size="1x"
            />
            <a href="mailto:stephcalmels82@gmail.com">stephcalmels82@gmail.com</a>
          </div>
          <div className={styles['phone']}>
            <FontAwesomeIcon
              className={styles['icon']}
              icon={faPhone}
              size="1x"
            />
            <span>06 60 90 04 82</span>
          </div>
        </div>

      </div>

    </div>
  )
};

export default Legals;
