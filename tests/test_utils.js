import fs from 'fs';
import { assert, expect } from 'chai';
import { getMsgid, transformTranslateObj, dedentIfConfig } from '../src/utils';

function getStrsExprs(strs, ...exprs) {
    return [strs, exprs];
}

describe('utils getMsgid', () => {
    it('should resolve msgid', () => {
        const a = 1;
        const [strs, exprs] = getStrsExprs`test ${a}`;
        expect(getMsgid(strs, exprs)).to.be.eql('test ${ 0 }');
    });

    it('should resolve msgid for 0', () => {
        const a = 0;
        const [strs, exprs] = getStrsExprs`test ${a}`;
        expect(getMsgid(strs, exprs)).to.be.eql('test ${ 0 }');
    });
});


describe('utils transformTranslateObj', () => {
    it('should transform translate object', () => {
        const translateObj = JSON.parse(fs.readFileSync('tests/fixtures/test-result-po-before-transform.json'));
        const expected = JSON.parse(fs.readFileSync('tests/fixtures/test-result-po-after-transform.json'));
        assert.deepEqual(transformTranslateObj(translateObj), expected);
    });
});

describe('utils dedentIfConfig', () => {
    it('should not dedent if no config', () => {
        const source = '   test';
        const result = dedentIfConfig(null, source);
        expect(result).to.eql(source);
    });
});