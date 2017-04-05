# Configuration for babel-plugin-c-3po

c-3po configuration is a simple javascript object \(**Config**\).

### Config.extract.output \(string\)

Specifies file where to save extracted translations \(.pot file\). If this setting is present then c-3po-plugin will extract translations.

### Config.extract.location \(string one of: 'full', 'file', 'never'\)

Set's mode for the translations file reference.

**full **- file location with line number

**file **- only file location without line number

**never **- don't attach file reference

### **Config.resolve.translations \(string\)**

Specifies path to the *.po* file with translations that will be placed in sources.

Example:
```json
{ "resolve": { "translations": "i18n/uk.po" } }
``` 

Can be set to *default* value to strip c-3po tags and resolve the default locale:

```json
{ "resolve": { "translations": "default" } }
```

### **Config.resolve.unresolved \(string one of: 'fail', 'warn', 'skip'\)**

Default behaviour - **skip**.

Sets action when translation for some string is not found in .po file.

Actions:

**fail **- will throw exception with information about string that has no translation.

**warn **- will send warn message to stdout.

**skip **- no reaction

This setting can be useful if you want to ensure that all translations are present before some release, branch merge e.t.c.

Example: 
```json
{ "resolve": { "translations": "uk.po", "unresolved": "fail" } }
```

### Config.extractors.[FunctionName].invalidFormat \(string one of: 'fail', 'warn', 'skip'\)

> Available function names: tag-gettext, ngettext, gettext, tag-ngettext

Default behaviour -** fail**

Sets action when some extracted function \(t, gettext, ngettext e.t.c\) has invalid format.

Actions:

**fail **- will throw exception with information about string that has no translation.

**warn **- will send warn message to stdout.

**skip **- no reaction

Example:
```json
{"extractors": { "tag-gettext": { "invalidFormat": "skip" } } }
```

### Config.dedent \(boolean\)

Configures wether multiline strings should be dedented - [/multiline-strings.md](/multiline-strings.md)

### Config.discover \(Array of strings\)

Points at what functions \(t, ngettext, gettext e.t.c\) should be discovered without import in file.

### Config.defaultHeaders** \(Object\)**

Default headers for .pot file \(base file with extracted translations\).

Default \(English locale\):

```
'content-type': 'text/plain; charset=UTF-8'
'plural-forms': 'nplurals=2; plural=(n!=1);'
```

### Config.addComments **[ boolean | string ]**
> Disabled by default

Set this setting to *true* to extract leading comments before translated string.
```js
addComments: true
```

```js
// this comment will be extracted to .po file
t`translated string`
```

Also you can specify tag (mark) that will filter comments that will be extracted:
```js
addComments: 'translator:'
```

```js
// this comment will not be extracted
// translator: only this comment will be extracted
t`translated string`
```

### Config.sortByMsgid

The resulting entries in .po(.pot) file will be sorted alphabetically by msgid. Can be helpful
for avoiding merge conflicts.