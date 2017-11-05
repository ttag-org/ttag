# c-3po lib API

### addLocale (string locale, object data, [bool replaceVariablesNames])
Register locale translations.
arguments:
* **locale (string)**: Locale name (uk, en)
* **poData (object)**: parsed data from .po file. Usually received by library that parses .po files data.
For example - [gettext-parser](https://github.com/smhg/gettext-parser).
* **[replaceVariablesNames] (bool)**: Default value - `true`. Optional argument. When `true`
all `${ name }` expressions will be changed to `${ 0 }`. 
    > This argument exists for compatibility reasons with older versions when named placeholders
    in translations like `${ name }` were not supported.

Example:
```js
const poData = {
    'headers': {
        'plural-forms': 'nplurals=2; plural=(n!=1);'
    },
    'translations': {
        '': {
            'test': { 'msgid': 'test', 'msgstr': 'test translation' }
        }
    }
}
addLocale('en', poData);
```

### useLocale (string locale)
Activates locale.

argumets:
* **locale (string)**: Locale name (uk, en)

Example:
```js
useLocale('uk');
```

### useLocales ([String] locales)
If you want to have multiple translations look up locations, you can use this 
method. Library will try to resolve translations exactly in the same order as you will
specify in the `locales` argument.

argumets:
* **locales ([String])**: Locales names (uk, en)

Example:
```js
useLocales(['en_US', 'en']);
```

### setDedent (bool value)
Activates or deactivates dedent for multiline (details [here](multiline-strings.md)).
Enabled by default.

arguments:
* **locale (bool)**: activates or deactivates dedent.

Example:
```js
setDedent(false);
```

### setDefaultHeaders (object headers)
Sets .po file headers appropriate to locale

arguments:
* **headers (object)**: headers from .po file

Example:
```js
setDefaultHeaders({
'plural-forms': 'nplurals=2; plural=(n!=1);'    
});

```