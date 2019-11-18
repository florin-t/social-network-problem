
/**
 * Obtain all users at a distance given by paremeter 'level' of the user who created this map via BFS
 * 
 * @param {*} userExplorationMap 
 * @param {*} level 
 */
const obtainLayer = (userExplorationMap, level) => {
    return [...userExplorationMap.entries()]
        .filter((entry, index) => entry[1] === (level))
        .map(([firstElement]) => firstElement)
}

/**
 * This will return the maximum distance reached by the user who started to create this exploration with BFS
 * 
 * @param {*} userExplorationMap 
 */
const obtainLevelOfExteriorLayer = (userExplorationMap) => {
    level = 0;
    userExplorationMap.forEach((value, key) => {
        if (value > level)
            level = value
    })
    return level
}

module.exports = {
    obtainLayer: obtainLayer,
    obtainLevelOfExteriorLayer: obtainLevelOfExteriorLayer
}