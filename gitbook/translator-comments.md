# Adding comments for the translator

Developers can leave some meaningful comments for translator to provide more
information about the translation context.

Example:
```js
// translator: some description for the extracted string. 
t`some string`
```

Here is what we will see in the .po file after extraction:

```
#. some description for the extracted string
msgid "some string"
msgstr ""
```

c-3po provides 2 options for comments extraction:
1. Extract all leading comments before the translated expression.
2. Extract only tagged comments.

This option is disabled by default. You can enable it by [addComment](configuration.html#configaddcomments--boolean--string-)
configuration

