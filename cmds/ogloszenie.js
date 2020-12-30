const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "ogloszenie",
    description: "Wysyła ogłoszenie na kanał ogłoszeniowy.",
    aliases: ["ogl", "shout", "news", "ogłoszenie"],
    category: "Przydatne",
    usage: "<treść>",
    
    async run(message, args, client) {
        const tresc = args.join(" ")
        const prefix = await client.config.get(`guild-${message.guild.id}-prefix`) || "-"
        const kanalOgloszen = await client.config.get(`config-${message.guild.id}-announcementChannel`)
        const wzmianka = await client.config.get(`config-${message.guild.id}-announcementMention`)
        if (!kanalOgloszen) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, `Nie ustawiono kanału, na który mają być wysyłane ogłoszenia w konfiguracji serwera. Aby to zrobić użyj: \`${prefix}skonfiguruj set announcementChannel <#kanał>\` (Może tego dokonać tylko osoba z uprawnieniem \`Zarządzanie serwerem\`)`)
        else if (!message.member.hasPermission("MANAGE_GUILD")) return client.functions.permissionError(message.channel, "Zarządzanie serwerem")
        else if (!tresc) return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "ogloszenie <treść>")
        else try {
            const annChn = kanalOgloszen.replace("<#", "").replace(">", "")
            const ek = new MessageEmbed()
            .setColor("#75FF67")
            .setAuthor("Nowe ogłoszenie", "https://cdn2.iconfinder.com/data/icons/mixed-rounded-flat-icon/512/megaphone-512.png")
            .setDescription(tresc)
            .setFooter(`Ogłoszenie umieścił ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            if (wzmianka) message.guild.channels.cache.get(annChn).send(wzmianka)
            message.guild.channels.cache.get(annChn).send(ek)
        } catch (err) {
            client.functions.errorMsg(client, "CriticalError", message.channel, message.guild.id, err)
        }
	}
}