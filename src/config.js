const defaultHeaders = {
    'content-type': 'text/plain; charset=UTF-8',
    'plural-forms': 'nplurals=2; plural=(n!=1);',
};

function validateLocale(locale, availLocales) {
    if (!availLocales[locale]) {
        throw new Error(`
                Locale '${locale}' is not found in config.
                useLocales accepts only existing locales. Use addLocale function before.
                Available locales: ${JSON.stringify(availLocales)}`);
    }
}

function validateLocales(locales, availLocales) {
    if (!Array.isArray(locales)) {
        throw new Error('useLocales accepts only array as the first argument');
    }
    locales.forEach((locale) => validateLocale(locale, availLocales));
}

const isProd = process && process.env && process.env.NODE_ENV === 'production';

export default function Config() {
    const config = {
        locales: {},
        currentLocales: [],
        currentLocale: 'en',
        dedent: true,
        headers: defaultHeaders,
    };

    this.addLocale = (locale, localeData) => {
        config.locales[locale] = localeData;
    };

    this.setCurrentLocale = (locale) => {
        config.currentLocale = locale;
    };

    this.setDedent = (dedent) => {
        config.dedent = dedent;
    };

    this.setHeaders = (headers) => {
        config.headers = headers;
    };

    this.setCurrentLocales = (locales) => {
        if (!isProd) validateLocales(locales, this.getAvailLocales());
        config.currentLocales = locales;
    };

    this.getAvailLocales = () => {
        return config.locales;
    };

    this.getCurrentLocales = () => {
        return config.currentLocales;
    };

    this.getCurrentLocale = () => {
        return config.currentLocale;
    };

    this.isDedent = () => {
        return config.dedent;
    };

    this.getHeaders = () => {
        return config.headers;
    };
}
