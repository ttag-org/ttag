export const getMsgid = (str, exprs) => {
    return str.reduce((s, l, i) => s + l + (exprs[i] !== undefined && `\${ ${i} }` || ''), '');
};

const reactSymbol = Symbol.for('react.element');

function isReactEl(el) {
    return el.$$typeof === reactSymbol;
}

export const getReactMsgid = (strs, exprs) => {
    const result = [];
    let reactElsCount = 0;

    strs.forEach((str, i) => {
        let chunk = str;
        const expr = exprs[i];
        if (typeof expr === 'object' && isReactEl(expr)) {
            if (typeof expr.props.children === 'string') {
                chunk += `<${reactElsCount}>${expr.props.children}</${reactElsCount}>`;
            } else {
                chunk += `\${ ${i} }`;
            }
            reactElsCount += 1;
        } else if (expr !== undefined) {
            chunk += `\${ ${i} }`;
        }
        result.push(chunk);
    });

    return result.join('');
};

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

export const msgid2Orig = (id, exprs) => {
    return exprs.reduce((r, expr, i) => r.replace(memReg(i), expr), id);
};

export const buildStr = (strs, exprs) => strs.reduce((r, s, i) => r + s + (exprs[i] || ''), '');

function pluralFnBody(pluralStr) {
    return `return args[+ (${pluralStr})];`;
}

const fnCache = {};
export function makePluralFunc(pluralStr) {
    /* eslint-disable no-new-func */
    let fn = fnCache[pluralStr];
    if (!fn) {
        fn = new Function('n', 'args', pluralFnBody(pluralStr));
        fnCache[pluralStr] = fn;
    }
    return fn;
}

const pluralRegex = /\splural ?=?([\s\S]*);?/;
export function getPluralFunc(headers) {
    let pluralFn = pluralRegex.exec(headers['plural-forms'])[1];
    if (pluralFn[pluralFn.length - 1] === ';') {
        pluralFn = pluralFn.slice(0, -1);
    }
    return pluralFn;
}

export const defaultHeaders = {
    'content-type': 'text/plain; charset=UTF-8',
    'plural-forms': 'nplurals=2; plural=(n!=1);',
};
