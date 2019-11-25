/**
 * Implementation using the simple one-way-bfs approach on which we start only from origin and 
 * explore until we reach the endPoint. 
 * 
 * @param {*} socialNetwork 
 * @param {*} startPoint 
 * @param {*} endPoint 
 */
const shortestChainOfFriends = (socialNetwork, startPoint, endPoint) => {
    const visited = []
    let found = false
    let queue = []
    queue.unshift(startPoint)
    visited[startPoint] = true
    const previous = []

    while (queue.length != 0 && !found) {
        const node = queue.pop()
        socialNetwork[node].forEach((next) => {
            if (visited[next] === undefined) {
                queue.unshift(next)
                visited[next] = true
                previous[next] = node
            }
            if (next === endPoint) {
                found = true
            }
        })
    }

    if (!found) {
        //throw error, endPoint could not be found, it resides in a different connex component 
        throw Error("There is no path from " + startPoint + " to " + endPoint)
    }
    //reconstruct path from end to start
    const path = []
    for (at = endPoint; at !== undefined; at = previous[at]) {
        path.unshift(at)
    }
    console.log(path)
    return path
}

module.exports = {
    shortestChainOfFriends: shortestChainOfFriends
}