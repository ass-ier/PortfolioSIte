import { useRef } from 'react';
import { motion as Motion } from 'framer-motion';
import Arrow from './Arrow';
import Dialog from './Dialog';
import useMediaQuery from '../hooks/useMediaQuery';
import styles from './MessageTransmission.module.css';

const gates = Array.from({ length: 7 }, (_, index) => index);
const rows = Array.from({ length: 7 }, (_, index) => index);
const cells = Array.from({ length: 14 }, (_, index) => index);
const titles = {
  sealing: 'Sealing\nthe note.',
  flying: 'Across\nthe wire.',
  waiting: 'Awaiting\nconfirmation.',
  ready: 'Message\nsubmitted.',
  error: 'Not\nconfirmed.',
};

function TransmissionArtwork({ phase, reducedMotion, compact }) {
  const traveling = phase === 'flying' || phase === 'waiting';
  const ready = phase === 'ready';
  const failed = phase === 'error';
  const transition = (duration, delay = 0) => ({ duration: reducedMotion ? 0 : duration, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] });

  return (
    <svg className={styles.art} viewBox={compact ? '280 0 640 600' : '0 0 1200 600'} fill="none" aria-hidden="true">
      <path d="M0 300H1200M600 0V600M0 0L1200 600M0 600L1200 0" stroke="var(--line-on-dark)" strokeOpacity="0.25" />
      {gates.map((index) => {
        const scale = 0.35 + index * 0.16;
        return (
          <Motion.path
            key={index}
            className={styles.centered}
            data-transmission-gate
            d="M210 100H990L1090 170V430L990 500H210L110 430V170Z"
            stroke={index === 4 ? 'var(--orange)' : 'var(--line-on-dark)'}
            strokeWidth={index === 4 ? 2 : 1.5}
            initial={reducedMotion ? false : { pathLength: 0, scale: scale * 0.85, opacity: 0 }}
            animate={{ pathLength: 1, scale: ready ? 0.2 : traveling ? scale * 1.8 : scale, rotate: traveling ? -7 : 0, opacity: ready ? 0 : failed ? 0.12 : index === 4 ? 0.8 : 0.55 }}
            transition={transition(traveling ? 1.15 : 0.75, phase === 'sealing' ? index * 0.025 : 0)}
          />
        );
      })}
      <Motion.path
        d="M230 300H940"
        stroke="var(--orange)"
        strokeWidth="2"
        strokeDasharray="4 12"
        initial={false}
        animate={{ pathLength: traveling ? 1 : 0, opacity: traveling ? 0.75 : 0 }}
        transition={transition(1.1)}
      />
      <Motion.g
        className={styles.centered}
        data-transmission-cipher
        initial={false}
        animate={{ opacity: phase === 'sealing' ? 1 : 0, scale: phase === 'sealing' ? 1 : 0.5, y: phase === 'sealing' ? 0 : 32 }}
        transition={transition(0.35)}
      >
        <path d="M430 136H732L770 174V416H430Z" fill="var(--dark)" stroke="var(--paper)" strokeWidth="1.5" />
        <path d="M731 137V175H769" stroke="var(--paper)" strokeWidth="1.5" />
        <Motion.text x="600" y="305" textAnchor="middle" className={styles.hello} fill="var(--paper)" initial={reducedMotion ? false : { opacity: 1 }} animate={{ opacity: 0 }} transition={transition(0.28, 0.12)}>HELLO.</Motion.text>
        {rows.map((row) => (
          <Motion.g
            key={row}
            data-cipher-row
            initial={reducedMotion ? false : { clipPath: 'inset(0 100% 0 0)', x: row % 2 ? 24 : -24 }}
            animate={{ clipPath: 'inset(0 0% 0 0)', x: 0 }}
            transition={transition(0.45, 0.12 + row * 0.06)}
          >
            {cells.map((cell) => (
              <rect key={cell} x={454 + cell * 21} y={187 + row * 26} width={(row + cell * 3) % 4 === 0 ? 4 : 13} height={row % 3 === 0 ? 6 : 9} fill={(row + cell) % 4 === 0 ? 'var(--paper)' : 'var(--orange)'} />
            ))}
          </Motion.g>
        ))}
      </Motion.g>
      <Motion.g
        className={styles.centered}
        data-transmission-packet
        initial={reducedMotion ? false : { opacity: 0, scale: 0.45, x: 0, y: 40, rotate: -16 }}
        animate={{
          opacity: ready ? 0 : failed ? 0.5 : 1,
          scale: ready ? 0.2 : traveling ? 0.34 : 1,
          x: ready || traveling ? 210 : 0,
          y: ready || traveling ? -34 : 16,
          rotate: traveling ? 18 : 0,
        }}
        transition={transition(phase === 'sealing' ? 0.35 : 1.1, phase === 'sealing' ? 0.72 : 0)}
      >
        <path d="M600 192L710 253L600 314L490 253Z" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
        <path d="M490 253L600 314V431L490 370Z" fill="var(--orange)" stroke="var(--ink)" strokeWidth="2" />
        <path d="M600 314L710 253V370L600 431Z" fill="var(--orange-ink)" stroke="var(--ink)" strokeWidth="2" />
        <path d="M548 220L658 281M548 284V402" stroke="var(--ink)" strokeWidth="12" />
        <path d="M568 347V330C568 305 540 292 540 315V331" stroke="var(--paper)" strokeWidth="4" />
        <path d="M531 322L578 348V383L531 357Z" fill="var(--ink)" stroke="var(--paper)" strokeWidth="2" />
        <path d="M554 346V359" stroke="var(--paper)" strokeWidth="3" />
      </Motion.g>
      <Motion.g
        className={styles.centered}
        data-transmission-receipt
        initial={reducedMotion ? false : { opacity: 0, scale: 1.5, rotate: -18 }}
        animate={{ opacity: ready ? 1 : 0, scale: ready ? 1 : 1.5, rotate: ready ? 0 : -18 }}
        transition={transition(0.5)}
      >
        <path d="M600 179L708 241V365L600 427L492 365V241Z" fill="var(--dark)" stroke="var(--orange)" strokeWidth="3" />
        <path d="M538 305L582 349L664 260" stroke="var(--paper)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M420 303H465M735 303H780M600 110V152M600 454V496" stroke="var(--orange)" strokeWidth="2" />
      </Motion.g>
    </svg>
  );
}

export default function MessageTransmission({ phase, attempt, feedback, reducedMotion, onDismiss, onRetry }) {
  const compact = useMediaQuery('(max-width: 760px)');
  const close = useRef(null);
  const complete = phase === 'ready';
  const failed = phase === 'error';
  const description = failed ? feedback : complete
    ? 'The mail service accepted your message for Assier. Thank you for getting in touch.'
    : phase === 'waiting'
      ? 'The visual journey is complete. Waiting for the mail service to accept your message.'
      : 'Your message is being submitted. The receipt appears only after the mail service accepts it.';

  return (
    <Dialog id="message-transmission" labelledBy="transmission-heading" className={styles.overlay} onDismiss={onDismiss}>
      <div className={styles.scene} data-transmission-phase={phase}>
        <header className={styles.bar}>
          <span>Assier Anteneh</span>
          <button ref={close} className={styles.close} type="button" onClick={onDismiss} aria-label="Close send animation">
            Close <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" stroke="currentColor" strokeWidth="1.5" /></svg>
          </button>
        </header>
        <div className={styles.stage}>
          <TransmissionArtwork key={attempt} phase={phase} reducedMotion={reducedMotion} compact={compact} />
        </div>
        <div className={styles.caption}>
          <div className={styles.copy}>
            <h2 id="transmission-heading">{titles[phase]}</h2>
            <p role={failed ? 'alert' : 'status'} aria-live={failed ? 'assertive' : 'polite'} aria-atomic="true">{description}</p>
          </div>
          <div className={styles.actions}>
            {failed && <button type="button" className={`round-link ${styles.retry}`} onClick={(event) => { onRetry(event); close.current.focus(); }}>Try again <Arrow /></button>}
            <button type="button" className={`text-link ${styles.back}`} onClick={onDismiss}>{complete ? 'Back to portfolio' : 'Back to message'} <Arrow /></button>
          </div>
        </div>
        <p className={styles.disclosure}>Security-inspired visualization, not end-to-end encryption.{complete ? ' Inbox delivery is not tracked.' : !failed ? ' Closing this view does not cancel sending.' : ''}</p>
      </div>
    </Dialog>
  );
}
