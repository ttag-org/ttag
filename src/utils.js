import dedent from 'dedent';

export const getMsgid = (str, exprs) => {
    return str.reduce((s, l, i) => s + l + (exprs[i] !== undefined && `\${ ${i} }` || ''), '');
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

export const buildStr = (strs, exprs) => {
    return strs.reduce((r, s, i) => r + s + (exprs[i] !== undefined ? exprs[i] : ''), '');
};

export const buildArr = (strs, exprs) => {
    return strs.reduce((r, s, i) => {
        return (exprs[i] !== undefined) ? r.concat(s, exprs[i]) : r.concat(s);
    }, []);
};

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


const variableREG = /\$\{ \w+(.\w+)* \}/g;

function getObjectKeys(obj) {
    const keys = [];
    for (const key in obj) {  // eslint-disable-line no-restricted-syntax
        if (obj.hasOwnProperty(key)) {
            keys.push(key);
        }
    }
    return keys;
}

function replaceVariables(str, obj) {
    return str.replace(variableREG, (variable) => {
        return `\$\{ ${obj[variable]} \}`;
    });
}

function transformTranslate(translate) {
    const variables = translate.msgid.match(variableREG);
    if (!variables) {
        return translate;
    }

    const variableNumberMap = {};
    variables.forEach((variable, i) => {
        variableNumberMap[variable] = i;
    });

    const msgid = replaceVariables(translate.msgid, variableNumberMap);

    const newTranslate = { msgid };

    if (translate.msgid_plural) {
        newTranslate.msgid_plural = replaceVariables(translate.msgid_plural, variableNumberMap);
    }

    newTranslate.msgstr = [];
    for (const str of translate.msgstr) {
        newTranslate.msgstr.push(replaceVariables(str, variableNumberMap));
    }
    newTranslate.comments = translate.comments;
    return newTranslate;
}

export function transformTranslateObj(translateObj) {
    const newTranslations = {};
    for (const key of getObjectKeys(translateObj.translations)) {
        const translation = translateObj.translations[key];
        const newTranslation = {};
        for (const msgid of getObjectKeys(translation)) {
            const newTranslate = transformTranslate(translation[msgid]);
            newTranslation[newTranslate.msgid] = newTranslate;
        }
        newTranslations[key] = newTranslation;
    }
    translateObj.translations = newTranslations;
    return translateObj;
}

export function dedentIfConfig(config, rawStr) {
    if (!config || !config.dedent) {
        return rawStr;
    }

    if (! (typeof rawStr === 'string')) {
        return rawStr;
    }

    if (rawStr.indexOf('\n') === -1) {
        return rawStr;
    }

    return dedent(rawStr);
}
