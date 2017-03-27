# t \(tag-gettext\) {#tag-gettext}

### Overview {#tag-gettext-overview}

Tagged **gettext** function is used almost as a simple GNU **gettex**t function but with possibility to embed some expressions inside the templates.

## Live demo
> this demo works without transpile step, consider using babel-plugin-c-3po for production usage

https://jsfiddle.net/AlexMost/5vu9ep2c/1/

### Usage:

```js
import { t } from 'c-3po';

function hello(name) {
  return t`Hello ${name}`
}
```

### 't' format {#tag-gettext-format}

To make localized strings more clear and reliable for translators there are some restrictions on expressions that can be used inside string template. Here are allowed expressions formats.

**Valid:**

```js
t`Hello Mike`                       // valid.
t`Hello ${ name }`                  // valid. (identifiers are allowed)
t`simple string ${this.props.name}` // valid. (member expressions are also allowed)

const f = (arg) => {                // multiline strings will be dedented (by default)
  return t`multiline                // so translator will not see extra tabs or spaces before each line.
    strings                         
    are supported`
}
```

**Invalid:**

```js
t`Hello ${getUserName()}` // function calls are not allowed.
t``                       // empty strings are not allowed.
t`${greeting} ${name}`    // strings that does not contain meaningful information are not allowed.
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
msgid "Hello ${ name }"
msgstr ""
```

### Resolve translation

From the example above, let's assume that translator added translation to .po file:

```po
#: src/source.js:8
msgid "Hello ${ name }"
msgstr "Hello ${ name } [translated]"
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

