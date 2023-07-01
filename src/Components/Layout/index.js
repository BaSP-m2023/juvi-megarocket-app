import React from 'react';
import Navbar from 'Components/Navbar';
import Header from 'Components/Header/';
import styles from './layout.module.css';

function Layout(props) {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainContainer}>
        <Navbar routes={props.routes} />
        <div className={styles.homeContainer}>{props.children}</div>
      </div>
    </div>
  );
}

export default Layout;
