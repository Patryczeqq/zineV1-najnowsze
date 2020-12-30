module.exports = async (c, msg) => {
    const db = require("quick.db")
    const reg = new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?")
    const modul = await db.get(`config-${msg.guild.id}-antyLink`)
    if (modul === true && reg.test(msg.content) && !msg.member.hasPermission("MANAGE_MESSAGES") && !msg.member.hasPermission("ADMINISTRATOR")) return ntp = true
    if (ntp === true) {
        require("../fnc/funkcje.js").errorMsg(c, "WarnMsg", msg.channel, msg.guild.id, client.langManager.handleLanguage(message, "You don't have permissions to send links", "Nie posiadasz uprawnień do wysyłania linków"))
        msg.delete()
    }
}