# c-3po (WIP)
# javascript localization library based on javascript tagged templates

# Installation

```bash
npm install --save c-3po
npm install --save-dev babel-plugin-c-3po
```

> Here is an example of c-3po translations setup with webpack - [http://c-3po-org.github.io/c-3po-demo/](http://c-3po-org.github.io/c-3po-demo/)

# Documentation - [https://c-3po.js.org](https://c-3po.js.org)

# Usage example
```js
import { t, ngettext, msgid } from 'c-3po'

// formatted strings
const name = 'Mike';
const helloMike = t`Hello ${name}`;

// plurals (works for default locale out of the box)
const n = 5;
const msg = ngettext(msgid`${ n } task left`, `${ n } tasks left`, n)
```
