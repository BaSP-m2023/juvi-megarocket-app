import React from 'react';
import Navbar from 'Components/Navbar';
import Header from 'Components/Header/';
import styles from './layout.module.css';

function Layout({ routes, children }) {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainContainer}>
        <Navbar routes={routes} />
        <div className={styles.homeContainer}>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
