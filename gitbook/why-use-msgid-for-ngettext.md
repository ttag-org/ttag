# Why there must be a msgid tag in ngettext?

From the first glance, it is not clear why we should use *msgid* tag for the first argument of ngettext
function.
 
**The main reason for this is to be able to use c-3po without babel transpile.**

### Details:

Valid ngettext usage:

```js
import { ngettext, msgid } from 'c-3po'

function test(n) {
    return ngettext(msgid`${n} time clicked`, `${n} times clicked`, n)
}
``` 

For instance, we have a universal(isomorphic) application and our translations must be applied on the server side at a runtime. So, **c-3po** should be able to match an appropriate translation without 
additional transpilation steps. To find the translation it should 
get a proper **msgid** from ngettext's first argument. Let's imagine we are executing the function
described above:

```js
test(3);
```

Inside ngettext function we will receive `3 time clicked` instead of `${n} time clicked`.

The problem is, that expressions in the template have been already evaluated. 
So there is no opportunity to find out what template we used before evaluation in our source strings. 
That is the reason, why there must be some kind of a tag that will save **msgid** before evaluation.

> You can find out more about es6 tagged templates - [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

Unfortunately we still are not able to save exactly this form of the template - `${n} time clicked`.
The reason for that, is that tag function will receive only 2 arguments. The first one is the array of strings and the second is
the array of expressions (evaluated already). So there is no other option other that using ordinal number
of expression like `${ 0 } time clicked` in **msgid**.


