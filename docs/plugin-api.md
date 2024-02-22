---
id: plugin-api
title: babel-plugin-ttag API
---

`ttag` configuration is a simple JavaScript object (**Config**).

## Config.extract.output

`type: string`

`Default: 'polyglot_result.pot'`

Specifies a file where to save extracted translations (`.pot` file). If this setting is present then `babel-plugin-ttag`
will extract translations.

## Config.extract.location

`type: string`

`Default: 'full'`

Configure how file references are attached to translation files. File references may help translators to identify where
a given translatable text is used in the code base.

One of the following values are valid:

-   `'full'` - file location with line number
-   `'file'` - only file location without line number
-   `'never'` - don't attach any file reference

## Config.resolve.translations

`type: string`

`Default: null`

Specifies the path to the `.po` file with translations that will be placed in sources.

Example:

```json
{ "resolve": { "translations": "i18n/uk.po" } }
```

It can be set to `'default'` to strip `ttag` tags and resolve the default locale:

```json
{ "resolve": { "translations": "default" } }
```

## Config.resolve.unresolved

`type: string`

`Default: 'skip'`

Controls how to handle missing translation strings in the `.po` file.

One of the following values are valid:

-   `'fail'` - will throw an exception with information about string that has no translation.
-   `'warn'` - will send warn message to stdout.
-   `'skip'` - no reaction

This setting can be useful if you want to ensure that all translations are present before some release, branch merge,
etc.

Example:

```json
{ "resolve": { "translations": "uk.po", "unresolved": "fail" } }
```

## Config.extractors.[FunctionName].invalidFormat

`type: 'fail' | 'warn' | 'skip'`

`FunctionName: 'tag-gettext' | 'gettext' | 'tag-ngettext' | 'jsxtag-gettext'`

`Default: 'fail'`

Controls how to handle functions using a translatable text containing an invalid format.

One of the following values are valid:

-   `fail` - will throw exception with information about string that has no translation.
-   `warn` - will send warn message to stdout.
-   `skip` - no reaction

Example:

```json
{ "extractors": { "tag-gettext": { "invalidFormat": "skip" } } }
```

## Config.dedent

`type: bool`

`Default: true`

Configures whether multiline strings should be dedented. For more information, please check the
[multiline strings](multiline-strings.md) section of the documentation.

## Config.discover

`type: string[]`

`Default: false`

If your translation function is used as a global variable (`window.gettext` e.t.c), you can use this option to extract tanslations without explicit import or require of ttag functions:

Example

```json
{
    "plugins": ["ttag", { "discover": ["t", "gettext"] }]
}
```

## Config.defaultLang

`type: string`

`Default: 'en'`

Default language ISO code that is used for strings in the source code. (English by default).

> See available language codes - https://www.gnu.org/software/gettext/manual/html_node/Usual-Language-Codes.html

## Config.addComments

`type: bool | string`

`Default: 'false'`

Set this to `true` to extract leading comments before a translatable string.

```js
addComments: true;
```

```js
// this comment will be extracted to .po file
t`translated string`;
```

You can specify a string prefix to identify which comments will be extracted:

```js
addComments: 'translator:';
```

```js
// this comment will not be extracted
// translator: only this comment will be extracted
t`translated string`;
```

## Config.sortByMsgid

`type: bool`

`Default: false`

The resulting entries in `.po` (or `.pot`) file will be sorted alphabetically by `msgid`. It can be helpful
to reduce merge conflicts.

## Config.numberedExpressions

`type: bool`

`Default: false`

Example:

```js
t`Hello ${name}`;
```

By default this will be extracted to `Hello ${ name }` in the `.po` file. Only variable names are allowed to be inside
expressions. With `numberedExpression:true` the former example will be extracted to `Hello ${ 0 }`. This will allow you
to use any expression inside string literals (function calls, jsx, etc)

## Config.allowFuzzy

Allows fuzzy messages to be resolved and placed into the source files.
