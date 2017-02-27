import { expect } from 'chai';
import { ngettext, useLocale, msgid } from '../src/index';
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
});
