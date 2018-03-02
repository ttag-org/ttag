declare class StringWithRawData extends String {
    _strs: string[];
    _exprs: any[];
}

export declare interface Headers {
    'content-type'?: string;
    'plural-forms'?: string;
}

export declare interface Translations {
    [key: string]: any;
}

export declare interface LocaleData {
    headers: Headers;
    translations: Translations;
}

export declare function t(strings: TemplateStringsArray, ...expr: any[]): string;
export declare function jt(strings: TemplateStringsArray, ...expr: any[]): string | string[];
export declare function msgid(strings: TemplateStringsArray, ...expr: any[]): StringWithRawData;
export declare function gettext(id: string): string;
export declare function ngettext(...args: (StringWithRawData|string|number)[]): string;
export declare function addLocale(locale: string, data: LocaleData): void;
export declare function useLocale(locale: string): void;
export declare function setDedent(value: Boolean): void;
export declare function setDefaultLang(lang: string): void;
export declare function useLocales(locales: string[]): void;

declare interface BindedFunctions {
    t(strings: TemplateStringsArray, ...expr: any[]): string;
    jt(strings: TemplateStringsArray, ...expr: any[]): string | string[]; 
    gettext(id: string): string;
    ngettext(...args: (StringWithRawData|string|number)[]): string;
}

export declare function c(context: string): BindedFunctions;
