# Protokit

A prototyping playground combining React + Mantine + design tokens + MSW + xstate.

## Installation

Clone the repo:

```bash
git clone https://github.com/esmevane/protokit
```

## Setup

This kit leverages MSW for network mocking. MSW uses service workers to intercept network IO and operate on it, allowing us to run a purely front-end experience without needing any sort of backing implementation. However, the service worker API is only available behind HTTPS, and then only validated HTTPS connections - meaning in order to run this kit, we'll need to set up our localhost with valid SSL certs.

The [official docs][cra-https] tell you how to accomplish that through using an `.env.local` file which looks something like this:

```env
HTTPS=true
```

However, simply following the official docs will leave you with a half-complete setup. In order to finish things, you'll need to create a local certificate authority and use it to make local certs. You can read more [here][full-setup]. Following that tutorial will leave you with something like this:

```env
HTTPS=true
SSL_CRT_FILE=./tmp/certs/cert.pem
SSL_KEY_FILE=./tmp/certs/key.pem
```

**Note:** It may make sense for you to put the certs from the above guide in your user root, instead of per-project. If so, you'll need to expand your home alias by hand, using `$HOME` instead of `~`, like so:

```env
HTTPS=true
SSL_CRT_FILE=$HOME/.dev-certs/cert.pem
SSL_KEY_FILE=$HOME/.dev-certs/key.pem
```

[cra-https]: https://create-react-app.dev/docs/using-https-in-development/
[full-setup]: https://www.freecodecamp.org/news/how-to-set-up-https-locally-with-create-react-app/
