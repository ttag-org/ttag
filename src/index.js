const locales = {};
let currentLocale;

function findTransObj(locale, str) {
    return locales[locale] ? locales[locale].translations[''][str] : str;
}

const getMsgid = (str, exprs) => str.reduce((s, l, i) => s + l + (exprs[i] && `\${ ${i} }` || ''), '');

const mem = {};
const memoize1 = (f) => (arg) => {
    if (mem[arg]) {
        return mem[arg];
    }
    mem[arg] = f(arg);
    return mem[arg];
};

const reg = (i) => new RegExp(`\\$\\{([\\s]+?|\\s?)${i}([\\s]+?|\\s?)}`);
const memReg = memoize1(reg);

const msgid2Orig = (id, exprs) => {
    return exprs.reduce((r, expr, i) => r.replace(memReg(i), expr), id);
};

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
