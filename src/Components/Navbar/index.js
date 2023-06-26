import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function Navbar() {
  const [navVisible, setNavVisible] = useState(false);
  const [adminNavVisible, setAdminNavVisible] = useState(false);
  const [memberNavVisible, setMemberNavVisible] = useState(false);

  const toggleNav = () => {
    setNavVisible(!navVisible);
  };
  const adminNav = () => {
    setNavVisible(false);
    setAdminNavVisible(true);
    setMemberNavVisible(false);
  };
  const memberNav = () => {
    setNavVisible(false);
    setAdminNavVisible(false);
    setMemberNavVisible(true);
  };
  const closeNav = () => {
    setNavVisible(false);
    setAdminNavVisible(false);
    setMemberNavVisible(false);
  };
  return (
    <nav className={`${styles.navbar} ${navVisible ? styles.navShadow : ''}`}>
      <div className={styles.navContainer}>
        <ul
          className={`${styles.rutes} ${navVisible ? styles.showNav : styles.hideNav}`}
          data-testid="navbar"
        >
          <li>
            <Link to="/" onClick={closeNav}>
              Home
            </Link>
          </li>
          {adminNavVisible && (
            <>
              <li>
                <Link to="/admins/activities" onClick={adminNav}>
                  Activities
                </Link>
              </li>
              <li>
                <Link to="/admins/classes" onClick={adminNav}>
                  Classes
                </Link>
              </li>
              <li>
                <Link to="/admins/members" onClick={adminNav}>
                  Members
                </Link>
              </li>
              <li>
                <Link to="/admins/trainers" onClick={adminNav}>
                  Trainers
                </Link>
              </li>
              <li>
                <Link to="/admins/subscriptions" onClick={adminNav}>
                  Subscriptions
                </Link>
              </li>
            </>
          )}
          {memberNavVisible && (
            <>
              <li>
                <Link to="/members/activities" onClick={memberNav}>
                  Activities
                </Link>
              </li>
              <li>
                <Link to="/members/profile" onClick={memberNav}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/members/signUp" onClick={memberNav}>
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/members/Membership" onClick={memberNav}>
                  Membership
                </Link>
              </li>
              <li>
                <Link to="/members/schedule" onClick={memberNav}>
                  Schedule
                </Link>
              </li>
            </>
          )}
          {!adminNavVisible && !memberNavVisible && (
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
              <li>
                <Link to="/members" onClick={memberNav}>
                  Members
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
