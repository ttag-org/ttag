# Migration guide
Migration guide for the `c-3po` and `babel-plugin-c-3po`

## from `0.4.x` to `0.5.x`
-------

#### c-3po lib
1. `nt` tag is removed and no longer supported

#### babel-plugin-c-3po
1. Uses validation by default, even if no config is provided.
2. `nt` tag is no longer extracted.
3. Doesn't make transformations for the default locale by default.
    You need to set [`resolve`](/configuration.html#configresolvetranslations-string) 
    property in the configuration:
    ```js
    { "resolve": { "translations": "default" } }
    ```
