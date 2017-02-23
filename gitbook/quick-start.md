# Quick Start

Here is a simple step by step tutorial for the demonstration of the full translation cycle with gettext and c-3po \(extraction, merging, resolving translations\). From the first glance, it may seem a little bit complex but I tried to simplify all necessary steps as much as possible.

All quickstart sources are [here](https://github.com/c-3po-org/c-3po/tree/master/examples/quickstart).

### Step 1. Installation

1. Firstly we need to create separate folder run **npm init **and  execute [installation](/chapter1.md) instructions. 
2. babel-cli and es2015 presets should be available.

```
npm install --save-dev babel-cli
npm install --save-dev babel-preset-es2015
```

1. Add **.babelrc **file

```
{
  "presets": ["es2015"]
}
```

### Step 2. Setup file for translations

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
starting count up to 3
0 ticks passed
1 ticks passed
2 ticks passed
3 ticks passed
```

### Step 3. Handling plural forms

Let's assume we want to localize this output for some different locale. But before this step, let's fix plural form for \`1 ticks passed\` to \`1 tick passed\`. To fix this issue, let's start with adding the **c-3po **plugin to **.babelrc:**

```
{
  "presets": ["es2015"],
  "plugins": ["c-3po"]
}
```

After that, let's modify our previous program. We can use the [ngettext](/ngettext.md) function for plural forms:

> c-3po will not proceed ngettext without import

```js
// counter.js

import { ngettext, msgid } from 'c-3po';

function startCount(n){ 
    console.log(`starting count up to ${n}`);
    for (let i = 0; i <= n; i++) { 
        console.log(ngettext(msgid`${i} tick passed`, `${i} ticks passed`, i)); 
    }
}

startCount(3);
```
> We should use msgid tag for the first argument of ngettext function due to a reasons described [here](why-use-msgid-for-ngettext.md)

Let's also add script to npm scripts section to be able to execute our modified file in package.json:

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

### Step 4. Extracting translations to .pot file

To be able to localize our program, gettext utility requires template file with strings that need to be translated. The template file is a [.pot file](https://www.gnu.org/software/gettext/manual/html_node/Template.html#Template). All c-3po behavior can be customized by [config](/configuration.md). We can use [env options](https://babeljs.io/docs/usage/babelrc/#env-option) for making different configuration options in our **.babelrc. **Let's add extraction feature:

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

As we see, we added **extract** env configuration, and extract settings to c-3po plugin.

Let's add extraction command to our **package.json **scripts section:

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

#: counter.js:6
msgid "${ 0 } tick passed"
msgid_plural "${ 0 } ticks passed"
msgstr[0] ""
msgstr[1] ""
```

We can observe that strings inside [**ngettext**](/ngettext.md)** **were extracted to template file. 
Let's add another one that we have in our program, by tagging with [**t**](/tag-gettext--t-.md) function:

```javascript
import { ngettext, msgid, t } from 'c-3po';

...
console.log(t`starting count up to ${n}`);
...
```

And after executing extract one again we will have this in .pot file:

```
msgid ""
msgstr ""
"Content-Type: text/plain; charset=utf-8\n"
"Plural-Forms: nplurals=2; plural=(n!=1);\n"

#: counter.js:4
msgid "starting count up to ${ 0 }"
msgstr ""

#: counter.js:6
msgid "${ 0 } tick passed"
msgid_plural "${ 0 } ticks passed"
msgstr[0] ""
msgstr[1] ""
```

### Step 5. Adding locale and merging .pot and po file

Template files are used only on extraction step, translators are not working with them. After extraction phase, we need to merge existing translations with newly extracted. This is where gettext utility [msgmerge](https://www.gnu.org/software/gettext/manual/html_node/msgmerge-Invocation.html) is needed.

> You need to install [gettext](https://www.gnu.org/software/gettext/manual/gettext.html) utility and have the [msginit](https://www.gnu.org/software/gettext/manual/gettext.html#msginit-Invocation) command available inside the environment. Or you can just copy and paste uk.po file from the repository or this tutorial.

Let's assume we decided to add Ukrainian locale. Let's do it with the **msginit **command:

```
msginit -i extract.pot -o uk.po -l uk
```

**uk.po **will be created. This file will contain all appropriate to Ukrainian locale headers. Let's add translations:

```
msgid ""
msgstr ""
"Content-Type: text/plain; charset=UTF-8\n"
"Plural-Forms: nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n"
"%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);\n"
"Language-Team: Ukrainian\n"
"Language: uk\n"

#: counter.js:4
msgid "starting count up to ${ 0 }"
msgstr "починаємо рахунок до ${ 0 }"

#: counter.js:6
msgid "${ 0 } tick passed"
msgid_plural "${ 0 } ticks passed"
msgstr[0] "минув ${ 0 } тік"
msgstr[1] "минуло ${ 0 } тіка"
msgstr[2] "минуло ${ 0 } тіків"
```

### Step 6. Resolving translations \(applying translations from .po file\).

Let's add another env configuration to our **.babelrc **file to be able to resolve uk locale:

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

And here is an localized output:

```
починаємо рахунок до 3
минуло 0 тіків
минув 1 тік
минуло 2 тіка
минуло 3 тіка
```

All quickstart sources are [here](https://github.com/c-3po-org/c-3po/tree/master/examples/quickstart).

