const { arg } = require("mathjs")
const ms = require("ms")

module.exports = {
    name: "giveawayedit",
    description: "Edytuje giveaway.",
    aliases: ["gedit"],
    category: "Giveaway",
    usage: "<opcja> <ID konkursowej wiadomości> <nowa treść>",

    async run(message, args, client) {
        try {
            if (!message.member.hasPermission("MANAGE_GUILD")) return client.functions.permissionError(message.channel, "Zarządzanie serwerem")
            const opcja = args[0]
            const msgID = args[1]
            const value = args.slice(1).join(" ")
            if (!opcja || !msgID || !value) {
                client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "giveawayedit <opcja> <ID konkursowej wiadomości> <nowa treść>\nDostępne opcje:\n\`winners\`, \`prize\`")
            } else if (opcja === "winners") {
                function checkN(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
                if (!checkN(value) || value === 0 || value === "0") client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Podaj prawidłową liczbę zwycięzców")
                else if (value > 99) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie możesz podać liczby zwycięzców większej niż 99")
                else {
                    client.giveaways.edit(msgID, {
                        newWinnerCount: value
                    })
                    const e = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor("Edytowano konkurs", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Emoji_u1f389.svg/1024px-Emoji_u1f389.svg.png")
                    .setDescription("Pomyślnie zmieniono liczbę zwycięzców.")
                    .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e);
                }
            } else if (opcja === "prize") {
                if (value.length > 120) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Opis konkursu jest za długi")
                else {
                    client.giveaways.edit(msgID, {
                        newPrize: value
                    })
                    const e = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor("Edytowano konkurs", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Emoji_u1f389.svg/1024px-Emoji_u1f389.svg.png")
                    .setDescription("Pomyślnie zmieniono opis konkursu.")
                    .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e);
                }
            }
        } catch { client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Podaj prawidłowe ID wiadomości") }
    } 
}