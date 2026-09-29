import { useEffect, useRef, useState } from 'react';
import Arrow from './Arrow';
import MessageTransmission from './MessageTransmission';
import useMediaQuery from '../hooks/useMediaQuery';
import { EMAIL_LIMIT, MESSAGE_LIMIT, SUBJECT_LIMIT, validateContactFields } from '../utils/contact';
import styles from './EmailComposer.module.css';

export default function EmailComposer({ children }) {
  const [fields, setFields] = useState({ email: '', subject: '', message: '', website: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [animationStep, setAnimationStep] = useState('idle');
  const [attempt, setAttempt] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [transmissionOpen, setTransmissionOpen] = useState(false);
  const composer = useRef(null);
  const submitButton = useRef(null);
  const emailInput = useRef(null);
  const subjectInput = useRef(null);
  const messageInput = useRef(null);
  const requestId = useRef(null);
  const activeRequest = useRef(null);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const busy = status === 'sending' || animationStep === 'sealing' || animationStep === 'flying';
  const succeeded = status === 'success' && !busy;
  const phase = status === 'error' ? 'error' : succeeded ? 'ready' : animationStep;

  useEffect(() => () => activeRequest.current?.abort('unmounted'), []);

  useEffect(() => {
    if (animationStep !== 'sealing' && animationStep !== 'flying') return;
    const timer = setTimeout(() => {
      setAnimationStep(reducedMotion || animationStep === 'flying' ? 'waiting' : 'flying');
    }, reducedMotion ? 0 : animationStep === 'sealing' ? 1100 : 1200);
    return () => clearTimeout(timer);
  }, [animationStep, reducedMotion, attempt]);

  function updateField(event) {
    const { name, value } = event.currentTarget;
    setFields((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setStatus('idle');
    setAnimationStep('idle');
    setFeedback('');
    requestId.current = null;
  }

  function focusInvalid(nextErrors) {
    const inputs = { email: emailInput, subject: subjectInput, message: messageInput };
    const first = Object.keys(inputs).find((name) => nextErrors[name]);
    if (first) requestAnimationFrame(() => inputs[first].current?.focus());
  }

  async function submit(event) {
    event.preventDefault();
    if (busy || activeRequest.current) return;
    const { values, errors: nextErrors } = validateContactFields(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      focusInvalid(nextErrors);
      return;
    }

    const controller = new AbortController();
    activeRequest.current = controller;
    const timeout = setTimeout(() => controller.abort('timeout'), 12000);
    setStatus('sending');
    setAnimationStep(reducedMotion ? 'waiting' : 'sealing');
    setAttempt((current) => current + 1);
    setFeedback('');
    setTransmissionOpen(true);
    try {
      requestId.current ||= crypto.randomUUID();
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, website: fields.website, requestId: requestId.current }),
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok || result?.status !== 'accepted') {
        setStatus('error');
        setAnimationStep('idle');
        setFeedback(typeof result?.error === 'string' ? result.error : 'The server did not confirm sending. Your message is still here; please try again.');
        if (result?.errors && typeof result.errors === 'object') {
          setErrors(result.errors);
          setTransmissionOpen(false);
          focusInvalid(result.errors);
        }
        return;
      }
      setStatus('success');
    } catch {
      if (controller.signal.reason === 'unmounted') return;
      setStatus('error');
      setAnimationStep('idle');
      setFeedback(controller.signal.aborted
        ? 'Sending took too long to confirm. Your message is still here; please try again.'
        : 'Could not confirm sending. Check your connection and try again; your message is still here.');
    } finally {
      clearTimeout(timeout);
      if (activeRequest.current === controller) activeRequest.current = null;
    }
  }

  function startAnotherMessage() {
    setFields((current) => ({ ...current, subject: '', message: '', website: '' }));
    setStatus('idle');
    setAnimationStep('idle');
    setFeedback('');
    setErrors({});
    requestId.current = null;
    subjectInput.current.focus();
  }

  function closeTransmission() {
    setTransmissionOpen(false);
    requestAnimationFrame(() => {
      (busy ? composer.current : submitButton.current)?.focus({ preventScroll: true });
    });
  }

  return (
    <section ref={composer} id="contact-form" className={styles.composer} tabIndex={-1} aria-labelledby="email-composer-heading" data-email-composer data-handoff-phase={phase} data-send-status={status}>
      <form className={styles.form} onSubmit={submit} noValidate aria-labelledby="email-composer-heading" aria-describedby="email-composer-help">
        <div className={styles.fields}>
          <h3 id="email-composer-heading">Write me a note.</h3>
          <p id="email-composer-help" className={styles.intro}>Your email, a subject, and a little context. Send your message directly from here.</p>
          <div className={styles.field}>
            <label htmlFor="contact-email">Your email</label>
            <input
              ref={emailInput}
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              required
              disabled={busy}
              maxLength={EMAIL_LIMIT}
              value={fields.email}
              onChange={updateField}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
            />
            {errors.email && <p className={styles.error} id="contact-email-error">{errors.email}</p>}
          </div>
          <div className={styles.field}>
            <label htmlFor="email-subject">Subject</label>
            <input
              ref={subjectInput}
              id="email-subject"
              name="subject"
              type="text"
              autoComplete="off"
              required
              disabled={busy}
              maxLength={SUBJECT_LIMIT}
              value={fields.subject}
              onChange={updateField}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? 'email-subject-error' : undefined}
            />
            {errors.subject && <p className={styles.error} id="email-subject-error">{errors.subject}</p>}
          </div>
          <div className={styles.field}>
            <label htmlFor="email-message">Message</label>
            <textarea
              ref={messageInput}
              id="email-message"
              name="message"
              rows={5}
              required
              disabled={busy}
              maxLength={MESSAGE_LIMIT}
              value={fields.message}
              onChange={updateField}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={`email-message-limit${errors.message ? ' email-message-error' : ''}`}
            />
            <p id="email-message-limit" className={styles.limit}>Up to {MESSAGE_LIMIT.toLocaleString()} characters. Please don&apos;t include passwords or other secrets.</p>
            {errors.message && <p className={styles.error} id="email-message-error">{errors.message}</p>}
          </div>
          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="contact-website">Website (leave empty)</label>
            <input id="contact-website" name="website" type="text" autoComplete="off" tabIndex={-1} value={fields.website} onChange={updateField} />
          </div>
        </div>
        <div className={styles.actions}>
          <button
            ref={submitButton}
            className={`round-link ${styles.send}`}
            type={succeeded ? 'button' : 'submit'}
            disabled={busy}
            onClick={succeeded ? startAnotherMessage : undefined}
          >
            {busy ? 'Sending...' : succeeded ? 'Write another message' : status === 'error' ? 'Try again' : 'Send message'} <Arrow />
          </button>
          <p className={styles.status} role={status === 'error' ? 'alert' : 'status'} aria-live={status === 'error' ? 'assertive' : 'polite'} aria-atomic="true">
            {feedback || (succeeded
              ? 'Message submitted. Thank you for getting in touch. Replies can reach you at the email you provided.'
              : busy ? 'Sending your message. This page will confirm when the mail service accepts it.' : '')}
          </p>
        </div>
      </form>
      {children}
      {transmissionOpen && (
        <MessageTransmission
          phase={phase}
          attempt={attempt}
          feedback={feedback}
          reducedMotion={reducedMotion}
          onDismiss={closeTransmission}
          onRetry={submit}
        />
      )}
    </section>
  );
}
