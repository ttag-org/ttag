# Quick Start

These are 4 quick steps that will allow you to setup the full translation 
cycle with gettext and c-3po \(extraction, merging, resolving translations\).

<!-- toc -->

All quickstart sources are [here](https://github.com/c-3po-org/c-3po/tree/master/examples/quickstart).

### 1. Simple counter program

Let's setup some simple js file \(**counter.js**\), that we will try to localize later.

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

Program works but it uses wrong plural form for `1 ticks passed` (must be `1 tick passed`).
Let's fix it.

### 2. Wrap strings with c-3po tags and functions

We will use es6 imports, so we need babel node and babel presets to run them:
```bash
npm install --save-dev babel-cli babel-preset-env babel-core
```

Let's install  **c-3po** library also:

```bash
npm install --save c-3po
```

Now we can wrap strings with c-3po functions and tags to make them translatable:

```js
import { t, ngettext, msgid } from 'c-3po';

function startCount(n){
    console.log(t`starting count up to ${n}`); // using 't' tag for 1 to 1 translations
    for (let i = 0; i <= n; i++) {
       // use ngettext function for handling plural forms
       console.log(ngettext(msgid`${i} tick passed`, `${i} ticks passed`, i));
    }
}
```
> doc for `t` tag - [https://c-3po.js.org/tag-gettext--t-.html](tag-gettext--t-.md)

> doc for ngettext - [https://c-3po.js.org/ngettext.html](ngettext.md)

Adding `counter` script to the package.json:

```json
{
"scripts": {
    "counter": "babel-node --presets env counter.js"
  }
}
```

Excecuting **npm run counter.**

```
starting count up to 3
0 ticks passed
1 tick passed
2 ticks passed
3 ticks passed
```

As we see, plural forms are working out of the box without no extra configuration for the English locale.

### 3. Setup localization
Gettext standard is based on manipulation with `.po` files. In general, `.po` file is a special file format
for adding/updating/editing translations.
Let's install [c-3po-cli](https://github.com/c-3po-org/c-3po-cli) for `.po` files manipulations:

```bash
npm install -g c-3po-cli  # then c-3po cli should be available globally
``` 

#### Create .po file
Let's assume that we want to translate our program to Ukrainian language.

```bash
c-3po init uk uk.po
```

This will create a new .po file with all settings for the Ukrainian language
> see all available languages [here](http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html)

#### Update .po file
To sync all strings in your sources with the `.po` file, you can use `c-3po update` command.

```bash
c-3po update uk.po counter.js
```
Now, you can open `uk.po` file and add translations to extracted strings.

### 4. Load translations
To be able to apply translations you should parse .po file to js object and call **addLocale**:

```js
import { addLocale, useLocale } from 'c-3po';
import { loadFile } from 'c-3po/loader';
addLocale('uk', loadFile('i18n/uk.po'));
useLocale('uk');
```

Let's modify our program to load locale from **.po** file if **env.LOCALE** var is present:
```js
import { ngettext, msgid, t,  addLocale, useLocale } from 'c-3po';
import { loadFile } from 'c-3po/loader';

const locale = process.env.LOCALE;

if (locale) {
    const translationObj = loadFile(`${locale}.po`);
    addLocale(locale, translationObj);
    useLocale(locale);
}

//....
```

Add **counter-uk** to scripts in **package.json**
```js
"scripts": {
    "counter-uk": "LOCALE=uk babel-node --presets env counter.js"
}
```

Let's run it with **npm run counter-uk-dev**:
```bash
починаємо рахунок до 3
минуло 0 тіків
минув 1 тік
минуло 2 тіка
минуло 3 тіка
```

> c-3po cli is a wrapper around [babel-plugin-c-3po](https://github.com/c-3po-org/babel-plugin-c-3po)
