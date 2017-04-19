# CHANGELOG
### 0.5.1
Renamed `setHeaders` to `setDefaultHeaders` for consistency with babel plugin setting.

### 0.5.0
1. Default headers setup - [doc](/configuration-c-3po-lib.html#setheaders-object-headers)
2. Multiline support for c-3po lib + setDedent setting - [doc](/configuration-c-3po-lib.html#setdedent-bool-value)
3. Tutorial about [development and production setup with c-3po and webpack](/localization-with-webpack-and-c-3po.html)
4. Removed `nt`from the core lib.
5. `pkg.module` support (details [here](https://github.com/rollup/rollup/wiki/pkg.module))

Migration guide - [from 0.4.x to 0.5.x](/MIGRATION.html#from-04x-to-05x)


### 0.4.x
Extracted format changed from `${ 0 }` to `${ name }`.