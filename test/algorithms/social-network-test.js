const assert = require('assert');
const { shortestChainOfFriends, calculateChainToOrigin } = require('../../src/algorithms/social-network')
const checkSocialNetworkIntegrity = require('../../src/validators/data-integrity-check')
const loadSocialNetworkFromFile = require('../../src/data/dataloader')
const path = require('path')

describe('social-network', function () {
    let socialNetwork = undefined

    before(function () {
        //load social networks from file
        const pathToSocialNetworkJson = path.join(__dirname, './social-network.json')
        socialNetwork = loadSocialNetworkFromFile(pathToSocialNetworkJson)
        //fail here if social network is not vaid
        assert(checkSocialNetworkIntegrity(socialNetwork))
    });
    describe('#shortestChainOfFriends()', function () {
        it('should throw error when there is no direct path', function () {
            try {
                shortestChainOfFriends(socialNetwork, "u01", "u08")
                assert.fail()
            } catch (e) {
                assert(e !== undefined)
            }
        })
        it('should return the path when there is a valid path between two users', function () {
            const usersChain = shortestChainOfFriends(socialNetwork, "u01", "u05")
            assert(usersChain.includes("u01"))
            assert(usersChain.includes("u02"))
            assert(usersChain.includes("u05"))
            assert.equal(usersChain.length, 3)
        })
        it('should return the path when start point and end point are the same', function () {
            const usersChain = shortestChainOfFriends(socialNetwork, "u01", "u01")
            assert(usersChain.includes("u01"))
            assert.equal(usersChain.length, 1)
        })
        it('should return the path when the distance between start point and end point is 1', function () {
            const usersChain = shortestChainOfFriends(socialNetwork, "u01", "u02")
            assert(usersChain.includes("u01"))
            assert(usersChain.includes("u02"))
            assert.equal(usersChain.length, 2)
        })
    })
})