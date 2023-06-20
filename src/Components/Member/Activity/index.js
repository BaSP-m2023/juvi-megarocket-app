import styles from './activity.module.css';

function ActivityMember() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainTitle}>
        <h1>Activities</h1>
      </div>
      <div className={styles.firstCardsContainer}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <h2>CROSSFIT</h2>
          </div>
          <div className={styles.cardText}>
            <p>
              Fitness regimen that involves constantly varied functional movements performed at high
              intensity.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <h2>SPINNING</h2>
          </div>
          <div className={styles.cardText}>
            <p>
              It is a form of exercise with classes focusing on endurance, strength, intervals, high
              intensity and recovery.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <h2>FUNCTIONAL</h2>
          </div>
          <div className={styles.cardText}>
            <p>It is a type of exercise that looks like movements you make in your daily life.</p>
          </div>
        </div>
      </div>
      <div className={styles.secondCardsContainer}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <h2>BOXING</h2>
          </div>
          <div className={styles.cardText}>
            <p>
              Workout routines to build brute strength, rapid-fast reflexes, and superhuman
              endurance.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <h2>GAP</h2>
          </div>
          <div className={styles.cardText}>
            <p>Toning workout routine that exercise buttocks, abdomen and legs.</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <h2>BODYBUILDING</h2>
          </div>
          <div className={styles.cardText}>
            <p>
              It is the use of progressive resistance exercise to control and develop ones muscles
              by muscle hypertrophy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ActivityMember;
