import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildMailtoUrl,
  buildWhatsAppUrl,
  isValidEmail,
  isValidOptionalPhone,
  validateContactForm,
} from './contactValidation';

test('isValidEmail accepts standard valid addresses and rejects malformed ones', () => {
  assert.equal(isValidEmail('aashirya12007@gmail.com'), true);
  assert.equal(isValidEmail('student.name+lab@srmu.ac.in'), true);
  assert.equal(isValidEmail(''), false);
  assert.equal(isValidEmail('plainaddress'), false);
  assert.equal(isValidEmail('user@domain'), false);
  assert.equal(isValidEmail('user@domain.c'), false);
  assert.equal(isValidEmail('user..name@domain.com'), false);
  assert.equal(isValidEmail('user name@domain.com'), false);
});

test('isValidOptionalPhone allows empty value and valid 10-15 digit numbers', () => {
  assert.equal(isValidOptionalPhone(''), true);
  assert.equal(isValidOptionalPhone('8009375166'), true);
  assert.equal(isValidOptionalPhone('+91 80093-75166'), true);
  assert.equal(isValidOptionalPhone('12345'), false);
  assert.equal(isValidOptionalPhone('abc8009375166'), false);
});

test('validateContactForm catches missing and invalid fields with specific messages', () => {
  const emptyResult = validateContactForm({
    name: ' ',
    email: '',
    phone: '',
    message: '',
  });
  assert.equal(emptyResult.isValid, false);
  assert.ok(emptyResult.errors.name);
  assert.ok(emptyResult.errors.email);
  assert.ok(emptyResult.errors.message);
  assert.equal(emptyResult.errors.phone, undefined);

  const badEmailResult = validateContactForm({
    name: 'Riya Verma',
    email: 'riya@invalid',
    phone: '999',
    message: 'Hello Aashirya, let us collaborate on a project.',
  });
  assert.equal(badEmailResult.isValid, false);
  assert.equal(badEmailResult.errors.name, undefined);
  assert.ok(badEmailResult.errors.email);
  assert.ok(badEmailResult.errors.phone);
  assert.equal(badEmailResult.errors.message, undefined);
});

test('validateContactForm sanitizes and accepts valid submission', () => {
  const result = validateContactForm({
    name: '  Riya   Verma  ',
    email: '  riya.verma@example.com ',
    phone: '+91 98765 43210',
    message: '  Would love to collaborate on a B.Tech data cleaning project.  ',
  });
  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
  assert.equal(result.sanitized.name, 'Riya Verma');
  assert.equal(result.sanitized.email, 'riya.verma@example.com');
  assert.equal(
    result.sanitized.message,
    'Would love to collaborate on a B.Tech data cleaning project.',
  );
});

test('buildWhatsAppUrl encodes number and custom message accurately', () => {
  const defaultUrl = buildWhatsAppUrl('918009375166');
  assert.ok(defaultUrl.startsWith('https://wa.me/918009375166?text='));
  assert.ok(decodeURIComponent(defaultUrl).includes('Hi Aashirya'));

  const customUrl = buildWhatsAppUrl('918009375166', 'Karan', 'Let us discuss Group 31 notes.');
  const decoded = decodeURIComponent(customUrl);
  assert.ok(decoded.includes('Karan'));
  assert.ok(decoded.includes('Group 31 notes'));
});

test('buildMailtoUrl creates properly formatted mailto link', () => {
  const mailto = buildMailtoUrl('aashirya12007@gmail.com', 'Riya', 'riya@example.com', 'Hello!');
  assert.ok(mailto.startsWith('mailto:aashirya12007@gmail.com?subject='));
  assert.ok(decodeURIComponent(mailto).includes('Riya'));
  assert.ok(decodeURIComponent(mailto).includes('riya@example.com'));
});
