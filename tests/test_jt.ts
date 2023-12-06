/* eslint-disable @typescript-eslint/ban-ts-comment */
import { expect } from 'chai';
import { jt, useLocale } from '../src/index';
import { loadLocale } from './loader';

describe('jt', () => {
    before(() => {
        loadLocale('en', 'tests/fixtures/test-loader.po');
        useLocale('en');
    });

    it('should resolve translation', () => {
        // @ts-ignore
        expect(jt`test`).to.deep.eql(['test [translation]']);
    });

    it('should resolve translation with expressions', () => {
        // @ts-ignore
        expect(jt`test ${1} test`).to.deep.eql(['test ', 1, ' test [translation]']);
    });

    it('should resolve translation with expression that is used multiple times', () => {
        // @ts-ignore
        expect(jt`test ${1} test ${1} test`).to.deep.eql(['test ', 1, ' test ', 1, ' test [translation]']);
    });

    it('should use the same str if no translation found', () => {
        // @ts-ignore
        expect(jt`not found`).to.deep.eql(['not found']);
    });

    it('should use the same str with expressions if no translation found', () => {
        // @ts-ignore
        expect(jt`not found ${0}`).to.deep.eql(['not found ', 0, '']);
    });

    it('should use the same str if locale is not found', () => {
        useLocale('unknown');
        // @ts-ignore
        expect(jt`not found`).to.deep.eql(['not found']);
        useLocale('en');
    });

    it('should handle the case that variable positions are inconsistent', () => {
        const enLocale = {
            charset: 'utf-8',
            headers: {
                'plural-forms': 'nplurals=2; plural=(n!=1);',
            },
            translations: {
                '': {
                    'Click ${ 0 } and ${ 1 }': {
                        msgid: 'Click ${ 0 } and ${ 1 }',
                        msgstr: ['Click ${ 1 } and ${ 0 } [translation]'],
                    },
                },
            },
        };
        loadLocale('en2', enLocale);
        useLocale('en2');

        expect(jt`Click ${100} and ${200}`).to.deep.equal(['Click ', 200, ' and ', 100, ' [translation]']);
    });

    it('should strip leading spaces for multi-line msgid', () => {
        const constant = 'CONSTANT';
        const enLocale = {
            charset: 'utf-8',
            headers: {
                'plural-forms': 'nplurals=2; plural=(n!=1);',
            },
            translations: {
                '': {
                    'Test multi-line\nstring with ${ 0 }': {
                        msgid: 'Test multi-line\nstring with ${ 0 }',
                        msgstr: ['Test multi-line\nstring with ${ 0 } [translation]'],
                    },
                },
            },
        };
        loadLocale('en3', enLocale);
        useLocale('en3');

        // Spaces before "string with ${constant}" should be stripped.

        expect(
            jt`Test multi-line
            string with ${constant}`,
            // @ts-ignore
        ).to.deep.eql(['Test multi-line\nstring with ', constant, ' [translation]']);
    });
});
