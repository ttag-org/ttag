import fs from 'fs';
import { assert, expect } from 'chai';
import { getMsgid, msgid2Orig, transformTranslateObj, dedentStr, transformCompactObj } from '../src/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getStrsExprs(strs: TemplateStringsArray, ...exprs: any[]): [TemplateStringsArray, any[]] {
    return [strs, exprs];
}

describe('utils getMsgid', () => {
    it('should resolve msgid', () => {
        const a = 1;
        const [strs, exprs] = getStrsExprs`test ${a}`;
        expect(getMsgid(strs, exprs)).to.be.eql('test ${0}');
    });

    it('should resolve msgid for 0', () => {
        const a = 0;
        const [strs, exprs] = getStrsExprs`test ${a}`;
        expect(getMsgid(strs, exprs)).to.be.eql('test ${0}');
    });

    it('should resolve msgid when variabled in expression is undefined', () => {
        const a = undefined;
        const [strs, exprs] = getStrsExprs`test ${a}`;
        expect(getMsgid(strs, exprs)).to.be.eql('test ${0}');
    });
});

describe('utils msgid2Orig', () => {
    it('should work with exprs containing dollar signs', () => {
        const a = '$1';
        const [strs, exprs] = getStrsExprs`test ${a}`;
        const id = getMsgid(strs, exprs);
        expect(msgid2Orig(id, exprs)).to.be.eql('test $1');
    });
});

describe('utils transformTranslateObj', () => {
    it('should transform translate object', () => {
        const translateObj = JSON.parse(
            fs.readFileSync('tests/fixtures/test-result-po-before-transform.json').toString(),
        );
        const expected = JSON.parse(fs.readFileSync('tests/fixtures/test-result-po-after-transform.json').toString());
        assert.deepEqual(transformTranslateObj(translateObj), expected);
    });
});

describe('utils transformCompactObj', () => {
    it('should transform compact format', () => {
        const compactObj = {
            charset: 'utf-8',
            headers: {
                'plural-forms': 'nplurals=2; plural=(n!=1);\n',
            },
            contexts: {
                '': {
                    'test ${ a.b.c } ${ d } ${ e } test': ['test ${ e } ${ d } ${ a.b.c } test [translation]'],
                },
            },
        };
        const expectedObj = {
            charset: 'utf-8',
            headers: {
                'plural-forms': 'nplurals=2; plural=(n!=1);\n',
            },
            contexts: {
                '': {
                    'test ${0} ${1} ${2} test': ['test ${2} ${1} ${0} test [translation]'],
                },
            },
        };
        assert.deepEqual(transformCompactObj(compactObj), expectedObj);
    });
    it('should transform compact format without expressions', () => {
        const compactObj = {
            charset: 'utf-8',
            headers: {
                'plural-forms': 'nplurals=2; plural=(n!=1);\n',
            },
            contexts: {
                '': {},
                test: {
                    test: ['test [translation]'],
                },
            },
        };
        const expectedObj = {
            charset: 'utf-8',
            headers: {
                'plural-forms': 'nplurals=2; plural=(n!=1);\n',
            },
            contexts: {
                '': {},
                test: {
                    test: ['test [translation]'],
                },
            },
        };
        expect(transformCompactObj(compactObj)).to.deep.equal(expectedObj);
    });
});

describe('utils dedentStr', () => {
    it('should not dedent if config.dedent is false', () => {
        const source = '   test';
        const result = dedentStr(source);
        expect(result).to.eql(source);
    });

    it('should return rawStr if it is not a string', () => {
        const source = { test: 'test' };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const result = dedentStr(source);
        expect(result).to.eql(source);
    });

    it('should not dedent if has no \\n symbol', () => {
        const source = '   test';
        const result = dedentStr(source);
        expect(result).to.eql(source);
    });
    it('should dedent', () => {
        const source = `test
        test
        test`;
        const result = dedentStr(source);
        expect(result).to.eql('test\ntest\ntest');
    });
});
