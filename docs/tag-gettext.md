---
id: tag-gettext
title: t (gettext tag)
---

The `t` function (or [template literal tag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates)) 
is used almost as a simple GNU `gettext` function but with the possibility to embed some expressions inside
template literals.

## Usage:

```js
import { t } from 'ttag';

function hello(name) {
  return t`Hello ${name}`
}
```

## Try

https://jsfiddle.net/AlexMost/5vu9ep2c/1/

## Format

To make localized strings more clear and reliable for translators there are some restrictions on expressions that can 
be used inside string template. Here are allowed expressions formats.

### Valid

```js
t`Hello Mike`                       // valid.
t`Hello ${ name }`                  // valid. (identifiers are allowed)
t`simple string ${this.props.name}` // valid. (member expressions are also allowed)

const f = (arg) => {
// multiline strings will be dedented (by default)
// so translators will not see extra tabs or spaces before each line.
  return t`multiline                
    strings                         
    are supported`
}
```

### Invalid

```js
t`Hello ${getUserName()}` // function calls are not allowed.
t``                       // empty strings are not allowed.
t`${greeting} ${name}`    // strings that does not contain meaningful information are not allowed.
```

## Extract

All translations can be extracted to `.po` file with `ttag-cli` tool.

```js
import { t } from 'ttag';
const name = 'Mike';
console.log(t`Hello ${name}`);
```

```po
#: src/source.js:8
msgid "Hello ${ name }"
msgstr ""
```

## Resolve

From the example above, let's assume that translator added translation to .po file:

```po
#: src/source.js:8
msgid "Hello ${ name }"
msgstr "Hello ${ name } [translated]"
```

The resulting compiled file will contain this:

```js
import { t } from 'ttag'
const name = 'Mike'
console.log(`Hello ${ name } [translated]`)
```

If there are no expressions inside template, then ttag will resolve translation as a simple string.

## Default resolve

By default, if no translation was found, ttag will just strip `t` tag before the tagged template.

