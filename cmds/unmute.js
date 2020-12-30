const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "unmute",
    descriptionpl: "Odcisza użytkownika",
    descriptionen: "Unmutes user",
    aliases: ["odcisz", "odmutuj", "otworz-morde"],
    category: "Moderacja",
    usagepl: "<@użytkownik> [powód]",
    usageen: "<@user> [reason]",
    
    async run(message, args, client) {
        const prefix = await client.config.get(`guild-${message.guild.id}-prefix`) || "-"
        const muteRole = await client.config.get(`config-${message.guild.id}-muteRole`)
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const reasonArg = [...args].slice(1).join(" ") || client.langManager.handleLanguage(message, "Not specified", "Nie podano")
        if (!message.member.hasPermission("KICK_MEMBERS")) client.functions.permissionError(message.channel, client.langManager.handleLanguage(message, "Kick members", "Wyrzucanie członków"))
        else if (!muteRole || muteRole === null) client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, `The role of the muted user has not been set. To do this, use: \`${prefix}config set muteRole <@mention>\` (This can only be done by a person with \`Manage guild\` permission)`, `Nie ustawiono roli wyciszonego użytkownika. Aby to zrobić użyj: \`${prefix}skonfiguruj set muteRole <@wzmianka>\` (Może tego dokonać tylko osoba z uprawnieniem \`Zarządzanie serwerem\`)`))
        else if (!user.roles.cache.has(`${muteRole}`.replace("<@&", "").replace(">", ""))) client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, "This user is not muted", "Ten użytkownik nie jest wyciszony"))
        else if (!user) client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, "Could not find that user", "Nie można znaleźć takiego użytkownika"))
        else if (user.id == message.guild.owner) client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, "You cannot unmute the guild owner", "Nie możesz wyciszyć właściciela"))
        else if (user.id == client.id) client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, "You cannot unmute me", "Nie możesz mnie wyciszyć"))
        else if (message.author.id == user.id) client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie możesz wyciszyć samego siebie")
        else {
            try {
                await user.roles.remove(`${muteRole}`.replace("<@&", "").replace(">", ""))
            } catch {
                client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, "I cannot unmute this user", "Nie mogę odciszyć tego użytkownika"))
            }
            // Na kanal
            const e = new MessageEmbed()
            .setColor("#75FF67")
            .setAuthor(client.langManager.handleLanguage(message, "Unmuted user", "Odciszono użytkownika"), "https://icon-library.com/images/moderator-icon/moderator-icon-14.jpg")
            .addFields(
                {
                    name: client.langManager.handleLanguage(message, "Unmuted", "Odciszony"),
                    value: `${user} (\`${user.id}\`)`
                },
                {
                    name: client.langManager.handleLanguage(message, "Reason", "Powód"),
                    value: reasonArg
                },
                {
                    name: "Moderator",
                    value: `${message.author} (\`${message.author.id}\`)`
                }
            )
            .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
            message.channel.send(e);

            // Do usera
            try {
                const e_us = new MessageEmbed()
                .setColor("#75FF67")
                .setAuthor(client.langManager.handleLanguage(message, "You have been unmuted", "Zostałeś odciszony"), "https://icon-library.com/images/moderator-icon/moderator-icon-14.jpg")
                .addFields(
                    {
                        name: client.langManager.handleLanguage(message, "Reason", "Powód"),
                        value: reasonArg
                    },
                    {
                        name: "Moderator",
                        value: `${message.author} (\`${message.author.id}\`)`
                    }
                )
                .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                client.users.cache.get(user.id).send(e_us)
            } catch {
                const e = new MessageEmbed()
                .setColor("#75FF67")
                .setAuthor(client.langManager.handleLanguage(message, "Information", "Informacja"), "https://icon-library.com/images/moderator-icon/moderator-icon-14.jpg")
                .setDescription(client.langManager.handleLanguage(message, "Unfortunately, I cannot send a private message to this user.", "Niestety, nie mogę wysłać prywatnej wiadomości do tego użytkownika."))
                message.channel.send(e);
            }
        }
	}
}