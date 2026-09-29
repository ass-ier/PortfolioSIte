import { useEffect, useRef } from 'react';

export default function Dialog({ id, labelledBy, className = '', onDismiss, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (opener instanceof HTMLElement && opener.isConnected) {
        opener.focus({ preventScroll: true });
      }
    };
  }, []);

  return (
    <dialog
      id={id}
      ref={ref}
      aria-labelledby={labelledBy}
      className={`dialog ${className}`}
      onClose={(event) => {
        // StrictMode can deliver a queued cleanup close after the dialog reopens.
        if (!event.currentTarget.open) onDismiss();
      }}
      onCancel={(event) => {
        event.preventDefault();
        onDismiss();
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;
        const controls = [...event.currentTarget.querySelectorAll('a[href], button, input, select, textarea, summary, [tabindex]')]
          .filter((element) => element instanceof HTMLElement && element.tabIndex >= 0 && !element.hasAttribute('disabled') && element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onDismiss();
      }}
    >
      {children}
    </dialog>
  );
}
