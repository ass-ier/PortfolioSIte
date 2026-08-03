import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';

const links = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.toLowerCase()));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <motion.header
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className={`container ${styles.inner}`}>
        <a href="#hero" className={styles.logo} aria-label="Home">
          <img src="/android-chrome-192x192.png" alt="Assier Anteneh logo" className={styles.logoImg} />
        </a>

        {/* Desktop links */}
        <nav aria-label="Primary" className={styles.desktopLinks}>
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className={`${styles.link} ${active === l.toLowerCase() ? styles.linkActive : ''}`}
            >
              {l}
              {active === l.toLowerCase() && (
                <motion.span className={styles.linkUnderline} layoutId="nav-underline" />
              )}
            </a>
          ))}
        </nav>

        <a href="mailto:assieranteneh0306@gmail.com" className={styles.cta} target="_blank" rel="noopener noreferrer">
          Hire me
        </a>

        {/* Burger */}
        <button
          className={styles.burger}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className={menuOpen ? styles.burgerOpen : ''} />
          <span className={menuOpen ? styles.burgerOpen : ''} />
          <span className={menuOpen ? styles.burgerOpen : ''} />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.drawer}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l}
                href={`#${l.toLowerCase()}`}
                className={styles.drawerLink}
                onClick={close}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {l}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
