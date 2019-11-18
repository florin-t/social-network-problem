/**
 * Returns the intersection of two arrays
 * 
 * @param {*} array1 
 * @param {*} array2 
 */
const intersectionOf = (array1, array2) => {
    return array1.filter((element) => array2.includes(element))
}

module.exports = {
    intersectionOf: intersectionOf
}