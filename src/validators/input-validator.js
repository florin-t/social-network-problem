const validateInput = (socialNetwork, userId) => {
    if (userId === undefined) {
        throw Error("Undefined userId")
    }
    if (socialNetwork[userId] === undefined) {
        throw Error("User " + userId + "  does not exist")
    }
}

module.exports = validateInput
