# Quick Start

Here is a simple tutorial for the demonstration of the full translation cycle with gettext and c-3po \(extraction, merging, resolving translations\). 

> Gettext utilities will be used for merging .pot and .po files. As it was pointed in the [introduciton](/README.md) c-3po works closely with **gettext** utilities and provides some helper methods for extraction translations from javascript and placing them back at a compile time.

### Step 1. Installation

1. Firstly we need to create separate folder run **npm init **and  execute [installation](/chapter1.md) instructions. 
2. Also we need to ensure that [**gettext**](https://www.gnu.org/software/gettext/) utilities are installed on our system \(commands [**msginit**](https://www.gnu.org/software/gettext/manual/html_node/msginit-Invocation.html#msginit-Invocation)**, **[**msgmerge**](https://www.gnu.org/software/gettext/manual/html_node/msgmerge-Invocation.html#msgmerge-Invocation)** **must be available\).
3. babel-cli and es2015 presets should be available.

```
npm install --save-dev babel-cli
npm install --save-dev babel-preset-es2015
```

   4. Add **.babelrc **file

```
{
  "presets": ["es2015"]
}
```

### Step 2. Setup file for translations

Let's setup some simple js file \(**count.js**\) with some logic, that we will try to translate with the help of **c-3po **and **gettext.**

```js
// count.js

function startCount(n){
    console.log(`starting count up to ${n}`);
    for (let i = 0; i <= n; i++) {
       console.log(`${i} ticks passed`);
    }
}

startCount(10);
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

Let's assume we want to localize this output for some different locale. But before this step, let's fix plural form for \`1 ticks passed\` to \`1 tick passed\`. To fix this issue, let's start with adding **c-3po **plugin to **.babelrc:**

```
{
  "presets": ["es2015"],
  "plugins": ["c-3po"]
}
```

After that, let's modify our previous program and save it to another file **count-1.js**. We can use [ngettext](/ngettext.md) function for plural forms:

> c-3po will not proceed ngettext without import

```js
// count-1.js

import { ngettext, msgid } from 'c-3po';

function startCount(n){ 
    console.log(`starting count up to ${n}`);
    for (let i = 0; i <= n; i++) { 
        console.log(ngettext(msgid`${i} tick passed`, `${i} ticks passed`, i)); 
    }
}

startCount(3);
```

Let's also add script to npm scripts section to be able to execute our modified file in package.json:

```
{
...
"scripts": {
    "count-1": "babel-node count-1.js"
  },
}
```

And run our program with **npm run count-1.**

```
starting count up to 3
0 ticks passed
1 tick passed
2 ticks passed
3 ticks passed
```



