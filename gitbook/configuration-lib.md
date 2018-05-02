# ttag lib API

### addLocale(string locale, object poData)
Register locale translations.

Arguments:

* `locale` (string): Locale name (i.e.: `'uk'`, `'en'`)
* `poData` (object): parsed data from a `.po` file. An example library that is able to do this is 
  [`gettext-parser`](https://github.com/smhg/gettext-parser).

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

### useLocale(string locale)
Activates a locale. After setting the locale to be used, all strings marked for translations will be
represented by the corresponding translation in the specified locale.

Arguments:

* `locale` (string): Locale name (i.e: `'uk'`, `'en'`)

Example:
```js
useLocale('uk');
```

### useLocales(Array<String> locales)
If you want to have multiple translations look up locations, you can use this 
method. The library will try to resolve translations exactly in the same order as you
specify in the `locales` argument.

Arguments:

* `locales` (Array<String>): List of locale names (i.e.: `'uk'`, `'en'`)

Example:
```js
useLocales(['en_US', 'en']);
```

### setDedent(bool value)
> Default: `true`

Activates or deactivates dedent for [multiline translatable strings](multiline-strings.md).

Arguments:

* `value` (bool): Activates or deactivates dedent.

Example:
```js
setDedent(false);
```

### setDefaultLang(string lang)
Sets default language that is used in your sources strings. This setting is used for plural forms extraction.
Different language have different plural forms numbers and formulas.

Arguments:

* `lang` (string): ISO code for the language. See all available codes here at the [GNU gettext manual](https://www.gnu.org/software/gettext/manual/html_node/Usual-Language-Codes.html)

Example:
```js
setDefaultLang('uk');
```
