# Why .pot/.po files are not generated or updated?

One of the reasons for that is that your sources are already cached by babel.
To avoid this situation it's better to disable caching for extract or resolve step.

## Troubleshooting:

### General case

Consider using env var `BABEL_DISABLE_CACHE=1` to disable babel cache.

### webpack

You can set `cacheDirectory` option to `false` in `babel-loader` settings.

> You can check this [issue](https://github.com/ttag-org/ttag/issues/9) for more details.
