import { useState } from 'react';
import { motion as Motion, useScroll } from 'framer-motion';
import Arrow from './Arrow';
import Dialog from './Dialog';
import useMediaQuery from '../hooks/useMediaQuery';
import styles from './Navbar.module.css';

const links = [
  { label: 'Work', id: 'projects' },
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Expertise', id: 'skills' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  function followLink(event) {
    const hash = event.currentTarget.hash;
    setMenuOpen(false);
    requestAnimationFrame(() => document.querySelector(hash)?.focus({ preventScroll: true }));
  }

  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.inner}`}>
          <a className={styles.wordmark} href="#hero" aria-label="Assier Anteneh Alemu (Triple A), back to top">
            <img className={styles.monogram} src="/logo.svg" width="172" height="80" alt="" />
          </a>
          <nav className={styles.desktopNav} aria-label="Primary navigation">
            {links.map((link) => <a key={link.id} href={`#${link.id}`}>{link.label}</a>)}
          </nav>
          <button className={styles.menuButton} aria-expanded={menuOpen} aria-controls="navigation-menu" onClick={() => setMenuOpen(true)}>
            Menu <span className={styles.menuMark} aria-hidden="true"><span /><span /></span>
          </button>
        </div>
        {!reducedMotion && <Motion.div className={styles.progress} style={{ scaleX: scrollYProgress }} aria-hidden="true" />}
      </header>
      {menuOpen && (
        <Dialog id="navigation-menu" labelledBy="menu-heading" className={styles.menuDialog} onDismiss={() => setMenuOpen(false)}>
          <div className={styles.menuContent}>
            <div className={styles.menuTop}>
              <p id="menu-heading">Find your way.</p>
              <button className="icon-button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" stroke="currentColor" strokeWidth="1.5" /></svg>
              </button>
            </div>
            <nav className={styles.mobileNav} aria-label="Mobile navigation">
              {links.map((link) => <a key={link.id} href={`#${link.id}`} onClick={followLink}>{link.label}<Arrow /></a>)}
            </nav>
            <p className={styles.menuNote}>IT infrastructure.<br />Cybersecurity. A human perspective.</p>
            <a className="text-link" href="mailto:assieranteneh0306@gmail.com">Email Assier <Arrow /></a>
          </div>
        </Dialog>
      )}
    </>
  );
}
