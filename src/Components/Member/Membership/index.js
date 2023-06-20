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
    </div>
  );
}
export default MembershipMember;
