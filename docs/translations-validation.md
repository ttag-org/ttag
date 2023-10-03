---
id: translations-validation
title: Translations validation
---

One of the key features of the `ttag` library is the built-in validation of the translations format.
Validation is happening when `babel-plugin-ttag` is enabled in the babel configuration.

### Why do we need translations validation?

1. Making extracted translatable strings readable for the translator (nontechnical person).
2. Having control over which strings are not translated (CI integration for example).
3. Validating `ttag` functions calls with the appropriate format to prevent bugs.

## Format validation

Format validation errors are enabled for all tags and functions by default.

```js
import { t } from 'ttag';
function test(username) {
    return t`${username}`;
}
```

Error:

```bash
ERROR in ./app.js
Module build failed: SyntaxError: Can not translate '${ username }'

  1 | import { t } from 'ttag';
  2 | function test(username) {
> 3 |     return t`${username}`;
    |            ^
  4 | }
```

This error occurred because there is no meaningful information for the translator in `${ username }` string.

> More about the `t` tag format can be found in the [function reference](tag-gettext.html#format)

### Disabling format validation

You can disable validation by changing
[`extractors.[FunctionName].invalidFormat`](plugin-api.html#configextractors-functionname-invalidformat)
configuration value.

Example `.babelrc` file:

```json
{
    "plugins": [["ttag", { "extractors": { "tag-gettext": { "invalidFormat": "skip" } } }]]
}
```

## Missing translations

You can configure ttag to fail when some translation are not found. This setting is disabled by default.
This can be integrated somewhere on your CI workflow if you want to ensure that all strings
have appropriate translations inside `.po` files prior to a deply, for example.

Enable build failure by changing [`resolve.unresolved`](plugin-api.html#configresolveunresolved)
configuration value.

Example:

```json
{
    "plugins": [["ttag", { "translations": "uk.po", "unresolved": "fail" }]]
}
```

Error:

```bash
Module build failed: SyntaxError: No "unresolved" in "uk.po" file

  1 | import { ngettext, msgid, t } from 'ttag';
  2 | function test(username) {
> 3 |     return t`unresolved`;
    |            ^
  4 | }

```
