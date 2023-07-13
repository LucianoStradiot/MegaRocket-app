import Aside from 'Components/Shared/Aside';
import styles from './indexMember.module.css';
const MemberUser = () => {
  return (
    <div className={styles.supremeContainer}>
      <Aside page={'home'} />
      <div className={styles.mainContainer}>
        <main data-testid="home-page">
          <section className={styles.home}>
            <article>
              <h1>MEGA ROCKET WEB</h1>
              <p className={styles.welcome}>welcome</p>
              <p>
                Mega Rocket web is a monthly management system for members and trainers so that they
                can dynamically sign up for their activities in the gym.
              </p>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
};
export default MemberUser;
