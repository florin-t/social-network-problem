const assert = require('assert');
const bfs = require('../../src/algorithms/bfs')
const checkSocialNetworkIntegrity = require('../../src/checkers/data-integrity-check')
const loadSocialNetworkFromFile = require('../../src/data/dataloader')
const path = require('path')

describe('bfs', function () {
    let socialNetwork = undefined

    before(function () {
        //load social networks from file
        const pathToSocialNetworkJson = path.join(__dirname, './social-network.json')
        socialNetwork = loadSocialNetworkFromFile(pathToSocialNetworkJson)
        //fail here if social network is not vaid
        assert(checkSocialNetworkIntegrity(socialNetwork))
    });

    describe('#performOneLayerBFS()', function () {
        it('should return a map of explored nodes', function () {
            const userExplorationMap = new Map()
            userExplorationMap.set("u01", 0)
            const newUserExplorationMap = bfs.performOneLayerBFS(socialNetwork, userExplorationMap, 1)
            assert.equal(newUserExplorationMap.get("u02"), 1)
            assert.equal(newUserExplorationMap.get("u03"), 1)
        });
        it('should return a map of explored nodes of two levels when applied twice ', function () {
            let userExplorationMap = new Map()
            userExplorationMap.set("u01", 0)
            userExplorationMap = bfs.performOneLayerBFS(socialNetwork, userExplorationMap, 1)
            userExplorationMap = bfs.performOneLayerBFS(socialNetwork, userExplorationMap, 2)

            assert.equal(userExplorationMap.get("u01"), 0)
            assert.equal(userExplorationMap.get("u02"), 1)
            assert.equal(userExplorationMap.get("u03"), 1)
            assert.equal(userExplorationMap.get("u04"), 2)
            assert.equal(userExplorationMap.get("u05"), 2)
            assert.equal(userExplorationMap.size, 5)
        });
        it('should return the same map if trying to explore the same level again', function () {
            let userExplorationMap = new Map()
            userExplorationMap.set("u01", 0)
            //first exploration
            userExplorationMap = bfs.performOneLayerBFS(socialNetwork, userExplorationMap, 1)
            assert.equal(userExplorationMap.get("u01"), 0)
            assert.equal(userExplorationMap.get("u02"), 1)
            assert.equal(userExplorationMap.get("u03"), 1)
            assert.equal(userExplorationMap.size, 3)
            //attempting the same exploration again
            userExplorationMap = bfs.performOneLayerBFS(socialNetwork, userExplorationMap, 1)
            assert.equal(userExplorationMap.get("u01"), 0)
            assert.equal(userExplorationMap.get("u02"), 1)
            assert.equal(userExplorationMap.get("u03"), 1)
            assert.equal(userExplorationMap.size, 3)
        });
        it('should return the same map if trying to explore a level higher than nextLevel', function () {
            let userExplorationMap = new Map()
            userExplorationMap.set("u01", 0)
            //first exploration
            userExplorationMap = bfs.performOneLayerBFS(socialNetwork, userExplorationMap, 1)
            assert.equal(userExplorationMap.get("u01"), 0)
            assert.equal(userExplorationMap.get("u02"), 1)
            assert.equal(userExplorationMap.get("u03"), 1)
            assert.equal(userExplorationMap.size, 3)
            //attempting the same exploration again
            userExplorationMap = bfs.performOneLayerBFS(socialNetwork, userExplorationMap, 3)
            assert.equal(userExplorationMap.get("u01"), 0)
            assert.equal(userExplorationMap.get("u02"), 1)
            assert.equal(userExplorationMap.get("u03"), 1)
            assert.equal(userExplorationMap.size, 3)
        });
    });
});