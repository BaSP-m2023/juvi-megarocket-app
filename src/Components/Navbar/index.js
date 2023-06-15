import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function Navbar() {
  const [navVisible, setNavVisible] = useState(false);

  const toggleNav = () => {
    setNavVisible(!navVisible);
  };
  const closeNav = () => {
    setNavVisible(false);
  };
  return (
    <nav className={`${styles.navbar} ${navVisible ? styles.navShadow : ''}`}>
      <div className={styles.navContainer}>
        <ul className={`${styles.rutes} ${navVisible ? styles.showNav : styles.hideNav}`}>
          <li>
            <Link to="/" onClick={closeNav}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/activities" onClick={closeNav}>
              Activities
            </Link>
          </li>
          <li>
            <Link to="/admins" onClick={closeNav}>
              Admins
            </Link>
          </li>
          <li>
            <Link to="/classes" onClick={closeNav}>
              Classes
            </Link>
          </li>
          <li>
            <Link to="/members" onClick={closeNav}>
              Members
            </Link>
          </li>
          <li>
            <Link to="/subscriptions" onClick={closeNav}>
              Subscriptions
            </Link>
          </li>
          <li>
            <Link to="/super-admins" onClick={closeNav}>
              SuperAdmins
            </Link>
          </li>
          <li>
            <Link to="/trainers" onClick={closeNav}>
              Trainers
            </Link>
          </li>
        </ul>
        <FontAwesomeIcon
          icon={faArrowRight}
          className={`${styles.showNav} ${styles.arrowIcon} ${
            navVisible ? styles.arrowIconActive : ''
          }`}
          onClick={toggleNav}
        />
      </div>
    </nav>
  );
}

export default Navbar;
