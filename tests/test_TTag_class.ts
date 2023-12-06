import { expect } from 'chai';
import { TTag } from '../src';

describe('TTag class test', () => {
    it('instance does not throw without context argument', () => {
        const createTTagInstance = () => new TTag();
        expect(createTTagInstance).to.not.throw();
    });
});
