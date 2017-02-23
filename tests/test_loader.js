import { assert } from 'chai';
import sinon from 'sinon';
import { loadLocale, __RewireAPI__ as rew } from '../src/loader';
import fs from 'fs';

describe('loader', () => {
    it('should load locale from .mo file', () => {
        const spy = sinon.spy();
        const expected = JSON.parse(fs.readFileSync('tests/fixtures/test-loader.json'));
        rew.__Rewire__('regLocale', spy);
        loadLocale('en', 'tests/fixtures/test-loader.mo');
        assert(spy.calledWithExactly('en', expected));
    });
});
