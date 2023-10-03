---
id: library-api
title: ttag API
---

## addLocale

`addLocale(locale: string, poData: Object)`

Register locale translations.

Arguments:

-   `locale: string` Locale name (i.e.: `'uk'`, `'en'`)
-   `poData: Object` parsed data from a `.po` file.

Example:

```js
const poData = {
    headers: {
        'plural-forms': 'nplurals=2; plural=(n!=1);',
    },
    translations: {
        '': {
            test: { msgid: 'test', msgstr: 'test translation' },
        },
    },
};
addLocale('en', poData);
```

## useLocale

`useLocale(locale: string)`

Activates a locale. After setting the locale to be used, all strings marked for translations will be
represented by the corresponding translation in the specified locale.

Arguments:

-   `locale: string` Locale name (i.e: `'uk'`, `'en'`)

Example:

```js
useLocale('uk');
```

## useLocales

`useLocales(locales: string[])`

If you want to have multiple translations look up locations, you can use this
method. The library will try to resolve translations exactly in the same order as you
specify in the `locales` argument.

Arguments:

-   `locales: string[]` List of locale names (i.e.: `'uk'`, `'en'`)

Example:

```js
useLocales(['en_US', 'en']);
```

## setDedent

`setDedent(value: bool)`

`Default: true`

Activates or deactivates dedent for [multiline translatable strings](multiline-strings.md).

Arguments:

-   `value: bool` Activates or deactivates dedent.

Example:

```js
setDedent(false);
```

## setDefaultLang

`setDefaultLang(lang: string)`
Sets default language that is used in your sources strings. This setting is used for plural forms extraction.
Different language have different plural forms numbers and formulas.

Arguments:

-   `lang: string` ISO code for the language. See all available codes here at the [GNU gettext manual](https://www.gnu.org/software/gettext/manual/html_node/Usual-Language-Codes.html)

Example:

```js
setDefaultLang('uk');
```
