import test from 'ava';
import caw from 'caw';
import resolveRecord, { DNSError } from './';

// this is required for corporate or CI proxies
const requestOptions = Object.freeze({ agent: caw({ protocol: 'https' }) });

const STATUS_NOERROR = 0;

test('simple resolve', async t => {
  const response = await resolveRecord('google.com', 'A', { requestOptions });

  t.is(response.Status, STATUS_NOERROR, 'Status is NOERROR');

  t.truthy(
    response.Answer && response.Answer.length,
    'There is at least on record'
  );
});

test('non-existing domain', async t => {
  await t.throws(
    resolveRecord('does-not-exist', 'A', {
      requestOptions
    }),
    DNSError
  );
});
