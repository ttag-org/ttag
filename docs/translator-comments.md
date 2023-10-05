---
id: translator-comments
title: Comments for translators
---

Developers can leave some meaningful comments for translators to provide more
information about the translation context.

Example:

```js
// translator: some description for the extracted string.
t`some string`;
```

Here is what we will see in the `.po` file after extraction:

```
#. some description for the extracted string
msgid "some string"
msgstr ""
```

`ttag` provides 2 options for comments extraction:

1. Extract all leading comments before the translated expression.
2. Extract only tagged comments.

This option is disabled by default. You can enable it with the [`addComments`](plugin-api.html#configaddcomments)
configuration

## Recursive comments lookup

`ttag` will lookup for comments until it reaches some declaration or statement.
This can be useful when commenting a group of keys:

```js
export const keyToNames = (key) => {
    // translator: Action name in page XYZ.
    const MAPPING = {
        key1: t`Something`,
        key2: t`Another Thing`,
        key3: t`Yet another thing`,
    };

    return MAPPING[key] || key;
};

// or

export const OPTIONS = /* translator: option names */ fromJS([
    { label: t`option 1`, value: 1 }, // ...
]);
```
