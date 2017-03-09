import { expect } from 'chai';
import { getMsgid } from '../src/utils';

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
