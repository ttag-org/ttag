# Message contexts

c-3po supports gettext's standard feature - contexts.
The same word can have multiple translations, depending on the usage context.

You can use `c` with any of c-3po functions: `t`, `jt`, `ngettext`, `gettext`.

> If provided context is not found in your translations then default will be used.

### Usage
```js
import { c } from 'c-3po';

c('email').t`Hello ${ name }`;
c('email').jt`Hello ${ name }`;
c('email').ngettext(msgid`${ n } banana`, `${ n } bananas`, n);
c('email').gettext('Hello');
```

#### Live example https://jsfiddle.net/AlexMost/tqqxut52/3/

### Example
For instance, we can have different translations for the same phrase
`Hello ${ name }`. Depending on the context, there may be reasons
to translate this phrase differently whether we are on email or on profile page.

```js
import { c, t } from 'c-3po';

c('email').t`Hello ${ name }`; // email context

// I think this syntax is also ok
c('profile')
.t`Hello ${ name }` // profile context

t`Hello ${ name }` // default context
```

.po file (example for Ukrainian translations):
```
msgid: "Hello ${ name }"
msgstr: "Привіт ${ name }"

msgid: "Hello ${ name }"
msgctx: "email"
msgstr: "Вітаємо ${ name }"

msgid: "Hello ${ name }"
msgctx: "profile"
msgstr: "Здоровенькі були ${ name }"
```

### Translations extract
```js
import { c, t } from 'c-3po';

c('email').t`Hello ${ name }`; // email context
```

will be extracted to this:

```
msgid: "Hello ${ name }"
msgctx: "email"
msgstr: ""
```

### Translations resolve
Suppose we have translated phrase in .po:

```
msgid: "Hello ${ name }"
msgctx: "email"
msgstr: "Вітаємо ${ name }"
```

The result js for uk locale will be

```js
t`Вітаємо ${ name }`.
```

As you can see, the appropriate translation phrase is on it's place and all context calls are stripped.

### c format

**valid:**

```js
c('email').t`Hello ${ name }`;
c('email').jt`Hello ${ name }`;
c('email').ngettext(msgid`${ n } banana`, `${ n } bananas`, n);
c('email').gettext('Hello');
```

**invalid:**

```js
c(fn()).t`Hello ${ name }`;
c().t`Hello ${ name }`;
c(111).t`Hello ${ name }`;
```

> In this case c-3po will throw Exception in debug mode (NODE_ENV !== 'production')
