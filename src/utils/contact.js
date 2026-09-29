export const EMAIL_LIMIT = 254;
export const SUBJECT_LIMIT = 120;
export const MESSAGE_LIMIT = 2000;

const emailPattern = /^[a-z\d.!#$%&'*+/=?^_`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)+$/i;

export function validateContactFields(input) {
  const values = {
    email: typeof input?.email === 'string' ? input.email.trim() : '',
    subject: typeof input?.subject === 'string' ? input.subject.trim() : '',
    message: typeof input?.message === 'string' ? input.message.trim().replace(/\r\n?/g, '\n') : '',
  };
  const errors = {};
  if (!values.email) errors.email = 'Add your email address for replies.';
  else if (values.email.length > EMAIL_LIMIT || !emailPattern.test(values.email) || values.email.split('@')[0].length > 64) {
    errors.email = 'Enter a valid email address for replies.';
  }
  if (!values.subject) errors.subject = 'Add a subject for your message.';
  else if (values.subject.length > SUBJECT_LIMIT) errors.subject = `Keep your subject within ${SUBJECT_LIMIT} characters.`;
  else if (/[\r\n\u2028\u2029]/.test(values.subject) || values.subject.includes('\0')) errors.subject = 'Keep your subject on a single line.';
  if (!values.message) errors.message = 'Write a message before sending.';
  else if (values.message.length > MESSAGE_LIMIT) errors.message = `Keep your message within ${MESSAGE_LIMIT.toLocaleString()} characters.`;
  else if (values.message.includes('\0')) errors.message = 'Remove unsupported characters from your message.';
  return { values, errors };
}
