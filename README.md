# dns-over-https

[![Build Status](https://travis-ci.org/buschtoens/dns-over-https.svg)](https://travis-ci.org/buschtoens/dns-over-https)
[![npm version](https://badge.fury.io/js/dns-over-https.svg)](http://badge.fury.io/js/dns-over-https)
[![Download Total](https://img.shields.io/npm/dt/dns-over-https.svg)](http://badge.fury.io/js/dns-over-https)

Resolve DNS records via the [Google Public DNS HTTPS API](https://dns.google.com/query)

[Google Public DNS docs](https://developers.google.com/speed/public-dns/docs/dns-over-https)

## Installation

```
yarn add dns-over-https
```

## Usage

```js
import resolveRecord from 'dns-over-https';
import caw from 'caw';

(async () => {
  const a = await resolveRecord('google.com'); // resolves for A records

  const aaaa = await resolveRecord('google.com', 'AAAA'); // resolves for AAAA records

  const txt = await resolveRecord('google.com', 'TXT', {
    disableDNSSEC: true,
    EDNSClientSubnet: '0.0.0.0/0',

    // allows you to pass additional request headers
    headers: {
      'user-agent': 'custom'
    },

    // allows you to pass additional request options
    requestOptions: {
      agent: caw({ protocol: 'https' }) // enables proxy support
    }
  });
})();
```
