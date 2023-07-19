import Aside from 'Components/Shared/Aside';
import styles from './contact.module.css';
import { FiHome, FiPhone, FiMail } from 'react-icons/fi';

const Contact = () => {
  return (
    <>
      <Aside page={'home'} />
      <div className={styles.container}>
        <div className={styles.background}>
          <div className={styles.data}>
            <iframe
              className={styles.map}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3348.2400667324805!2d-60.64872447752379!3d-32.94467067843069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab3e17e4ca69%3A0xa84adff3b9c3dc80!2sC%C3%B3rdoba%201764%2C%20S2000AXB%20Rosario%2C%20Santa%20Fe!5e0!3m2!1ses-419!2sar!4v1689598511138!5m2!1ses-419!2sar"
              allowfullscreen=""
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className={styles.containerInfo}>
              <h2 className={styles.title}>Contact</h2>
              <div className={styles.info}>
                <p>
                  <a href="https://goo.gl/maps/uHURr4ps6nTQCgeEA" target="_blank" rel="noreferrer">
                    <FiHome className={styles.icon} /> Cordoba 1764, Rosario
                  </a>
                </p>
                <p>
                  <a href="tel:+03411234567">
                    <FiPhone className={styles.icon} /> (0341)1234567
                  </a>
                </p>
                <p>
                  <a href="mailto:MegaRocket@gmail.com?Subject=please%20i%20want%20more%20info">
                    <FiMail className={styles.icon} /> MegaRocket@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Contact;
