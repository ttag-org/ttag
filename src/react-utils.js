import React from 'react';
import { reg } from './utils';
const reactSymbol = Symbol.for('react.element');

function isReactEl(el) {
    return el.$$typeof === reactSymbol;
}

export const buildArr = (strs, exprs) => strs.reduce((r, s, i) => r.concat(s).concat(exprs[i] || ''), []);

export const getReactMsgid = (strs, exprs) => {
    const result = [];
    let reactElsCount = 0;

    strs.forEach((str, i) => {
        let chunk = str;
        const expr = exprs[i];
        if (typeof expr === 'object' && isReactEl(expr)) {
            if (typeof expr.props.children === 'string') {
                chunk += `<${reactElsCount}>${expr.props.children}</${reactElsCount}>`;
            } else {
                chunk += `\${ ${i} }`;
            }
            reactElsCount += 1;
        } else if (expr !== undefined) {
            chunk += `\${ ${i} }`;
        }
        result.push(chunk);
    });

    return result.join('');
};

export const reactMsgid2Orig = (id, exprs) => {
    let cloneId = id.slice();
    const result = [];
    let reactIndex = 0;
    let simpleIndex = 0;

    const termReg = /^(.*?)[<\$]/;
    const reactReg = (i) => new RegExp(`<${i}>(.*)<\/${i}>`);
    let match = cloneId.match(termReg);
    let exprIdx = 0;
    while (match) {
        result.push(match[1]);
        cloneId = cloneId.replace(new RegExp(`^${match[1]}`), '');
        if (cloneId[0] === '<') {
            const [tagEl, children] = cloneId.match(reactReg(reactIndex));
            cloneId = cloneId.replace(tagEl, '');
            const expr = exprs[exprIdx];
            const newExpr = React.cloneElement(expr, expr.props, children);
            result.push(newExpr);
            reactIndex += 1;
            exprIdx += 1;
        }
        if (cloneId[0] === '$') {
            const el = cloneId.match(reg(simpleIndex))[0];
            cloneId = cloneId.replace(el, '');
            result.push(exprs[exprIdx]);
            simpleIndex += 1;
            exprIdx += 1;
        }
        match = cloneId.match(termReg);
    }

    return result;
};
