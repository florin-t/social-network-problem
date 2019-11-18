const assert = require('assert');
const arrayUtils = require('../../src/utils/array-utils')

describe('array-utils', function () {
    describe('#intersectionOf()', function () {
        it('should return empty list for intersection of empty lists', function () {
            const intersection = arrayUtils.intersectionOf([], []);
            assert.equal(intersection.length, 0)
        });
        it('should return empty list for intersection of an empty list with non-empty list', function () {
            const intersection = arrayUtils.intersectionOf([], ["u01", "u02"]);
            assert.equal(intersection.length, 0)
        });
        it('should return the common element in the list', function () {
            const intersection = arrayUtils.intersectionOf(["u01", "u03"], ["u01", "u02"]);
            assert.equal(intersection[0], "u01")
        });
        it('should return the common elements in the list, for two lists having more than one element in common',
            function () {
                const intersection = arrayUtils.intersectionOf(["u01", "u03", "u05"], ["u01", "u02", "u03", "u06"]);
                assert(intersection.includes("u01"))
                assert(intersection.includes("u03"))
            });
        it('should return empty list, for two lists having no common element', function () {
            const intersection = arrayUtils.intersectionOf(["u01", "u02", "u03"], ["u04", "u05"]);
            assert.equal(intersection.length, 0)
        });
    });
});