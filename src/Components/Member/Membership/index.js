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
      </div>
    </div>
  );
}
export default MembershipMember;
