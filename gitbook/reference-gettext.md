# gettext

> Consider using [the `t`](reference-t-tag.md) function \(less code, supports template expressions\)

## Live demo
> this demo works without transpile step, consider using babel-plugin-ttag for production usage

https://jsfiddle.net/AlexMost/us7hufjr/3/

### Usage

```js
import { gettext } from 'ttag'

gettext('simple gettext');
```

### gettext format

**valid:**

```js
gettext('simple gettext')
```

**invalid:**

```js
gettext(`template literal`) // template literals are not supported
gettext('one', 'two') // gettext supports only 1 argument
```



