# Pretty Logs

[![Build Status](https://travis-ci.org/tkjone/pretty-logs.svg?branch=master)](https://travis-ci.org/tkjone/pretty-logs)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![codecov](https://codecov.io/gh/tkjone/pretty-logs/branch/master/graph/badge.svg)](https://codecov.io/gh/tkjone/pretty-logs)


Welcome to `pretty-logs`.  `pretty-logs` is a JavaScript logging tool.

**WARNING:**

This library is rough and untested.  Please do not use in production until I actually have the opportunity to clean things up.

* [Quickstart](#quickstart)
* [Usage](#usage)
* [Motivation](#motivation)
* [Contributing](#contributing)
* [Development](#development)
* [Development](#development)
  * [Commit Message Conventions](#commit-message-conventions)
  * [Git Hooks](#git-hooks)
* [Notes](#notes)

## Quickstart

```js
npm install pretty-logs
```

## Usage

To be written...

```js
import { logError } from 'pretty-logs';

logError('Auth', 'Login failed', { email: user.email });
```

## Motivation

This library was created because I became tired of moving my custom rolled logging library from project-to-project.
I wanted this to be an easy way to use this minimal library in my future projects and pick up on the improvements I make as i go.  I also
wanted to work with open source projects and attempt to maintain my own.

## Contributing

I am always happy to have people contribute to this project.  Please start by reading this projects code of conduct.

## Development

After you have cloned this repo and installed the npm dependencies, it is a good practice to run `npm run validate`.  This script is going to run prettier and the tests.

### Commit Message Conventions

The following naming convention guideline has be adapted based on [Angular Commit Convention](https://github.com/conventional-changelog-archived-repos/conventional-changelog-angular/blob/master/convention.md).

All commit messages have a ***Header***, ***Body*** and ***Footer***.  Here is an example of the structure of our commit messages:

```bash
{TYPE}({SCOPE}): - {SUBJECT} # header
# blank line
{Body here}                  # body
# blank line
{Footer here}                # footer
```

**Header**

The header should be no longer than 50 characters and should follow the following formatting:

```bash
# format
{TYPE}({SCOPE}): - {SUBJECT}

# example
fix(users) - Allow users to save signin token
```

There are `main` and `sub` `TYPES`.  The difference between the two is that `main TYPE`s will appear in the changelog while `sub TYPE`s do not.

The `main TYPE`s are:

* `BREAKING CHANGE` - major
* `feat` - minor
* `fix`  - patch
* `perf` - patch

The `sub TYPE`s are:

* `docs`
* `chore`
* `style`
* `refactor`
* `test`

There are also scopes, here are some of the scopes we have identified at the moment:

```bash
docs(contributing)
```

**Body**

The body is going to provide a more detailed description of what the commit is
about.  Remember, we would rather too much information, than too little.  Please
wrap the line after 80 characters.

```bash
# format
{Body here}

# example
Allow user to save their sign in token.  This was added because without this
functionality, the user would have to keep entering their credentials to use
protected routes.
```

**Footer**

This one is optional and usually used if there is a `BREAKING CHANGE` or if
it specifically closes a Github issue we can show that here.


```bash
# format
{Footer here}

# example
Closes PLNE-82
```

**Example**

```bash
PLNE-82: fix(users) - Allow users to save signin token

Allow the user to save their sign in token.  This was added because without this
functionality, the user would have to keep entering their credentials to use
protected routes.

Closes PLNE-82
```

### Git Hooks

We also have a pre-commit git hook, which runs when you run `git commit` locally.  At this point, prettier is going to run and write in place. Big thanks to [husky](https://github.com/typicode/husky) which help make this process very easy.

## Notes

This section just contains some knowledge that I acquired while developing/maintaining this library from an npm package perspective.  For example, running `npm version patch` will auto-incrememnt your package.json's `version` property.  Similiarly, you can swap `patch` for `minor` or `major`.  Very nice.

If you notice the version in our package.json is `"version": "0.0.0-semantically-released"` this is because we are handling this process with [semantinc-release-cli](https://github.com/semantic-release/cli)
