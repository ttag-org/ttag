# c-3po
--------

## Modern javascript i18n localization library based on es6 tagged templates and the good old GNU gettext

## Key features
* Uses es6 template literals for string formatting (no need for sprintf).
* Can precompile translations on a build step.
* Support for plurals [ngettext](ngettext.md)
* Contexts support [contexts](contexts.md)
* Uses babel plugin to extract and resolve translations, works with modern javascript AST.
* Can be integrated in any build tool that works with babel.
* Has options for both efficient [development and production setups](https://c-3po.js.org/localization-with-webpack-and-c-3po.html).
* Has a builtin [validation](https://c-3po.js.org/validation.html) for translated strings format.
* Can use any default locale in sources (not only English).
* Handles [React (jsx) translations](jsx-tag-jt.md).

### Tools:

The whole solution consists of 2 parts:

1. **c-3po library** - [https://github.com/c-3po-org/c-3po](https://github.com/c-3po-org/c-3po)
2. **c-3po babel plugin** - [https://github.com/c-3po-org/babel-plugin-c-3po](https://github.com/c-3po-org/babel-plugin-c-3po)

### How it looks like in the code:

Here is a usage of some **c-3po** functions:

```js
import { t, nt, ngettext, msgid } from 'c-3po'

// simple string literals
const hello = t`Hello c-3po`;

// formatted strings
const name = 'Mike';
const helloMike = t`Hello ${name}`;

// plurals (works for default locale out of the box)
const n = 5;
const msg = ngettext(msgid`${ n } task left`, `${ n } tasks left`, n)
```

c-3po library aims to provide the most natural and reliable way to translate strings in a javascript sources. it provides some helper functions \(tags\) for making javascript templates translatable with all their shiny 
features like string interpolation, multiline e.t.c.

## Useful Links
* [Changelog](CHANGELOG.md)
* [Migration guide](MIGRATION.md)

## Tutorials
* [Quick Start](https://c-3po.js.org/quick-start.html)
* [Localization with webpack and c-3po](https://c-3po.js.org/localization-with-webpack-and-c-3po.html)

## Slides from talks
* [Kyivjs 2017](https://docs.google.com/presentation/d/1oj6ZaXfIfcClROe-4kOMMjnXFExn1gUfF6D30VyznWs/edit?usp=sharing)
* [Odessajs 2017](https://docs.google.com/presentation/d/1XB82-hTLQxP456Bk8UWJb-tZBsHnUHp4lJzmQorxNgs/edit?usp=sharing)

## Talks
* [Odessajs 2017 (video)](https://www.youtube.com/watch?v=9QjzpfA9LH4)
