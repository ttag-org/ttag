---
id: quickstart
title: Quickstart
---

In a few steps you will be able to setup the full translation cycle with `ttag` and `ttag-cli`.

> All sources for this tutorial can be found under the [`examples`](https://github.com/ttag-org/ttag/tree/master/examples/quickstart)
> directory.

<!-- toc -->

## 1. Simple counter program

Let's setup some simple JavaScript file `counter.js` and add localization process to it.

```js
// counter.js

function startCount(n){
    console.log(`starting count up to ${n}`);
    for (let i = 0; i <= n; i++) {
       console.log(`${i} ticks passed`);
    }
}

startCount(3);
```

Let's execute `counter.js` file:

```
node index.js

starting count up to 3
0 ticks passed
1 ticks passed
2 ticks passed
3 ticks passed
```

The program works but, as you can see, it uses the wrong plural form for `1 ticks passed` instead of `1 tick passed`.

Let's fix it.

## 2. Wrap strings with ttag tags and functions

Install the ttag library:

```bash
npm install --save ttag
```

To fix the issue above, the only thing we need is just to use `ngettext` from `ttag` library:

```js
const { t, ngettext, msgid } = require('ttag');

function startCount(n){
    console.log(t`starting count up to ${n}`); // using 't' tag for 1 to 1 translations
    for (let i = 0; i <= n; i++) {
       // use ngettext function for handling plural forms
       console.log(ngettext(msgid`${i} tick passed`, `${i} ticks passed`, i));
    }
}
```

For more information, please check:

* `t` tag [reference documentation](tag-gettext.html)
* `ngettext` function [reference documentation](ngettext.html)

Adding `counter` script to the package.json:

```json
{
"scripts": {
    "counter": "node counter.js"
  }
}
```

Run the program again, this time using Babel:

```bash
npm run counter
```

Output:

```
starting count up to 3
0 ticks passed
1 tick passed
2 ticks passed
3 ticks passed
```

As we see, plural forms are working out of the box without no extra configuration for the English locale.

## 3. Setup localization
Gettext standard is based on manipulation with `.po` files. In general, a `.po` file is a special file format
for adding, updating, and editing translations.

Let's install [`ttag-cli`](https://github.com/ttag-org/ttag-cli) for `.po` different manipulations with `.po/pot` files:

```bash
npm install --save-dev ttag-cli
``` 

> After installtion, the `ttag` command should be available in npm scripts.

### Create a `.po` file
Let's assume that we want to translate our program to Ukrainian language.

```bash
ttag init uk uk.po
```

This will create a new `uk.po` file with all appropriate headers for the Ukrainian language

> See all available languages at the [GNU gettext manual](https://www.gnu.org/software/gettext/manual/html_node/Usual-Language-Codes.html)

### Update the `.po` file
Use `ttag update` command for translations extraction/update to `.po` file from the source files:

```bash
ttag update uk.po counter.js
```
Now, you can open `uk.po` file and add translations to extracted strings.

## 4. Load translations
To be able to import translations from the `uk.po` file, we can simply convert our `uk.po` file to JSON format with `po2json` command:

```bash
ttag po2json uk.po > uk.po.json
```

The last step is to modify our program to load locale from the `.po` file if the `LOCALE` environment variable is present:

```js
const { ngettext, msgid, t, addLocale, useLocale } = require('ttag');

const locale = process.env.LOCALE;

if (locale) {
    const translationObj = require(`./${locale}.po`);
    addLocale(locale, translationObj);
    useLocale(locale);
}

//....
```

Let's add new `counter-uk` script which will run localized version of our program:

```js
"scripts": {
    "counter-uk": "LOCALE=uk node counter.js"
}
```

Let's run it with `npm run counter`
```bash
починаємо рахунок до 3
минуло 0 тіків
минув 1 тік
минуло 2 тіка
минуло 3 тіка
```

> Note: `ttag-cli` is a wrapper around [babel-plugin-ttag](https://github.com/ttag/babel-plugin-ttag)

Feel free to post any questions and issues [here](https://github.com/ttag-org/ttag/issues)
