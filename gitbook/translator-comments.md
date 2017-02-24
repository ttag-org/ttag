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

## Recursive comments lookup
c-3po will lookup for comments until it reaches some declaration or statement.
This can be useful when commenting a group of keys:

```js
export const keyToNames = (key) => {
  // t: Action name in page OOO.
  const MAPPING = {
    key1: t`Something`,
    key2: t`Another Thing`,
    key3: t`Yet another thing`,
  };

  return MAPPING[key] || key;
};

// or

export const OPTIONS = /* t: option names */ fromJS([
  {label: t`option 1`, value: 1}, // ...
])
```
