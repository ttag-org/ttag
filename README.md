# c-3po
[![travis](https://api.travis-ci.org/c-3po-org/c-3po.svg?master)](https://travis-ci.org/c-3po-org/c-3po) [![codecov](https://codecov.io/gh/c-3po-org/c-3po/branch/master/graph/badge.svg)](https://codecov.io/gh/c-3po-org/c-3po)

[![NPM](https://nodei.co/npm/c-3po.png?downloads=true)](https://nodei.co/npm/c-3po/)




## Modern javascript i18n localization library based on es6 tagged templates and the good old GNU gettext

## Key features
* Uses es6 template literals for string formatting (no need for sprintf).
* Can precompile translations on a build step.
* Uses babel plugin to extract and resolve translations, works with modern javascript AST.
* Can be integrated in any build tool that works with babel.
* Has options for both efficient [development and production setups](https://c-3po.js.org/localization-with-webpack-and-c-3po.html).
* Has a builtin [validation](https://c-3po.js.org/validation.html) for translated strings format.
* Can use any default locale in sources (not only English).
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

> This project is designed to work in pair with [babel-plugin-c-3po](https://github.com/c-3po-org/babel-plugin-c-3po)
But you can also play with it without transpile. Here is the [doc](https://c-3po.js.org/translations-without-transpile.html)
about how to use c-3po without babel transpilation.

## Useful links
* [Documentation](https://c-3po.js.org)
* [Changelog](https://c-3po.js.org/CHANGELOG.html)
* [Migration guide](MIGRATION.md)

## Tutorials
* [Quick Start](https://c-3po.js.org/quick-start.html)
* [Localization with webpack and c-3po](https://c-3po.js.org/localization-with-webpack-and-c-3po.html)

## Slides from talks
* [Kyivjs 2017](https://docs.google.com/presentation/d/1oj6ZaXfIfcClROe-4kOMMjnXFExn1gUfF6D30VyznWs/edit?usp=sharing)

### Quick view on Jsfiddle playground - https://jsfiddle.net/AlexMost/9wuafbL5/11/
