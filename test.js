import test from 'ava';
import resolveRecord, { DNSError } from './';

const STATUS_NOERROR = 0;

test('simple resolve', async t => {
  const response = await resolveRecord('google.com');

  t.is(response.Status, STATUS_NOERROR, 'Status is NOERROR');

  t.truthy(
    response.Answer && response.Answer.length,
    'There is at least on record'
  );
});

test('non-existing domain', async t => {
  await t.throws(resolveRecord('does-not-exist', 'A'), DNSError);
});
