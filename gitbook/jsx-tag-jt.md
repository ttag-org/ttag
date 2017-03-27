# jt \(jsx-tag\)

### Overview
jt is working in the same way as [t](tag-gettext--t-.md) but allows you to
use jsx elements in tagged template expressions.
This tag is useful if you are building your UI with React (or another lib that uses jsx).

## Live demo
> this demo works without transpile step, consider using babel-plugin-c-3po for production usage

https://jsfiddle.net/ravkuapg/6/

### Usage:

```jsx
import { jt } from 'c-3po';

function Button() {
    const btn = <button>{ jt`me` }</button>;
    return <span>{jt`Click ${ btn }`}</span>
}
```

### 'jt' format {#tag-gettext-format}

To make localized strings more clear and reliable for translators there are some restrictions on expressions that can be used inside string template. Here are allowed expressions formats.

**Valid:**

```js
jt`Hello Mike`                       // valid.
jt`Hello ${ name }`                  // valid. (identifiers are allowed)

const btn = <button>{ jt`me` }</button>
jt`Click ${ btn }` // valid. jsx elements can be used as expressions.
```

**Invalid:**

```js
jt`Hello ${getUserName()}` // function calls are not allowed.
jt``                       // empty strings are not allowed.
jt`${greeting} ${name}`    // strings that does not contain meaningful information are not allowed.
jt`Click ${ <button> me </button> }` // jsx expressions must be referenced through a variables 
```

### .pot \(.po\) extraction {#pot-extraction}

Here is an example of what will be extracted to .pot

```js
import { jt } from 'c-3po';
jt`Click ${btn}`
```

```po
#: src/source.js:8
msgid "Click ${ btn }"
msgstr ""
```

### Resolve translation

From the example above, let's assume that translator added translation to .po file:

```po
#: src/source.js:8
msgid "Click ${ btn }"
msgstr "Click ${ btn } [translated]"
```

The resulting compiled file will contain this:

```js
import { jt } from 'c-3po'
jt`Click ${btn} [translated]`
```

If there are no expressions inside template, then c-3po will resolve translation as a simple string.

### Default resolve

By default, if no translation was found, c-3po will just strip 't' tag before tagged template.

