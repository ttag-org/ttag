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