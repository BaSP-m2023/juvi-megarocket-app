import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import styles from 'Components/Shared/Profile/member-profile.module.css';

const Profile = ({ user, activities, onClick }) => {
  const history = useHistory();

  useEffect(() => {
    console.log();
  }, []);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileLeftContainer}>
        <div className={styles.profileInfoContainer}>
          <fieldset className={styles.profileFieldset}>
            <label>{'First Name'}</label>
            <p>{user.firstName}</p>
          </fieldset>
          <fieldset className={styles.profileFieldset}>
            <label>{'Last Name'}</label>
            <p>{user.lastName}</p>
          </fieldset>
          <fieldset className={styles.profileFieldset}>
            <label>{'Email'}</label>
            <p>{user.email}</p>
          </fieldset>
          <fieldset className={styles.profileFieldset}>
            <label>{'Phone'}</label>
            <p>{user.phone}</p>
          </fieldset>
          <fieldset className={styles.profileFieldset}>
            <label>{'DNI'}</label>
            <p>{user.dni}</p>
          </fieldset>
          <fieldset className={styles.profileFieldset}>
            <label>{'Birth Date'}</label>
            <p>{user.birthDate}</p>
          </fieldset>
          <fieldset className={styles.profileFieldset}>
            <label>{'ZIP'}</label>
            <p>{user.postalCode}</p>
          </fieldset>
          <fieldset className={styles.profileFieldset}>
            <label>{'City'}</label>
            <p>{user.city}</p>
          </fieldset>
        </div>
      </div>
      <div className={styles.profileRightContainer}>
        <div className={styles.profileImageContainer}>
          <img
            src={
              'https://static.vecteezy.com/system/resources/previews/010/383/887/original/silhouette-of-cat-on-black-darkness-background-illustration-vector.jpg'
            }
          ></img>
        </div>
        <div className={styles.profileMembershipContainer}>
          {sessionStorage.role === 'MEMBER' && (
            <fieldset>
              <label>{'Membership status'}</label>
              <p>{user.memberships}</p>
            </fieldset>
          )}
          {sessionStorage.role !== 'MEMBER' && (
            <fieldset>
              <label>{'Account status'}</label>
              <p>{sessionStorage.role}</p>
            </fieldset>
          )}
        </div>
        <div className={styles.profileActivitiesContainer}>
          <div className={styles.profileActivitiesTitle}>
            <p>{'Related activities:'}</p>
          </div>
          <div className={styles.profileActivitiesList}>
            {activities.map((actv) => (
              <div key={actv._id}>
                <p>{actv.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.profileButtonsContainer}>
        <button
          onClick={() => {
            history.push('profile/edit');
          }}
        >
          {'Edit profile'}
        </button>
        {sessionStorage.role === 'MEMBER' && <button onClick={onClick}>Manage membership</button>}
        <button onClick={onClick}>Change password</button>
      </div>
    </div>
  );
};

export default Profile;
