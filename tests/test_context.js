import { expect } from 'chai';
import { t, c, useLocale } from '../src/index';
import { loadLocale } from '../src/loader';

describe('contexts', () => {
    before(() => {
        const enLocale = {
            headers: {
                'plural-forms': 'nplurals=2; plural=(n!=1);',
            },
            translations: {
                '': {
                    'Click ${ 0 } and ${ 1 }': {
                        msgid: 'Click ${ 0 } and ${ 1 }',
                        msgstr: [
                            'Click ${ 1 } and ${ 0 } ctx default',
                        ],
                    },
                },
                ctx2: {
                    'Click ${ 0 } and ${ 1 }': {
                        msgid: 'Click ${ 0 } and ${ 1 }',
                        msgstr: [
                            'Click ${ 1 } and ${ 0 } ctx2',
                        ],
                    },
                },
            },
        };
        loadLocale('en2', enLocale);
        useLocale('en2');
    });

    it('should resolve translation from the context', () => {
        const result1 = c('ctx2').t`Click ${100} and ${200}`;
        expect(result1).to.eql('Click 200 and 100 ctx2');

        const result2 = t`Click ${100} and ${200}`;
        expect(result2).to.eql('Click 200 and 100 ctx default');
    });
});

