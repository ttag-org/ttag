/* eslint-disable @typescript-eslint/no-explicit-any */
import dedent from 'dedent';
import { getPluralFunc as getPluralFn } from 'plural-forms/minimal-safe';
import Config, { TTagCompactTranslations, TTagTranslations, TTagTranslation } from './config';

export const getMsgid = (str: TemplateStringsArray, exprs: Array<unknown>) => {
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
    values: [] as number[],
    index: -1,
    toString() {
        this.index = (this.index + 1) % this.values.length;
        return this.values[this.index].toString();
    },
});

const removeSpaces = (str: string) => str.replace(/\s/g, '');

const mem: { [key: string]: ReturnType<typeof RegExp> } = {};
// eslint-disable-next-line no-unused-vars
const memoize1 = (f: (i: string) => ReturnType<typeof RegExp>) => (arg: string) => {
    if (mem[arg]) {
        return mem[arg];
    }
    mem[arg] = f(arg);
    return mem[arg];
};

const reg = (i: string) => new RegExp(`\\$\\{(?:[\\s]+?|\\s?)${i}(?:[\\s]+?|\\s?)}`);
const memReg = memoize1(reg);

export const msgid2Orig = (id: string, exprs: Array<any>): string => {
    return exprs.reduce((r, expr, i) => r.replace(memReg(String(i)), String(expr)), id);
};

export const buildStr = (strs: TemplateStringsArray, exprs: Array<any>) => {
    const exprsLength = exprs.length - 1;
    return strs.reduce((r, s, i) => r + s + (i <= exprsLength ? exprs[i] : ''), '');
};

export const buildArr = (strs: TemplateStringsArray, exprs: Array<any>) => {
    return strs.reduce((r, s, i) => {
        return exprs[i] !== undefined ? r.concat(s, exprs[i]) : r.concat(s);
    }, [] as Array<any>);
};

function pluralFnBody(pluralStr: string) {
    return `return args[+ (${pluralStr})];`;
}

const fnCache: { [key: string]: ReturnType<typeof Function> } = {};
export function makePluralFunc(pluralStr: string) {
    let fn = fnCache[pluralStr];
    if (!fn) {
        fn = new Function('n', 'args', pluralFnBody(pluralStr));
        fnCache[pluralStr] = fn;
    }
    return fn;
}

const pluralRegex = /\splural ?=?([\s\S]*);?/;
export function getPluralFunc(headers: { [headerName: string]: string }) {
    const pluralFormsHeader = headers['plural-forms'] || headers['Plural-Forms'];
    if (!pluralFormsHeader) {
        throw new Error('po. data should include "language" or "plural-form" header for ngettext');
    }
    let pluralFn = pluralRegex.exec(pluralFormsHeader)?.[1] || [];
    if (pluralFn[pluralFn.length - 1] === ';') {
        pluralFn = pluralFn.slice(0, -1);
    }
    return pluralFn;
}

const variableREG = /\$\{\s*([.\w+\[\]])*\s*\}/g;

function getObjectKeys(obj: { [key: string]: unknown }) {
    const keys = [];
    for (const [key] of Object.entries(obj)) {
        if (obj.hasOwnProperty(key)) {
            keys.push(key);
        }
    }
    return keys;
}

function replaceVariables(str: string, obj: { [key: string]: unknown }) {
    return str.replace(variableREG, (variable) => {
        return `\$\{${obj[removeSpaces(variable)]}\}`;
    });
}

function getVariablesMap(msgid: string) {
    const variableNumberMap: { [key: string]: ReturnType<typeof stringableRewindingIterator> } = {};
    const variables: string[] | null = msgid.match(variableREG);
    if (!variables) return null;
    for (let i = 0; i < variables.length; i++) {
        const k = removeSpaces(variables[i]);
        variableNumberMap[k] = variableNumberMap[k] || stringableRewindingIterator();
        variableNumberMap[k].values.push(i);
    }
    return variableNumberMap;
}

function transformTranslate(translate: TTagTranslation) {
    const variableNumberMap = getVariablesMap(translate.msgid);
    if (!variableNumberMap) {
        return translate;
    }
    const msgid = replaceVariables(translate.msgid, variableNumberMap);

    const newTranslate: TTagTranslation = { msgid, msgstr: [] };

    if (translate.msgid_plural) {
        newTranslate.msgid_plural = replaceVariables(translate.msgid_plural, variableNumberMap);
    }

    const transStrs = translate.msgstr;
    for (let i = 0; i < transStrs.length; i++) {
        newTranslate.msgstr.push(replaceVariables(transStrs[i], variableNumberMap));
    }
    newTranslate.comments = translate.comments;
    return newTranslate;
}

export function transformTranslateObj(translateObj: TTagTranslations) {
    const newTranslations: TTagTranslations['translations'] = {};
    const transKeys = getObjectKeys(translateObj.translations);
    for (let i = 0; i < transKeys.length; i++) {
        const key = transKeys[i];
        const translation = translateObj.translations[key];
        const newTranslation: { [key: string]: TTagTranslation } = {};
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

function transformCompactTranslate(msgid: string, translations: string[]): [string, string[]] {
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

export function transformCompactObj(compactObj: TTagCompactTranslations) {
    const newContexts: TTagCompactTranslations['contexts'] = {};
    const keys = getObjectKeys(compactObj.contexts);
    for (let i = 0; i < keys.length; i++) {
        const ctx = keys[i];
        const newContext: {
            [msgId: string]: string[];
        } = {};
        const msgids = getObjectKeys(compactObj.contexts[ctx]);
        for (let j = 0; j < msgids.length; j++) {
            const msgid = msgids[j];
            const translations = compactObj.contexts[ctx][msgid];
            const [newMsgid, newTranslations] = transformCompactTranslate(msgid, translations);
            newContext[newMsgid] = newTranslations;
        }
        newContexts[ctx] = newContext;
    }
    compactObj.contexts = newContexts;
    return compactObj;
}

export function dedentStr(rawStr: string): string {
    if (!(typeof rawStr === 'string')) {
        return rawStr;
    }

    if (rawStr.indexOf('\n') === -1) {
        return rawStr;
    }

    return dedent(rawStr);
}

export function getPluralFnForTrans(config: Config) {
    const headers = config.getCurrentLocaleHeaders();
    const language = headers.language || headers.Language;
    if (language) {
        return getPluralFn(language);
    }
    const pluralStr = getPluralFunc(headers);
    return makePluralFunc(pluralStr as string);
}
