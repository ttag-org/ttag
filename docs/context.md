---
id: context
title: c (context)
---

ttag supports gettext's standard context feature.
The same word can have multiple translations, depending on the usage context.

You can use `c` with any of ttag functions: `t`, `jt`, `ngettext`, `gettext`.

> If provided context is not found in your translations then default will be used.

## Usage

```js
import { c } from 'ttag';

c('email').t`Hello ${name}`;
c('email').jt`Hello ${name}`;
c('email').ngettext(msgid`${n} banana`, `${n} bananas`, n);
c('email').gettext('Hello');
```

## Try

https://jsfiddle.net/AlexMost/tqqxut52/3/

## Example

For instance, we can have different translations for the same phrase
`Hello ${ name }`. Depending on the context, there may be reasons
to translate this phrase differently whether we are on email or on profile page.

```js
import { c, t } from 'ttag';

c('email').t`Hello ${name}`; // email context

c('profile').t`Hello ${name}`; // profile context

t`Hello ${name}`; // default context
```

`.po` file (example for Ukrainian translations):

```
msgid "Hello ${ name }"
msgstr "Привіт ${ name }"

msgctxt "email"
msgid "Hello ${ name }"
msgstr "Вітаємо ${ name }"

msgctxt "profile"
msgid "Hello ${ name }"
msgstr "Здоровенькі були ${ name }"
```

## Format

> The `c` function only accepts a string identifying the context. Any other value will result in an
> error

### Valid

```js
c('email').t`Hello ${name}`;
c('email').jt`Hello ${name}`;
c('email').ngettext(msgid`${n} banana`, `${n} bananas`, n);
c('email').gettext('Hello');
```

### Invalid

```js
c(fn()).t`Hello ${name}`;
c().t`Hello ${name}`;
c(111).t`Hello ${name}`;
```

> In this case ttag will throw Exception in debug mode (NODE_ENV !== 'production')

## Extract

All translations can be extracted to `.po` file with `ttag-cli` tool.

```js
import { c, t } from 'ttag';

c('email').t`Hello ${name}`; // email context
```

will be extracted to this:

```
msgctxt "email"
msgid "Hello ${ name }"
msgstr ""
```

## Resolve

Suppose we have translated phrase in `.po`:

```
msgctxt "email"
msgid "Hello ${ name }"
msgstr "Вітаємо ${ name }"
```

The result js for uk locale will be

```js
t`Вітаємо ${ name }`.
```

As you can see, the appropriate translation phrase is on it's place and all context calls are stripped.
