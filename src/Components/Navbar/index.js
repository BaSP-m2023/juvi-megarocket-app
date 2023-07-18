import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

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
  useEffect(() => {
    let resizeTimeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const windowWidth = window.innerWidth;
        const isDesktop = windowWidth >= 1024;

        if (!navVisible && isDesktop) {
          setNavVisible(true);
        } else if (navVisible && !isDesktop) {
          setTimeout(() => {
            setNavVisible(false);
          }, 200000000);
        }
      }, 100);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [navVisible]);

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
    } else if (routeCount === 4) {
      return styles.authNavBar;
    }
  };

  return (
    <nav
      className={`${styles.navbar} ${
        navVisible ? `${styles.navShadow} ${styles.expandedNavbar}` : styles.navHidden
      }  `}
    >
      <div
        className={`${styles.navContainer} ${getNavStyle()} : ${
          expanded ? styles.expandedNavbar : ''
        }`}
      >
        {navVisible && (
          <>
            <ul
              className={`${styles.routes} ${navVisible ? styles.showNav : styles.hideNav}`}
              data-testid="navbar"
            >
              {routes.map((route) => {
                return (
                  <li key={route.path}>
                    <Link to={route.path} onClick={closeNav}>
                      {route.name}
                    </Link>
                  </li>
                );
              })}
            </ul>{' '}
          </>
        )}
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
