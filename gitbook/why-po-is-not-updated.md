# Why .pot(po) file is not generated or updated?

One of the reasons for that is that your sources are already cached by babel.
to avoid this situation it's better to disable caching for extract or resolve step.

## Troubleshooting:

### general case

Consider using env var **BABEL_DISABLE_CACHE=1** to disable babel cache.

### webpack

You can set **cacheDirectory** option to false in **babel-loader** settings.

> You can check this [issue](https://github.com/c-3po-org/c-3po/issues/9) for more details.
