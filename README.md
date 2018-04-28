# c-3po
[![travis](https://api.travis-ci.org/c-3po-org/c-3po.svg?master)](https://travis-ci.org/c-3po-org/c-3po) [![codecov](https://codecov.io/gh/c-3po-org/c-3po/branch/master/graph/badge.svg)](https://codecov.io/gh/c-3po-org/c-3po)

[![NPM](https://nodei.co/npm/c-3po.png?downloads=true)](https://nodei.co/npm/c-3po/)

> :warning: This project [will soon be renamed to `ttag`](https://github.com/c-3po-org/c-3po/issues/105).
> Some of the talks, presentations, and documentation _may_ reference it with both names. The current
> version published on NPM doesn't change any APIs yet.


## Modern javascript i18n localization library based on ES6 tagged templates and the good old GNU gettext

## Key features
* Uses ES6 template literals for string formatting (no need for sprintf).
* Contexts [support](https://c-3po.js.org/contexts.html)
* It can precompile translations on a build step.
* Plurals support [ngettext](https://c-3po.js.org/ngettext.html).
* It can be integrated in any build tool that works with babel.
* Has options for both efficient [development and production setups](https://c-3po.js.org/localization-with-webpack-and-c-3po.html).
* Has a builtin [validation](https://c-3po.js.org/validation.html) for translated strings format.
* It can use any default locale in sources (not only English).
* Handles [React (jsx) translations](jsx-tag-jt.md).

## Usage example
```js
import { t, ngettext, msgid } from 'c-3po'

// formatted strings
const name = 'Mike';
const helloMike = t`Hello ${name}`;

// plurals (works for en locale out of the box)
const n = 5;
const msg = ngettext(msgid`${ n } task left`, `${ n } tasks left`, n)
```

## Installation

```bash
npm install --save c-3po
npm install --save-dev babel-plugin-c-3po
```

**c-3po babel plugin** - [https://github.com/c-3po-org/babel-plugin-c-3po](https://github.com/c-3po-org/babel-plugin-c-3po)

## Usage from CDN

[https://unpkg.com/c-3po/dist/c3po.min.js](https://unpkg.com/c-3po/dist/c3po.min.js)

> This project is designed to work in pair with [babel-plugin-c-3po](https://github.com/c-3po-org/babel-plugin-c-3po).  
> But you can also play with it [without transpilation](https://c-3po.js.org/translations-without-transpile.html).

## Useful links
* [Documentation](https://c-3po.js.org)
* [Changelog](https://c-3po.js.org/CHANGELOG.html)
* [Migration guide](MIGRATION.md)
* [Quick view on JsFiddle playground](https://jsfiddle.net/AlexMost/9wuafbL5/11/)

## Tutorials
* [Quick Start](https://c-3po.js.org/quick-start.html)
* [Localization with webpack](https://c-3po.js.org/localization-with-webpack-and-c-3po.html)

## Slides from talks
* [Kyivjs 2017](https://docs.google.com/presentation/d/1oj6ZaXfIfcClROe-4kOMMjnXFExn1gUfF6D30VyznWs/edit?usp=sharing)
* [Odessajs 2017](https://docs.google.com/presentation/d/1XB82-hTLQxP456Bk8UWJb-tZBsHnUHp4lJzmQorxNgs/edit?usp=sharing)

## Talks
* [Odessajs 2017 (video)](https://www.youtube.com/watch?v=9QjzpfA9LH4)


