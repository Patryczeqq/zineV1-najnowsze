const { MessageEmbed } = require("discord.js")
const eco = require("discord-simple-economy")

module.exports = {
    name: "removemoney",
    description: "Zabiera pieniądze konkretnemu użytkownikowi.",
    aliases: ["zabierzhajs"],
    category: "Ekonomia",
    usage: "<@użytkownik / ID> <kwota> [--cash | --bank]",

    async run(message, args, client) {
        const kasa = args[1]
        const os = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]) || client.users.cache.get(args[0])
        if (!os || !kasa) return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "removemoney <@użytkownik / ID> <kwota> [--cash | --bank]")
        else {
            function checkN(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
            if (!message.member.hasPermission("MANAGE_GUILD")) return client.functions.permissionError(message.channel, "Zarządzanie serwerem")
            else if (message.content.includes("--cash")) {
                if (!checkN(kasa) || kasa === 0) {
                    client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Podaj prawidłową sumę pieniędzy")
                } else {
                    const kasa_n = kasa.replace("--cash", "")
                    const e = new MessageEmbed()
                    .setColor("#F0FF6E")
                    .setAuthor("Zabrano pieniądze", "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/64946/cash-clipart-md.png")
                    .setDescription(`Pomyślnie zabrano ${kasa} złotych ze stanu konta użytkownika ${os}.`)
                    .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    const cbB = eval(`${eco.wallet(os, message.guild)} - ${kasa_n}`)
                    await eco.set(os, message.guild, new Number(cbB), 0)
                    message.channel.send(e);
                }
            } else if (message.content.includes("--bank")) {
                if (!checkN(kasa) || kasa === 0) {
                    client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Podaj prawidłową sumę pieniędzy")
                } else {
                    const e = new MessageEmbed()
                    .setColor("#F0FF6E")
                    .setAuthor("Zabrano pieniądze", "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/64946/cash-clipart-md.png")
                    .setDescription(`Pomyślnie zabrano ${kasa} złotych ze stanu konta bankowego użytkownika ${os}.`)
                    .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    const bbB = eval(`${eco.bank(os, message.guild)} - ${kasa}`)
                    await eco.set(os, message.guild, new Number(eco.wallet(os, message.guild)), new Number(bbB))
                    message.channel.send(e);
                }
            } else if (!checkN(kasa) || kasa === 0) {
                client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Podaj prawidłową sumę pieniędzy")
            } else {
                const e = new MessageEmbed()
                .setColor("#F0FF6E")
                .setAuthor("Zabrano pieniądze", "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/64946/cash-clipart-md.png")
                .setDescription(`Pomyślnie zabrano ${kasa} złotych ze stanu konta użytkownika ${os}.`)
                .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                const cbB = eval(`${eco.wallet(os, message.guild)} - ${kasa}`)
                await eco.set(os, message.guild, new Number(cbB), new Number(0))
                message.channel.send(e);
            }
        }
	}
}