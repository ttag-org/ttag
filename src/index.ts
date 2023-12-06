import { getMsgid, msgid2Orig, buildStr, getPluralFnForTrans, buildArr, dedentStr } from './utils';
import { validateNgettextMsgid, validateNgettextNumber, validateNgettextPluralForms, validateLang } from './validation';
import Config, { TTagTranslations, TTagCompactTranslations, TTagTranslation } from './config';

export class Context {
    context: string;

    constructor(context: string) {
        if (process.env.NODE_ENV !== 'production') {
            if (typeof context !== 'string') {
                throw new Error('String type is expected as a first argument to c() function.');
            }
        }
        this.context = context;
        // eslint-disable-next-line no-self-assign
        this.getContext = this.getContext;
    }
    getContext() {
        return this.context;
    }
}

function isFuzzy(translationObj: undefined | TTagTranslation) {
    return translationObj && translationObj.comments && translationObj.comments.flag === 'fuzzy';
}

function hasTranslations(msgstr: string[]) {
    if (!msgstr) return false;
    for (let i = 0; i < msgstr.length; i++) {
        if (!msgstr[i].length) return false;
    }
    return true;
}

const separator = /(\${\s*\d+\s*})/g;
const slotIdRegexp = /\${\s*(\d+)\s*}/;

export type StringWithRawData = string & {
    _strs: TemplateStringsArray;
    _exprs: unknown[];
};
export function msgid(strings: TemplateStringsArray, ...exprs: number[]): StringWithRawData {
    if (strings && 'reduce' in strings) {
        const result: StringWithRawData = new String(buildStr(strings, exprs)) as StringWithRawData;
        result._strs = strings;
        result._exprs = exprs;
        return result;
    }

    return strings as unknown as StringWithRawData;
}

export type LocaleData = TTagTranslations | TTagCompactTranslations;

export class TTag {
    private conf: Config;
    private ctx: Context;

    constructor(
        { config, context }: { config: Config; context?: Context } = { config: new Config(), context: new Context('') },
    ) {
        this.conf = config;
        this.ctx = context || new Context('');
    }

    private maybeDedent = (str: string) => {
        return this.conf.isDedent() ? dedentStr(str) : str;
    };

    private findTransObj = (locale: string, str: string, ctx: string) => {
        const locales = this.conf.getAvailLocales();
        const localeData = locales[locale];
        if (!localeData) return null;
        // verbose format
        if ('translations' in localeData) {
            const translations = localeData.translations[ctx] || localeData.translations[''];
            const translation = translations && translations[str];
            if (translation && !isFuzzy(translation) && hasTranslations(translation.msgstr)) {
                return translation.msgstr;
            }
        }
        // compact format
        if ('contexts' in localeData) {
            const translations = localeData.contexts[ctx] || localeData.contexts[''];
            const translation = translations && translations[str];
            if (translation && hasTranslations(translation)) {
                return translation;
            }
        }
        return null;
    };

    private findTranslation = (str: string, ctx: string) => {
        const locales = this.conf.getCurrentLocales();
        if (locales.length) {
            for (let i = 0; i < locales.length; i++) {
                const translation = this.findTransObj(locales[i], str, ctx);
                if (translation) {
                    this.conf.setCurrentLocale(locales[i]);
                    return translation;
                }
            }
        }
        return this.findTransObj(this.conf.getCurrentLocale(), str, ctx);
    };

    public setDefaultLang(lang: string) {
        if (process.env.NODE_ENV !== 'production') validateLang(lang);
        this.conf.setDefaultLang(lang);
    }

    public useLocales(locales: string[]) {
        this.conf.setCurrentLocales(locales);
    }

    public setDedent(value: boolean) {
        this.conf.setDedent(Boolean(value));
    }

    public useLocale(locale: string) {
        this.conf.setCurrentLocale(locale);
    }

    public addLocale(locale: string, data: TTagTranslations | TTagCompactTranslations) {
        this.conf.addLocale(locale, data);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public t(strings: TemplateStringsArray, ...exprs: any[]): string {
        let result: string = strings as unknown as string;
        if (strings && 'reduce' in strings) {
            const id = this.maybeDedent(getMsgid(strings, exprs));
            const context = this.ctx.getContext();
            const trans = this.findTranslation(id, context);
            result = trans ? msgid2Orig(trans[0], exprs) : buildStr(strings, exprs);
        }
        return this.maybeDedent(result);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public jt(strings: TemplateStringsArray, ...exprs: any[]): any[] {
        if (strings && 'reduce' in strings) {
            const id = this.maybeDedent(getMsgid(strings, exprs));
            const context = this.ctx.getContext();
            const trans = this.findTranslation(id, context);
            if (!trans) return buildArr(strings, exprs);

            // splits string & capturing group into tokens

            const translatedTokens = trans[0].split(separator);

            return translatedTokens.map((token) => {
                const slotIdMatch = token.match(slotIdRegexp);
                // slotIdMatch is not null only when the token is a variable slot (${xx})
                return slotIdMatch ? exprs[+slotIdMatch[1]] : token;
            });
        }
        return strings as unknown as (string | unknown)[];
    }

    public ngettext(...args: [StringWithRawData, ...string[], number]): string {
        if (process.env.NODE_ENV !== 'production') validateNgettextMsgid(args[0]);

        const id = this.maybeDedent(getMsgid(args[0]._strs, args[0]._exprs));
        const n = args[args.length - 1];
        if (process.env.NODE_ENV !== 'production') validateNgettextNumber(n);

        const forms = args.slice(1, -1);
        forms.unshift(args[0].toString());
        if (process.env.NODE_ENV !== 'production') {
            validateNgettextPluralForms(this.conf.getDefaultPluralFormsCount(), forms.length);
        }

        const trans = this.findTranslation(id, this.ctx.getContext());
        if (trans) {
            const pluralFn = getPluralFnForTrans(this.conf);
            return this.maybeDedent(msgid2Orig(pluralFn(n, trans), args[0]._exprs));
        }
        const pluralFn = this.conf.getDefaultPluralFn();
        return this.maybeDedent(pluralFn(n, forms));
    }

    public gettext(id: string) {
        const context = this.ctx.getContext();
        const trans = this.findTranslation(id, context);
        return trans ? trans[0] : id;
    }

    public _ = this.gettext;

    private copyWithNewContext(ctx: string) {
        return new TTag({ config: this.conf, context: new Context(ctx) });
    }

    public c(context: string): {
        t: (strings: TemplateStringsArray, ...exprs: (string | number | null | undefined)[]) => string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        jt: (strings: TemplateStringsArray, ...exprs: unknown[]) => any[];
        gettext: (id: string) => string;
        ngettext: (...args: [StringWithRawData, ...string[], number]) => string;
    } {
        const copyTTag = this.copyWithNewContext(context);
        return {
            t: this.t.bind(copyTTag),
            jt: this.jt.bind(copyTTag),
            gettext: this.gettext.bind(copyTTag),
            ngettext: this.ngettext.bind(copyTTag),
        };
    }
}

const globalTTag = new TTag();

export const c: TTag['c'] = globalTTag.c.bind(globalTTag);
export const _: TTag['_'] = globalTTag._.bind(globalTTag);
export const addLocale: TTag['addLocale'] = globalTTag.addLocale.bind(globalTTag);
export const gettext: TTag['gettext'] = globalTTag.gettext.bind(globalTTag);
export const jt: TTag['jt'] = globalTTag.jt.bind(globalTTag);
export const ngettext: TTag['ngettext'] = globalTTag.ngettext.bind(globalTTag);
export const setDedent: TTag['setDedent'] = globalTTag.setDedent.bind(globalTTag);
export const setDefaultLang: TTag['setDefaultLang'] = globalTTag.setDefaultLang.bind(globalTTag);
export const t: TTag['t'] = globalTTag.t.bind(globalTTag);
export const useLocale: TTag['useLocale'] = globalTTag.useLocale.bind(globalTTag);
export const useLocales: TTag['useLocales'] = globalTTag.useLocales.bind(globalTTag);
