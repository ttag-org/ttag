export function validateLocale(locale, availLocales) {
    if (!availLocales[locale]) {
        throw new Error(`
                Locale '${locale}' is not found in config.
                useLocales accepts only existing locales. Use addLocale function before.
                Available locales: ${JSON.stringify(availLocales)}`);
    }
}

export function validateLocales(locales, availLocales) {
    if (!Array.isArray(locales)) {
        throw new Error('useLocales accepts only array as the first argument');
    }
    locales.forEach((locale) => validateLocale(locale, availLocales));
}
