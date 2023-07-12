import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Navbar = ({ routes }) => {
  const [navVisible, setNavVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const toggleNav = () => {
    setNavVisible(!navVisible);
    setExpanded(!expanded);
  };
  const closeNav = () => {
    setNavVisible(false);
  };

  const getNavStyle = () => {
    const routeCount = routes.length;
    if (routeCount <= 2) {
      return styles.superAdminNav;
    } else if (routeCount === 3) {
      return styles.authNav;
    } else if (routeCount === 5) {
      return styles.memberNav;
    } else if (routeCount === 6) {
      return styles.adminNav;
    }
  };

  return (
    <nav className={`${styles.navbar} ${navVisible ? styles.navShadow : ''} `}>
      <div
        className={`${styles.navContainer} ${getNavStyle()} ${
          expanded ? styles.expandedNavbar : ''
        }`}
      >
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
          className={`${styles.arrowIcon} ${expanded ? styles.arrowIconActive : ''}`}
          onClick={() => {
            toggleNav();
          }}
        />
      </div>
    </nav>
  );
};
export default Navbar;
