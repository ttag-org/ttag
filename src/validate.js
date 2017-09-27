export function validateLocale(locale, config) {
    if (!config.locales[locale]) {
        throw new Error(`
                Locale '${locale}' is not found in config.
                useLocales accepts only existing locales. Use addLocale function before.
                Available locales: ${JSON.stringify(config.locales)}`);
    }
}

export function validateLocales(locales, config) {
    if (!Array.isArray(locales)) {
        throw new Error('useLocales accepts only array as the first argument');
    }
    locales.forEach((locale) => validateLocale(locale, config));
}
