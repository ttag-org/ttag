import { expect } from 'chai';
import { t, useLocale, addLocale, useLocales } from '../src/index';
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


describe('test useLocales', () => {
    it('should apply locales after calling useLocales', () => {
        addLocale('locale1', locale1);
        addLocale('locale2', locale2);
        useLocales(['locale1', 'locale2']);

        const result1 = t`Click1 ${ 1 } and ${ 2 }`;
        const result2 = t`Click2 ${ 1 } and ${ 2 }`;
        expect(result1).to.eql('Click1 2 and 1 [translation]');
        expect(result2).to.eql('Click2 2 and 1 [translation]');
    });
});
