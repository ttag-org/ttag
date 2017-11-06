import { expect } from 'chai';
import { t, jt, c, useLocale, ngettext, msgid, gettext } from '../src/index';
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
                    '${ 0 } hour': {
                        msgid: '${ 0 } hour',
                        msgid_plural: '${ 0 } hours',
                        msgstr: ['${ 0 } hour default', '${ 0 } hours default'],
                    },
                    test: {
                        msgid: 'test',
                        msgstr: ['test default'],
                    },
                },
                ctx2: {
                    'Click ${ 0 } and ${ 1 }': {
                        msgid: 'Click ${ 0 } and ${ 1 }',
                        msgstr: [
                            'Click ${ 1 } and ${ 0 } ctx2',
                        ],
                    },
                    '${ 0 } hour': {
                        msgid: '${ 0 } hour',
                        msgid_plural: '${ 0 } hours',
                        msgstr: ['${ 0 } hour ctx2', '${ 0 } hours ctx2'],
                    },
                    test: {
                        msgid: 'test',
                        msgstr: ['test ctx2'],
                    },
                },
            },
        };
        loadLocale('en2', enLocale);
        useLocale('en2');
    });

    it('should resolve translation from the context for t', () => {
        const result1 = c('ctx2').t`Click ${100} and ${200}`;
        expect(result1).to.eql('Click 200 and 100 ctx2');

        const result2 = t`Click ${100} and ${200}`;
        expect(result2).to.eql('Click 200 and 100 ctx default');
    });

    it('should resolve translation from the context for jt', () => {
        const result1 = c('ctx2').jt`Click ${100} and ${200}`;
        expect(result1).to.eql(['Click ', 200, ' and ', 100, ' ctx2']);

        const result2 = jt`Click ${100} and ${200}`;
        expect(result2).to.eql(['Click ', 200, ' and ', 100, ' ctx default']);
    });

    it('should resolve translation from the context for the ngettext', () => {
        const n = 1;
        const result1 =
            c('ctx2')
            .ngettext(msgid`${n} hour`, `${n} hours`, n);

        expect(result1).to.eql('1 hour ctx2');

        const result2 = ngettext(msgid`${n} hour`, `${n} hours`, n);
        expect(result2).to.eql('1 hour default');
    });

    it('should resolve translation from the context for the gettext', () => {
        const result1 = c('ctx2').gettext('test');

        expect(result1).to.eql('test ctx2');

        const result2 = gettext('test');
        expect(result2).to.eql('test default');
    });

    it('should throw if context is not a string', () => {
        const fn = () => c(111).gettext('test');
        expect(fn).to.throw('String type is expected');
    });

    it('should switch to default context if provided context is not found', () => {
        const result1 = c('ctx3').gettext('test');
        expect(result1).to.eql('test default');
    });
});

