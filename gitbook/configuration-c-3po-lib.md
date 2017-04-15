# c-3po lib API

### addLocale (string locale, object data, [bool replaceVariablesNames])
Register locale translations.
arguments:
* **locale (string)**: Locale name (uk, en)
* **data (object)**: parsed data from .po file.
* **[replaceVariablesNames] (bool)**: Default value - `true`. Optional argument. When `true`
all `${ name }` expressions will be changed to `${ 0 }`. 
    > This argument exists for compatibility reasons with older versions when named placeholders
    in translations like `${ name }` were not supported.

Example:
```js
addLocale('uk', ukLocaleObject);
```

### useLocale (string locale)
Activates locale.

argumets:
* **locale (string)**: Locale name (uk, en)

Example:
```js
useLocale('uk');
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

### setHeaders (object headers)
Sets .po file headers appropriate to locale

arguments:
* **headers (object)**: headers from .po file

Example:
```js
setHeaders({
'plural-forms': 'nplurals=2; plural=(n!=1);'    
});

```