# Applying translations without babel plugin
> This article shows an example of how you can apply translations
at a runtime without transpilation step just with the ttag lib.

This approach can be useful for dev environments because it
saves you some extra build time. It is not so important to keep
js bundles small in dev environment. Or, from the other side, you can
use this approach on the backend to prerender HTML with translations in
universal(isomorph) apps.

> Consider using precompile strategy for production (described [here](localization-with-webpack-and-ttag.md) and [here](quick-start.md))

Let's look through a quick demo on jsfiddle - [https://jsfiddle.net/AlexMost/9wuafbL5/7/](https://jsfiddle.net/AlexMost/9wuafbL5/7/)

As you can see ttag works out of the box without the transpilation step.

Below are the 3 easy steps that you need to execute to have your translations working at
the runtime:

## 1. Loading translation object (po to JSON) [backend]
Let's imagine you have .po file with translations (more about how to extract translations
[here](quick-start.md#step-4-extracting-translations-to-pot-file)).
We recommend to use `gettext-parser` for `.po` files loading. This one will load translations object
from .po or .mo file. This step must be executed during the build
step somewhere on a backend to prepare json with a translations.

```js
import fs from 'fs';
import gt from 'gettext-parser';

function loadFile(filePath) {
    gt.po.parse(fs.readFileSync(filePath));
}

const ukLocale = loadFile('uk.po');
```

> I have already extracted object on jsfiddle example.

## 2. Adding locale to ttag [frontend]
Let's assume we have translation object in `ukLocale` var on a frontend.
The way in which you are passing translations object to the frontend can
vary, depending on what build tool you are using. Here is a quick example of how
you can pass the translations object to the frontend with [webpack](https://github.com/ttag/webpack-demo/blob/master/webpack-no-transpile.config.js#L34).
To be able to use locale you should execute **[addLocale](configuration-ttag-lib.md#addlocale-string-locale-object-data-bool-replacevariablesnames)** from `ttag`.

```js
import { addLocale } from 'ttag';
addLocale('uk', ukLocale)
```

## 3. Use locale [frontend]

To select some registered locale you need to execute **[useLocale](configuration-ttag-lib.md#uselocale-string-locale)** from `ttag`
 ```js
import { addLocale, useLocale } from 'ttag';
useLocale('uk')
```

Consider not to use this approach in the browser in production, because ttag allows
you to precompile all translations at a build time. Precompile approach will remove extra parsing
work on the client and will reduce the resulting bundle size.
