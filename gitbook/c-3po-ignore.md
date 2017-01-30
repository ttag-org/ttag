# Ignoring some code parts

If you want to avoid translations extraction/resolving inside some blocks, you can use special comments:

```js
/* disable c-3po */

// or
function test() {
    /* disable c-3po */
}
```

> This comment works in a block scope.