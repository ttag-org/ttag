---
id: typescript
title: Typescript
---


This shor tutorial will show you how you can setup localization with ttag and typescript. This tutorial is almost identical to the [quickstart](quickstart.html).

> All sources for this tutorial can be found under the [`examples`](https://github.com/ttag-org/ttag/tree/master/examples/typescript)
> directory.

## 1. Simple counter program

For the demonstration purpose we will write a counter program.

```ts
// counter.ts

function startCount(n: number): void {
    console.log(`starting count up to ${n}`);
    for (let i = 0; i <= n; i++) {
       console.log(`${i} ticks passed`);
    }
}

startCount(3);
```


```bash
ts-node counter.ts

starting count up to 3
0 ticks passed
1 ticks passed
2 ticks passed
3 ticks passed
```

The program works but, as you can see, it uses the wrong plural form for `1 ticks passed` instead of `1 tick passed`.

Let's fix it.

## 2. Wrap strings with ttag tags and functions

ttag library goes with typescript typings out of the box. So, we can simply install and use it.

Install the ttag library:

```bash
npm install --save ttag
```

To fix the issue above, the only thing we need is just to use `ngettext` from `ttag` library:

```ts
import { ngettext, msgid, t } from 'ttag';

function startCount(n: number): void {
    console.log(t`starting count up to ${n}`); // using 't' tag for 1 to 1 translations
    for (let i = 0; i <= n; i++) {
       console.log(
           // use ngettext function for handling plural forms
           ngettext(msgid`${i} tick passed`, `${i} ticks passed`, i)
        );
    }
}
```

For more information, please check:

* `t` tag [reference documentation](tag-gettext.html)
* `ngettext` function [reference documentation](ngettext.html)

Let's see what our program outputs now:

```bash
ts-node counter.ts

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

Let's install [`ttag-cli`](https://github.com/ttag-org/ttag-cli) for `.po` different po/pot files manipulations:

```bash
npm install --save-dev ttag-cli
``` 

> After installtion, the `ttag` command should be available in npm scripts.

### Create `.po` file
Let's assume that we want to translate our program to Ukrainian language.

```bash
ttag init uk uk.po
```

This will create a new `uk.po` file with all appropriate headers for the Ukrainian language

```
msgid ""
msgstr ""
"Content-Type: text/plain; charset=utf-8\n"
"Plural-Forms: nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : "
"n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);\n"
"Language: uk\n"
"MIME-Version: 1.0\n"
"Content-Transfer-Encoding: 8bit\n"

```

> See all available languages at the [GNU gettext manual](https://www.gnu.org/software/gettext/manual/html_node/Usual-Language-Codes.html)

### Update `.po` file
Use `ttag update` command for translations extraction/update to `.po` file from the source files:

```bash
ttag update uk.po counter.ts
```

Now, you can open `uk.po` file and add translations in `msgstr`.

```po
#: counter.ts:12
msgid "starting count up to ${ n }"
msgstr ""

#: counter.ts:14
msgid "${ i } tick passed"
msgid_plural "${ i } ticks passed"
msgstr[0] ""
msgstr[1] ""
msgstr[2] ""
```

## 4. Load translations
After all translations are added by the translator to the `uk.po` file, we need to load those translations somehow. 
There are 2 ways in which you can apply translations from `.po` file. Each of them has their pros and cons. Both of them are quite easy to setup, so you decide which one suits better for you.

### Runtime load
With `ttag-cli` we can simply convert our `uk.po` file to JSON format with `po2json` command:

```bash
ttag po2json uk.po > uk.po.json
```

The last step is to modify our program to load locale from the `.po.json` file if the `LOCALE` environment variable is present:

```ts
import { ngettext, msgid, t, addLocale, useLocale } from 'ttag';

const locale = process.env.LOCALE; // uk

if (locale) {
    const translationObj = require(`./${locale}.po.json`); // will load uk.po.json
    addLocale(locale, translationObj); // adding locale to ttag
    useLocale(locale); // make uk locale active
}

//....
```

Let's run our script with env LOCALE:

```bash
LOCALE=uk ts-node counter.js


починаємо рахунок до 3
минуло 0 тіків
минув 1 тік
минуло 2 тіка
минуло 3 тіка
```

### Precompile translations
Another approach is to produce separate output file for each locale, with all translations already placed in code. In our case, `ttag replace` command can generate standalone localized `counter.uk.js` file:

```bash
ttag replace uk.po counter.uk.js counter.ts
```

So, you can simply run `node counter.uk.js` and see the the localized output.

This approach performs much better, because it eliminates all the translations loading boilerplate.


> Note: `ttag-cli` is a wrapper around [babel-plugin-ttag](https://github.com/ttag-org/babel-plugin-ttag)

Feel free to post any questions and issues [here](https://github.com/ttag-org/ttag/issues)
