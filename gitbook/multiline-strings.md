# Multiline strings

> enabled by default

c-3po provides reliable approach for working with multiline strings. For instance we have this in our code:

```js
import { t } from 'c-3po';

function test(name) {
   return t`multi line string
      with multiple line breaks and
      with formatting ${name}`
}
```

By default the quoted phrase will contain all indentation before each line, and all those tabs will be inside .po files and in a user content. To make things little bit easier **c-3po** removes all indentation before lines. So you will receive this in .po file:

```
#: src/multiline.js:7
msgid ""
"multi line string\n
"with multiple line breaks and\n
"with formatting"
msgstr ""
```

> This behaviour can be disabled or enabled by **dedent **property in the config. \(by default it has a **true** value\).
>
> ```js
> {
>   dedent: false
> }
> ```



