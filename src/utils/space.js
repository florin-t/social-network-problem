/**
 * Helper function to check if there is more space to explore in a graph when performing double BFS
 * It compares the current sizes of maps vs previous sizes of the same maps. 
 * In case one of the maps has the same size as previous, then this method returns false.
 * True otherwise
 * 
 * @param {*} previousStartPointMapSize 
 * @param {*} startPointMapSize 
 * @param {*} previousEndPointMapSize 
 * @param {*} endPointMapSize 
 */
const isMoreSpaceToExplore = (previousStartPointMapSize,
    startPointMapSize,
    previousEndPointMapSize,
    endPointMapSize) => {
    if ((previousStartPointMapSize != startPointMapSize) &&
        (previousEndPointMapSize != endPointMapSize)) {
        return true
    }
    return false
}

module.exports = {
    isMoreSpaceToExplore: isMoreSpaceToExplore
}