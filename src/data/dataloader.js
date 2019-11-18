const fs = require('fs')

/**
 * Load the social network from a file. 
 * The format is a map on which the keys are the IDs and value are the list of friends. 
 * 
 * @param {file} file - the complete path to the file 
 */
const loadSocialNetworkFromFile = (file) => {
    try {
        const data = fs.readFileSync(file, 'utf8')
        return JSON.parse(data)
    } catch (err) {
        console.error(err)
    }
}

module.exports = loadSocialNetworkFromFile
