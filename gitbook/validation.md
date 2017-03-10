# Translations validation with babel-c-3po-plugin

One of the key features of *c-3po* library is the built-in validation of the translations format.
Validation is happening when the c-3po plugin is enabled in babel config.

### Why do we need translations validation?

1. Making extracted translatable strings readable for the translator (nontechnical person).
2. Having control over which strings are not translated (CI integration e.t.c).
3. Validating *c-3po* functions format to prevent bugs.

## Format validation
Format validation errors enabled for all tags and functions by default.

```js
import { t } from 'c-3po';
function test(username) {
    return t`${username}`;   
}
```
Error:

```bash
ERROR in ./app.js
Module build failed: SyntaxError: Can not translate '${ username }'

  1 | import { t } from 'c-3po';
  2 | function test(username) {
> 3 |     return t`${username}`;
    |            ^
  4 | }
```

This error occurred because there is no meaningful information for 
the translator in `${ 0 }` string.

> More about `t` tag format [here](tag-gettext--t-.md#tag-gettext-format)

### Disabling format validation
You can disable validation by `c-3po` config - [extractors.invalidFormat](configuration.md#configextractorsfunctionnameinvalidformat-string-one-of-fail-warn-skip)

Example .babelrc:
```json
{
 "plugins": [
    ["c-3po",
      {"extractors": { "tag-gettext": { "invalidFormat": "skip" }}}
    ]]
}
```

## Translations are not found
You can configure c-3po to fail when some translation is not found (disabled by default).
This can be integrated somewhere during CI job if you want to ensure that all strings
have appropriate translations inside .po files.

Example:
```bash
Module build failed: SyntaxError: No "unresolved" in "uk.po" file

  1 | import { ngettext, msgid, t } from 'c-3po';
  2 | function test(username) {
> 3 |     return t`unresolved`;
    |            ^
  4 | }

```

Config to enable this ([resolve.unresolved](configuration.md#configresolveunresolved-string-one-of-fail-warn-skip)):

```json
{
 "plugins": [
    ["c-3po",
      {"translations": "uk.po", "unresolved": 'fail'}
    ]]
}
```
