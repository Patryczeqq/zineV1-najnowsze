const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "unban",
    descriptionpl: "Odbanowywuje użytkownika na serwerze",
    descriptionen: "Unbans user on the server",
    aliases: ["ub", "unbanuj"],
    usagepl: "<@użytkownik> [powód]",
    usageen: "<@user> [reason]",
    category: "Moderacja",

    async run(message, args, client) {
        const user = message.mentions.members.first() || client.users.cache.get(args[0])
        const reasonArg = [...args].slice(1).join(" ") || "Nie podano"
        if (!message.member.hasPermission("BAN_MEMBERS")) return client.functions.permissionError(message.channel, client.langManager.handleLanguage(message, "Ban members", "Banowanie członków"))
        else if (!user) return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, client.langManager.handleLanguage(message, "unban <@user / ID> [reason]", "unban <@użytkownik / ID> [powód]"))
        else if (user.id == "745181618242846762") return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, "I'm not banned", "Nie jestem zbanowany"))
        else if (message.author.id == user.id) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, "You cannot ban yourself", "Nie możesz zbanować samego siebie"))
        else try {
            let bany = message.guild.fetchBans()
            let m = false
            bany.forEach(buser => {
                if (buser.id == user.id) m = true
            })
            if (m === false) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, "This user are not banned", "Ten użytkownik nie jest zbanowany"))
            if (message.member.roles.highest.position <= user.roles.highest.position) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, "You cannot unbans this user because they have a role higher than yours", "Nie możesz odbanować tego użytkownika, ponieważ ma rolę wyższą od Twojej"))
                client.users.fetch(user).then(async u => {
                    message.guild.members.unban(u.id, { reason: reasonArg })
                })
            } catch {
                client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, "I cannot unban this user", "Nie mogę odbanować tego użytkownika"))
            }
            // Na kanal
            const e = new MessageEmbed()
            .setColor("#75FF67")
            .setAuthor(client.langManager.handleLanguage(message, "Unbanned user", "Odbanowano użytkownika"), "https://icon-library.com/images/moderator-icon/moderator-icon-14.jpg")
            .addFields(
                {
                    name: client.langManager.handleLanguage(message, "Unbanned user", "Odbanowany"),
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
                .setAuthor(client.langManager.handleLanguage(message, "You've been unbanned", "Zostałeś odbanowany"), "https://icon-library.com/images/moderator-icon/moderator-icon-14.jpg")
                .addFields(
                    {
                        name: "Powód",
                        value: reasonArg
                    },
                    {
                        name: "Moderator",
                        value: `${message.author} (\`${message.author.id}\`)`
                    }
                )
                .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                client.users.cache.get(user.id).send(e_us)
            } catch {
                const e = new MessageEmbed()
                .setColor("#75FF67")
                .setAuthor(client.langManager.handleLanguage(message, "Information", "Informacja"), "https://icon-library.com/images/moderator-icon/moderator-icon-14.jpg")
                .setDescription(client.langManager.handleLanguage(message, "Unfortunately, I cannot send a private message to this user.", "Niestety, nie mogę wysłać prywatnej wiadomości do tego użytkownika."))
                .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                message.channel.send(e);
            }
        }
	}