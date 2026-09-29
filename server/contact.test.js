import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { Readable } from 'node:stream';
import test from 'node:test';
import { contacts } from '../src/data/resume.js';
import { CONTACT_RECIPIENT, createContactHandler } from './contact.js';

const configuration = { RESEND_API_KEY: 'test-key-not-a-credential', CONTACT_FROM: 'Portfolio <portfolio@example.com>' };
const message = {
  email: 'visitor+test@example.com',
  subject: 'A project & a conversation',
  message: 'Hello Assier,\n\nA plain-text message, not <html>.',
  website: '',
  requestId: '835bf093-a73b-4513-9759-845eeeb28050',
};

function fixture(options = {}) {
  const calls = [];
  const logs = [];
  const handler = createContactHandler({
    env: options.env ?? configuration,
    now: options.now,
    logger: { error: (...args) => logs.push(args) },
    fetchImpl: async (...args) => {
      calls.push(args);
      return options.provider ? options.provider(...args) : new Response(JSON.stringify({ id: 'test-accepted-id' }));
    },
  });
  const dispatch = async (payload = message, overrides = {}) => {
    const raw = typeof payload === 'string' ? payload : JSON.stringify(payload);
    const request = Readable.from([raw]);
    request.method = overrides.method ?? 'POST';
    request.headers = { host: 'portfolio.example', origin: 'https://portfolio.example', 'content-type': 'application/json', ...overrides.headers };
    request.socket = { remoteAddress: overrides.address ?? '127.0.0.1' };
    if (overrides.parsed) request.body = payload;
    const headers = {};
    let body;
    const response = {
      statusCode: 200,
      setHeader: (name, value) => { headers[name.toLowerCase()] = value; },
      end: (rawBody) => { body = JSON.parse(rawBody); },
    };
    await handler(request, response);
    return { status: response.statusCode, body, headers };
  };
  return { handler, dispatch, calls, logs };
}

test('the server fixes recipient and From, and uses the visitor only as Reply-To', async () => {
  const endpoint = fixture();
  const response = await endpoint.dispatch({ ...message, from: 'spoof@example.com', to: 'another@example.com', bcc: 'hidden@example.com' });
  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { status: 'accepted' });
  assert.equal(CONTACT_RECIPIENT, contacts.find(({ label }) => label === 'Email').value);
  assert.equal(endpoint.calls.length, 1);
  const [url, options] = endpoint.calls[0];
  assert.equal(url, 'https://api.resend.com/emails');
  assert.equal(options.method, 'POST');
  assert.deepEqual(JSON.parse(options.body), {
    from: configuration.CONTACT_FROM,
    to: [CONTACT_RECIPIENT],
    reply_to: message.email,
    subject: message.subject,
    text: `Message from ${message.email}\n\n${message.message}`,
  });
  assert.equal(options.headers.Authorization, `Bearer ${configuration.RESEND_API_KEY}`);
  assert.equal(options.headers['Idempotency-Key'], `portfolio-contact/${message.requestId}`);
  assert.ok(options.signal instanceof AbortSignal);
  assert.equal(response.headers['cache-control'], 'no-store');
  assert.equal(response.headers['x-content-type-options'], 'nosniff');
  assert.deepEqual(endpoint.logs, []);
  assert.ok(!JSON.stringify(response).includes(configuration.RESEND_API_KEY));
});

test('Vercel-preparsed JSON follows the same validated delivery path', async () => {
  const endpoint = fixture();
  const response = await endpoint.dispatch(message, { parsed: true });
  assert.equal(response.status, 200);
  assert.equal(endpoint.calls.length, 1);
});

test('missing key or sender fails explicitly without a provider call', async () => {
  for (const env of [{}, { RESEND_API_KEY: configuration.RESEND_API_KEY }, { CONTACT_FROM: configuration.CONTACT_FROM }, { ...configuration, CONTACT_FROM: 'Bad\r\nFrom' }]) {
    const endpoint = fixture({ env });
    const response = await endpoint.dispatch();
    assert.equal(response.status, 503);
    assert.match(response.body.error, /not connected yet/);
    assert.equal(endpoint.calls.length, 0);
    assert.equal(endpoint.logs.length, 1);
    assert.ok(!JSON.stringify(endpoint.logs).includes(configuration.RESEND_API_KEY));
  }
});

test('field validation, honeypot, and invalid request IDs never contact the provider', async () => {
  const endpoint = fixture();
  for (const [field, value] of [['email', 'not-an-email'], ['subject', ' \n '], ['message', ''], ['subject', 'A'.repeat(121)], ['message', 'A'.repeat(2001)], ['email', 'a@example.com\r\nBcc: b@example.com']]) {
    const response = await endpoint.dispatch({ ...message, [field]: value });
    assert.equal(response.status, 400);
    assert.ok(response.body.errors[field]);
  }
  for (const payload of [{ ...message, website: 'https://spam.example' }, { ...message, website: [] }, { ...message, requestId: undefined }, { ...message, requestId: 'bad\r\nkey' }]) {
    assert.equal((await endpoint.dispatch(payload)).status, 400);
  }
  assert.equal(endpoint.calls.length, 0);
});

test('method, origin, and content type are enforced', async () => {
  const endpoint = fixture();
  const get = await endpoint.dispatch(message, { method: 'GET' });
  assert.equal(get.status, 405);
  assert.equal(get.headers.allow, 'POST');
  for (const origin of [undefined, 'null', 'https://another.example', 'file://portfolio.example']) {
    assert.equal((await endpoint.dispatch(message, { headers: { origin } })).status, 403);
  }
  assert.equal((await endpoint.dispatch(message, { headers: { 'content-type': 'text/plain' } })).status, 415);
  assert.equal(endpoint.calls.length, 0);
});

test('malformed, non-object, and oversized JSON are rejected, including preparsed requests', async () => {
  const endpoint = fixture();
  for (const payload of ['not json', '', 'null', '[]', '"a string"']) assert.equal((await endpoint.dispatch(payload)).status, 400);
  const oversized = { ...message, message: 'A'.repeat(17 * 1024) };
  assert.equal((await endpoint.dispatch(oversized)).status, 413);
  assert.equal((await endpoint.dispatch(oversized, { parsed: true })).status, 413);
  assert.equal(endpoint.calls.length, 0);
});

test('best-effort rate limiting rejects the sixth request and expires its window', async () => {
  let time = 1000;
  const endpoint = fixture({ now: () => time });
  for (let i = 0; i < 5; i++) {
    assert.equal((await endpoint.dispatch(message, { headers: { 'x-forwarded-for': `192.0.2.${i}` } })).status, 200);
  }
  const limited = await endpoint.dispatch();
  assert.equal(limited.status, 429);
  assert.equal(limited.headers['retry-after'], '600');
  assert.equal(endpoint.calls.length, 5);
  time += 600001;
  assert.equal((await endpoint.dispatch()).status, 200);
});

test('Vercel uses its platform-provided client address and fails closed if it is absent', async () => {
  const endpoint = fixture({ env: { ...configuration, VERCEL: '1' } });
  assert.equal((await endpoint.dispatch()).status, 503);
  assert.equal(endpoint.calls.length, 0);
  assert.equal((await endpoint.dispatch(message, { headers: { 'x-forwarded-for': '192.0.2.25' } })).status, 200);
});

test('retries carry the same provider idempotency key', async () => {
  const endpoint = fixture();
  await endpoint.dispatch();
  await endpoint.dispatch();
  assert.equal(endpoint.calls[0][1].headers['Idempotency-Key'], endpoint.calls[1][1].headers['Idempotency-Key']);
});

test('provider errors stay errors and do not expose response content or credentials', async () => {
  for (const [providerStatus, expectedStatus] of [[400, 502], [401, 503], [403, 503], [429, 429], [500, 502]]) {
    const endpoint = fixture({ provider: () => new Response('private provider diagnostics', { status: providerStatus }) });
    const response = await endpoint.dispatch();
    assert.equal(response.status, expectedStatus);
    assert.equal(response.body.status, undefined);
    assert.ok(response.body.error);
    assert.ok(!JSON.stringify(response).includes('private provider diagnostics'));
    assert.ok(!JSON.stringify(endpoint.logs).includes(configuration.RESEND_API_KEY));
    if (providerStatus === 429) assert.equal(response.headers['retry-after'], '60');
  }
});

test('provider timeout and network failure cannot become success', async () => {
  for (const [error, status] of [[new DOMException('Private timeout detail', 'TimeoutError'), 504], [new TypeError('Private network detail'), 502]]) {
    const endpoint = fixture({ provider: () => { throw error; } });
    const response = await endpoint.dispatch();
    assert.equal(response.status, status);
    assert.match(response.body.error, /Could not confirm sending/);
    assert.ok(!JSON.stringify(endpoint.logs).includes('Private'));
  }
});

test('an HTTP 200 without a valid provider acceptance ID is not success', async () => {
  for (const body of ['not json', '{}', '{"id":null}', '{"id":42}', '{"id":""}']) {
    const endpoint = fixture({ provider: () => new Response(body) });
    assert.equal((await endpoint.dispatch()).status, 502);
  }
});

test('the handler works over a real local HTTP connection with a mocked provider', async (context) => {
  const endpoint = fixture();
  const server = createServer(endpoint.handler);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  context.after(() => new Promise((resolve) => server.close(resolve)));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const response = await fetch(`${origin}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: origin },
    body: JSON.stringify(message),
  });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'accepted' });
  assert.equal(endpoint.calls.length, 1);
});
