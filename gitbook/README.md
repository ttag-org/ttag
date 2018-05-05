# ttag
------

> This project was [formely named `c-3po`](https://github.com/ttag-org/ttag/issues/105) and later on renamed to `ttag`.
> Some of the talks, presentations, and documentation _may_ still reference it by the old name.
> All new features will be applied to `ttag` package, the old `c-3po` packages will be supported only with bugfixes.
> Follow this simple [migration guide](/MIGRATION.html#101)

## Modern javascript i18n localization library based on ES6 tagged templates and the good old GNU gettext

## Key features
* Uses ES6 [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
  for string formatting (no need for `sprintf`).
* It can precompile translations on a build step.
* [Support for plurals](reference-ngettext.md) with `ngettext`
* Standard gettext [contexts](reference-contexts.md) supported
* Uses a [babel plugin](https://github.com/ttag/babel-plugin-tag) to extract and resolve translations,
  works with modern javascript AST.
* It can be integrated in any build tool that works with babel.
* Has options for both efficient [development and production setups](localization-with-webpack.md).
* Has a built-in [validation](validation.md) for translated strings format.
* It can use any default locale in sources (not only English).
* Handles [React (jsx) translations](reference-jt-tag.md).

#### Live example https://jsfiddle.net/0atw0hgh/

### Tools:

The whole solution consists of 2 parts:

1. **ttag library** - [https://github.com/ttag/ttag](https://github.com/ttag/ttag)
2. **ttag babel plugin** - [https://github.com/ttag/babel-plugin-ttag](https://github.com/ttag/babel-plugin-ttag)

### How it looks like in the code:

Here is a usage of some **ttag** functions:

```js
import { t, nt, ngettext, msgid } from 'ttag'

// simple string literals
const hello = t`Hello ttag`;

// formatted strings
const name = 'Mike';
const helloMike = t`Hello ${name}`;

// plurals (works for default locale out of the box)
const n = 5;
const msg = ngettext(msgid`${ n } task left`, `${ n } tasks left`, n)
```

The `ttag` library aims to provide the most natural and reliable way to translate strings in JavaScript sources. It 
provides some helper functions (tags) for making JavaScript templates as translatable with all their shiny 
features like string interpolation, multiline etc.

## Useful Links
* [Changelog](CHANGELOG.md)
* [Migration guide](MIGRATION.md)

## Tutorials
* [Quick start](quick-start.md)
* [Localization with webpack and ttag](localization-with-webpack.md)

## Slides from talks
* [Kyivjs 2017](https://docs.google.com/presentation/d/1oj6ZaXfIfcClROe-4kOMMjnXFExn1gUfF6D30VyznWs/edit?usp=sharing)
* [Odessajs 2017](https://docs.google.com/presentation/d/1XB82-hTLQxP456Bk8UWJb-tZBsHnUHp4lJzmQorxNgs/edit?usp=sharing)

## Talks
* [Odessajs 2017 (video)](https://www.youtube.com/watch?v=9QjzpfA9LH4)
