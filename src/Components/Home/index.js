import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './home.module.css';
import Button from 'Components/Shared/Button';
function Home() {
  return (
    <section className={styles.container}>
      <h2>Home</h2>
      <Link to="/memberUser">
        <Button text="Member" type="add" />
      </Link>
    </section>
  );
}

export default Home;
