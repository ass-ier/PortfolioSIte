import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import process from 'node:process';
import { validateContactFields } from '../src/utils/contact.js';

export const CONTACT_RECIPIENT = 'assieranteneh0306@gmail.com';
const MAX_BODY_BYTES = 16 * 1024;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;
const MAX_RATE_BUCKETS = 1000;
const requestIdPattern = /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i;

class RequestError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function reply(response, status, body, headers = {}) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  for (const [name, value] of Object.entries(headers)) response.setHeader(name, value);
  response.end(JSON.stringify(body));
}

async function readPayload(request) {
  let raw;
  if (request.body !== undefined) {
    raw = Buffer.isBuffer(request.body) ? request.body.toString('utf8')
      : typeof request.body === 'string' ? request.body : JSON.stringify(request.body);
  } else {
    const chunks = [];
    let size = 0;
    for await (const chunk of request) {
      size += Buffer.byteLength(chunk);
      if (size <= MAX_BODY_BYTES) chunks.push(Buffer.from(chunk));
    }
    if (size > MAX_BODY_BYTES) throw new RequestError(413, 'This message is too large. Shorten it and try again.');
    raw = Buffer.concat(chunks).toString('utf8');
  }
  if (Buffer.byteLength(raw) > MAX_BODY_BYTES) throw new RequestError(413, 'This message is too large. Shorten it and try again.');
  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    throw new RequestError(400, 'The form could not be read. Reload the page and try again.');
  }
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new RequestError(400, 'The form could not be read. Reload the page and try again.');
  }
  return payload;
}

function isSameOrigin(request) {
  try {
    const origin = new URL(request.headers.origin);
    return ['http:', 'https:'].includes(origin.protocol) && origin.host === request.headers.host;
  } catch {
    return false;
  }
}

export function createContactHandler({ env = process.env, fetchImpl = globalThis.fetch, logger = console, now = Date.now } = {}) {
  const attempts = new Map();

  return async function contact(request, response) {
    if (request.method !== 'POST') return reply(response, 405, { error: 'Use the contact form to send a message.' }, { Allow: 'POST' });
    if (!isSameOrigin(request)) return reply(response, 403, { error: 'Send this message from the portfolio contact form.' });
    if (request.headers['content-type']?.split(';')[0].trim().toLowerCase() !== 'application/json') {
      return reply(response, 415, { error: 'The form could not be read. Reload the page and try again.' });
    }

    try {
      const payload = await readPayload(request);
      if (payload.website !== undefined && payload.website !== '') {
        return reply(response, 400, { error: 'This submission could not be accepted. Reload the form and try again.' });
      }
      const { values, errors } = validateContactFields(payload);
      if (Object.keys(errors).length) return reply(response, 400, { error: 'Check the highlighted fields.', errors });
      if (typeof payload.requestId !== 'string' || !requestIdPattern.test(payload.requestId)) {
        return reply(response, 400, { error: 'The submission could not be identified. Reload the page and try again.' });
      }

      const apiKey = env.RESEND_API_KEY?.trim();
      const from = env.CONTACT_FROM?.trim();
      if (!apiKey || !from || /[\r\n]/.test(from)) {
        logger.error('contact: mail service configuration is missing or invalid');
        return reply(response, 503, { error: 'Email sending is not connected yet. Your message has not been sent. Please try again later.' });
      }

      // Vercel overwrites this header; local development must use the socket instead.
      const address = env.VERCEL === '1'
        ? request.headers['x-forwarded-for']?.split(',')[0].trim()
        : request.socket?.remoteAddress;
      if (!address) {
        logger.error('contact: client address is unavailable');
        return reply(response, 503, { error: 'Sending is temporarily unavailable. Please try again later.' });
      }
      const time = now();
      for (const [key, bucket] of attempts) if (bucket.expires <= time) attempts.delete(key);
      const key = createHash('sha256').update(address).digest('hex');
      const bucket = attempts.get(key);
      if ((bucket && bucket.count >= RATE_LIMIT) || (!bucket && attempts.size >= MAX_RATE_BUCKETS)) {
        const retryAfter = Math.ceil(((bucket?.expires ?? time + RATE_WINDOW_MS) - time) / 1000);
        return reply(response, 429, { error: 'Too many attempts. Please wait ten minutes before trying again.' }, { 'Retry-After': String(retryAfter) });
      }
      attempts.set(key, { count: (bucket?.count ?? 0) + 1, expires: bucket?.expires ?? time + RATE_WINDOW_MS });

      let provider;
      try {
        provider = await fetchImpl('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'Idempotency-Key': `portfolio-contact/${payload.requestId}`,
          },
          body: JSON.stringify({
            from,
            to: [CONTACT_RECIPIENT],
            reply_to: values.email,
            subject: values.subject,
            text: `Message from ${values.email}\n\n${values.message}`,
          }),
          signal: AbortSignal.timeout(8000),
        });
      } catch (error) {
        const timedOut = error.name === 'TimeoutError' || error.name === 'AbortError';
        logger.error(timedOut ? 'contact: mail provider timed out' : 'contact: mail provider could not be reached');
        return reply(response, timedOut ? 504 : 502, { error: 'Could not confirm sending. Your message is still here; please try again.' });
      }
      if (!provider.ok) {
        logger.error('contact: mail provider rejected the request', { status: provider.status });
        if (provider.status === 429) return reply(response, 429, { error: 'The mail service is busy. Please try again in a minute.' }, { 'Retry-After': '60' });
        return reply(response, provider.status === 401 || provider.status === 403 ? 503 : 502, { error: 'Sending is temporarily unavailable. Your message is still here; please try again later.' });
      }
      let accepted;
      try {
        accepted = await provider.json();
      } catch {
        logger.error('contact: mail provider returned an unreadable response');
        return reply(response, 502, { error: 'Could not confirm sending. Your message is still here; please try again.' });
      }
      if (typeof accepted?.id !== 'string' || !accepted.id) {
        logger.error('contact: mail provider did not confirm acceptance');
        return reply(response, 502, { error: 'Could not confirm sending. Your message is still here; please try again.' });
      }
      return reply(response, 200, { status: 'accepted' });
    } catch (error) {
      if (error instanceof RequestError) return reply(response, error.status, { error: error.message });
      logger.error('contact: unexpected request failure');
      return reply(response, 500, { error: 'The message could not be processed. Please try again.' });
    }
  };
}
