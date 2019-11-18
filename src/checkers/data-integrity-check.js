/**
 * Checks the integrity of the social network. 
 * Such as:
 * - each friend of a specific user exists in the network
 * - every friendship relation is bidirectional
 * 
 * @param {*} socialNetwork 
 */
const checkSocialNetworkIntegrity = (socialNetwork) => {
    //display social network
    userCount = Object.entries(socialNetwork).length
    //log data to prompt
    console.log("Number of users in Social Network: " + userCount)
    if (userCount < 30) {
        for (const [key, value] of Object.entries(socialNetwork)) {
            console.log(key, value);
        }
    } else {
        console.log("Size > 30 users. The content of social network will not be displayed.")
    }
    //check integrity 
    let integrity = true;
    for (const [userID, friendlist] of Object.entries(socialNetwork)) {
        friendlist.forEach((friendID, index) => {
            if (!socialNetwork[friendID].includes(userID)) {
                console.log("No bidirectional relation between users " + friendID + " and " + userID)
                //cannot return from a forEach statement, due to scope the return is not moved outside forEach function 
                integrity = false;
            }
        })
    }
    return integrity;
}

module.exports = checkSocialNetworkIntegrity
