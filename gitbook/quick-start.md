# Quick Start

Here is a simple step by step tutorial for the demonstration of the full translation 
cycle with gettext and c-3po \(extraction, merging, resolving translations\). From the first glance, 
it may seem a little bit complex but I tried to simplify all necessary steps as much as possible.
Also, I will try to demonstrate 2 different setups for dev and prod environments.

<!-- toc -->

All quickstart sources are [here](https://github.com/c-3po-org/c-3po/tree/master/examples/quickstart).

### Step 1. Installation

1. Firstly we need to create separate folder run **npm init **and  execute [installation](/chapter1.md) instructions. 
2. Our little program will be using es6 imports so we need babel node and babel presets to run them:

```
npm install --save-dev babel-cli babel-preset-env babel-core
```

### Step 2. Simple counter program

Let's setup some simple js file \(**counter.js**\) with some logic, that we will try to translate with the help of **c-3po **and **gettext.**

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

When can execute this file and see this in output:

```
node index.js
starting count up to 3
0 ticks passed
1 ticks passed
2 ticks passed
3 ticks passed
```

----
As we see our program works but it uses the wrong plural form for `1 ticks passed` (must be `1 tick passed`).
Let's fix it.

### Step 3. Wrapping strings with c-3po tags and functions

Let's wrap strings with c-3po functions and tags to make them translatable:

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

Let's also add an appropriate script to npm scripts section to be able to execute our modified file in package.json:

```
{
...
"scripts": {
    "counter": "babel-node counter.js"
  },
}
```

And run our program with **npm run counter.**

```
starting count up to 3
0 ticks passed
1 tick passed
2 ticks passed
3 ticks passed
```

As we see plural forms are working out of the box without no extra configuration for the English locale.

### Step 4. Extracting translations to .pot file

To be able to localize our program, *gettext* utility requires template file with strings that need to be translated.
The template file is a [.pot file](https://www.gnu.org/software/gettext/manual/html_node/Template.html#Template). 
All c-3po behavior can be customized by [config](/configuration.md). We can use [env options](https://babeljs.io/docs/usage/babelrc/#env-option) for making different configuration options in our **.babelrc. **Let's add extraction feature:

```js
{
  "presets": ["es2015"],
  "plugins": ["c-3po"],
  "env": {
    "extract": {
        "plugins": [
            ["c-3po", { "extract": { "output": "extract.pot" } }]
        ]
    }
  }
}
```

As we see, we added **extract** environment configuration, and extract settings to c-3po plugin.

Let's add the extraction command to our **package.json** scripts section:

```
"scripts": {
    ...
    "extract": "BABEL_DISABLE_CACHE=1 BABEL_ENV=extract babel counter.js"
  },
```
> It's better to disable babel cahce on resolve and extract steps.
> Check this [link](why-po-is-not-updated.md) for the details.

And execute **npm run extract**. File **extract.pot **must be created:

```
msgid ""
msgstr ""
"Content-Type: text/plain; charset=utf-8\n"
"Plural-Forms: nplurals=2; plural=(n!=1);\n"

#: counter.js:4
msgid "starting count up to ${ n }"
msgstr ""

#: counter.js:6
msgid "${ i } tick passed"
msgid_plural "${ i } ticks passed"
msgstr[0] ""
msgstr[1] ""
```

We can observe that all strings from the sources were extracted to the template file. 

### Step 5. Adding locale and merging **.pot** and **.po** file

Template files are used only on extraction step, translators are not working with them. 
After extraction phase, we need to merge existing translations with newly extracted. 
This is where gettext utility [msgmerge](https://www.gnu.org/software/gettext/manual/html_node/msgmerge-Invocation.html) 
is needed.

> You need to install [gettext](https://www.gnu.org/software/gettext/manual/gettext.html) utility and have the [msginit](https://www.gnu.org/software/gettext/manual/gettext.html#msginit-Invocation) command available inside the environment. Or you can just copy and paste **uk.po** file from the repository or this tutorial.

Let's assume we decided to add Ukrainian locale. Let's do it with the **msginit** command:

```
msginit -i extract.pot -o uk.po -l uk
```

**uk.po** will be created. This file will contain all appropriate to Ukrainian locale headers. Let's add translations:

```
msgid ""
msgstr ""
"Content-Type: text/plain; charset=UTF-8\n"
"Plural-Forms: nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n"
"%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);\n"
"Language-Team: Ukrainian\n"
"Language: uk\n"

#: counter.js:4
msgid "starting count up to ${ n }"
msgstr "починаємо рахунок до ${ n }"

#: counter.js:6
msgid "${ i } tick passed"
msgid_plural "${ i } ticks passed"
msgstr[0] "минув ${ i } тік"
msgstr[1] "минуло ${ i } тіка"
msgstr[2] "минуло ${ i } тіків"
```

### Step 6. Resolving translations (applying translations from .po file)
There are 2 ways in which you can resolve translations from .po file with c-3po:
1. Resolving translations at a runtime with pure c-3po library
2. Resolving translations on a build step with babel transformations.

#### 6.1 Load translations at the runtime (dev mode)
To be able to apply translations you should parse .po file to js object and call **addLocale**:

```js
import { addLocale, useLocale } from 'c-3po';
import { loadFile } from 'c-3po/loader';
const translationsObject = loadFile('i18n/uk.po');
addLocale('uk', translationsObject);
useLocale('uk');
```

Let's modify our program to load locale from **.po** file if **env.LOCALE** var is present:
```js
import { ngettext, msgid, t,  addLocale, useLocale } from 'c-3po';
import { loadFile } from 'c-3po/loader';

const locale = process.env.LOCALE;

if (locale) {
    console.log('[dev mode]');
    const translationObj = loadFile(`${locale}.po`);
    addLocale(locale, translationObj);
    useLocale(locale);
}

//....
```

Add **counter-uk-dev** to scripts in **package.json**
```js
"scripts": {
    // ...
    "counter-uk-dev": "LOCALE=uk babel-node counter.js"
}
```

Let's run it with **npm run counter-uk-dev**:
```bash
[dev mode]
починаємо рахунок до 3
минуло 0 тіків
минув 1 тік
минуло 2 тіка
минуло 3 тіка
```

**[dev mode]** indicates that we are loading files from .po file in a runtime.

### Step 7. Load translations on a build step with babel-plugin-c-3po transformations
c-3po will apply transformation if **[resolve.translation](configuration.md#configresolvetranslations-string)** 
config is present. Transformation will replace original strings from sources with translations 
from .po file at compile time. Also it will strip c-3po tags and functions. 
This leads to faster execution time and smaller resulting bundle. 
Consider to use c-3po transformations in production.

Let's add another env configuration to our **.babelrc** file to be able to resolve uk locale:

```
'resolve-uk': {
    "plugins": [
        ["c-3po", 
            { 
               "resolve": { "translations": "uk.po" },
            }
        ]
    ]
}
```

We added resolve.translations property to specify where to get .po file with translations.

Let's also add new command in scripts section

```
{
...
"translate-uk": "BABEL_DISABLE_CACHE=1 BABEL_ENV=resolve-uk babel counter.js -o counter.uk.js",
}
```

> Here we are saving localized version with a different file name for simplification, in
general for this case it's better to store localized assets somewhere in separate folder like i18n/uk/ with
the same filename.

After executing **npm run translate-uk** we will get localized version of our **counter.js** program saved in **counter.uk.js**.

We can check how it works by executing

```
node counter.uk.js
```

And here is a localized output:

```
починаємо рахунок до 3
минуло 0 тіків
минув 1 тік
минуло 2 тіка
минуло 3 тіка
```

To be able to make transform for default locale you should pass "default" to *translations* setting:

````js 
{ "resolve": { "translations": "default" } }
````

With the **[translations: default](configuration.md#configresolvetranslations-string)** setting c-3po will make plural functions working an will strip 
all unnecessary c-3po tags and functions.

All quickstart sources are [here](https://github.com/c-3po-org/c-3po/tree/master/examples/quickstart).

