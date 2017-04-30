# Pretty Logs

[![Build Status](https://travis-ci.org/tkjone/pretty-logs.svg?branch=master)](https://travis-ci.org/tkjone/pretty-logs)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![codecov](https://codecov.io/gh/tkjone/pretty-logs/branch/master/graph/badge.svg)](https://codecov.io/gh/tkjone/pretty-logs)


Welcome to `pretty-logs`.  `pretty-logs` is a JavaScript logging tool.

**WARNING:**

This library is rough and untested.  Please do not use in production until I actually have the opportunity to clean things up.

## Quickstart

```js
npm install pretty-logs
```

## Usage

To be written...

## Motivation

This library was created because I became tired of moving my custom rolled logging library from project-to-project.
I wanted this to be an easy way to use this minimal library in my future projects and pick up on the improvements I make as i go.  I also
wanted to work with open source projects and attempt to maintain my own.

## Contributing

I am always happy to have people contribute to this project.  Please start by reading this projects code of conduct.

### Development

After you have cloned this repo and installed the npm dependencies, it is a good practice to run `npm run validate`.  This script is going to run prettier and the tests.

We also have a pre-commit git hook, which runs when you run `git commit` locally.  At this point, prettier is going to run and write in place. Big thanks to [husky](https://github.com/typicode/husky) which help make this process very easy.
