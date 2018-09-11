---
id: multiline-strings
title: Multiline strings
---

ttag provides reliable approach for working with multiline strings. For instance if we have this in our code:

```js
import { t } from 'ttag';

function test(name) {
   return t`multi line string
      with multiple line breaks and
      with formatting ${name}`
}
```

By default the quoted phrase will contain all indentation before each line, and all those tabs will be inside the `.po`
files and in a user content. To make things little bit easier, ttag removes all indentation before lines. So you will 
receive this in `.po` file:

```
#: src/multiline.js:7
msgid ""
"multi line string\n
"with multiple line breaks and\n
"with formatting"
msgstr ""
```

This behaviour can be changed with [`dedent`](plugin-api.html#configdedent) configuration.

```js
{
  dedent: false
}
```
