const assert = require('assert');
const checkSocialNetworkIntegrity = require('../../src/checkers/data-integrity-check')
const loadSocialNetworkFromFile = require('../../src/data/dataloader')
const path = require('path')

describe('data-integrity-check', function () {
    let validSocialNetwork = {}
    let invalidSocialNetwork = {}
    const emptySocialNetwork = {}
    const oneUserSocialNetwork = { "u01": [] }

    before(function () {
        //load social networks from file
        const pathToValidSocialNetwork = path.join(__dirname, './valid-social-network.json');
        const pathToInvalidSocialNetwork = path.join(__dirname, './invalid-social-network.json');
        validSocialNetwork = loadSocialNetworkFromFile(pathToValidSocialNetwork)
        invalidSocialNetwork = loadSocialNetworkFromFile(pathToInvalidSocialNetwork)
    });

    describe('#checkSocialNetworkIntegrity()', function () {
        it('should return true when a valid social network is used', function () {
            const isValid = checkSocialNetworkIntegrity(validSocialNetwork);
            assert(isValid)
        });
        it('should return false when an invalid social network is used', function () {
            const isValid = checkSocialNetworkIntegrity(invalidSocialNetwork);
            assert(!isValid)
        });
        it('should return true when a valid social network is used, with one user', function () {
            const isValid = checkSocialNetworkIntegrity(oneUserSocialNetwork);
            assert(isValid)
        });
        it('should return true when a valid social network is used, with no user', function () {
            const isValid = checkSocialNetworkIntegrity(emptySocialNetwork);
            assert(isValid)
        });
    });
});