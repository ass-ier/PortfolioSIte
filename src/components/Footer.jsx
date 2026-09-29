import Arrow from './Arrow';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>Assier Anteneh <span>&copy; {new Date().getFullYear()}</span></p>
        <p className={styles.location}>Addis Ababa, Ethiopia</p>
        <a href="#hero">Back to top <Arrow /></a>
      </div>
    </footer>
  );
}
