import Navbar from 'Components/Navbar';
import Header from 'Components/Header/';
import styles from './layout.module.css';

function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainContainer}>
        <Navbar />
        <div className={styles.homeContainer}></div>
      </div>
    </div>
  );
}

export default Layout;
