# Localization with webpack and c-3po

This short tutorial will demonstrate how c-3po can be used with webpack.
Both development and production setups will be described.

<!-- toc -->

## 1. Initial setup

### 1.1 Why should I care about dev and prod setup?
There are different requirements to development and production setups.

Requirements for the dev setup:

1. Faster builds.
2. Simple setup.
3. Fast feedback.

Prod. setup:
1. Smaller assets.
2. Less work to load locale (faster locale load).

According to this requirements, c-3po provides you options for making
efficient production and development setups.

### 1.2 Application overview
For demonstration purposes, we will implement simple clock application.
Something like implemented [here](https://jsfiddle.net/AlexMost/9wuafbL5/7/).

Sources - [here](https://github.com/c-3po-org/c-3po/tree/master/examples/webpack-setup)

### 1.3 Installation

1. Firstly we need to create separate folder run **npm init **and  execute [installation](/chapter1.md) instructions.
```bash
npm install --save c-3po && npm install --save-dev babel-plugin-c-3po
```
2. Also we need to install webpack and babel loader for the webpack.
> just following install instructions from [here](https://github.com/babel/babel-loader)
```bash
npm install babel-loader babel-core babel-preset-env webpack --save-dev
```

### 1.4 Basic app setup
Now we are ready to make a basic setup for our application. It will consist of index.html 
file and app.js. Let's add **./dist** directory and add **index.html** there:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Webpack with c-3po demo</title>
</head>
<body>
<div id="content"></div>
<script src="./app.js"></script>
</body>
</html>
```
Nothing special, just some html boilerplate.

Let's add **app.js** file also, that will contain our simple business logic:
```js
import { ngettext, msgid, t } from 'c-3po';
const content = document.getElementById('content');

const view = (hours, minutes, seconds) => {
    const hoursTxt = `${hours} hours`;
    const minutesTxt = `${minutes} minutes`;
    const secondsTxt = `${seconds} seconds`;

    return `
    <h1>${ t`webpack with c-3po localization demo` }</h1>
    <h2>${ t`Current time is` }</h2>
    <h3>${hoursTxt} ${minutesTxt} ${secondsTxt}</h3>
    `
};


setInterval(() => {
    const date = new Date();
    content.innerHTML = view(date.getHours(), date.getMinutes(), date.getSeconds());
}, 1000);

```
This is simple program that will display the current time:

> ![Local image](./assets/webpack-demo-2.jpg)

Let's make setup for webpack. Here is our **webpack.config.js**:

```js
module.exports = {
    entry: './app.js',
    output: { filename: './dist/app.js' },
    module: {
        rules: [
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              use: { loader: 'babel-loader' }
           }
        ]
    }
}
```

And now we can execute **webpack** to build our **app.js** file and open index.html in a browser.

### 1.5 Wrapping strings with c-3po functions and tags

Let's wrap our literals in **ngettext** and **t**:


```js
import { ngettext, msgid, t } from 'c-3po';

const view = (hours, minutes, seconds) => {
    const hoursTxt = ngettext(msgid`${hours} hour`, `${hours} hours`, hours);
    const minutesTxt = ngettext(msgid`${minutes} minute`, `${minutes} minutes`, minutes);
    const secondsTxt = ngettext(msgid`${seconds} second`, `${seconds} seconds`, seconds);

    return `
    <h1>${ t`webpack with c-3po localization demo` }</h1>
    <h2>${ t`Current time is` }</h2>
    <h3>${hoursTxt} ${minutesTxt} ${secondsTxt}</h3>
    `
};
```

> more about ngettext - [here](ngettext.md) and about t - [here](tag-gettext--t-.md)

Let's rebuild webpack and see what do we have in a browser:

> ![Local image](./assets/webpack-demo-3.png)

You can notice that plural forms are working without any extra configuration (`1 second` is displayed properly).
This behaves so because c-3po uses English locale by default.

### 2. Extracting translations to the .pot file
Let's extract our translations to template file (.pot). c-3po will extract translations only if it has
**[extract.output](configuration.md#configextractoutput-string)** setting, 
let's modify our webpack.config.js to be able to work in the extract mode.

```js
module.exports = ({ extract } = {}) => { // webpack 2 can accept env object
    const c3po = {};

    if (extract) {
        c3po.extract = { output: 'template.pot'} // translations will be extracted to template.pot
    }
    
    return {
        entry: './app.js',
        output: {
            filename: './dist/app.js'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: {
                        loader: 'babel-loader',
                        options: {plugins: [['c-3po', c3po]]}
                    }
                }
            ]
        }
    }
};
```
Let's extract translated strings by executing `webpack --env.extract`.

The resulting extracted .pot file:
```
msgid ""
msgstr ""
"Content-Type: text/plain; charset=utf-8\n"
"Plural-Forms: nplurals=2; plural=(n!=1);\n"

#: app.js:5
msgid "${ hours } hour"
msgid_plural "${ hours } hours"
msgstr[0] ""
msgstr[1] ""

#: app.js:6
msgid "${ minutes } minute"
msgid_plural "${ minutes } minutes"
msgstr[0] ""
msgstr[1] ""

#: app.js:7
msgid "${ seconds } second"
msgid_plural "${ seconds } seconds"
msgstr[0] ""
msgstr[1] ""

#: app.js:10
msgid "webpack with c-3po localization demo"
msgstr ""

#: app.js:11
msgid "Current time is"
msgstr ""
```

## 3. Add locale (.po file)
Let's add Ukrainian locale - uk. We can use `msginit` tool for creation of .po file with all
appropriate to uk locale headers:

```bash
msginit -i template.pot -o uk.po -l uk
```
or you can just coppy paste it from the [sources](https://github.com/c-3po-org/c-3po/blob/master/examples/webpack-setup/uk.po).

If you havn't coppy pasted `uk.po` from the sources - the next step will be to add translations to uk.po.
Translations can be added by translators (nontechnical persons) and developers.
It's up to your process.

Here are translations:

```
#: app.js:5
msgid "${ hours } hour"
msgid_plural "${ hours } hours"
msgstr[0] "${ hours } година"
msgstr[1] "${ hours } години"
msgstr[2] "${ hours } годин"

#: app.js:6
msgid "${ minutes } minute"
msgid_plural "${ minutes } minutes"
msgstr[0] "${ minutes } хвилина"
msgstr[1] "${ minutes } хвилини"
msgstr[2] "${ minutes } хвилин"

#: app.js:7
msgid "${ seconds } second"
msgid_plural "${ seconds } seconds"
msgstr[0] "${ seconds } секунда"
msgstr[1] "${ seconds } секунди"
msgstr[2] "${ seconds } секунд"

#: app.js:10
msgid "webpack with c-3po localization demo"
msgstr "Демо локалізації з c-3po та webpack"

#: app.js:11
msgid "Current time is"
msgstr "Поточний час"
```

> In future you will add more string literals to your app, and you will need to update .po files.
> I suggest using `msgmerge` for that. Here is an example:
> ````bash
> msgmerge uk.po template.pot -U
> ````

## 4. Localization with dev setup
As I mentioned earlier, the requirements for the dev setup are:
1. Faster builds.
2. Simple setup.
3. Fast feedback loop (validation).

To be able to use our translation we need to load .po file somehow.

Let's use [po-gettext-loader](https://www.npmjs.com/package/po-gettext-loader)

```sh
npm install --save-dev po-gettext-loader json-loader
```

Ok, we are ready to load our translations via loader, let's
modify webpack config:
```js
const webpack = require('webpack');

module.exports = ({ extract } = {}) => { // webpack 2 can accept env object
    // ... 

    return {
        // ...
        module: {
            rules: [
                // ...
                { test: /\.po$/, loader: 'json-loader!po-gettext-loader' }
            ]
        },
        plugins: [
            new webpack.DefinePlugin(
                { 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'debug') }
            )
        ]
    }
};
```
A couple of changes here:
1. Use json loader after po loader, because we need our translations object to be used on the client-side.
2. Added DefinePlugin to be able to split dev and prod logic inside the app.

After this step, we can simply require `uk.po` file and apply `uk` locale on the application start.

Let's create a separate **localeSetup.js** file:
```js
import { addLocale, useLocale } from 'c-3po';
if (process.env.NODE_ENV !== 'production') {
    const ukLocale = require('./uk.po');
    addLocale('uk', ukLocale);
    useLocale('uk');   
}
```
> Notice that locale init logic is wrapped with the if condition, because we need that logic only during the dev setup.
> In the production mode all assets will be already translated on a build step.
 
After that we need to `import` **localeSetup.js** at the top of **app.js** file:

```js
import './localeSetup';
```
**`import './localeSetup'` must be the first import in your entry bundle, to setup locale before other exports evaluation**. 
As you know, es6 exports are evaluated before module execution. So, to apply translations
to exported values also, we need to make locale setup as soon as possible.

Let's build our app with `npm run build` and you will see that all translations are applied.
And here is what we can see in the browser:

> ![Local image](./assets/webpack-demo-4.png)

A few cool things here:

1. Translations are working.
2. You can run webpack in watch mode and it will watch for changes in .po files and will rebuild app if
some translation is added/changed.
3. [Validation](validation.md) is also working, just great!

I hope you have understood the main idea of how we can load locale in dev mode. In the real app, you will don't know
what locale is selected on a build step, so you may decide to place it somewhere in the initial app state or pass it
through some global var, or you can use webpack code splitting features and load it
asynchronously, it's up to your application requirements and design.

## 5. Localization with production setup

The main requirement for production setup are:

1. Smaller resulting assets.
2. Less work on a client to load locale.

**babel-plugin-c3po** allows you to precompile all your translations in the resulting bundles in compile time.
It will strip all c-3po tags and functions and place all translations on their places. Little pay for
that feature is that we should make a separate build for each locale. I think it's not a big trade off for
making your end user happier.

**babel-pugin-c-3po** will apply translations from some locale if **[resolve.translations](configuration.html#configresolvetranslations-string)** 
setting is present. **resolve.translations** must be set to the path to the **.po** file.
One thing to note here
is that we also should strip c-3po tags and functions for the default locale. Default locale is
resolved when **resolve.translations** is set with the 'default' value.

### 5.1 Making separate build for each locale

Let's modify our webpack config in a way that it can configure c-3po options to make an
appropriate transformations for some locale.

```js
module.exports = ({ extract, locale } = {}) => {
    const c3po = {};

    if (locale) { // we should pass default for the default locale.
        c3po.resolve = { translations: locale !== 'default' ? `${locale}.po` : 'default' };
    }
    // ...
}
```

Let's also change the resulting output filename to be able to compare it with the previous versions:

```js
output: {
    filename: locale ? `./dist/app_${locale}.js` : './dist/app.js'
}
```


Let's build localized assets with commands `webpack --env.locale=uk && webpack --env.locale=default`.
> If you are still using webpack 1, you can use simple env vars instead of
webpack env. For example: `LOCALE=uk webpack && LOCLE=default webpack`.

To see that it works le'ts modify scr attribute in *index.html*:
```html
<script src="./app_default.js"></script>
```
and
```html
<script src="./app_uk.js"></script>
```

> This step is done manually just for the demo purposes, in the real world url will be modified
somewhere on a backend that renders HTML output.

### 5.1 Replacing c-3po lib with mock
So, if we are placing all transactions at a build time there is no need to include the original
c-3po library in the resulting bundle. There is special mock for that case 
inside c-3po lib - *c-3po/dist/mock*. 

Let's add a webpack alias for that:
```js
resolve: {
    alias: {
        'c-3po': locale ? 'c-3po/dist/mock' : 'c-3po'
    }
}
```

This will minimize the resulting bundle size. Don't forget to use **NODE_ENV=production** to avoid translations to be
bundled in the resulting assets.

## 6. Results comparison

let's build all variants and compare the output size
```bash
webpack && NODE_ENV=production webpack --env.locale=uk && NODE_ENV=production webpack --env.locale=default
```

The resulting files inside **./dist**:
```bash
17K app.js
5,5K app_default.js
6,1K app_uk.js
```

Minified versions:
```bash
6.9K app.js
1.8K app_default.js
1.9K app_uk.js
```

As you can see production setup reduced the resulting bundle size.
