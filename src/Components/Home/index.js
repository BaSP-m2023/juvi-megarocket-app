import styles from './home.module.css';

function Home() {
  return (
    <>
      <section className={styles.container}>
        <div className={styles.mainTitle}>
          <h1>
            <spam>MEGAROCKET</spam> by RadiumRocket
          </h1>
          <h2>AN EASY SYSTEM TO TRACK YOUR TEAM´S TIMES AND PROJECTS</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industrys standard dummy text ever since the 1500s, when
          </p>
          <div className={styles.learnMore}>
            <a href="https://www.facebook.com/radiumrocket">
              <button className={styles.mainBtn}>Learn More</button>
            </a>
          </div>
        </div>
        <div className={styles.mainImg}>
          <img src={`${process.env.PUBLIC_URL}/assets/images/randomLogo.png`}></img>
        </div>
      </section>
      <section className={styles.sectionServices}>
        <h3>SERVICES</h3>
        <div className={styles.containerServices}>
          <article className={styles.services}>
            <div className={styles.servicesMedia}>
              <img src={`${process.env.PUBLIC_URL}/assets/images/time.png`}></img>
            </div>
            <div className={styles.servicesText}>
              <h4>Hour Registry</h4>
              <p>
                Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam
                facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.
              </p>
            </div>
          </article>
          <article className={styles.services}>
            <div className={styles.servicesMedia}>
              <img src={`${process.env.PUBLIC_URL}/assets/images/archive.png`}></img>
            </div>
            <div className={styles.servicesText}>
              <h4>Reports</h4>
              <p>
                Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam
                facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.
              </p>
            </div>
          </article>
          <article className={styles.services}>
            <div className={styles.servicesMedia}>
              <img src={`${process.env.PUBLIC_URL}/assets/images/folders.png`}></img>
            </div>
            <div className={styles.servicesText}>
              <h4>Resource Managments</h4>
              <p>
                Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam
                facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.
              </p>
            </div>
          </article>
          <article className={styles.services}>
            <div className={styles.servicesMedia}>
              <img src={`${process.env.PUBLIC_URL}/assets/images/dashboard.png`}></img>
            </div>
            <div className={styles.servicesText}>
              <h4>Multiple Roles</h4>
              <p>
                Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam
                facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

export default Home;
