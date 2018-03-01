import { expect } from 'chai';
import { gettext, useLocale } from '../src/index';
import { loadLocale } from './loader';

describe('gettext', () => {
    before(() => {
        loadLocale('en', 'tests/fixtures/test-loader.mo');
        useLocale('en');
    });

    it('should resolve translation', () => {
        expect(gettext('test')).to.eql('test [translation]');
    });

    it('should use the same str if no translation found', () => {
        expect(gettext('not found')).to.eql('not found');
    });

    it('should use the same str if locale is not found', () => {
        useLocale('unknown');
        expect(gettext('not found')).to.eql('not found');
        useLocale('en');
    });
});
