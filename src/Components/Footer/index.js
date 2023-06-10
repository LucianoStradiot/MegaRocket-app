import styles from './footer.module.css';

function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.main}>
        <img src={`${process.env.PUBLIC_URL}/assets/images/logo-footer.png`} />
        <div className={styles.licenseContainer}>
          <ul className={styles.rutes}>
            <li>
              <img src={`${process.env.PUBLIC_URL}/assets/images/facebook.svg`} />
            </li>
            <li>
              <img src={`${process.env.PUBLIC_URL}/assets/images/instagram.svg`} />
            </li>
            <li>
              <img src={`${process.env.PUBLIC_URL}/assets/images/twitter.svg`} />
            </li>
          </ul>
          <div className={styles.license}>
            <p>Copyright &copy; 2023 MegaRocket SA. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
