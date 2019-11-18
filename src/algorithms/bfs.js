const layer = require('../utils/layer')

/**
 * Performs a single layer of exploration in a social network using BFS. 
 * It uses the userExplorationMap as reference for previous layer explored and returns 
 * the exploration map plus the newly explored layer
 * 
 * @param {*} socialNetwork 
 * @param {*} userExplorationMap 
 * @param {*} level 
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