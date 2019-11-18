const bfs = require('./bfs')
const layer = require('../utils/layer')
const arrayUtils = require('../utils/array-utils')
const spaceUtils = require('../utils/space')

/**
 * Obtains the chain of users from an user located on the outermost layer of an userExplorationMap to 
 * the user from which the exploration map started.
 * 
 * @param {*} userExplorationMap 
 * @param {*} outerFriend - an user located on the outermost layer of userExplorationMap 
 */
const calculateChainToOrigin = (socialNetwork, userExplorationMap, outerFriend) => {
    //obtain the level of exterior layer of the map
    const level = layer.obtainLevelOfExteriorLayer(userExplorationMap)
    //the next component in the current chain, initialized with outerFriend
    let chainFriendComponent = outerFriend
    const chainToOrigin = [chainFriendComponent]
    //now peeling down the userExplorationMap layer by layer 
    // in order to discover the path from outerPoint to origin
    for (i = level - 1; i >= 0; i--) {
        const innerLayer = layer.obtainLayer(userExplorationMap, i)
        //find first friend of chainFriendComponent in the next inner layer of userExplorationMap
        const friendsWithinInnerLayer = arrayUtils.intersectionOf(socialNetwork[chainFriendComponent], innerLayer)
        //the new component in the chain of friends becomes the first friend within inner layer we find(it can be any inserted)
        chainFriendComponent = friendsWithinInnerLayer[0]
        //insert the new chainFriendComponent
        chainToOrigin.unshift(chainFriendComponent)
    }
    return chainToOrigin
}

/**
 * Calculate and return an array containing the shortest chain of friends between two users. 
 * In case there is no such possibility to calculate the shortest chain of friends(because the users
 * exist in different connex components) an Error will be thrown. 
 * 
 * This function uses a double BFS, one from the startPoint and the other from the endPoint. 
 * It is expected that either these double BFS explorations to intersect with eachother at some point,
 * we will call this point the middlePoint, and from there to start constructing the chain of friends bothways,
 * either the exploration won't be possible from one side, because both users live in different connex components.
 * 
 * In worst case the algorithm will explore the entire social network, but in average is expected to perform
 * better than a simple BFS.
 * 
 * @param {*} socialNetwork 
 * @param {*} startFriend 
 * @param {*} endFriend 
 */
const shortestChainOfFriends = (socialNetwork, startPoint, endPoint) => {
    //map for startPoint
    let startPointMap = new Map();
    //map for endPoint
    let endPointMap = new Map();
    //queue for startPoint
    let startPointQueue = new Array();
    //queue for endPoint
    let endPointQueue = new Array();
    // the intersection points during our search
    let middlePoints
    //the level we explored so far (i.e. the current distance from origin points)
    let level = 0;
    //keep notice if the dual BFS exploration encounters an intersection point
    let intersection = false
    //keep notice if there is more space to explore 
    let isSpaceToExplore = true

    //init maps with start & end point, init queues with start and end point 
    startPointMap.set(startPoint, level)  //level=0, origin point
    endPointMap.set(endPoint, level)
    startPointQueue.unshift(startPoint)
    endPointQueue.unshift(endPoint)

    // case when startPoint and endPoint are the same
    if (startPoint === endPoint) {
        return [startPoint]
    }

    // iterate BFS for each core sequentially
    // after each iteration check the intersection of the outer layer of friends
    // stop when we have an intersection or when there is nothing left to explore from one side
    while (!intersection && isSpaceToExplore) {
        //next level
        level++

        //keep the size of previous explored user space 
        const previousStartPointMapSize = startPointMap.size
        const previousEndPointMapSize = endPointMap.size

        //perform one lvl BFS on both ends, first from start point
        startPointMap = bfs.performOneLayerBFS(socialNetwork, startPointMap, level)

        // check if newly discovered layer intersects with the outer layer of endPointMap
        middlePoints = arrayUtils.intersectionOf(
            layer.obtainLayer(startPointMap, level),
            layer.obtainLayer(endPointMap, level - 1)
        )
        if (middlePoints.length > 0) {
            intersection == true
            break //no need to explore another layer from end point's side
        }

        // one lvl BFS from the end point side
        endPointMap = bfs.performOneLayerBFS(socialNetwork, endPointMap, level)

        // check if newly discovered layer intersects with the outer layer of startPointMap
        middlePoints = arrayUtils.intersectionOf(
            layer.obtainLayer(startPointMap, level),
            layer.obtainLayer(endPointMap, level)
        )
        if (middlePoints.length > 0) {
            intersection == true
            break //no need to explore another layer from end point's side
        }

        //check if we continue exploration or not
        isSpaceToExplore = spaceUtils.isMoreSpaceToExplore(
            previousStartPointMapSize,
            startPointMap.size,
            previousEndPointMapSize,
            endPointMap.size
        )
    }

    //if the search stopped because there was no more space to explore then we stop and throw an Error
    //this means they reside in a different connex components
    if (isSpaceToExplore == false)
        throw Error("There is no path from " + startPoint + " to " + endPoint)

    const startPointChain = calculateChainToOrigin(socialNetwork, startPointMap, middlePoints[0])
    const endPointChain = calculateChainToOrigin(socialNetwork, endPointMap, middlePoints[0])
    // reconstruct the chain of friends from intersection to both ends (startPoint & endPoint) 
    // concatenate both chain of friends (reverse order of first + normal order of second)
    // remove the duplicate middlePoint from endPointChain by slice it from head
    // return the concatenation 
    return startPointChain.concat(endPointChain.reverse().slice(1))
}

module.exports = {
    shortestChainOfFriends: shortestChainOfFriends
}