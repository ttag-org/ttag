import { expect } from 'chai';
import { t, ngettext, msgid, useLocale, addLocale, useLocales, setDefaultHeaders } from '../src/index';
import { loadLocale } from '../src/loader';

describe('translations resolve', () => {
    before(() => {
        loadLocale('en', 'tests/fixtures/test-translations-resolve.po');
        useLocale('en');
    });

    it('should resolve translation', () => {
        expect(t`test`).to.eql('test [translation]');
    });

    it('should not resolve fuzzy translation', () => {
        const n = 5;
        const result = t`${n} test`;
        expect(result).to.not.contain('testtt');
        expect(result).to.eql('5 test');
    });
});


const locale1 = {
    headers: {
        'plural-forms': 'nplurals=2; plural=(n!=1);',
    },
    translations: {
        '': {
            'Click1 ${ 0 } and ${ 1 }': {
                msgid: 'Click1 ${ 0 } and ${ 1 }',
                msgstr: [
                    'Click1 ${ 1 } and ${ 0 } [translation]',
                ],
            },
            '${ 0 } hour1': {
                msgid: '${ 0 } hour1',
                msgid_plural: '${ 0 } hours',
                msgstr: ['${ 0 } hour [trans]', '${ 0 } hours [trans]'],
            },
        },
    },
};

const locale2 = {
    headers: {
        'plural-forms': 'nplurals=2; plural=(n!=1);',
    },
    translations: {
        '': {
            'Click2 ${ 0 } and ${ 1 }': {
                msgid: 'Click2 ${ 0 } and ${ 1 }',
                msgstr: [
                    'Click2 ${ 1 } and ${ 0 } [translation]',
                ],
            },
        },
    },
};

const ukLocale = {
    headers: {
        'plural-forms': 'nplurals=3; ' +
        'plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);',
    },
    translations: {
        '': {
            '${ 0 } hour': {
                msgid: '${ 0 } hour',
                msgid_plural: '${ 0 } hours',
                msgstr: ['${ 0 } година', '${ 0 } години', '${ 0 } годин'],
            },
        },
    },
};

describe('test useLocales', () => {
    it('should apply locales after calling useLocales with t', () => {
        addLocale('locale1', locale1);
        addLocale('locale2', locale2);
        useLocales(['locale1', 'locale2']);

        const result1 = t`Click1 ${1} and ${2}`;
        const result2 = t`Click2 ${1} and ${2}`;
        expect(result1).to.eql('Click1 2 and 1 [translation]');
        expect(result2).to.eql('Click2 2 and 1 [translation]');
    });

    it('should apply locales after calling useLocales with t', () => {
        setDefaultHeaders(locale1.headers);
        addLocale('ukLocale', ukLocale);
        useLocales(['ukLocale', 'locale1']);
        const n = 5;
        const n2 = 1;
        const result1 = ngettext(msgid`${n} hour`, `${n} hours`, n);
        const result2 = ngettext(msgid`${n2} hour1`, `${n2} hours`, n2);
        expect(result1).to.eql('5 годин');
        expect(result2).to.eql('1 hour [trans]');
    });
});
