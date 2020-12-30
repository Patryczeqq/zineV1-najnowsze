const { run } = require("../cmds/gban.js")

module.exports = {
    errorMsg: require("./main/errorMsg.js"),
    permissionError: require("./main/permissionError.js"),
    customErrorMsg: require("./main/customErrorMsg.js"),
    getUser: require("./utils/getUser.js"),
    randomNumber: require("./utils/randomNumber.js"),
}