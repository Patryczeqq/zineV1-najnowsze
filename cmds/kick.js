const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "kick",
    description: "Wyrzuca użytkownika z serwera",
    aliases: ["k"],
    usage: "<@użytkownik / ID> [powód]",
    category: "Moderacja",

    async run(message, args, client) {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const reasonArg = [...args].slice(1).join(" ") || "Nie podano"
        if (!message.member.hasPermission("KICK_MEMBERS")) return client.functions.permissionError(message.channel, "Wyrzucanie członków")
        else if (!user) return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "kick <@użytkownik / ID> [powód]")
        else if (user.id == message.guild.owner) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie możesz wyrzucić właściciela")
        else if (user.id == "745181618242846762") return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie możesz mnie wyrzucić")
        else if (message.author.id == user.id) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie możesz wyrzucić samego siebie")
        else {
            try {
                user.kick(reasonArg)
            } catch {
                client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie mogę wyrzucić tego użytkownika")
            }
            // Na kanal
            const e = new MessageEmbed()
            .setColor("#75FF67")
            .setAuthor("Wyrzucono użytkownika", "https://icon-library.com/images/moderator-icon/moderator-icon-14.jpg")
            .addFields(
                {
                    name: "Wyrzucony",
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
                .setAuthor("Zostałeś wyrzucony", "https://icon-library.com/images/moderator-icon/moderator-icon-14.jpg")
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