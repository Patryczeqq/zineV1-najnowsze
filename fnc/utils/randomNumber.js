module.exports = async (minNumber, maxNumber) => {
    return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber
}