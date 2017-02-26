import { getMsgid, msgid2Orig, buildStr, makePluralFunc,
    getPluralFunc } from './utils';

const locales = {};
let currentLocale;

function findTransObj(locale, str) {
    return locales[locale] ? locales[locale].translations[''][str] : str;
}

export function t(strings, ...exprs) {
    if (strings && strings.reduce) {
        const id = getMsgid(strings, exprs);
        const transObj = findTransObj(currentLocale, id);
        return transObj ? msgid2Orig(transObj.msgstr[0], exprs) : id;
    }
    return strings;
}

export function nt() {
    return (strings, ...exprs) => {
        if (strings && strings.reduce) {
            return buildStr(strings, exprs);
        }
        return strings;
    };
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

export function gettext(text) {
    return text;
}

export function ngettext(...args) {
    const id = getMsgid(args[0]._strs, args[0]._exprs);
    const n = args[args.length - 1];
    const trans = findTransObj(currentLocale, id);
    const pluralStr = getPluralFunc(locales[currentLocale].headers);
    const pluralFn = makePluralFunc(pluralStr);

    if (!trans) {
        const forms = args.slice(1, -1);
        forms.unshift(args[0].toString());
        return pluralFn(n, forms);
    }

    return msgid2Orig(pluralFn(n, trans.msgstr), args[0]._exprs);
}

export function regLocale(locale, data) {
    locales[locale] = data;
}

export function useLocale(locale) {
    currentLocale = locale;
}
