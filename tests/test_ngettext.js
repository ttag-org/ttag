import { expect } from 'chai';
import { ngettext, useLocale, msgid, setDefaultHeaders } from '../src/index';
import { loadLocale } from '../src/loader';

describe('ngettext', () => {
    before(() => {
        loadLocale('en', 'tests/fixtures/test-loader.mo');
        useLocale('en');
    });

    it('should resolve translation', () => {
        const ones = ngettext(msgid`test with ${1} plural`, `test with ${1} plurals`, 1);
        const others = ngettext(msgid`test with ${2} plural`, `test with ${2} plurals`, 2);
        expect(ones).to.eql('test with 1 plural [translation]');
        expect(others).to.eql('test with 2 plurals [translation]');
    });

    it('should resolve translation for 0', () => {
        const a = 0;
        const others = ngettext(msgid`test with ${a} plural`, `test with ${a} plurals`, a);
        expect(others).to.eql('test with 0 plurals [translation]');
    });

    it('should use the same str if no translation found', () => {
        const ones = ngettext(msgid`not found with ${1} plural`, `not found with ${1} plurals`, 1);
        const others = ngettext(msgid`not found with ${2} plural`, `not found with ${2} plurals`, 2);
        expect(ones).to.eql('not found with 1 plural');
        expect(others).to.eql('not found with 2 plurals');
    });

    it('should resolve the same string if locale is not found', () => {
        useLocale('unknown');
        const ones = ngettext(msgid`not found with ${1} plural`, `not found with ${1} plurals`, 1);
        const others = ngettext(msgid`not found with ${2} plural`, `not found with ${2} plurals`, 2);
        expect(ones).to.eql('not found with 1 plural');
        expect(others).to.eql('not found with 2 plurals');
        useLocale('en');
    });

    it('should dedent multiline', () => {
        const a = 1;
        const others = ngettext(
            msgid`test with ${a} plural
              test`, `test with ${a} plurals`, a);
        expect(others).to.eql('test with 1 plural\ntest');
    });

    it('should use uk locale with uk default headers', () => {
        /* eslint-disable max-len */
        const ukHeaders = {
            'plural-forms': 'nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);',
        };
        setDefaultHeaders(ukHeaders);
        const a = 2;
        const result = ngettext(msgid`${a} банан`, `${a} банана`, `${a} бананів`, a);
        expect(result).to.eql('2 банана');
    });
});
