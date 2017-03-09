import React from 'react';
import { expect } from 'chai';
import { getMsgid, getReactMsgid } from '../src/utils';

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

describe('utils getReactMsgid', () => {
    it('should resolve msgid for jsx elements', () => {
        const a = 0;
        const [strs, exprs] = getStrsExprs`click ${<a href=''>here</a>}`;
        expect(getReactMsgid(strs, exprs)).to.be.eql('click <0>here</0>');
    });
    it('should increment react els count', () => {
        const a = 0;
        const [strs, exprs] = getStrsExprs`click ${<a href=''>here</a>} and ${<a href=''>here</a>}`;
        expect(getReactMsgid(strs, exprs)).to.be.eql('click <0>here</0> and <1>here</1>');
    });

    it('should work with mix of react and other expressions', () => {
        const a = 0;
        const user = 'John';
        const [strs, exprs] = getStrsExprs`Hello ${user} click ${<a href=''>here</a>} and ${<a href=''>there</a>}`;
        expect(getReactMsgid(strs, exprs)).to.be.eql('Hello ${ 0 } click <0>here</0> and <1>there</1>');
    });

    it('should not apply <0> tags if children is not a string', () => {
        const userName = 'John';
        const [strs, exprs] = getStrsExprs`Hello ${<b>dear {userName}</b>}`;
        expect(getReactMsgid(strs, exprs)).to.be.eql('Hello ${ 0 }');
    });

    it('should work with a single tag elements', () => {
        const [strs, exprs] = getStrsExprs`Hello ${<br />} username`;
        expect(getReactMsgid(strs, exprs)).to.be.eql('Hello ${ 0 } username');
    });
});
