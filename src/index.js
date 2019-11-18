const loadSocialNetworkFromFile = require('./data/dataloader')
const checkSocialNetworkIntegrity = require('./checkers/data-integrity-check')
const socialNetworkAlgorithms = require('./algorithms/social-network')
const path = require('path')
const chalk = require('chalk')


const filePath = path.join(__dirname, './social-network.json');
const socialNetwork = loadSocialNetworkFromFile(filePath)
const snIntegrity = checkSocialNetworkIntegrity(socialNetwork)
console.log("Socian Network Integrity: " + snIntegrity)

try {
    console.log(socialNetworkAlgorithms.shortestChainOfFriends(socialNetwork, "u11", "u35"))
} catch (e) {
    console.log(chalk.red(e))
}
