const loadSocialNetworkFromFile = require('./data/dataloader')
const checkSocialNetworkIntegrity = require('./validators/data-integrity-check')
const validateInput = require('./validators/input-validator')
const shortestChainOneBfs = require('./algorithms/shortest-chain-one-bfs')
const path = require('path')
const chalk = require('chalk')
const express = require('express')


const filePath = path.join(__dirname, './social-network.json');
const socialNetwork = loadSocialNetworkFromFile(filePath)
const snIntegrity = checkSocialNetworkIntegrity(socialNetwork)
console.log("Social Network Integrity: " + snIntegrity)
if (!snIntegrity) {
    throw Error("Social network integrity false. Aborting...")
}

const port = process.env.PORT || 3000
const app = express()
app.listen(port, () => {
    console.log('Server is up!')
})

app.get('/chain-of-users', (req, res) => {
    try {
        const startUser = req.query.startUser
        const endUser = req.query.endUser
        if (startUser === undefined || endUser === undefined) {
            throw Error("startUser or endUser missing!")
        }
        validateInput(socialNetwork, startUser)
        validateInput(socialNetwork, endUser)
        const chainOfUsers =
            shortestChainOneBfs.shortestChainOfFriends(socialNetwork, startUser, endUser)
        res.status(200).send(chainOfUsers)
    } catch (e) {
        console.log(chalk.red(e))
        res.status(400).send({ error: e.message })
    }
})
