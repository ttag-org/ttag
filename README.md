# c-3po
[![NPM](https://nodei.co/npm/c-3po.png?downloads=true)](https://nodei.co/npm/c-3po/)

# javascript i18n localization library based on es6 tagged templates

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

## Key features
* Can resolve translations at [build](https://c-3po.js.org/localization-with-webpack-and-c-3po.html#step-3-extracting-translations) or runtime.
* Uses es2015 (es6) template literals for formatting.
* Compatible with GNU gettext utility format (.po, .pot files).
* Intelligent translations extraction (xgettext alternative).
* Builtin validation for translated strings format.


## Installation

```bash
npm install --save c-3po
npm install --save-dev babel-plugin-c-3po
```
### Quick demo - https://jsfiddle.net/AlexMost/9wuafbL5/7/
### Docs - [https://c-3po.js.org](https://c-3po.js.org)

## Tutorials
* [Quick Start](https://c-3po.js.org/quick-start.html)
* [Localization with webpack and c-3po](https://c-3po.js.org/localization-with-webpack-and-c-3po.html)
