const assert = require('assert');
const layer = require('../../src/utils/layer')

describe('layer', function () {
    const userExplorationMap = new Map()  // two layers
    const noLayerExplorationMap = new Map()  // no layer
    const emptyExplorationMap = new Map()  // no layer

    before(function () {
        userExplorationMap.set("u01", 0)
        userExplorationMap.set("u02", 1)
        userExplorationMap.set("u03", 1)
        userExplorationMap.set("u04", 2)
        userExplorationMap.set("u05", 2)
        userExplorationMap.set("u06", 2)

        noLayerExplorationMap.set("u01", 0)
    });

    describe('#obtainLayer()', function () {
        it('should return only the items having value 2', function () {
            const layer2 = layer.obtainLayer(userExplorationMap, 2)
            assert(layer2.includes("u04"))
            assert(layer2.includes("u05"))
            assert(layer2.includes("u06"))
            assert.equal(layer2.length, 3)
        });
        it('should return only the items having value 1', function () {
            const layer1 = layer.obtainLayer(userExplorationMap, 1)
            assert(layer1.includes("u02"))
            assert(layer1.includes("u03"))
            assert.equal(layer1.length, 2)
        });
        it('should return only the items having value 0', function () {
            const layer0 = layer.obtainLayer(userExplorationMap, 0)
            assert(layer0.includes("u01"))
            assert.equal(layer0.length, 1)
        });
        it('should return an empty list for a non existing layer', function () {
            const layer5 = layer.obtainLayer(userExplorationMap, 5)
            assert.equal(layer5.length, 0)
        });
    });

    describe('#obtainLevelOfExteriorLayer()', function () {
        it('should return 2', function () {
            const level = layer.obtainLevelOfExteriorLayer(userExplorationMap)
            assert.equal(level, 2)
        });

        it('should return 0', function () {
            const level = layer.obtainLevelOfExteriorLayer(noLayerExplorationMap)
            assert.equal(level, 0)
        });

        it('should return 0 when the map is empty', function () {
            const level = layer.obtainLevelOfExteriorLayer(emptyExplorationMap)
            assert.equal(level, 0)
        });
    });
});