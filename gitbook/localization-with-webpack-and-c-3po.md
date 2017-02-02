# Localization with webpack and c-3po

This short tutorial will demonstrate how c-3po can be used with webpack.

Sources can be found - here
Live demo - here

### Step 1. Installation

1. Firstly we need to create separate folder run **npm init **and  execute [installation](/chapter1.md) instructions.
```bash
npm install --save c-3po && npm install --save-dev babel-plugin-c-3po
```
2. Also we need to install webpack and babel loader for the webpack.
> just following install instructions from [here](https://github.com/babel/babel-loader)

```bash
npm install babel-loader babel-core babel-preset-es2015 webpack --save-dev
```

### Step 2. Setup app
Now we are ready to make some basic setup for our application. It will consist of index.html file and app.js.
Let's add **./dist** directory and add **index.html** there:
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
This is simple program that will display current time:

> ![Local image](./assets/webpack-demo-2.jpg)

Let's make setup for webpack. Here is our **webpack.config.js**:

```js
module.exports = {
    entry: './app.js',
    output: { filename: './dist/app.js' },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, loader: 'babel-loader' }
        ]
    }
}
```

And now we can execute **webpack** to build our **app.js** file and open index.html in browser.

### Step 2. Plural forms
English language has only 2 plural forms and quite simple rule for 
defining what form we should be used (n!=1). c-3po uses en locale by default. So, you can just
enable c-3po plugin and use **ngettext** for describing plurals.

Let's add c-3po plugin to our babel loader config (I will be using webpack 2 config format).

```js
// ...

rules: [
    {
        test: /\.(js|jsx)$/,
        use: { loader: 'babel-loader', options: {plugins: ['c-3po'] } }
    }
]
```

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

We specified all plural forms for en locale, and everything is ready to build webpack and see
how they are working in the browser:

> ![Local image](./assets/webpack-demo-3.png)

We must note that now we see `1 second` instead of `1 seconds`. Let's examine how our app.js
changed:

Before - 3.0K:
```js
total 8,0K
-rw-rw-r-- 1 www www 3,0K jan  2 11:47 app.js
-rw-rw-r-- 1 www www  198 jan  2 11:24 index.html
```

After - 5.1K:
```js
total 12K
-rw-rw-r-- 1 www www 5.1K jan  2 11:49 app.js
-rw-rw-r-- 1 www www  198 jan  2 11:24 index.html
```

Note that it's non minified and non gzipped code. So, you can see that c-3po adds minimal overhead
for plural form support. This is one of the main advantages of this library is that it has almost
zero overhead(1.9K) in the resulting bundles.