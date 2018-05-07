# Quick Start

In a few steps you will be able to setup the full translation cycle with gettext and ttag.
This example uses ES6 features, so you need to install Babel to transpile all its source code:

```bash
npm install --save-dev babel-cli babel-preset-env babel-core
```

> All sources for this tutorial can be found under the [`examples`](https://github.com/ttag-org/ttag/tree/master/examples/quickstart)
> directory.

<!-- toc -->

### 1. Simple counter program

Let's setup some simple JavaScript file `counter.js` that we will localize later.

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

The program works but it uses the wrong plural form for the first iteration: `1 ticks passed`. It should be `1 tick passed`.

Let's fix it.

### 2. Wrap strings with ttag tags and functions

Install the ttag library:

```bash
npm install --save ttag
```

Now we can wrap strings with ttag functions and tags to make them translatable:

```js
import { t, ngettext, msgid } from 'ttag';

function startCount(n){
    console.log(t`starting count up to ${n}`); // using 't' tag for 1 to 1 translations
    for (let i = 0; i <= n; i++) {
       // use ngettext function for handling plural forms
       console.log(ngettext(msgid`${i} tick passed`, `${i} ticks passed`, i));
    }
}
```

For more information, please check:

* `t` tag [reference documentation](reference-t-tag.md)
* `ngettext` function [reference documentation](reference-ngettext.md)

Adding `counter` script to the package.json:

```json
{
"scripts": {
    "counter": "babel-node --presets env counter.js"
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

### 3. Setup localization
Gettext standard is based on manipulation with `.po` files. In general, a `.po` file is a special file format
for adding, updating, and editing translations.

Let's install [`ttag-cli`](https://github.com/ttag-org/ttag-cli) for `.po` file manipulation:

```bash
npm install -g ttag-cli
``` 

> After installtion, the `ttag` command should be available globally

#### Create a `.po` file
Let's assume that we want to translate our program to Ukrainian language.

```bash
ttag init uk uk.po
```

This will create a new .po file with all settings for the Ukrainian language

> See all available languages at the [GNU gettext manual](https://www.gnu.org/software/gettext/manual/html_node/Usual-Language-Codes.html)

#### Update the `.po` file
To sync all strings in your sources with the `.po` file, you can use `ttag update` command.

```bash
ttag update uk.po counter.js
```
Now, you can open `uk.po` file and add translations to extracted strings.

### 4. Load translations
To be able to apply translations you should parse the `.po` file. We recommend to use the 
[`gettext-parser` package](https://www.npmjs.com/package/gettext-parser) for that purpose:

```bash
npm install --save-dev gettext-parser
```

Let's modify our program to load the locale from the `.po` file if the `LOCALE` environment variable
is present:

```js
import { ngettext, msgid, t,  addLocale, useLocale } from 'ttag';
import fs from 'fs';
import gt from 'gettext-parser';

function loadFile(filePath) {
    gt.po.parse(fs.readFileSync(filePath));
}

const locale = process.env.LOCALE;

if (locale) {
    const translationObj = loadFile(`${locale}.po`);
    addLocale(locale, translationObj);
    useLocale(locale);
}

//....
```

Change the `counter` entry of the `scripts` section to include the locale set as an environment variable:

```js
"scripts": {
    "counter": "LOCALE=uk babel-node --presets env counter.js"
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

**Where to go now?**  

If you use webpack on your build process, check [Localization with webpack](localization-with-webpack.md) section of the documentation.
