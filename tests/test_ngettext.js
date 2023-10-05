import { expect } from 'chai';
import { ngettext, useLocale, msgid, addLocale, setDefaultLang } from '../src/index';
import { loadLocale } from './loader';

const ukLocale = {
    headers: {
        'plural-forms':
            'nplurals=3; ' +
            'plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);',
    },
    translations: {
        '': {
            '${ 0 }\nhour': {
                msgid: '${ 0 }\nhour',
                msgid_plural: '${ 0 }\nhours',
                msgstr: ['${ 0 }\nгодина', '${ 0 }\nгодини', '${ 0 }\nгодин'],
            },
        },
    },
};

describe('ngettext', () => {
    before(() => {
        loadLocale('en', 'tests/fixtures/test-loader.po');
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
              test`,
            `test with ${a} plurals`,
            a,
        );
        expect(others).to.eql('test with 1 plural\ntest');
    });

    it('should use uk locale with uk default headers', () => {
        /* eslint-disable max-len */
        setDefaultLang('uk');
        const a = 2;
        const result = ngettext(msgid`${a} банан`, `${a} банана`, `${a} бананів`, a);
        expect(result).to.eql('2 банана');
        setDefaultLang('en');
    });

    it('should work with multiline dedent', () => {
        addLocale('uk', ukLocale);
        useLocale('uk');
        const n = 2;
        const result = ngettext(
            msgid`${n}
            hour`,
            `${n}
            hours`,
            n,
        );
        expect(result).to.eql('2\nгодини');
    });

    it('should throw if first argument is not tagged with msgid', () => {
        addLocale('uk', ukLocale);
        useLocale('uk');
        const a = 2;
        const fn = () => ngettext(`${a} банан`, `${a} банана`, `${a} бананів`, a);
        expect(fn).to.throw("The first argument for ngettext must be tagged with 'msgid' tag.");
    });

    it('should throw if the last argument is not a number', () => {
        addLocale('uk', ukLocale);
        useLocale('uk');
        const a = 2;
        const fn = () => ngettext(msgid`${a} банан`, `${a} банана`, `${a} бананів`);
        expect(fn).to.throw(
            "The last argument to ngettext - '2 бананів' expected to be a number. Got 'string' instead",
        );
    });

    it('should throw if has invalid number of plural forms', () => {
        setDefaultLang('uk');
        const a = 2;
        const fn = () => ngettext(msgid`${a} банан`, `${a} банана`, a);
        expect(fn).to.throw('ngettext expects 3 for the current default locale, but received - 2');
    });

    it('should throw if not existing lang code', () => {
        const fn = () => setDefaultLang('ukk');
        expect(fn).to.throw('Unknown lang code - ukk. Lang should be one of:');
    });
});
