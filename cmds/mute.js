const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "mute",
    description: "Wycisza użytkownika",
    aliases: ["wycisz", "zmutuj", "zamknij-morde"],
    category: "Moderacja",
    usage: "<@użytkownik> [powód]",

    async run(message, args, client) {
        const ranga = await client.config.get(`config-${message.guild.id}-muteRole`)
        const prefix = await client.config.get(`guild-${message.guild.id}-prefix`) || "-"
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const reasonArg = [...args].slice(1).join(" ") || "Nie podano"
        if (!message.member.hasPermission("KICK_MEMBERS")) return client.functions.permissionError(message.channel, "Wyrzucanie członków")
        else if (!ranga) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, `Nie ustawiono roli wyciszonego użytkownika. Aby to zrobić użyj: \`${prefix}skonfiguruj set muteRole <@wzmianka>\` (Może tego dokonać tylko osoba z uprawnieniem \`Zarządzanie serwerem\`)`)
        else if (!user) return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "mute <@użytkownik / ID> [powód]")
        else if (user.id == message.guild.owner) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie możesz wyciszyć właściciela")
        else if (user.id == "745181618242846762") return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie możesz mnie wyciszyć")
        else if (message.author.id == user.id) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie możesz wyciszyć samego siebie")
        else {
            try {
                await user.roles.add(`${ranga}`.replace("<@&", "").replace(">", ""))
            } catch {
                client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie mogę wyciszyć tego użytkownika")
            }
            // Na kanal
            const e = new MessageEmbed()
            .setColor("#75FF67")
            .setAuthor("Wyciszono użytkownika", "https://icon-library.com/images/moderator-icon/moderator-icon-14.jpg")
            .addFields(
                {
                    name: "Wyciszony",
                    value: `${user} (\`${user.id}\`)`
                },
                {
                    name: "Powód",
                    value: reasonArg
                },
                {
                    name: "Moderator",
                    value: `${message.author} (\`${message.author.id}\`)`
                }
            )
            .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            message.channel.send(e);

            // Do usera
            try {
                const e_us = new MessageEmbed()
                .setColor("#75FF67")
                .setAuthor("Zostałeś wyciszony", "https://icon-library.com/images/moderator-icon/moderator-icon-14.jpg")
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
                .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                client.users.cache.get(user.id).send(e_us)
            } catch {
                const e = new MessageEmbed()
                .setColor("#75FF67")
                .setAuthor("Informacja", "https://icon-library.com/images/moderator-icon/moderator-icon-14.jpg")
                .setDescription(`Niestety, nie mogę wysłać prywatnej wiadomości do tego użytkownika.`)
                .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                message.channel.send(e);
            }
        }
	}
}