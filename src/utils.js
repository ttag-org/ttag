import dedent from 'dedent';
import { getPluralFunc as getPluralFn } from 'plural-forms/minimal-safe';

export const getMsgid = (str, exprs) => {
    const result = [];
    const exprsLenght = exprs.length;
    const strLength = str.length;
    for (let i = 0; i < strLength; i++) {
        const expr = i < exprsLenght ? `\${${i}}` : '';
        result.push(str[i] + expr);
    }
    return result.join('');
};

const stringableRewindingIterator = () => ({
    values: [],
    index: -1,
    toString() {
        this.index = (this.index + 1) % this.values.length;
        return this.values[this.index].toString();
    },
});

const removeSpaces = (str) => str.replace(/\s/g, '');

const mem = {};
const memoize1 = (f) => (arg) => {
    if (mem[arg]) {
        return mem[arg];
    }
    mem[arg] = f(arg);
    return mem[arg];
};

const reg = (i) => new RegExp(`\\$\\{(?:[\\s]+?|\\s?)${i}(?:[\\s]+?|\\s?)}`);
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
    const pluralFormsHeader = headers['plural-forms'] || headers['Plural-Forms'];
    if (!pluralFormsHeader) {
        throw new Error('po. data should include "language" or "plural-form" header for ngettext');
    }
    let pluralFn = pluralRegex.exec(pluralFormsHeader)[1];
    if (pluralFn[pluralFn.length - 1] === ';') {
        pluralFn = pluralFn.slice(0, -1);
    }
    return pluralFn;
}

const variableREG = /\$\{\s*([.\w+\[\]])*\s*\}/g;

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
        return `\$\{${obj[removeSpaces(variable)]}\}`;
    });
}

function getVariablesMap(msgid) {
    const variableNumberMap = {};
    const variables = msgid.match(variableREG);
    if (!variables) return null;
    for (let i = 0; i < variables.length; i++) {
        const k = removeSpaces(variables[i]);
        variableNumberMap[k] = variableNumberMap[k] || stringableRewindingIterator();
        variableNumberMap[k].values.push(i);
    }
    return variableNumberMap;
}

function transformTranslate(translate) {
    const variableNumberMap = getVariablesMap(translate.msgid);
    if (!variableNumberMap) {
        return translate;
    }
    const msgid = replaceVariables(translate.msgid, variableNumberMap);

    const newTranslate = { msgid };

    if (translate.msgid_plural) {
        newTranslate.msgid_plural = replaceVariables(translate.msgid_plural, variableNumberMap);
    }

    newTranslate.msgstr = [];
    const transStrs = translate.msgstr;
    for (let i = 0; i < transStrs.length; i++) {
        newTranslate.msgstr.push(replaceVariables(transStrs[i], variableNumberMap));
    }
    newTranslate.comments = translate.comments;
    return newTranslate;
}

export function transformTranslateObj(translateObj) {
    const newTranslations = {};
    const transKeys = getObjectKeys(translateObj.translations);
    for (let i = 0; i < transKeys.length; i++) {
        const key = transKeys[i];
        const translation = translateObj.translations[key];
        const newTranslation = {};
        const msgids = getObjectKeys(translation);
        for (let j = 0; j < msgids.length; j++) {
            const msgid = msgids[j];
            const newTranslate = transformTranslate(translation[msgid]);
            newTranslation[newTranslate.msgid] = newTranslate;
        }
        newTranslations[key] = newTranslation;
    }
    translateObj.translations = newTranslations;
    return translateObj;
}

function transformCompactTranslate(msgid, translations) {
    const variableNumberMap = getVariablesMap(msgid);
    if (!variableNumberMap) {
        return [msgid, translations];
    }
    const newMsgid = replaceVariables(msgid, variableNumberMap);
    const newTranslations = translations.map((trans) => {
        return replaceVariables(trans, variableNumberMap);
    });
    return [newMsgid, newTranslations];
}

export function transformCompactObj(compactObj) {
    const newObj = { headers: compactObj.headers };
    const newContexts = {};
    const keys = getObjectKeys(compactObj.contexts);
    for (let i = 0; i < keys.length; i++) {
        const ctx = keys[i];
        const newContext = {};
        const msgids = getObjectKeys(compactObj.contexts[ctx]);
        for (let j = 0; j < msgids.length; j++) {
            const msgid = msgids[j];
            const translations = compactObj.contexts[ctx][msgid];
            const [newMsgid, newTranslations] = transformCompactTranslate(
                msgid, translations);
            newContext[newMsgid] = newTranslations;
        }
        newContexts[ctx] = newContext;
    }
    newObj.contexts = newContexts;
    return newObj;
}

export function dedentStr(rawStr) {
    if (! (typeof rawStr === 'string')) {
        return rawStr;
    }

    if (rawStr.indexOf('\n') === -1) {
        return rawStr;
    }

    return dedent(rawStr);
}

export function getPluralFnForTrans(config) {
    const headers = config.getCurrentLocaleHeaders();
    const language = headers.language || headers.Language;
    if (language) {
        return getPluralFn(language);
    }
    const pluralStr = getPluralFunc(headers);
    return makePluralFunc(pluralStr);
}
