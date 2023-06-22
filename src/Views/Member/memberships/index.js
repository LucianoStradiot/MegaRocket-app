import Aside from 'Components/Shared/Aside';
import styles from './memberships.module.css';

const membershipMember = () => {
  return (
    <>
      <Aside page={'member'} />
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.h1}>MEMBERSHIPS</h1>
            <div className={styles.line}></div>
            <p className={styles.section}>
              These are all the available memberships. If you want to try a different one please get
              in touch with your branch manager.
            </p>
          </div>
        </div>
        <div className={styles.listContainer}>
          <div className={`${styles.squareClasses} ${styles.square}`}>
            <h3>ONLY CLASSES</h3>
            <h2>$2500</h2>
            <hr />
            <div className={styles.squareContainer}>
              <ul>
                <li>Free access to classes with prior registration.</li>
                <li>View grid is allowed.</li>
              </ul>
            </div>
          </div>
          <div className={`${styles.squareClasic} ${styles.square}`}>
            <h3>CLASSIC</h3>
            <h2>$4000</h2>
            <hr />
            <div className={styles.squareContainer}>
              <ul>
                <li>View grid is allowed.</li>
                <li>Free access to the weight room.</li>
                <li>Personalized monitoring by a coach.</li>
              </ul>
            </div>
          </div>
          <div className={`${styles.squareBlack} ${styles.square}`}>
            <h3>BLACK</h3>
            <h2>$6000</h2>
            <hr />
            <div className={styles.squareContainer}>
              <ul>
                <li>Free access to classes with prior registration.</li>
                <li>View grid is allowed.</li>
                <li>Free access to the weight room.</li>
                <li>Personalized monitoring by a coach.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default membershipMember;
