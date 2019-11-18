const layer = require('../utils/layer')

/**
 * Performs a single layer of exploration in a social network using BFS. 
 * It uses the userExplorationMap as reference for previous layer explored and returns 
 * the exploration map plus the newly explored layer.
 * Note: this method has side effects, the userExplorationMap will be altered and returned as a result. 
 * 
 * @param {*} socialNetwork - the social network map
 * @param {*} userExplorationMap - nodes visited so far
 * @param {*} level - level on which the exploration will be performed. If there will be given a 
 * level on which the exploration already was performed or the level is bigger than current max level + 1 
 * no progress will be made and the function will return the same userExplorationmap
 */
const performOneLayerBFS = (socialNetwork, userExplorationMap, level) => {
    //obtain the layer of level-1 
    const currentLayer = layer.obtainLayer(userExplorationMap, level - 1)

    //find layer level using one iteration of BFS
    currentLayer.forEach((userID) => {
        socialNetwork[userID].forEach((friendID) => {
            if (userExplorationMap.get(friendID) === undefined) {
                userExplorationMap.set(friendID, level)
            }
        })
    })
    return userExplorationMap
}

module.exports = {
    performOneLayerBFS: performOneLayerBFS
}