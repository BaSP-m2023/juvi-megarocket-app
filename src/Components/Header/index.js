import styles from './header.module.css';
import Logout from 'Components/Signs/Logout';

function Header() {
  const token = sessionStorage.getItem('token');

  return (
    <header>
      <div className={styles.container} data-testid="header-testid">
        <div className={styles.brand}>Radium Rocket</div>
        <div className={styles.socialMedia}>
          <div className={styles.mediaIcon}>
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
          <div className={styles.btnHeader}>{token ? <Logout /> : null}</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
