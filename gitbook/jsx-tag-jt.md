# jt \(jsx-tag\)

### Overview
jt is working in the same way as [t](tag-gettext--t-.md) but allows you to
use jsx elements in tagged template expressions.

### Usage:

```jsx harmony
import { jt } from 'c-3po';

function test() {
    const btn = <button>{ t`me` }</button>;
    return <span>{jt`Click ${ btn }`}</span>
}
```

### 'jt' format {#tag-gettext-format}

To make localized strings more clear and reliable for translators there are some restrictions on expressions that can be used inside string template. Here are allowed expressions formats.

**Valid:**

```js
jt`Hello Mike`                       // valid.
jt`Hello ${ name }`                  // valid. (identifiers are allowed)

const btn = <button>{ t`me` }</button>
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
import { t } from 'c-3po';
const name = 'Mike';
console.log(t`Hello ${name}`);
```

```po
#: src/source.js:8
msgid "Hello ${ 0 }"
msgstr ""
```

You can see that 'name' expression is displayed as a { 0 }. This is happening for a reason to make it possible to match strings in a runtime \(without compilations step\). In a runtime tag function doesn't have information about the name of literal in expression, it just has expression value, so it's reasonable to use numbers instead.

### Resolve translation

From the example above, let's assume that translator added translation to .po file:

```po
#: src/source.js:8
msgid "Hello ${ 0 }"
msgstr "Hello ${ 0 } [translated]"
```

The resulting compiled file will contain this:

```js
import { t } from 'c-3po'
const name = 'Mike'
console.log(`Hello ${ name } [translated]`)
```

If there are no expressions inside template, then c-3po will resolve translation as a simple string.

### Default resolve

By default, if no translation was found, c-3po will just strip 't' tag before tagged template.

