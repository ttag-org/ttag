import { expect } from 'chai';
import { jt, useLocale } from '../src/index';
import { loadLocale } from '../src/loader';

describe('jt', () => {
    before(() => {
        loadLocale('en', 'tests/fixtures/test-loader.mo');
        useLocale('en');
    });

    it('should resolve translation', () => {
        expect(jt`test`).to.deep.eql(['test [translation]']);
    });

    it('should resolve translation with expressions', () => {
        expect(jt`test ${1} test`).to.deep.eql(['test ', 1, ' test [translation]']);
    });

    it('should use the same str if no translation found', () => {
        expect(jt`not found`).to.deep.eql(['not found']);
    });

    it('should use the same str if locale is not found', () => {
        useLocale('unknown');
        expect(jt`not found`).to.deep.eql(['not found']);
        useLocale('en');
    });
});
