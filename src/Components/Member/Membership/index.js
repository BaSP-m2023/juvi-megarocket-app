import styles from './membership.module.css';

function MembershipMember() {
  return (
    <div className={styles.containerMembership}>
      <div className={styles.containerTitle}>
        <h2>MEMBERSHIPS</h2>
        <p className={styles.paragraphMember}>
          These are all the available memberships. If you want to try a different one, please get in
          touch with your branch manager.
        </p>
      </div>
      <div className={styles.containerInfo}>
        <div className={styles.onlyClasses}>
          <h4>ONLY CLASSES</h4>
          <h3>$2500</h3>
          <ul className={styles.ulMemberOnlyClasses}>
            <li>Free access to the classes with previous registration.</li>
            <li>Grid display.</li>
          </ul>
        </div>
        <div className={styles.classic}>
          <h4>CLASSIC</h4>
          <h3>$4000</h3>
          <ul className={styles.ulMemberClassic}>
            <li>Free access to the weight room.</li>
            <li>Personalized follow-up by a trainer.</li>
            <li>Visualization of the grid.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default MembershipMember;
