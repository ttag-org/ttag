import { expect } from 'chai';
import { t, useLocale, setDedent } from '../src/index';
import { loadLocale } from './loader';

describe('t', () => {
    before(() => {
        loadLocale('en', 'tests/fixtures/test-loader.po');
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
        expect(t`not found ${0}`).to.eql('not found 0');
    });

    it('should use the same str if locale is not found', () => {
        useLocale('unknown');
        expect(t`not found`).to.eql('not found');
        useLocale('en');
    });

    it('should dedent multiline', () => {
        const result = t`multi
        line
        example`;
        expect(result).to.eql('multi\nline\nexample');
    });

    it('should not dedent if dedent false', () => {
        setDedent(false);
        const result = t`multi
        line
        example`;
        expect(result).to.eql(result);
        setDedent(true);
    });

    it('should not dedent single line', () => {
        const result = t`     single line`;
        expect(result).to.eql('     single line');
    });

    it('should dedent found translation', () => {
        setDedent(true);
        const str = t`this is multiline
        demo for demonstrating
        multiline strings`;
        const expected = `this is multiline\ndemo for demonstrating\nmultiline strings [translated]`;
        expect(str).to.eql(expected);
    });
});
