# c-3po
[![NPM](https://nodei.co/npm/c-3po.png?downloads=true)](https://nodei.co/npm/c-3po/)

# javascript localization library based on es6 tagged templates

### Quick demo - https://jsfiddle.net/AlexMost/9wuafbL5/6/

## Installation

```bash
npm install --save c-3po
npm install --save-dev babel-plugin-c-3po
```

## Documentation - [https://c-3po.js.org](https://c-3po.js.org)

## Usage example
```js
import { t, ngettext, msgid } from 'c-3po'

// formatted strings
const name = 'Mike';
const helloMike = t`Hello ${name}`;

// plurals (works for default locale out of the box)
const n = 5;
const msg = ngettext(msgid`${ n } task left`, `${ n } tasks left`, n)
```

## Tutorials
* [Quick Start](https://c-3po.js.org/quick-start.html)
* [Localization with webpack and c-3po](https://c-3po.js.org/localization-with-webpack-and-c-3po.html)
