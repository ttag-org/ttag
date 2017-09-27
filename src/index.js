import { getMsgid, msgid2Orig, buildStr, makePluralFunc,
    getPluralFunc, transformTranslateObj, buildArr, dedentStr } from './utils';
import Config from './config';

const conf = new Config();

function isFuzzy(translationObj) {
    return (
        translationObj && translationObj.comments &&
        translationObj.comments.flag === 'fuzzy');
}

function findTransObj(locale, str) {
    const locales = conf.getAvailLocales();
    const translation = locales[locale] && locales[locale].translations[''][str];
    return translation && !isFuzzy(translation) ? translation : null;
}

function findTranslation(str) {
    const locales = conf.getCurrentLocales();
    if (locales.length) {
        for (let i = 0; i < locales.length; i++) {
            const translation = findTransObj(locales[i], str);
            if (translation) {
                return translation;
            }
        }
    }
    return findTransObj(conf.getCurrentLocale(), str);
}

function maybeDedent(str) {
    return conf.isDedent() ? dedentStr(str) : str;
}

export function t(strings, ...exprs) {
    let result = strings;
    if (strings && strings.reduce) {
        const id = maybeDedent(getMsgid(strings, exprs));
        const transObj = findTranslation(id);
        result = transObj ? msgid2Orig(transObj.msgstr[0], exprs) : buildStr(strings, exprs);
    }
    return maybeDedent(result);
}

const separator = /(\${\s*\d+\s*})/g;
const slotIdRegexp = /\${\s*(\d+)\s*}/;

export function jt(strings, ...exprs) {
    if (strings && strings.reduce) {
        const id = getMsgid(strings, exprs);
        const transObj = findTranslation(id);
        if (!transObj) return buildArr(strings, exprs);

        // splits string & capturing group into tokens
        //
        const translatedTokens = transObj.msgstr[0].split(separator);

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
    const transObj = findTranslation(id);
    return transObj ? transObj.msgstr[0] : id;
}

export function ngettext(...args) {
    const currentLocale = conf.getCurrentLocale();
    const locales = conf.getAvailLocales();
    const id = maybeDedent(getMsgid(args[0]._strs, args[0]._exprs));
    const n = args[args.length - 1];
    const trans = findTransObj(currentLocale, id);
    const headers = trans ? locales[currentLocale].headers : conf.getHeaders();
    const pluralStr = getPluralFunc(headers);
    const pluralFn = makePluralFunc(pluralStr);
    let result;
    if (!trans) {
        const forms = args.slice(1, -1);
        forms.unshift(args[0].toString());
        result = pluralFn(n, forms);
    } else {
        result = msgid2Orig(pluralFn(n, trans.msgstr), args[0]._exprs);
    }

    return maybeDedent(result);
}

export function addLocale(locale, data, replaceVariablesNames = true) {
    if (replaceVariablesNames) {
        data = transformTranslateObj(data);
    }
    conf.addLocale(locale, data);
}

export function useLocale(locale) {
    conf.setCurrentLocale(locale);
}

export function setDedent(value) {
    conf.setDedent(Boolean(value));
}

export function setDefaultHeaders(headers) {
    conf.setHeaders(headers);
}

export function useLocales(locales) {
    conf.setCurrentLocales(locales);
}
