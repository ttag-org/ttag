# jt \(jsx-tag\)

### Overview
jt is working in the same way as [t](tag-gettext--t-.md) but allows you to
use jsx elements in tagged template expressions.
This tag is useful if you are building your UI with React (or another lib that uses jsx).

The biggest difference between `jt` and `t` is that `t` concatenates translations and expressions all together into a single string, while `jt` returns **an array** of translated strings and expressions.

## Live demo
> this demo works without transpile step, consider using babel-plugin-c-3po for production usage

https://jsfiddle.net/ravkuapg/7/

### Usage:

```jsx
import { jt } from 'c-3po';

function Button() {
    const btn = <button key="btn">{ t`me` }</button>;
    return <span>{jt`Click ${ btn }`}</span>
}
```

### 'jt' format {#tag-gettext-format}

To make localized strings more clear and reliable for translators there are some restrictions on expressions that can be used inside string template. Here are allowed expressions formats.

**Valid:**

```js
jt`Hello Mike`                       // valid.
jt`Hello ${ name }`                  // valid. (identifiers are allowed)

const btn = <button key="btn">{ t`me` }</button>
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
['Click ', btn, ' [translated]']
```

When put inside curly braces `{ }` within jsx context, the returned array will be [directly consumed by jsx](https://facebook.github.io/react/docs/lists-and-keys.html).

If the array item is a React element, you may need to [add `key` property on them](https://facebook.github.io/react/docs/lists-and-keys.html#keys) to get rid of the `key` prop warnings.

### Default resolve

By default, if no translation was found, c-3po returns an array of the source strings and expressions.
