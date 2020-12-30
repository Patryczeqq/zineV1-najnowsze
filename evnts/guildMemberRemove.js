const { MessageEmbed } = require("discord.js")
module.exports = async (client, osoba) => {
    const moment = require("moment")
    const db = require("quick.db")
    const modul = await db.get(`config-${osoba.guild.id}-leaveModule`)
    const chn = await db.get(`config-${osoba.guild.id}-leaveChannel`)
    const msg = await db.get(`config-${osoba.guild.id}-leaveMessage`)
    const kolor = await db.get(`config-${osoba.guild.id}-leaveMessageColor`)
    if (modul === "on") {
        const emb = new MessageEmbed()
        .setTitle(client.langManager.handleLanguage(message, "", "Użytkownik wyszedł!"))
        .setDescription(`${msg || client.langManager.handleLanguage(message, "{membertag} leaved our server :(", "{membertag} opuścił nasz serwer :(")}`
        .replace(/{membermention}/g, osoba)
        .replace(/{memberid}/g, osoba.id)
        .replace(/{membertag}/g, osoba.user.tag)
        .replace(/{membercreated}/g, moment(osoba.createdAt).format("YYYY-MM-DD HH:mm:ss"))
        .replace(/{guildname}/g, osoba.guild.name)
        .replace(/{guildid}/g, osoba.guild.id)
        .replace(/{guildmembers}/g, osoba.guild.members.cache.size)
        )
        .setColor(kolor || "#ff0000")
        return osoba.guild.channels.cache.get(`${chn}`.replace("<#", "").replace(">", "")).send(emb)
    }
    await db.set(`user-${osoba.id}-on-${osoba.guild.id}-isVerified`, "false")
}