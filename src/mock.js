export function t(strings, ...exprs) {
    if (strings && strings.reduce) {
        return strings.reduce((r, s, i) => r + s + (exprs[i] || ''), '');
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
