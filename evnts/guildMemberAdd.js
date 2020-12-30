const { MessageEmbed } = require("discord.js")
module.exports = async (client, osoba) => {
    const moment = require("moment")
    const db = require("quick.db")
    const modul = await db.get(`config-${osoba.guild.id}-welcomeModule`)
    const chn = await db.get(`config-${osoba.guild.id}-welcomeChannel`)
    const msg = await db.get(`config-${osoba.guild.id}-welcomeMessage`)
    const kolor = await db.get(`config-${osoba.guild.id}-welcomeMessageColor`)
    if (modul === "on") {
        const emb = new MessageEmbed()
        .setTitle(client.langManager.handleLanguage(message, "New user!", "Nowy użytkownik!"))
        .setDescription(`${msg || client.langManager.handleLanguage(message, "User joined our server: {membermention}", "Użytkownik dołączył na nasz serwer: {membermention}")}`
            .replace(/{membermention}/g, osoba)
            .replace(/{memberid}/g, osoba.id)
            .replace(/{membertag}/g, osoba.user.tag)
            .replace(/{membercreated}/g, moment(osoba.createdAt).format("YYYY-MM-DD HH:mm:ss"))
            .replace(/{guildname}/g, osoba.guild.name)
            .replace(/{guildid}/g, osoba.guild.id)
            .replace(/{guildmembers}/g, osoba.guild.members.cache.size)
        )
        .setColor(kolor || "#17FF00")
        return osoba.guild.channels.cache.get(`${chn}`.replace("<#", "").replace(">", "")).send(emb)
    }
}