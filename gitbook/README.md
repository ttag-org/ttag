# c-3po

**c-3po** is an awesome solution for localizing your javascript assets. It works closely with **GNU gettext** utility and doesn't aim to reimplement it's features, it just provides reliable **gettext** extraction features and can be used to resolve translations from **.po** files right into your sources. The key difference from existing solutions is that **c-3po** can produce a localized assets \(already with translated strings placed right into the code\).

### Features:

The core features of this tool are:

1. Works with GNU **gettext** tool \(.po files\).
2. Use es6 tagged templates syntax for string formatting \(no extra formatting rules, no sprintf e.t.c\).
3. The most intelligent **gettext** functions extraction from javascript sources \(babel plugin\).
4. Resolves translations from .po files right into your code \(no runtime extra work in browser\).
5. Works with everything that works with babel \(.jsx syntax for instance\).
6. Fast feedback loop \(alerts when some string is missing translation right at compile time\)
7. Designed to work with universal apps \(works on a backend and a frontend\).

### Tools:

The whole solution consists of 2 parts:

1. **c-3po library** - [https://github.com/c-3po-org/c-3po](https://github.com/c-3po-org/c-3po)
2. **c-3po babel plugin** - [https://github.com/c-3po-org/babel-plugin-c-3po](https://github.com/c-3po-org/babel-plugin-c-3po)

### How it looks like in code:

Here is a usage of some **c-3po** functions:

```js
import { t, nt, ngettext, msgid } from 'c-3po'

// simple string literals
const hello = t`Hello c-3po`;

// formatted strings
const name = 'Mike';
const helloMike = t`Hello ${name}`;

// plurals (works for default locale out of the box)
const n = 5;
const msg = ngettext(msgid`${ n } task left`, `${ n } tasks left`, n)

// plurals (just one form, other forms will be inside .po files)
const n = 5;
const msg = nt(n)`You have completed ${n} tasks`
```

c-3po library aims to provide the most natural and reliable way to translate strings in a javascript sources. it provides some helper functions \(tags\) for making javascript templates translatable with all their shiny features like string interpolation, multiline e.t.c.

