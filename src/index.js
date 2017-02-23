const locales = {};
let currentLocale;

function findTransObj(locale, str) {
    return locales[locale] ? locales[locale].translations[''][str] : str;
}

export function t(strings, ...exprs) {
    if (strings && strings.reduce) {
        const id = strings.reduce((r, s, i) => r + s + (exprs[i] || ''), '');
        const transObj = findTransObj(currentLocale, id);
        return transObj ? transObj.msgstr[0] : id;
    }
    return strings;
}

export function nt() {
    return (strings, ...exprs) => {
        if (strings && strings.reduce) {
            return strings.reduce((r, s, i) => r + s + (exprs[i] || ''), '');
        }
        return strings;
    };
}

export function msgid(strings, ...exprs) {
    if (strings && strings.reduce) {
        return strings.reduce((r, s, i) => r + s + (exprs[i] || ''), '');
    }
    return strings;
}

export function gettext(text) {
    return text;
}

export function ngettext(str) {
    return str;
}

export function regLocale(locale, data) {
    locales[locale] = data;
}

export function useLocale(locale) {
    currentLocale = locale;
}
