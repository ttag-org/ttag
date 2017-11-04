function validateLocale(locale, availLocales) {
    if (process.env.NODE_ENV !== 'production') {
        if (!availLocales[locale]) {
            throw new Error(`
                    Locale '${locale}' is not found in config.
                    useLocales accepts only existing locales. Use addLocale function before.
                    Available locales: ${JSON.stringify(availLocales)}`);
        }
    }
}

export function validateLocaleData(data) {
    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line
        const addLocaleDoc = 'https://c-3po.js.org/configuration-c-3po-lib.html#addlocale-string-locale-object-data-bool-replacevariablesnames';
        if (!data) {
            throw new Error(`
            Locale data sould not be empty.
            see - ${addLocaleDoc}
            `);
        }
        if (!data.headers) {
            throw new Error(`
            Locale data sould contain headers "${JSON.stringify(data)}".
            see - ${addLocaleDoc}
            `);
        }
        if (!data.translations) {
            throw new Error(`
            Locale data sould contain translations "${JSON.stringify(data)}".
            see - ${addLocaleDoc}
            `);
        }
        if (! Object.keys(data.translations).length) {
            throw new Error(`
            Locale data.translations should have at least 1 key"${JSON.stringify(data)}".
            see - ${addLocaleDoc}
            `);
        }
    }
}

export function validateLocales(locales, availLocales) {
    if (process.env.NODE_ENV !== 'production') {
        if (!Array.isArray(locales)) {
            throw new Error('useLocales accepts only array as the first argument');
        }
        locales.forEach((locale) => validateLocale(locale, availLocales));
    }
}
