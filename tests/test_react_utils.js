import React from 'react';
import { expect } from 'chai';
import { getReactMsgid, reactMsgid2Orig } from '../src/react-utils';

function getStrsExprs(strs, ...exprs) {
    return [strs, exprs];
}

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

describe('utils reactMsgid2Orig', () => {
    it('should resolve original string', () => {
        const [str, element] = reactMsgid2Orig('Click <0>Here [translated]</0>', [<a href=''>here</a>]);
        expect(str).to.be.eql('Click ');
        expect(element.props.children).to.eql('Here [translated]');
    });
    it('should resolve original string with multiple jsx components', () => {
        const [str1, el1, str2, el2] = reactMsgid2Orig('Click <0>Here [translated]</0> <1>There [translated]</1>',
            [<a href=''>here</a>, <a href=''>there</a>]);
        expect(str1).to.be.eql('Click ');
        expect(el1.props.children).to.eql('Here [translated]');
        expect(str2).to.be.eql(' ');
        expect(el2.props.children).to.be.eql('There [translated]');
    });
    it('should resolve mixed type of expressions', () => {
        const [str, el1, str2, exp] = reactMsgid2Orig('Click <0>Here [translated]</0> ${ 0 }',
            [<a href=''>here</a>, 5]);
        expect(str).to.be.eql('Click ');
        expect(el1.props.children).to.eql('Here [translated]');
        expect(str2).to.be.eql(' ');
        expect(exp).to.be.eql(5);
    });
});
