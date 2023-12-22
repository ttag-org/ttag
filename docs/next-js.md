---
id: next-js
title: Next
---

At the end of this short tutorial you will learn how to set up the localization
process for [Next JS](https://nextjs.org/) and the ttag library.

## Step 1. Installation

Install ttag dependencies in your Next project.

```bash
npm i ttag
npm i -D ttag-cli
```

## Step 2. Create .po file for translations

At this step, we should create `.po` file for the language that we want to translate to.
For this example, we will create `.po` file with all appropriate settings for the Ukrainian language (`uk` code).

```bash
mkdir i18n # create a separate dir to keep translation files
npx ttag init uk i18n/uk.po
```

> You can find the list of all available language codes here - https://www.w3.org/International/O-charset-lang.html

## Step 3. Wrap strings with tags

Let's edit `src/pages/index.tsx` and wrap the **"Home page"** string to practice translating a single string:

```tsx
export default function Home() {
    return <div>{t`Home page`}</div>;
}
```

## Step 4. Update the translation file and add a translation

In this step, we will use `update` command from `ttag-cli` to extract translations from the sources.
This will also update references to the translated string and remove strings that aren't present in the source files.

```bash
npx ttag update i18n/uk.po src/
```

After this, we should see that the new translation was added to the `i18n/uk.po` file:

```po
#: src/pages/index.tsx:4
msgid "Home page"
msgstr ""
```

Let's add a translation:

```po
#: src/pages/index.tsx:4
msgid "Home page"
msgstr "Домашня сторінка"
```

## Step 5. Let's parse .po file to json

It's necessary for easier import and use

```bash
npx ttag po2json i18n/uk.po > i18n/uk.po.json
```

## Step 6. Add translation to our App

You should add file `_app.jsx` to pages folder if you haven't and edit it in the next way:

```tsx
// /src/pages/_app.tsx
import type { AppProps } from 'next/app';
import { addLocale } from 'ttag';
import translationUk from '../../i18n/uk.po.json';

addLocale('uk', translationUk);

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
        </>
    );
}
```

## Step 7. Internationalization in Next config

> You can find more information on this topic in [Next Docs](https://nextjs.org/docs/pages/building-your-application/routing/internationalization)

Next js has locale strategies with subpath `example.com/uk/blog` and domain `example.uk/blog`.
In our example we will implement first variant, we should edit file `next.config.js` and add in config object `i18n` field with next params

```js
const nextConfig = {
  ...
  i18n: {
    locales: ["en-US", "uk"],
    defaultLocale: "en-US",
  },
  ...
};

module.exports = nextConfig;

```

After this configuration we will get our locale when we will use Next hook `useRouter`

## Step 7. Use necessary locale

We need return to file `src/pages/_app.jsx` and add next changes

```jsx
// /src/pages/_app.tsx

import type { AppProps } from "next/app";
import { addLocale, useLocale } from "ttag";
import { useRouter } from "next/router";
import translationUk from "../../i18n/uk.po.json";

addLocale("uk", translationUk);

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useLocale(router.locale);

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
```

You can see full demo in https://github.com/ttag-org/ttag-next-example
