import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import test from 'node:test';
import { certifications, contacts, experience, projects, skills, stats } from './resume.js';

test('all six real projects remain discoverable with substantive details', () => {
  assert.deepEqual(projects.map(({ id }) => id), [
    'cubeguide', 'sentinelflow', 'traffic', 'disease', 'math-genius', 'solveit',
  ]);
  for (const project of projects) {
    assert.ok(project.description.length > 100, project.id);
    assert.ok(project.highlights.length >= 4, project.id);
    assert.ok(project.tags.length >= 4, project.id);
  }
});

test('CubeGuide has its verified live and source destinations', () => {
  const cube = projects.find(({ id }) => id === 'cubeguide');
  assert.equal(cube.link, 'https://cubeguide-phi.vercel.app/');
  assert.equal(cube.repository, 'https://github.com/ass-ier/CubeGuide');
  assert.equal(cube.status, 'Live web app');
  assert.ok(cube.showcase);
  assert.ok(cube.highlights.some((text) => text.includes('stay on-device')));
});

test('SentinelFlow uses its live deployment without inventing a repository or project date', () => {
  const sentinel = projects.find(({ id }) => id === 'sentinelflow');
  assert.equal(sentinel.link, 'https://sentinel-flow-fawn.vercel.app/');
  assert.equal(sentinel.linkLabel, 'Open SentinelFlow');
  assert.equal(sentinel.repository, undefined);
  assert.equal(sentinel.period, undefined);
  assert.equal(sentinel.status, 'Live web app');
  assert.doesNotMatch(sentinel.description, /not (?:publicly )?deployed/i);
  assert.match(sentinel.description, /not a production SIEM/);
  assert.match(sentinel.caption, /Synthetic demonstration data/);
  assert.ok(sentinel.showcase);
});

test('original project dates and external link behavior are preserved', () => {
  const original = projects.filter(({ showcase }) => !showcase);
  assert.deepEqual(original.map(({ id, period }) => [id, period]), [
    ['traffic', 'Jun – Oct 2025'],
    ['disease', 'Aug – Sep 2024'],
    ['math-genius', 'May 2025'],
    ['solveit', 'Feb – Jun 2019'],
  ]);
  assert.match(original[0].link, /^https:\/\/www\.linkedin\.com\/feed\/update\/urn:li:activity:7403559510813958144\//);
  assert.equal(original[1].link, 'https://diseasesprediction.vercel.app/');
  assert.equal(original[2].link, null);
  assert.equal(original[3].link, null);
});

test('all displayed project images are local assets that exist', () => {
  for (const project of projects) {
    for (const key of ['image', 'imageSmall', 'detailImage']) {
      if (!project[key]) continue;
      assert.ok(project[key].startsWith('/images/'), `${project.id}: ${key}`);
      assert.ok(existsSync(new URL(`../../public${project[key]}`, import.meta.url)), `${project.id}: ${project[key]}`);
    }
  }
});

test('every project preview uses a real capture or an explicitly labeled concept illustration', () => {
  for (const project of projects) {
    if (project.image) {
      assert.ok(project.imageAlt);
      assert.ok(project.caption);
    } else {
      assert.ok(['traffic', 'learning', 'grading'].includes(project.study), project.id);
      assert.match(project.studyCaption, /Concept illustration/);
      assert.match(project.studyCaption, /not an application screenshot/);
    }
  }
});

test('career, skills, and original metrics stay complete', () => {
  assert.deepEqual(experience.map(({ company, role, period }) => [company, role, period]), [
    ['MMCY', 'IT Support Team Lead', 'Apr 2026 – Present'],
    ['MMCY', 'IT Support Specialist', 'Oct 2025 – Apr 2026'],
    ['Droga Consulting', 'UI/UX Designer / Frontend Engineer', 'Jun 2025 – Oct 2025'],
    ['FDRE Ministry of Mines', 'Junior Developer', 'Feb 2022 – Jun 2022'],
  ]);
  assert.equal(skills.length, 4);
  assert.equal(skills.flatMap(({ items }) => items).length, 24);
  assert.deepEqual(stats.map(({ value, suffix }) => `${value}${suffix}`), ['2+', '500+', '200+', '99%']);
  assert.deepEqual(stats.map(({ label }) => label), ['Years in IT', 'Users Managed', 'Incidents Resolved', 'Uptime SLA']);
});

test('credentials, awards, and verification destinations are preserved', () => {
  assert.equal(certifications.length, 5);
  assert.deepEqual(certifications.map(({ link }) => link), [
    'https://cp.certmetrics.com/comptia/en/public/verify/credential/5bea7de36f594c369ba247aef52088e7',
    'https://learn.microsoft.com/en-gb/users/assierantenehalemu-8808/credentials/cf0cc3251d0c6136?ref=https%3A%2F%2Fwww.linkedin.com%2F',
    'https://www.credly.com/badges/6c1625e0-6fa1-42fc-9e79-3895c214c0d6/linked_in_profile',
    null,
    null,
  ]);
});

test('the three supplied certificates have local responsive images without inventing award documents', () => {
  const illustrated = certifications.filter(({ image }) => image);
  assert.deepEqual(illustrated.map(({ id }) => id), ['comptia-cysa-004', 'az900', 'google-cyber']);
  for (const credential of illustrated) {
    for (const key of ['image', 'imageSmall']) {
      assert.ok(credential[key].startsWith('/images/certificates/'), `${credential.id}: ${key}`);
      assert.ok(existsSync(new URL(`../../public${credential[key]}`, import.meta.url)), `${credential.id}: ${key}`);
    }
    assert.ok(credential.imageWidth >= 800);
    assert.ok(credential.imageHeight > 0);
    assert.match(credential.imageAlt, /Assier Anteneh Alemu/);
    assert.ok(credential.link);
  }
  assert.ok(certifications.filter(({ link }) => !link).every(({ image }) => !image));
});

test('direct contact destinations remain exact', () => {
  assert.deepEqual(contacts.map(({ href }) => href), [
    'mailto:assieranteneh0306@gmail.com',
    'tel:+251929509800',
    'https://github.com/ass-ier',
    'https://www.linkedin.com/in/assieranteneh',
  ]);
});
