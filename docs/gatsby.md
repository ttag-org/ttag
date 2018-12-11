---
id: gatsby
title: Gatsby
---

At the end of this short tutorial you will learn how to set up the localization
process for [Gatsby](https://www.gatsbyjs.org/) and the ttag library.

## Step 1. Installation
Follow these steps to setup gatsby and install ttag dependencies.

```bash
npm install --global gatsby-cli
gatsby new ttag-gatsby
cd ttag-gatsby
npm i ttag
npm i -D ttag-cli
```

## Step 2. Create .po file for translations
At this step, we should create `.po` file for the language that we want to translate to.
For this example, we will create `.po` file with all appropriate settings for the Spanish language (`es` code).

```bash
mkdir i18n # create a separate dir to keep translation files
npx ttag init uk i18n/es.po
```

> You can find the list of all available language codes here - https://www.w3.org/International/O-charset-lang.html


## Step 3. Wrap strings with tags

Let's edit `src/pages/index.js` and wrap the __"Hi people"__ string to practice translating a single string:

```jsx
import { t } from 'ttag';

//... some jsx code
<Layout>
  <h1>{ t`Hi people` }</h1>
  <p>Welcome to your new Gatsby site.</p>
  //... some jsx code
</Layout>
```

## Step 4. Update the translation file and add a translation
On this step, we will use `update` command from `ttag-cli` to extract translations from the sources.
This will also update references to the translated string and remove strings that aren't present in the source files.

```bash
npx ttag udpate i18n/es.po src/
```

After this, we should see that the new translation was added to the `i18n/es.po` file:

```po
#: src/pages/index.js:11
msgid "Hi people"
msgstr ""
```

Let's add a translation:

```po
#: src/pages/index.js:11
msgid "Hi people"
msgstr "¡Hola Amigos!"
```

## Step 5. Setup precompiled translations

In this tutorial we'll only be showing how to setup **precompiled** translations, as the whole
purpose of Gatsby as a static site generator is to generate your website ahead of time
in order to ensure the fastest possible final result.

### Add a custom Babel config

To setup Gatsby to work with ttag, you'll need to create a custom babel config in the root
directory of your project. In order to switch based on environment variables, we'll need
to use the `babel.config.js` variety of babel config instead of the static `.babelrc`.

You'll need to explicitly install and use the `babel-preset-gatsby` babel plugin since
we're [overriding the default babel config](https://www.gatsbyjs.org/docs/babel/) shipped with gatsby.

```bash
npm install --save babel-preset-gatsby
```

Here's a simple babel config that we'll use to precompile the right language at build time:

```js
const { env: { LOCALE } } = process;

module.exports = {
  "presets": [
    [
      "babel-preset-gatsby",
    ],
  ],
  "plugins": [
    [
      "babel-plugin-ttag",
      {
        "resolve": {
          "translations": LOCALE === "es" ? "i18n/es.po" : "default",
        },
      },
    ],
  ],
}
```

The key portion here is the line where `babel-plugin-ttag`'s option object's
`resolve.translations` value is dynamically set based on the presence of an environment variable.

### Build (or develop) by locale

The dynamic babel config shown above allows you to pick a translation at build (or develop) time like so:


```bash
LOCALE=es npm run build
```

For convenience, you can make specialized build and develop scripts which take care of setting
these environment variables for you:

```JSON
{
  "scripts": {
    "build:en": "LOCALE=en gatsby build",
    "develop:en": "LOCALE=en gatsby develop",
    "build:es": "LOCALE=es gatsby build",
    "develop:es": "LOCALE=es gatsby develop"
  }
}
```

## Default Starter

If you like, there is a [default starter](https://www.gatsbyjs.org/starters/gatsby-starter-ttag/)
preconfigured with the above outlined steps:

```bash
gatsby new my-ttag-site https://github.com/jaredh159/gatsby-starter-ttag
```
