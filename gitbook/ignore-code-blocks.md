# Ignoring some code parts

If you want to avoid translations extraction/resolving inside some blocks, you can use special comments:

```js
/* disable ttag */

// or
function test() {
    /* disable ttag */
}
```

> You should always use a block comment. Single line comments will not work
