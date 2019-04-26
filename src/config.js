import { transformTranslateObj } from './utils';
import { validateLocaleData, validateLocales, validateLocaleCode } from './validation';
import { getPluralFunc, getNPlurals } from 'plural-forms/dist/minimal';

export default function Config() {
    const config = {
        locales: {},
        currentLocales: [],
        currentLocale: 'en',
        dedent: true,
        defaultLang: 'en',
    };

    this.addLocale = (locale, localeData) => {
        if (process.env.NODE_ENV !== 'production') validateLocaleCode(locale);
        if (process.env.NODE_ENV !== 'production') validateLocaleData(localeData);
        localeData = transformTranslateObj(localeData);
        config.locales[locale] = localeData;
    };

    this.setCurrentLocale = (locale) => {
        config.currentLocale = locale;
    };

    this.setDedent = (dedent) => {
        config.dedent = dedent;
    };

    this.setCurrentLocales = (locales) => {
        if (process.env.NODE_ENV !== 'production') validateLocales(locales, this.getAvailLocales());
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

    this.setDefaultLang = (lang) => {
        config.defaultLang = lang;
    };

    this.getDefaultPluralFn = () => {
        return getPluralFunc(config.defaultLang);
    };

    this.getDefaultPluralFormsCount = () => {
        return getNPlurals(config.defaultLang);
    };

    this.getCurrentLocaleHeaders = () => {
        return config.locales[config.currentLocale].headers;
    };
}
