import { getMsgid, msgid2Orig, buildStr, makePluralFunc,
    getPluralFunc, defaultHeaders, transformTranslateObj, buildArr, dedentIfConfig } from './utils';

const config = {
    locales: {},
    currentLocale: 'en',
    dedent: true,
    headers: defaultHeaders,
};

function isFuzzy(translationObj) {
    return (
        translationObj && translationObj.comments &&
        translationObj.comments.flag === 'fuzzy');
}

function findTransObj(locale, str) {
    const { locales } = config;
    const translation = locales[locale] && locales[locale].translations[''][str];
    return translation && !isFuzzy(translation) ? translation : null;
}

function maybeDedent(str) {
    return config.dedent ? dedentIfConfig(config, str) : str;
}


export function tWithLocale(locale, strings, ...exprs) {
    let result = strings;
    if (strings && strings.reduce) {
        const id = maybeDedent(getMsgid(strings, exprs));
        const transObj = findTransObj(locale, id);
        result = transObj ? msgid2Orig(transObj.msgstr[0], exprs) : buildStr(strings, exprs);
    }
    return maybeDedent(result);
}


export function t(strings, ...exprs) {
    return tWithLocale(config.currentLocale, strings, ...exprs);
}


const separator = /(\${\s*\d+\s*})/g;
const slotIdRegexp = /\${\s*(\d+)\s*}/;


export function jtWithLocale(locale, strings, ...exprs) {
    if (strings && strings.reduce) {
        const id = getMsgid(strings, exprs);
        const transObj = findTransObj(locale, id);
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

export function jt(strings, ...exprs) {
    return jtWithLocale(config.currentLocale, strings, ...exprs);
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

export function gettext(id, locale = null) {
    const transObj = findTransObj(locale || config.currentLocale, id);
    return transObj ? transObj.msgstr[0] : id;
}

export function ngettextWithLocale({ currentLocale, locales }, ...args) {
    const id = maybeDedent(getMsgid(args[0]._strs, args[0]._exprs));
    const n = args[args.length - 1];
    const trans = findTransObj(currentLocale, id);
    const headers = trans ? locales[currentLocale].headers : config.headers;
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

export function ngettext(...args) {
    return ngettextWithLocale(config, ...args);
}

export function addLocale(locale, data, replaceVariablesNames = true) {
    if (replaceVariablesNames) {
        data = transformTranslateObj(data);
    }
    config.locales[locale] = data;
}

export function useLocale(locale) {
    config.currentLocale = locale;
}

export function setDedent(value) {
    config.dedent = Boolean(value);
}

export function setDefaultHeaders(headers) {
    config.headers = headers;
}

export function setHeaders(headers) {
    /* eslint-disable no-console */
    (console.warn || console.log)(
        '[DEPRECATED] setHeaders is deprecated, and will be removed in the' +
        ' next minor version 0.6, use setDefaultHeaders instead');
    setDefaultHeaders(headers);
}
