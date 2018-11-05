---
id: create-react-app
title: Create React App
---

## Step 1. Installation
Follow this steps to setup CRA and install ttag deps.

```bash
npx create-react-app ttag-app
cd ttag-app
npm i ttag
npm i -D ttag-cli
```

If everything is done correct - you should be able to start your application with **`npm run start`**.

## Step 2. Create .po file for translations
At this step, we should create `.po` file for the language that we want to translate to.
For this example we will create `.po` file with all appropriate settings for the Ukrainian language (`uk` code).

```bash
mkdir i18n # create a separate dir where we will keep all translation files
npx ttag init uk i18n/translations.po
```

> You can find the list of all available language codes here - https://www.w3.org/International/O-charset-lang.html


## Step 3. Wrap strings with tags
Let's `src/App.js` and t tag to `Learn React` string (just to see how it works on a single string)

```jsx
import { t } from 'ttag.macro';

//... some jsx code
<a className="App-link">
    { t`Learn React` }
</a>
//... some jsx code
```

## Step 4. Update the translation file and add a translation
On this step we will use `update` command from `ttag-cli` to extract translations from the sources. This will also update references to the translated string and remove strings that aren't present in the source files.

```bash
npx ttag udpate i18n/uk.po src/
```

After this we should see that the new translation was added to the `i18n/uk.po` file:

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

## Step 4. Loading translations
Depending on your needs you can chose one of 2 available options for loading translations for ttag: [Runtime translations](#runtime-translations) or [Precompiled translations](#precompiled-translations).

### Runtime translations:
The first and the obvious approach is to load translations right before `ReactDom.render`.

> ...

### Precompiled translations
The second approach is to make separate build for the each locale.

* **Project example** - https://github.com/ttag-org/CRA-precompile-example
* **Demo** - https://ttag-org.github.io/CRA-precompile-example/

> #### Pros
> * No extra step for translations download and initialization (all translated strings are already placed right into the sources)
> * Less traffic overhead.
> 
> #### Cons
> * Separate build for each language.

To be able to place the translated strings into the sources we need to use `babel-plugin-ttag`. If we don't want to `eject` our app we can use `ttag.macro`:

```bash
npm i -D ttag.macro 
```

Let's add macro config to the root:

**babel-plugin-macros.config.js**

```js
module.exports = process.env.LOCALE ? {
    ttag: { resolve: { translations: `i18n/${process.env.LOCALE}.po`}}
}: {}
```
> You can reed more about babel-plugin-ttag options [here](/docs/plugin-api.html)

After that you can run your project with another locale setting:

```bash
LOCALE=uk npm run start
```

We should see that our translation was placed right in to the source files.

Please, refer to the [source code](https://github.com/ttag-org/CRA-precompile-example) for more details on how you can build and deploy your app with precompile approach.