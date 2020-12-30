const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "idban",
    description: "Banuje użytkownika przez ID",
    aliases: ["ib", "id-ban", "hb", "hackban"],
    usage: "<ID użytkownika> [powód]",
    category: "Moderacja",

    async run(message, args, client) {
        const user = args[0]
        const reasonArg = [...args].slice(1).join(" ") || "Nie podano"
        if (!message.member.hasPermission("BAN_MEMBERS")) return client.functions.permissionError(message.channel, "Banowanie członków")
        else if (user == message.guild.owner) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie możesz zbanować właściciela")
        else if (user == "745181618242846762") return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie możesz mnie zbanować")
        else if (message.author.id == user) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie możesz zbanować samego siebie")
        else try {
                client.users.fetch(`${user}`).then(async u => {
                    message.guild.members.ban(u.id, { reason: reasonArg })
                })
            } catch {
                client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie znaleziono takiego użytkownika")
            }
            // Do usera
            try {
                const e_us = new MessageEmbed()
                .setColor("#75FF67")
                .setAuthor("Zostałeś zbanowany", "https://icon-library.com/images/moderator-icon/moderator-icon-14.jpg")
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

            const e = new MessageEmbed()
            .setColor("#75FF67")
            .setAuthor("Zbanowano użytkownika (IDBAN)", "https://icon-library.com/images/moderator-icon/moderator-icon-14.jpg")
            .addFields(
                {
                    name: "Zbanowany",
                    value: `<@${user}> (\`${user}\`)`
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
        }
	}