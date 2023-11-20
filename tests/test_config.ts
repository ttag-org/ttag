/* eslint-disable @typescript-eslint/ban-ts-comment */
import { expect } from 'chai';
import Config from '../src/config';

describe('config addLocale', () => {
    let config: Config;
    before(() => {
        config = new Config();
    });
    it('should throw if locale data is empty', () => {
        // @ts-ignore ts forbid add locale data undefined
        const fn = () => config.addLocale('uk', undefined);
        expect(fn).to.throw('Locale data should not be empty');
    });
    it('should throw if locale data has no headers', () => {
        // @ts-ignore {} no valid ts object
        const fn = () => config.addLocale('uk', {});
        expect(fn).to.throw('Locale data should contain headers "{}"');
    });
    it('should throw if headers has no Plural-Forms', () => {
        const poData = {
            charset: 'utf-8',
            headers: {
                'content-type': 'text/plain; charset=UTF-8',
            },
            contexts: {},
        };
        const fn = () => config.addLocale('uk', poData);
        expect(fn).to.throw("Locale data.headers should contain 'Plural-Forms' attribute");
    });
    it('should throw if data has no translations', () => {
        const poData = {
            charset: 'utf-8',
            headers: {
                'plural-forms': 'nplurals=2; plural=(n!=1);',
            },
        };
        // @ts-ignore  poData no valid ts object
        const fn = () => config.addLocale('uk', poData);
        expect(fn).to.throw('Locale data should contain translations');
    });
    it('should throw if translations is empty for the verbose format', () => {
        const poData = {
            charset: 'utf-8',
            headers: {
                'plural-forms': 'nplurals=2; plural=(n!=1);',
            },
            translations: {},
        };
        const fn = () => config.addLocale('uk', poData);
        expect(fn).to.throw('Locale data.translations should have at least 1 key');
    });
    it('should throw if translations is empty for the compact format', () => {
        const poData = {
            charset: 'utf-8',
            headers: {
                'plural-forms': 'nplurals=2; plural=(n!=1);',
            },
            contexts: {},
        };
        const fn = () => config.addLocale('uk', poData);
        expect(fn).to.throw('Locale data.contexts should have at least 1 key');
    });
    it('should throw if locale code is not string', () => {
        const poData = {
            charset: 'utf-8',
            headers: {
                'plural-forms': 'nplurals=2; plural=(n!=1);',
            },
            translations: {
                '': {
                    test: {
                        msgid: 'test',
                        msgstr: ['test trans'],
                    },
                },
            },
        };
        // @ts-ignore  addLocale first arg must be string
        const fn = () => config.addLocale({}, poData);
        expect(fn).to.throw('Expected locale code to be a string but recieved object insttead');
    });
    it('should be able to use locale after addLocale passed validation', () => {
        const poData = {
            charset: 'utf-8',
            headers: {
                'plural-forms': 'nplurals=2; plural=(n!=1);',
            },
            translations: {
                '': {
                    test: {
                        msgid: 'test',
                        msgstr: ['test trans'],
                    },
                },
            },
        };
        config.addLocale('uk', poData);
        const fn = () => config.setCurrentLocale('uk');
        expect(fn).to.not.throw();
    });
});
