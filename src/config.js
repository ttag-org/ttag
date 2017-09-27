const defaultHeaders = {
    'content-type': 'text/plain; charset=UTF-8',
    'plural-forms': 'nplurals=2; plural=(n!=1);',
};

const config = {
    locales: {},
    currentLocales: [],
    currentLocale: 'en',
    dedent: true,
    headers: defaultHeaders,
};

export function addLocale(locale, localeData) {
    config.locales[locale] = localeData;
}

export function setCurrentLocale(locale) {
    config.currentLocale = locale;
}

export function setDedent(dedent) {
    config.dedent = dedent;
}

export function setHeaders(headers) {
    config.headers = headers;
}

export function setCurrentLocales(locales) {
    config.currentLocales = locales;
}

export function getAvailLocales() {
    return config.locales;
}

export function getCurrentLocales() {
    return config.currentLocales;
}

export function getCurrentLocale() {
    return config.currentLocale;
}

export function isDedent() {
    return config.dedent;
}

export function getHeaders() {
    return config.headers;
}
