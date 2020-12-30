const { MessageEmbed } = require("discord.js")
module.exports = async (c, oldMsg, newMsg) => {
    try {
        if (newMsg.author.id === "745181618242846762") return
        const moment = require("moment")
        const db = require("quick.db")
        const modul = await db.get(`config-${newMsg.guild.id}-messageLog`)
        const chn = await db.get(`config-${newMsg.guild.id}-messageLogChannel`)
        if (oldMsg.content === newMsg.content) return
        if (modul === true && chn) {
            const e = new MessageEmbed()
            .setColor("#58ABFF")
            .setAuthor(client.langManager.handleLanguage(newMsg, "Edited message", "Edytowano wiadomość"), "https://i.pinimg.com/originals/eb/84/46/eb8446e1c8094b1712757cfe3ee1e688.png")
            .addFields(
                {
                    name: c.langManager.handleLanguage(newMsg, "Author", "Author"),
                    value: `${newMsg.author} (\`${newMsg.author.id}\`)`
                },
                {
                    name: c.langManager.handleLanguage(newMsg, "Old message content", "Treść starej wiadomości"),
                    value: oldMsg.content
                },
                {
                    name: c.langManager.handleLanguage(newMsg, "New message content", "Treść nowej wiadomości"),
                    value: newMsg.content
                },
                {
                    name: c.langManager.handleLanguage(newMsg, "Message creation date", "Data stworzenia wiadomości"),
                    value: moment(newMsg.createdAt).format("YYYY-MM-DD HH:mm:ss")
                },
                {
                    name: c.langManager.handleLanguage(newMsg, "Message ID", "ID wiadomości"),
                    value: oldMsg.id || newMsg.id
                },
                {
                    name: c.langManager.handleLanguage(newMsg, "Message channel", "Kanał wiadomości"),
                    value: oldMsg.channel || newMsg.channel
                }
            )
            return newMsg.guild.channels.cache.get(`${chn}`.replace("<#", "").replace(">", "")).send(e)
        }
    } catch { return }
}