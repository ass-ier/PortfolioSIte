import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.copy}>
          Designed &amp; built by{' '}
          <span className={styles.name}>Assier Anteneh</span> · 2026
        </p>
        <p className={styles.sub}>Addis Ababa, Ethiopia</p>
      </div>
    </footer>
  );
}
