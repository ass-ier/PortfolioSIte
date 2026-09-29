import assert from 'node:assert/strict';
import test from 'node:test';
import { EMAIL_LIMIT, MESSAGE_LIMIT, SUBJECT_LIMIT, validateContactFields } from './contact.js';

const valid = { email: 'visitor@example.com', subject: 'A project', message: 'Hello Assier.' };

test('contact validation trims fields and preserves Unicode, special characters, and message lines', () => {
  const result = validateContactFields({
    email: ' visitor+portfolio@example.com ',
    subject: ' A & B? 100% ready ',
    message: ' Hello,\r\n\r\n\u00e9 \u{1f512} &bcc=not-a-recipient@example.com ',
  });
  assert.deepEqual(result.errors, {});
  assert.deepEqual(result.values, {
    email: 'visitor+portfolio@example.com',
    subject: 'A & B? 100% ready',
    message: 'Hello,\n\n\u00e9 \u{1f512} &bcc=not-a-recipient@example.com',
  });
});

test('empty, whitespace-only, and non-string fields get specific validation errors', () => {
  for (const input of [undefined, null, [], {}, { email: ' ', subject: '\n ', message: ' ' }, { email: [], subject: 42, message: {} }]) {
    assert.deepEqual(Object.keys(validateContactFields(input).errors), ['email', 'subject', 'message']);
  }
});

test('invalid reply addresses and header injection are rejected', () => {
  for (const email of ['not-an-email', 'a@localhost', 'a@bad..com', 'a@-example.com', 'a@exam/ple.com', 'Name <a@example.com>', 'a@example.com,b@example.com', 'a@example.com\r\nBcc:b@example.com', `${'a'.repeat(65)}@example.com`]) {
    assert.ok(validateContactFields({ ...valid, email }).errors.email, email);
  }
  for (const subject of ['Hello\r\nBcc: someone@example.com', 'Hello\u2028next line', 'Hello\0next line']) {
    assert.ok(validateContactFields({ ...valid, subject }).errors.subject);
  }
});

test('documented length limits accept complete content and reject overflow', () => {
  assert.equal(EMAIL_LIMIT, 254);
  assert.equal(SUBJECT_LIMIT, 120);
  assert.equal(MESSAGE_LIMIT, 2000);
  const fields = { ...valid, subject: 'S'.repeat(SUBJECT_LIMIT), message: 'M'.repeat(MESSAGE_LIMIT) };
  assert.deepEqual(validateContactFields(fields), { values: fields, errors: {} });
  assert.ok(validateContactFields({ ...fields, subject: `${fields.subject}S` }).errors.subject);
  assert.ok(validateContactFields({ ...fields, message: `${fields.message}M` }).errors.message);
});
