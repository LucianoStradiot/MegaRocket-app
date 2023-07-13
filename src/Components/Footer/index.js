import styles from './footer.module.css';

function Footer() {
  return (
    <footer className={styles.container} data-testid="container-footer">
      <div className={styles.main}>
        <img
          className={styles.logo}
          src={`${process.env.PUBLIC_URL}/assets/images/logo-footer.png`}
          alt="Mega Rocket Footer Logo"
        />
        <div className={styles.licenseContainer}>
          <ul className={styles.rutes}>
            <li>
              <a href={'https://www.facebook.com/radiumrocket'} target={'_blank'} rel="noreferrer">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/facebook.svg`}
                  alt="Facebook Logo"
                />
              </a>
            </li>
            <li>
              <a
                href={'https://www.instagram.com/radium.rocket/'}
                target={'_blank'}
                rel="noreferrer"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/instagram.svg`}
                  alt="Instagram Logo"
                />
              </a>
            </li>
            <li>
              <a href={'https://twitter.com/radiumrocket'} target={'_blank'} rel="noreferrer">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/twitter.svg`}
                  alt="Twitter Logo"
                />
              </a>
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
