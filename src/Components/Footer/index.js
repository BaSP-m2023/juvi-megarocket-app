import styles from './footer.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';

function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.main}>
        <p className={styles.appName}>MegaRocket</p>
        <ul className={styles.rutes}>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/activities">
            <li>Activities</li>
          </Link>
          <Link to="/admins">
            <li>Admins</li>
          </Link>
          <Link to="/classes">
            <li>Classes</li>
          </Link>
          <Link to="/members">
            <li>Members</li>
          </Link>
          <Link to="/subscriptions">
            <li>Subscriptions</li>
          </Link>
          <Link to="/super-admins">
            <li>SuperAdmins</li>
          </Link>
          <Link to="/trainers">
            <li>Trainers</li>
          </Link>
        </ul>
      </div>
      <div className={styles.license}>
        <div className={styles.copyright}>Copyright © {new Date().getFullYear()} Radium Rocket</div>
        <div>
          <a href={'https://www.facebook.com/radiumrocket'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/facebook.svg`}
            />
          </a>
          <a href={'https://twitter.com/radiumrocket'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/twitter.svg`}
            />
          </a>
          <a href={'https://www.instagram.com/radium.rocket/'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/instagram.svg`}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
