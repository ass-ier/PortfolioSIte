import { useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import Arrow from '../components/Arrow';
import EmailComposer from '../components/EmailComposer';
import { contacts } from '../data/resume';
import styles from './Contact.module.css';

const socialIcons = { GitHub: FaGithub, LinkedIn: FaLinkedinIn };

export default function Contact() {
  const [feedback, setFeedback] = useState(null);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copyContact(contact) {
    clearTimeout(timer.current);
    setFeedback({ label: contact.label, kind: 'pending', message: `Copying ${contact.label.toLowerCase()}...` });
    try {
      if (!navigator.clipboard) throw new Error('Clipboard is unavailable.');
      await navigator.clipboard.writeText(contact.value);
      setFeedback({ label: contact.label, kind: 'success', message: `${contact.label} copied to clipboard.` });
      timer.current = setTimeout(() => setFeedback(null), 4000);
    } catch {
      setFeedback({ label: contact.label, kind: 'error', message: `Couldn't copy ${contact.label.toLowerCase()}. Select and copy the text above, or use its link directly.` });
    }
  }

  return (
    <section id="contact" className={`section ${styles.contact}`} tabIndex={-1} aria-labelledby="contact-heading">
      <div className="container">
        <div className={styles.heading}>
          <h2 id="contact-heading">Let&apos;s make<br />things work.</h2>
          <a className={styles.emailCircle} href="#contact-form" aria-label="Write Assier a message"><Arrow /></a>
        </div>
        <div className={styles.contactIntro}>
          <p>A project, a role, or a good conversation.<br />It starts with a hello.</p>
          <p>Based in Addis Ababa, Ethiopia.</p>
        </div>
        <EmailComposer>
          <aside className={styles.contacts} aria-labelledby="direct-contact-heading">
            <h3 id="direct-contact-heading">A direct line.</h3>
            {contacts.filter((contact) => !contact.href.startsWith('https:')).map((contact) => (
              <div className={styles.contactRow} key={contact.label}>
                <span className={styles.label}>{contact.label}</span>
                <a className={styles.value} href={contact.href}>
                  {contact.value}<Arrow />
                </a>
                <button className={styles.copy} type="button" disabled={feedback?.kind === 'pending'} aria-label={`Copy ${contact.label.toLowerCase()}`} onClick={() => copyContact(contact)}>
                  {feedback?.label === contact.label && feedback.kind === 'success' ? 'Copied' : 'Copy'}
                </button>
              </div>
            ))}
            <div className={styles.socials} aria-label="Social profiles">
              {contacts.filter((contact) => contact.href.startsWith('https:')).map((contact) => {
                const Icon = socialIcons[contact.label];
                return (
                  <a className={styles.social} key={contact.label} href={contact.href} target="_blank" rel="noopener noreferrer" aria-label={`${contact.label} (opens in a new tab)`} title={contact.label}>
                    <Icon aria-hidden="true" />
                  </a>
                );
              })}
            </div>
            <p className={styles.feedback} role="status" aria-live="polite" aria-atomic="true">{feedback?.message || '\u00a0'}</p>
          </aside>
        </EmailComposer>
      </div>
    </section>
  );
}
