---
id: aliasing
title: Aliasing
---

If you want to use different functions names inside your code, you can use aliases as a valid es6 
syntax. This translation can still be recognized and extracted by `ttag-cli` and `babel-plugin-ttag`:

## es6 import

```js
import { t as i18n } from 'ttag'

i18n`this translation will work`
```

## commonjs require

```js
const { t: i18n } = require('ttag');

i18n`this translation will work`
```
