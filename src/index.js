import { getMsgid, msgid2Orig, buildStr, getPluralFnForTrans,
     buildArr, dedentStr } from './utils';
import { validateNgettextMsgid, validateNgettextNumber,
    validateNgettextPluralForms, validateLang } from './validation';
import Config from './config';

const conf = new Config();

function Context(context) {
    if (process.env.NODE_ENV !== 'production') {
        if (typeof context !== 'string') {
            throw new Error('String type is expected as a first ' +
                'argument to c() function.');
        }
    }
    this.getContext = () => context;
}

const getTransContext = (obj) => {
    if (obj instanceof Context) {
        return obj.getContext();
    }
    return '';
};

function isFuzzy(translationObj) {
    return (
        translationObj && translationObj.comments &&
        translationObj.comments.flag === 'fuzzy');
}

function hasTranslations(msgstr) {
    if (!msgstr) return false;
    for (let i = 0; i < msgstr.length; i++) {
        if (!msgstr[i].length) return false;
    }
    return true;
}

function findTransObj(locale, str, ctx) {
    const locales = conf.getAvailLocales();
    const localeData = locales[locale];
    if (!localeData) return null;
    // verbose format
    if (localeData.translations) {
        const translations = localeData.translations[ctx] || localeData.translations[''];
        const translation = translations && translations[str];
        if (translation && !isFuzzy(translation) && hasTranslations(translation.msgstr)) {
            return translation.msgstr;
        }
    }
    // compact format
    if (localeData.contexts) {
        const translations = localeData.contexts[ctx] || localeData.contexts[''];
        const translation = translations && translations[str];
        if (translation && hasTranslations(translation)) {
            return translation;
        }
    }
    return null;
}

function findTranslation(str, ctx) {
    const locales = conf.getCurrentLocales();
    if (locales.length) {
        for (let i = 0; i < locales.length; i++) {
            const translation = findTransObj(locales[i], str, ctx);
            if (translation) {
                conf.setCurrentLocale(locales[i]);
                return translation;
            }
        }
    }
    return findTransObj(conf.getCurrentLocale(), str, ctx);
}

const maybeDedent = (str) => (conf.isDedent() ? dedentStr(str) : str);

export function t(strings, ...exprs) {
    let result = strings;
    if (strings && strings.reduce) {
        const id = maybeDedent(getMsgid(strings, exprs));
        const context = getTransContext(this);
        const trans = findTranslation(id, context);
        result = trans ?
            msgid2Orig(trans[0], exprs) : buildStr(strings, exprs);
    }
    return maybeDedent(result);
}

const separator = /(\${\s*\d+\s*})/g;
const slotIdRegexp = /\${\s*(\d+)\s*}/;

export function jt(strings, ...exprs) {
    if (strings && strings.reduce) {
        const id = maybeDedent(getMsgid(strings, exprs));
        const context = getTransContext(this);
        const trans = findTranslation(id, context);
        if (!trans) return buildArr(strings, exprs);

        // splits string & capturing group into tokens
        //
        const translatedTokens = trans[0].split(separator);

        return translatedTokens.map((token) => {
            const slotIdMatch = token.match(slotIdRegexp);
            // slotIdMatch is not null only when the token is a variable slot (${xx})
            return slotIdMatch ? exprs[+slotIdMatch[1]] : token;
        });
    }
    return strings;
}

export function msgid(strings, ...exprs) {
    /* eslint-disable no-new-wrappers */
    if (strings && strings.reduce) {
        const result = new String(buildStr(strings, exprs));
        result._strs = strings;
        result._exprs = exprs;
        return result;
    }

    return strings;
}

export function gettext(id) {
    const context = getTransContext(this);
    const trans = findTranslation(id, context);
    return trans ? trans[0] : id;
}

export const _ = gettext;

export function ngettext(...args) {
    if (process.env.NODE_ENV !== 'production') validateNgettextMsgid(args[0]);

    const id = maybeDedent(getMsgid(args[0]._strs, args[0]._exprs));
    const n = args[args.length - 1];
    if (process.env.NODE_ENV !== 'production') validateNgettextNumber(n);

    const forms = args.slice(1, -1);
    forms.unshift(args[0].toString());
    if (process.env.NODE_ENV !== 'production') {
        validateNgettextPluralForms(conf.getDefaultPluralFormsCount(), forms.length);
    }

    const trans = findTranslation(id, getTransContext(this));
    if (trans) {
        const pluralFn = getPluralFnForTrans(conf);
        return maybeDedent(
            msgid2Orig(pluralFn(n, trans), args[0]._exprs)
        );
    }
    const pluralFn = conf.getDefaultPluralFn();
    return maybeDedent(pluralFn(n, forms));
}

export function addLocale(locale, data) {
    conf.addLocale(locale, data);
}

export function useLocale(locale) {
    conf.setCurrentLocale(locale);
}

export function setDedent(value) {
    conf.setDedent(Boolean(value));
}

export function useLocales(locales) {
    conf.setCurrentLocales(locales);
}

export function setDefaultLang(lang) {
    if (process.env.NODE_ENV !== 'production') validateLang(lang);
    conf.setDefaultLang(lang);
}

export function c(context) {
    const ctx = new Context(context);
    return {
        t: t.bind(ctx),
        jt: jt.bind(ctx),
        gettext: gettext.bind(ctx),
        ngettext: ngettext.bind(ctx),
    };
}
