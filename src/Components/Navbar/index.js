import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function Navbar() {
  const [navVisible, setNavVisible] = useState(false);
  const [adminNavVisible, setAdminNavVisible] = useState(false);

  const toggleNav = () => {
    setNavVisible(!navVisible);
  };
  const adminNav = () => {
    setNavVisible(!navVisible);
    setAdminNavVisible(true);
  };
  const closeNav = () => {
    setNavVisible(false);
    setAdminNavVisible(false);
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
          {adminNavVisible && (
            <>
              <li>
                <Link to="admins/activities" onClick={closeNav}>
                  Activities
                </Link>
              </li>
              <li>
                <Link to="admins/classes" onClick={closeNav}>
                  Classes
                </Link>
              </li>
              <li>
                <Link to="admins/members" onClick={closeNav}>
                  Members
                </Link>
              </li>
              <li>
                <Link to="admins/trainers" onClick={closeNav}>
                  Trainers
                </Link>
              </li>
              <li>
                <Link to="/subscriptions" onClick={closeNav}>
                  Subscriptions
                </Link>
              </li>
            </>
          )}
          {!adminNavVisible && (
            <>
              <li>
                <Link to="/admins" onClick={adminNav}>
                  Admins
                </Link>
              </li>
              <li>
                <Link to="/super-admins" onClick={closeNav}>
                  SuperAdmins
                </Link>
              </li>
            </>
          )}
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
