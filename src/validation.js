import { getPluralFormsNumber } from './utils';

function validateLocale(locale, availLocales) {
    if (process.env.NODE_ENV !== 'production') {
        if (!availLocales[locale]) {
            throw new Error(`
                    Locale '${locale}' is not found in config.
                    useLocales accepts only existing locales. Use addLocale function before.
                    Available locales: ${JSON.stringify(availLocales)}`);
        }
    }
}

export function validateLocaleCode(locale) {
    if (process.env.NODE_ENV !== 'production') {
        if (typeof locale !== 'string') {
            throw new Error(`Expected locale code to be a string but recieved ${typeof locale} insttead`);
        }
    }
}

export function validateLocaleData(data) {
    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line
        const addLocaleDoc = 'https://c-3po.js.org/configuration-c-3po-lib.html#addlocale-string-locale-object-data-bool-replacevariablesnames';
        if (!data) {
            throw new Error(`
            Locale data sould not be empty.
            see - ${addLocaleDoc}
            `);
        }
        if (!data.headers) {
            throw new Error(`
            Locale data sould contain headers "${JSON.stringify(data)}".
            see - ${addLocaleDoc}
            `);
        }
        if (!data.headers['plural-forms'] && !data.headers['Plural-Forms']) {
            throw new Error(`
            Locale data.headers should contain 'Plural-Forms' attribute "${JSON.stringify(data)}".
            see - ${addLocaleDoc}
            `);
        }
        if (!data.translations) {
            throw new Error(`
            Locale data sould contain translations "${JSON.stringify(data)}".
            see - ${addLocaleDoc}
            `);
        }
        if (! Object.keys(data.translations).length) {
            throw new Error(`
            Locale data.translations should have at least 1 key"${JSON.stringify(data)}".
            see - ${addLocaleDoc}
            `);
        }
    }
}

export function validateLocales(locales, availLocales) {
    if (process.env.NODE_ENV !== 'production') {
        if (!Array.isArray(locales)) {
            throw new Error('useLocales accepts only array as the first argument');
        }
        locales.forEach((locale) => validateLocale(locale, availLocales));
    }
}

export function validateNgettextMsgid(str) {
    if (process.env.NODE_ENV !== 'production') {
        const ngettextDoc = 'https://c-3po.js.org/ngettext.html#usage';
        if (! (str.hasOwnProperty('_strs') && str.hasOwnProperty('_exprs'))) {
            throw new Error(
                `The first argument for ngettext must be tagged with 'msgid' tag.
                see - ${ngettextDoc};
                `
            );
        }
    }
}

export function validateNgettextNumber(n) {
    if (process.env.NODE_ENV !== 'production') {
        const ngettextDoc = 'https://c-3po.js.org/ngettext.html#usage';
        if (! (typeof n === 'number')) {
            throw new Error(
                `The last argument to ngettext - '${n}' expected to be a number. Got '${typeof n}' instead.
                see - ${ngettextDoc}`
            );
        }
    }
}

export function validateNgettextPluralForms(headers, actualFormsCount) {
    if (process.env.NODE_ENV !== 'production') {
        const expectedFormsCount = getPluralFormsNumber(headers);
        if (actualFormsCount !== expectedFormsCount) {
            throw new Error(
                // eslint-disable-next-line max-len
                `ngettext expects ${expectedFormsCount} for the current default locale, but received - ${actualFormsCount}.
                Default locale headers: ${JSON.stringify(headers)}`
            );
        }
    }
}
