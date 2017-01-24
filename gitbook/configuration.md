### Configuration

c-3po configuration is a simple javascript object \(**Config**\).

### Config.extract.output \(string\)

Specifies file where to save extracted translations \(.pot file\). If this setting is present then c-3po-plugin will extract translations.

### Config.extract.output \(string one of: 'full', 'file', 'never'\)

Set's mode for the translations file reference.

**full **- file location with line number

**file **- only file location without line number

**never **- don't attach file reference

### **Config.resolve.locale \(string\)**

If this configuration is present, then all translations from specified locale \(en, us, uk\) will be placed in a resulting code.

> Retrieves appropriate .po file from **config.locales **setting

### **Config.resolve.unresolved \(string one of: 'fail', 'warn', 'skip'\)**

Default behaviour - **skip**.

Sets action when translation for some string is not found in .po file.

Actions:

**fail **- will throw exception with information about string that has no translation.

**warn **- will send warn message to stdout.

**skip **- no reaction

This setting can be useful if you want to ensure that all translations are present before some release, branch merge e.t.c.

### Config.extractors.invalidFormat \(string one of: 'fail', 'warn', 'skip'\)

Default behaviour -** fail**

Sets action when some extracted function \(t, gettext, ngettext e.t.c\) has invalid format.

Actions:

**fail **- will throw exception with information about string that has no translation.

**warn **- will send warn message to stdout.

**skip **- no reaction

### Config.dedent \(boolean\)

Configures wether multiline strings should be dedented - [/multiline-strings.md](/multiline-strings.md)



