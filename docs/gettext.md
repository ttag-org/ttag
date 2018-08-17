---
id: gettext
title: gettext
---

> Consider using [the `t`](reference-t-tag.md) function \(less code, supports template expressions\)

## Usage

```js
import { gettext } from 'ttag'

gettext('simple gettext');
```

## Try

https://jsfiddle.net/AlexMost/us7hufjr/3/

## Format

### Valid

```js
gettext('simple gettext')
```

### Invalid

```js
gettext(`template literal`) // template literals are not supported
gettext('one', 'two') // gettext supports only 1 argument
```

## Extract

All translations can be extracted to `.po` file with `ttag-cli` tool.

```js
import { gettext } from 'ttag';

gettext('Hello');
```

will be extracted to this:

```
msgid "Hello"
msgstr ""
```

## Resolve
Suppose we have translated phrase in `.po`:

```
msgctxt "email"
msgid "Hello"
msgstr "Вітаємо"
```

The result js for uk locale will be

```js
gettext('Вітаємо').
```
