import styles from './header.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Header() {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.brand}>Radium Rocket</div>
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
      <nav className={styles.navbar}>
        <h1 className={styles.appName}>MegaRocket</h1>
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
      </nav>
    </header>
  );
}

export default Header;
