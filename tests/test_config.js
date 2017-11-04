import { expect } from 'chai';
import { addLocale } from '../src/index';

describe('config addLocale', () => {
    it('should throw if locale data is empty', () => {
        const fn = () => addLocale('uk', undefined);
        expect(fn).to.throw('Locale data sould not be empty');
    });
    it('should throw if locale data has no headers', () => {
        const fn = () => addLocale('uk', {});
        expect(fn).to.throw('Locale data sould contain headers "{}"');
    });
});
