import './declarations.d.ts';
import { getPluralFunc, getNPlurals } from 'plural-forms/minimal-safe';
import { transformTranslateObj, transformCompactObj } from './utils';
import { validateLocaleData, validateLocales, validateLocaleCode } from './validation';

export interface GetTextComment {
    translator: string;
    reference: string;
    extracted: string;
    flag: string;
    previous: string;
}

export type TTagTranslation = {
    msgctxt?: string | undefined;
    msgid: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    msgid_plural?: any;
    msgstr: string[];
    comments?: GetTextComment | undefined;
};

export type TTagTranslations = {
    charset: string;
    headers: { [headerName: string]: string };
    translations: { [msgctxt: string]: { [msgId: string]: TTagTranslation } };
};

export type TTagCompactTranslations = {
    charset: string;
    headers: { [headerName: string]: string };
    contexts: { [msgctxt: string]: { [msgId: string]: string[] } };
};

type ConfigType = {
    locales: { [locale: string]: TTagTranslations | TTagCompactTranslations };
    currentLocales: (string | (() => string))[];
    currentLocale: string | (() => string);
    dedent: boolean;
    defaultLang: string;
};

export default class Config {
    config: ConfigType = {
        locales: {},
        currentLocales: [],
        currentLocale: 'en',
        dedent: true,
        defaultLang: 'en',
    };

    addLocale(locale: string, localeData: TTagTranslations | TTagCompactTranslations) {
        if (process.env.NODE_ENV !== 'production') validateLocaleCode(locale);
        if (process.env.NODE_ENV !== 'production') validateLocaleData(localeData);
        let transformedData: ReturnType<typeof transformTranslateObj | typeof transformCompactObj>;
        if ('translations' in localeData) {
            transformedData = transformTranslateObj(localeData);
        } else if (localeData.contexts) {
            transformedData = transformCompactObj(localeData);
        } else {
            throw new Error('Invalid locale data format');
        }
        this.config.locales[locale] = transformedData;
    }

    setCurrentLocale(locale: string | (() => string)) {
        this.config.currentLocale = locale;
    }

    setDedent(dedent: boolean) {
        this.config.dedent = dedent;
    }

    setCurrentLocales(locales: string[]) {
        if (process.env.NODE_ENV !== 'production') validateLocales(locales, this.getAvailLocales());
        this.config.currentLocales = locales;
    }

    getAvailLocales() {
        return this.config.locales;
    }

    getCurrentLocales() {
        return this.config.currentLocales.map((locale) => (typeof locale === 'string' ? locale : locale()));
    }

    getCurrentLocale() {
        return typeof this.config.currentLocale === 'string' ? this.config.currentLocale : this.config.currentLocale();
    }

    isDedent() {
        return this.config.dedent;
    }

    setDefaultLang(lang: string) {
        this.config.defaultLang = lang;
    }

    getDefaultPluralFn() {
        return getPluralFunc(this.config.defaultLang);
    }

    getDefaultPluralFormsCount() {
        return getNPlurals(this.config.defaultLang);
    }

    getCurrentLocaleHeaders() {
        const locale = this.getCurrentLocale();
        return this.config.locales[locale].headers;
    }
}
