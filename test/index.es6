import assert from 'assert';
import statistical from '../src/statistical.es6';

describe('statistical', () => {
    describe('#min()', () => {
        it('Positive Test', () => {
            assert.equal(1, statistical.min([1, 2, 3, 4, 5]));
        });
        it('Negative Test', () => {
            assert(isNaN(statistical.min(["A", "B", "C", "D", "E"])));
        });
    });
    describe('#avg()', () => {
        it('Positive Test', () => {
            assert.equal(3, statistical.avg([1, 2, 3, 4, 5]));
        });
        it('Negative Test', () => {
            assert(isNaN(statistical.avg(["A", "B", "C", "D", "E"])));
        });
    });
    describe('#max()', () => {
        it('Positive Test', () => {
            assert.equal(5, statistical.max([1, 2, 3, 4, 5]));
        });
        it('Negative Test', () => {
            assert(isNaN(statistical.max(["A", "B", "C", "D", "E"])));
        });
    });
    describe('#stddev()', () => {
        it('Positive Test', () => {
            assert.equal(1, statistical.stddev([1, 2, 3, 4, 5]));
        });
        it('Negative Test', () => {
            assert(isNaN(statistical.stddev(["A", "B", "C", "D", "E"])));
        });
    });
});