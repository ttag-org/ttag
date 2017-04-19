export const buildStr = (strs, exprs) => strs.reduce((r, s, i) => r + s + (exprs[i] || ''), '');

export function t(strings, ...exprs) {
    if (strings && strings.reduce) {
        return buildStr(strings, exprs);
    }
    return strings;
}

export function jt(strings, ...exprs) {
    if (strings && strings.reduce) {
        return strings.slice(1).reduce((r, s, i) => r.concat(exprs[i], s), [strings[0]]);
    }
    return strings;
}

export function msgid(strings, ...exprs) {
    if (strings && strings.reduce) {
        return buildStr(strings, exprs);
    }
    return strings;
}

export function gettext(text) {
    return text;
}

export function ngettext(str) {
    return str;
}

export function useLocale() {}

export function addLocale() {}

export function setDedent() {}

export function setDefaultHeaders() {}
