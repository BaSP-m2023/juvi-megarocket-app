import { useEffect, useState } from 'react';
import styles from './activity.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities } from 'redux/activities/thunks';

function ActivityMember() {
  const data = useSelector((state) => state.activities);
  const dispatch = useDispatch();
  const [activitesVisible, setActivitiesVisible] = useState(false);
  useEffect(() => {
    dispatch(getActivities());
  }, []);

  useEffect(() => {
    if (data.list.length > 5) {
      setActivitiesVisible(true);
    }
  }, [data.list]);

  return (
    <>
      {data.isLoading ? (
        <div>is Loading</div>
      ) : (
        <div className={styles.mainContainer} data-testid="main-cards-container">
          <div className={styles.mainTitle}>
            <h1>Activities</h1>
          </div>
          <div className={styles.firstCardsContainer}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>
                <h2>{data.list[0]?.name ?? 'No activity available'}</h2>
              </div>
              <div className={styles.cardText}>
                <p>{data.list[0]?.description} </p>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardTitle}>
                <h2>{data.list[1]?.name ?? 'No activity available'}</h2>
              </div>
              <div className={styles.cardText}>
                <p>{data.list[1]?.description}</p>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardTitle}>
                <h2>{data.list[2]?.name ?? 'No activity available'}</h2>
              </div>
              <div className={styles.cardText}>
                <p>{data.list[2]?.description}</p>
              </div>
            </div>
          </div>
          <div className={styles.secondCardsContainer}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>
                <h2>{data.list[3]?.name ?? 'No activity available'}</h2>
              </div>
              <div className={styles.cardText}>
                <p>{data.list[3]?.description}</p>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardTitle}>
                <h2>{data.list[4]?.name ?? 'No activity available'}</h2>
              </div>
              <div className={styles.cardText}>
                <p>{data.list[4]?.description}</p>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardTitle}>
                <h2>{data.list[5]?.name ?? 'No activity available'}</h2>
              </div>
              <div className={styles.cardText}>
                <p>{data.list[5]?.description}</p>
              </div>
            </div>
          </div>
          {activitesVisible && data.list.length > 6 && (
            <div className={styles.firstCardsContainer}>
              <div className={styles.card}>
                <div className={styles.cardTitle}>
                  <h2>{data.list[6]?.name ?? 'No activity available'}</h2>
                </div>
                <div className={styles.cardText}>
                  <p>{data.list[6]?.description} </p>
                </div>
              </div>
              {data.list.length > 7 && (
                <div className={styles.card}>
                  <div className={styles.cardTitle}>
                    <h2>{data.list[7]?.name ?? 'No activity available'}</h2>
                  </div>
                  <div className={styles.cardText}>
                    <p>{data.list[7]?.description}</p>
                  </div>
                </div>
              )}
              {data.list.length > 8 && (
                <div className={styles.card}>
                  <div className={styles.cardTitle}>
                    <h2>{data.list[8]?.name ?? 'No activity available'}</h2>
                  </div>
                  <div className={styles.cardText}>
                    <p>{data.list[8]?.description}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ActivityMember;
