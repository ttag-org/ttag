import { transformTranslateObj } from './utils';
import { validateLocaleData, validateLocales, validateLocaleCode } from './validation';

const defaultHeaders = {
    'content-type': 'text/plain; charset=UTF-8',
    'plural-forms': 'nplurals=2; plural=(n!=1);',
};

const isProd = process && process.env && process.env.NODE_ENV === 'production';

export default function Config() {
    const config = {
        locales: {},
        currentLocales: [],
        currentLocale: 'en',
        dedent: true,
        headers: defaultHeaders,
    };

    this.addLocale = (locale, localeData, replaceVariablesNames) => {
        if (!isProd) validateLocaleCode(locale);
        if (!isProd) validateLocaleData(localeData);
        if (replaceVariablesNames) {
            localeData = transformTranslateObj(localeData);
        }
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
