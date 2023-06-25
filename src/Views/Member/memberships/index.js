import Aside from 'Components/Shared/Aside';
import styles from './memberships.module.css';
import { Link } from 'react-router-dom';

const MembershipMember = () => {
  return (
    <>
      <Aside page={'home'} />
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.h1}>Memberships</h1>
            <div className={styles.line}></div>
            <p className={styles.section}>
              These are all the available memberships. If you want to try a different one please get
              in touch with your branch manager.
            </p>
          </div>
          <section className={styles.cardsCont}>
            <Link
              className={`${styles.cardContainer} ${styles.only}`}
              to="/member/signUp?membership=Only Classes Membership"
            >
              <div>
                <h3>ONLY CLASSES</h3>
                <p>$2500</p>
                <hr></hr>
                <p>Subscribe to classes.</p>
                <p>Access to the grid class.</p>
              </div>
            </Link>
            <Link
              to="/member/signUp?membership=Classic Membership"
              className={`${styles.cardContainer} ${styles.classic}`}
            >
              <div>
                <h3>CLASSIC</h3>
                <p>$4000</p>
                <hr></hr>
                <p>Free access to the weight room.</p>
                <p>Personalized follow-up by a trainer.</p>
                <p>Grid visualization.</p>
              </div>
            </Link>
            <Link
              to="/member/signUp?membership=Black Membership"
              className={`${styles.cardContainer} ${styles.black}`}
            >
              <div>
                <h3>BLACK</h3>
                <p>$6000</p>
                <hr></hr>
                <p>Free access to the weight room.</p>
                <p>Free access to classes with prior registration.</p>
                <p>Personalized follow-up by a trainer.</p>
                <p>Visualization of the grid.</p>
              </div>
            </Link>
          </section>
        </div>
      </div>
    </>
  );
};
export default MembershipMember;
