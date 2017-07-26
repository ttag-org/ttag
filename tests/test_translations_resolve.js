import { expect } from 'chai';
import { t, useLocale } from '../src/index';
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
