const assert = require('assert');
const space = require('../../src/utils/space')

describe('space', function () {
    describe('#isMoreSpaceToExplore()', function () {
        it('should return true when both the current map sizes are bigger than the previous', function () {
            const previousStartMapSize = 2
            const currentStartMapSize = 3
            const previousEndMapSize = 2
            const currentEndMapSize = 3
            const isSpaceToExplore = space.isMoreSpaceToExplore(
                previousStartMapSize,
                currentStartMapSize,
                previousEndMapSize,
                currentEndMapSize
            );
            assert(isSpaceToExplore)
        });
        it('should return false when one of the current map size is the same as previous', function () {
            const previousStartMapSize = 2
            const currentStartMapSize = 2
            const previousEndMapSize = 2
            const currentEndMapSize = 3
            const isSpaceToExplore = space.isMoreSpaceToExplore(
                previousStartMapSize,
                currentStartMapSize,
                previousEndMapSize,
                currentEndMapSize
            );
            assert(!isSpaceToExplore) // no more space to explore
        });
        it('should return false when previousEndMapSize is the same as currentEndMapSize', function () {
            const previousStartMapSize = 2
            const currentStartMapSize = 3
            const previousEndMapSize = 2
            const currentEndMapSize = 2
            const isSpaceToExplore = space.isMoreSpaceToExplore(
                previousStartMapSize,
                currentStartMapSize,
                previousEndMapSize,
                currentEndMapSize
            );
            assert(!isSpaceToExplore) // no more space to explore
        });
    });
});