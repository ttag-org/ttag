import { expect } from 'chai';
import { t, useLocale } from '../src/index';
import { loadLocale } from '../src/loader';

describe('t', () => {
    before(() => {
        loadLocale('en', 'tests/fixtures/test-loader.mo');
        useLocale('en');
    });

    it('should resolve translation', () => {
        expect(t`test`).to.eql('test [translation]');
    });

    it('should resolve translation with expressions', () => {
        expect(t`test ${1} test`).to.eql('test 1 test [translation]');
    });

    it('should use the same str if no translation found', () => {
        expect(t`not found`).to.eql('not found');
    });

    it('should use the same str with expressions if no translation found', () => {
        expect(t`not found ${ 1 }`).to.eql('not found 1');
    });

    it('should use the same str if locale is not found', () => {
        useLocale('unknown');
        expect(t`not found`).to.eql('not found');
        useLocale('en');
    });
});
