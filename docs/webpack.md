---
id: webpack
title: Webpack integration
---

In a few steps you will be able to setup the full translation cycle with `ttag` and webpack build system.

> All sources for this tutorial can be found [`here`](https://github.com/ttag-org/webpack-example)

<!-- toc -->

Assume that you have already installed webpack, babel-loader and ttag and have the folowing directory structure:

```bash
.
├── i18n
├── package.json
├── package-lock.json
├── src
│   └── index.js
└── webpack.config.js
```

<details>
<summary>webpack.config.js</summary>
```js
module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js"
  },
  output: {
    path: path.join(__dirname, "./dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: { loader: "babel-loader" }
      }
    ]
  }
};
```
</details>

<details>
<summary>src/index.js</summary>

</details>

## Step 1. Create .po file

To be able to create/modify/update `.po` files let's install `ttag-cli`.

```bash
npm i -D ttag-cli
```

For this short example we will create 1 localization file, lets assume we want to add Ukrainian localization to our site.

```bash
npx ttag init uk i18n/po
```
> **init** accepts 2 arguments: **uk**  is the language (need it for the plurals headers, default is **en**) and **i18n/uk.po** is the path to the translations file

## Step 2. Extract translations to the .po file

Let's assume that we have sources inside `src` folder. And to be able to translate, we should extract them to the **i18n/uk.po** file. 

We can do that simply with `ttag-cli`:

```bash
npx ttag update i18n/uk.po ./src
```