# Migration guide
Migration guide for the `ttag` and `babel-plugin-ttag`

> This project was [formely named `c-3po`](https://github.com/ttag-org/ttag/issues/105) and some of the
> changes here only apply _before_ the project was renamed to `ttag`

## 1.0.0

The project was renamed from `c-3po` to `ttag`: all references to the old project name have to be 
changed to use the `ttag` package name on both installation and code usage:  

**Before**:

```bash
npm install -g c-3po-cli
npm install --save c-3po
npm install --save-dev babel-plugin-c-3po
```

**After:**

```bash
npm install -g ttag-cli
npm install --save ttag
npm install --save-dev babel-plugin-ttag
```

On you code base, the following should be changed:
```javascript
// Before
import { t } from 'c-3po'

// After
import { t } from 'ttag'
```

## from `0.4.x` to `0.5.x`

---

#### c-3po lib
* `nt` tag is removed and no longer supported

#### babel-plugin-c-3po
* Uses validation by default, even if no config is provided.
* `nt` tag is no longer extracted.
* It doesn't make transformations for the default locale by default.
  You need to set [`resolve.translations`](/configuration.html#configresolvetranslations-string) 
  property in the configuration:
  ```js
  { "resolve": { "translations": "default" } }
  ```
