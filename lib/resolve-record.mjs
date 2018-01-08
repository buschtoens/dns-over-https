import util from 'util';
import https from 'https';
import querystring from 'querystring';
import getStream from 'get-stream';
import module from '../package.json';
import DNSError from './dns-error';

const debug = util.debuglog('dns-over-https');

const get = options => new Promise(resolve => https.get(options, resolve));
const { stringify } = querystring;

const GOOGLE_HOST = 'dns.google.com';
const GOOGLE_ENDPOINT = 'resolve';

const STATUS_NOERROR = 0;

const USER_AGENT = `${module.name} v${module.version} via Node.js v${
  process.version
} on ${process.platform}`;

export default async function resolveRecord(
  name,
  type = 'A',
  {
    disableDNSSEC = false,
    EDNSClientSubnet = null,
    padding = false,

    headers = {},
    requestOptions = {}
  } = {}
) {
  const query = { name, type };

  if (disableDNSSEC) query.cd = 1;
  if (EDNSClientSubnet) query.edns_client_subnet = EDNSClientSubnet;

  if (padding)
    throw new Error(
      'Padding is not yet implemented. Open an issue or submit a PR.'
    );

  debug(query);

  const response = await get({
    host: GOOGLE_HOST,
    path: `/${GOOGLE_ENDPOINT}?${stringify(query)}`,
    headers: {
      'user-agent': USER_AGENT,
      ...headers
    },
    ...requestOptions
  });

  const body = await getStream(response);
  debug(body);

  const json = JSON.parse(body);
  debug(json);

  if (json.Status !== STATUS_NOERROR) throw new DNSError(query, json);

  return json;
}
