---
id: create-react-app
title: Create React App
---

At the end of this short tutorial you will learn how to set up the localization process for CRA and ttag library.

-   **Demo with runtime translations load** - https://ttag-org.github.io/CRA-runtime-example/
-   **Demo with precompiled translations** - https://ttag-org.github.io/CRA-precompile-example/

## Step 1. Installation

Follow these steps to setup CRA and install ttag dependencies.

```bash
npx create-react-app ttag-app
cd ttag-app
npm i ttag
npm i -D ttag-cli
```

If everything is done correctly - you should be able to start your application with **`npm run start`**.

## Step 2. Create .po file for translations

At this step, we should create `.po` file for the language that we want to translate to.
For this example, we will create `.po` file with all appropriate settings for the Ukrainian language (`uk` code).

```bash
mkdir i18n # create a separate dir where we will keep all translation files
npx ttag init uk i18n/uk.po
```

> You can find the list of all available language codes here - https://www.w3.org/International/O-charset-lang.html

## Step 3. Wrap strings with tags

Let's `src/App.js` and t tag to `Learn React` string (just to see how it works on a single string)

```jsx
import { t } from 'ttag';

//... some jsx code
<a className='App-link'>{t`Learn React`}</a>;
//... some jsx code
```

## Step 4. Update the translation file and add a translation

On this step, we will use `update` command from `ttag-cli` to extract translations from the sources. This will also update references to the translated string and remove strings that aren't present in the source files.

```bash
npx ttag update i18n/uk.po src/
```

After this, we should see that the new translation was added to the `i18n/uk.po` file:

```po
#: src/App.js:21
msgid "Learn React"
msgstr ""
```

Let's add a translation:

```po
#: src/App.js:21
msgid "Learn React"
msgstr "Вивчити React"
```

## Step 5. Loading translations

Depending on your needs you can chose one of 2 available options for loading translations for ttag: [Runtime translations](#runtime-translations) or [Precompiled translations](#precompiled-translations).

### Runtime translations:

-   **Project example** - https://github.com/ttag-org/CRA-runtime-example
-   **Demo** - https://ttag-org.github.io/CRA-runtime-example/

The first and the obvious approach is to load translations right before `ReactDom.render`.

Let's make our translation `.po` file loadable. As webpack supports json load out of the box - let's transform `.po` to `.json` with `ttag-cli`:

```bash
npx ttag po2json i18n/uk.po > i18n/uk.po.json
```

After this we can load and apply appropriate language on the application start:

```js
import { addLocale, useLocale } from 'ttag';
const locale = getLocale(); // fetch locale code from cookies, url, localStorage e.t.c

if (locale !== 'en') {
    // load json file with translations
    const translationsObj = require(`../i18n/${locale}.po.json`);
    addLocale(locale, translationsObj);
    useLocale(locale);
}
```

More implementation details can be found in the example repository - https://github.com/ttag-org/CRA-runtime-example.

### Precompiled translations

The second approach is to make a separate build for each locale.

-   **Project example** - https://github.com/ttag-org/CRA-precompile-example
-   **Demo** - https://ttag-org.github.io/CRA-precompile-example/

> #### Pros
>
> -   No extra step for translations download and initialization (all translated strings are already placed right into the sources)
> -   Less traffic overhead.
>
> #### Cons
>
> -   Separate build for each language.

To be able to place the translated strings into the sources we need to use `babel-plugin-ttag`. Because we don't want to `eject` CRA - we can use `ttag.macro`:

CRA goes with `babel-plugin-macros` installed. You can read more about the macro approach [here](https://github.com/kentcdodds/babel-plugin-macros)

```bash
npm i -D ttag.macro
```

Let's add the macro config to the root:

**babel-plugin-macros.config.js**

```js
module.exports = process.env.LOCALE
    ? {
          ttag: { resolve: { translations: `i18n/${process.env.LOCALE}.po` } },
      }
    : {};
```

This config will allow us to apply `babel-plugin-ttag` with options.

> You can read more about babel-plugin-ttag options [here](/docs/plugin-api.html)

After that you can run your project with another locale setting:

```bash
LOCALE=uk npm run start
```

We should see that our translation was placed right into the source files.

Please, refer to the [source code](https://github.com/ttag-org/CRA-precompile-example) for more details on how you can build and deploy your app with precompile approach.
