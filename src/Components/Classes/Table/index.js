import React from 'react';
import styles from './table.module.css';

const Table = ({ data }) => {
  console.log(data);
  return (
    <section className={styles.classContainer}>
      <div className={styles.classes}>
        <h4>Activity</h4>
        <h4>Trainer</h4>
        <h4>Description</h4>
        <h4>Day</h4>
        <h4>Hour</h4>
        <h4>Slots</h4>
      </div>
      <div className={styles.classesInfo}>
        {data.map((item) => {
          return (
            <div className={styles.activities} key={`${item._id}-${item.day}`}>
              <div className={styles.activityInfo}>
                <p>{item.activity.name}</p>
              </div>
              <div className={styles.activityInfo}>
                <p>{item.trainer.firstName}</p>
              </div>
              <div className={styles.activityInfo}>
                <p>{item.activity.description}</p>
              </div>
              <div className={styles.activityInfo}>
                <p>{item.day}</p>
              </div>
              <div className={styles.activityInfo}>
                <p>{item.hour}</p>
              </div>
              <div className={styles.activityInfo}>
                <p>{item.slots}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Table;
