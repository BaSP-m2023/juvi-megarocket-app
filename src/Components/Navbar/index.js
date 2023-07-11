import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Navbar = ({ routes }) => {
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
        <ul
          className={`${styles.routes} ${navVisible ? styles.showNav : styles.hideNav}`}
          data-testid="navbar"
        >
          {routes.map((route) => (
            <li key={route.path}>
              <Link to={route.path} onClick={closeNav}>
                {route.name}
              </Link>
            </li>
          ))}
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
};
export default Navbar;
