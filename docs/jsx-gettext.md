---
id: jsx-gettext
title: jt (jsx gettext)
---

`jt` is working in the same way as [t](reference-t-tag.md) but allows you to
use jsx elements in tagged template expressions. The biggest difference between `jt` and `t` is that `t` concatenates translations and expressions all together into a single string, while `jt` returns **an array** of translated strings and expressions.

This tag is useful if you are building your UI with React (or another lib that uses jsx).

## Usage:

```jsx
import { jt } from 'ttag';

function Button() {
    const btn = <button key="btn">{ t`me` }</button>;
    return <span>{jt`Click ${ btn }`}</span>
}
```

## Try

https://jsfiddle.net/ravkuapg/7/

## Format

To make localized strings more clear and reliable for translators there are some restrictions on expressions that can be used inside string template. Here are allowed expressions formats.

### Valid

```js
jt`Hello Mike`                       // valid.
jt`Hello ${ name }`                  // valid. (identifiers are allowed)

const btn = <button key="btn">{ t`me` }</button>
jt`Click ${ btn }` // even though btn stores a jsx element, it is valid because `btn` is an identifier.
```

### Invalid

```js
jt`Hello ${getUserName()}` // function calls are not allowed.
jt``                       // empty strings are not allowed.
jt`${greeting} ${name}`    // strings that does not contain meaningful information are not allowed.
jt`Click ${ <button> me </button> }` // jsx expressions must be referenced through a variables 
```

## Extract

All translations can be extracted to `.po` file with `ttag-cli` tool.

```js
import { jt } from 'ttag';
jt`Click ${btn}`
```

```po
#: src/source.js:8
msgid "Click ${ btn }"
msgstr ""
```

## Resolve

From the example above, let's assume that translator added translation to .po file:

```po
#: src/source.js:8
msgid "Click ${ btn }"
msgstr "Click ${ btn } [translated]"
```

The resulting compiled file will contain this:

```js
import { jt } from 'ttag'
['Click ', btn, ' [translated]']
```

When put inside curly braces `{ }` within jsx context, the returned array will be [directly consumed by jsx](https://facebook.github.io/react/docs/lists-and-keys.html).

If the array item is a React element, you may need to [add `key` property on them](https://facebook.github.io/react/docs/lists-and-keys.html#keys) to get rid of the `key` prop warnings.

## Default resolve

By default, if no translation was found, ttag returns an array of the source strings and expressions.
