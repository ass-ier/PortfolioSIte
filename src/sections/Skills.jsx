import { useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import Arrow from '../components/Arrow';
import Dialog from '../components/Dialog';
import useMediaQuery from '../hooks/useMediaQuery';
import { skills, certifications } from '../data/resume';
import styles from './Skills.module.css';

function CertificateImage({ credential, expanded = false }) {
  const [status, setStatus] = useState('loading');

  return (
    <span className={styles.imageFrame} aria-busy={status === 'loading'}>
      {status !== 'error' && (
        <img
          src={credential.image}
          srcSet={`${credential.imageSmall} 800w, ${credential.image} ${credential.imageWidth}w`}
          sizes={expanded ? '(max-width: 760px) 90vw, min(90vw, 1080px)' : '(max-width: 1000px) 40vw, 36vw'}
          width={credential.imageWidth}
          height={credential.imageHeight}
          alt={credential.imageAlt}
          loading={expanded ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
        />
      )}
      {status === 'loading' && <span className={styles.imageStatus} aria-hidden="true">Loading certificate...</span>}
      {status === 'error' && <span className={styles.imageError} role="alert">Could not load this certificate image. Use the verification link instead.</span>}
    </span>
  );
}

function CertificatePreview({ credential, onOpen }) {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <figure className={styles.certificatePreview} data-certificate-preview={credential.id}>
      <button className={styles.previewButton} onClick={() => onOpen(credential)} aria-label={`Enlarge ${credential.title} certificate`} aria-haspopup="dialog">
        <span className={styles.previewViewport}>
          <AnimatePresence initial={false}>
            <Motion.span
              className={styles.previewImage}
              key={credential.id}
              initial={reducedMotion ? false : { opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' }}
              animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <CertificateImage credential={credential} />
            </Motion.span>
          </AnimatePresence>
        </span>
        <span className={styles.previewAction}>Open certificate <Arrow /></span>
      </button>
      <figcaption>{credential.title}<span>{credential.issuer} &middot; {credential.date}</span></figcaption>
    </figure>
  );
}

function CertificateDetails({ credential, onClose }) {
  return (
    <Dialog labelledBy={`certificate-title-${credential.id}`} onDismiss={onClose} className={styles.certificateDialog}>
      <div className={styles.dialogHeader}>
        <div>
          <h2 id={`certificate-title-${credential.id}`}>{credential.title}</h2>
          <p>{credential.issuer} &middot; {credential.date}</p>
        </div>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close certificate">
          Close
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" stroke="currentColor" strokeWidth="1.5" /></svg>
        </button>
      </div>
      <div className={styles.dialogImage}><CertificateImage credential={credential} expanded /></div>
      <div className={styles.dialogActions}>
        <a className="round-link" href={credential.link} target="_blank" rel="noopener noreferrer">
          Verify credential <Arrow /><span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        <a className="text-link" href={credential.image} target="_blank" rel="noopener noreferrer">
          Open image <Arrow /><span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      </div>
    </Dialog>
  );
}

export default function Skills() {
  const [preview, setPreview] = useState(() => certifications.find((credential) => credential.image));
  const [selected, setSelected] = useState(null);

  return (
    <section id="skills" className={`section ${styles.skills}`} tabIndex={-1} aria-labelledby="skills-heading">
      <div className="container">
        <div className={styles.heading}>
          <h2 id="skills-heading" className="section-title">The tools behind<br />the thinking.</h2>
          <p>Cloud, identity, security, and the practical work of keeping systems running.</p>
        </div>
        <div className={styles.skillGrid}>
          {skills.map((group) => (
            <div className={styles.skillGroup} key={group.category}>
              <h3>{group.category}</h3>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
        <section id="credentials" className={styles.credentials} aria-labelledby="credentials-heading">
          <div className={styles.credentialIntro}>
            <h2 id="credentials-heading">Credentials &amp;<br />recognition.</h2>
            <p className={styles.previewHint}><span className={styles.hoverHint}>Hover or focus to preview. Click a certificate to open it.</span><span className={styles.touchHint}>Tap anywhere on a certificate to open it.</span></p>
            <CertificatePreview credential={preview} onOpen={setSelected} />
          </div>
          <div className={styles.credentialList}>
            {certifications.map((credential) => (
              <article
                key={credential.id}
                className={styles.credential}
                data-credential={credential.id}
                data-preview-active={preview.id === credential.id}
                onPointerEnter={(event) => {
                  if (credential.image && event.pointerType === 'mouse') setPreview(credential);
                }}
                onFocusCapture={() => {
                  if (credential.image) setPreview(credential);
                }}
              >
                <div>
                  <h3>{credential.title}</h3>
                  <p>{credential.issuer} &middot; {credential.date}</p>
                  {credential.image && <button className={styles.viewCertificate} onClick={() => setSelected(credential)} aria-label={`View ${credential.title} certificate`} aria-haspopup="dialog">View certificate <Arrow /></button>}
                </div>
                {credential.link ? (
                  <a href={credential.link} target="_blank" rel="noopener noreferrer" className={styles.verify} aria-label={`Verify ${credential.title} (opens in a new tab)`}>
                    <span>Verify</span><Arrow />
                  </a>
                ) : <span className={styles.recognition}>Award</span>}
              </article>
            ))}
          </div>
        </section>
      </div>
      {selected && <CertificateDetails credential={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
