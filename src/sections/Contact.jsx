import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import styles from './Contact.module.css';

const CONTACTS = [
  { label: 'Email', value: 'assieranteneh0306@gmail.com', href: 'mailto:assieranteneh0306@gmail.com', icon: '✉' },
  { label: 'Phone', value: '+251 929 509 800', href: 'tel:+251929509800', icon: '☎' },
  { label: 'GitHub', value: 'github.com/ass-ier', href: 'https://github.com/ass-ier', icon: '◈' },
  { label: 'LinkedIn', value: 'linkedin.com/in/assieranteneh', href: 'https://www.linkedin.com/in/assieranteneh', icon: '⬡' },
];

function ContactCard({ item, index, inView }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(item.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.open(item.href, '_blank', 'noopener');
    }
  };

  return (
    <motion.div
      className={`glass ${styles.card}`}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.09, ease: [0.25, 1, 0.5, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className={styles.cardIcon}>{item.icon}</div>
      <p className={styles.cardLabel}>{item.label}</p>
      <p className={styles.cardValue}>{item.value}</p>
      <div className={styles.actions}>
        <a href={item.href} className={styles.actionBtn} target="_blank" rel="noopener noreferrer">
          Open ↗
        </a>
        <button className={styles.actionBtn} onClick={handleCopy} aria-label={`Copy ${item.label}`}>
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span key="copied" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                Copied ✓
              </motion.span>
            ) : (
              <motion.span key="copy" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                Copy
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  );
}

export default function Contact() {
  const [ref, inView] = useInView();

  return (
    <section id="contact" className={`section ${styles.contact}`} ref={ref}>
      <div className="container">
        {/* Ambient glow */}
        <div className={styles.glow} aria-hidden="true" />

        <motion.p className="section-label"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
          Contact
        </motion.p>
        <motion.h2 className="section-title"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}>
          Open to new<br />
          <span className="highlight">opportunities</span>
        </motion.h2>
        <motion.p className={styles.sub}
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}>
          I'm actively looking for IT Infrastructure and Cybersecurity roles —
          full-time positions, contract work, or just a conversation about the space.
          Reach out directly or copy any contact below.
        </motion.p>

        <div className={styles.grid}>
          {CONTACTS.map((c, i) => (
            <ContactCard key={c.label} item={c} index={i} inView={inView} />
          ))}
        </div>

        {/* CTA */}
        <motion.div className={styles.cta}
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55 }}>
          <a href="mailto:assieranteneh0306@gmail.com" className={styles.ctaBtn}>
            Send me an email →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
