const { MessageEmbed } = require("discord.js")
module.exports = async (client, msg) => {
    try {
        const db = require("quick.db")
        const moment = require("moment")
        const modul = await db.get(`config-${msg.guild.id}-messageLog`)
        const chn = await db.get(`config-${msg.guild.id}-messageLogChannel`)
        if (modul === true && chn) {
            const e = new MessageEmbed()
            .setColor("#58ABFF")
            .setAuthor(client.langManager.handleLanguage(message, "Deleted message", "Usunięto wiadomość"), "https://i.pinimg.com/originals/eb/84/46/eb8446e1c8094b1712757cfe3ee1e688.png")
            .addFields(
                {
                    name: client.langManager.handleLanguage(message, "Author", "Autor"),
                    value: `${msg.author} (\`${msg.author.id}\`)`
                },
                {
                    name: client.langManager.handleLanguage(message, "Message content", "Treść wiadomości"),
                    value: msg.content
                },
                {
                    name: client.langManager.handleLanguage(message, "Message creation date", "Data utworzenia wiadomości"),
                    value: moment(msg.createdAt).format("YYYY-MM-DD HH:mm:ss")
                },
                {
                    name: client.langManager.handleLanguage(message, "Message ID", "ID wiadomości"),
                    value: msg.id
                },
                {
                    name: client.langManager.handleLanguage(message, "Message channel", "Kanał wiadomości"),
                    value: msg.channel
                },
                {
                    name: client.langManager.handleLanguage(message, "Reactions count", "Ilość reakcji"),
                    value: msg.reactions.cache.size != 0 || msg.reactions.cache.size != "0" ? msg.reactions.cache.size : "Brak"
                }
            )
            return msg.guild.channels.cache.get(`${chn}`.replace("<#", "").replace(">", "")).send(e)
        }
    } catch { return }
}