const { MessageEmbed } = require("discord.js")
const moment = require("moment")

module.exports = {
    name: "channelinfo",
    description: "Informacje o kanale",
    aliases: ["ci", "kategoriainfo", "channel"],
    category: "Informacyjne",
    
    async run(message, args, client) {
        const kanal = message.mentions.channels.first() || client.channels.cache.get(args[0]) || message.channel
        let typ = "Brak";
        if (kanal.type == 'voice') typ = "Kanał głosowy"
        if (kanal.type == 'text') typ = "Kanał tekstowy"
        if (kanal.type ==' news') typ = "Kanał ogłoszeniowy"
        if (kanal.type == 'store') typ = "Sklep"
        let kategoria = "Brak"
        if (kanal.parent) kategoria = kanal.parent.name
        let slowmode = kanal.rateLimitPerUser 
        if (slowmode == 0 || !slowmode || slowmode == null) slowmode = "Brak"

        if (kanal.type == "category") {
            const e = new MessageEmbed()
            .setColor("#F0FF6E")
            .setAuthor("Informacje o kategorii", "https://cdn.discordapp.com/emojis/660407822881783851.png?v=1")
            .addFields(
                {
                    name: "Nazwa",
                    value: kanal.name
                },
                {
                    name: "ID",
                    value: kanal.id
                },
                {
                    name: "Data utworzenia",
                    value: moment(Date.parse(kanal.createdAt), "", "en").format("YYYY-MM-DD HH:MM:ss")
                },
            )
            .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            message.channel.send(e);
        } else {
            const e = new MessageEmbed()
            .setColor("#F0FF6E")
            .setAuthor("Informacje o kanale", "https://cdn.discordapp.com/emojis/660407822881783851.png?v=1")
            .addFields(
                {
                    name: "Nazwa",
                    value: kanal.name
                },
                {
                    name: "Wzmianka",
                    value: kanal
                },
                {
                    name: "ID",
                    value: kanal.id
                },
                {
                    name: "Typ kanału",
                    value: typ
                },
                {
                    name: "Tryb zwolniony",
                    value: slowmode
                },
                {
                    name: "Kategoria",
                    value: kategoria
                },
                {
                    name: "Data utworzenia",
                    value: moment(Date.parse(kanal.createdAt), "", "en").format("YYYY-MM-DD HH:MM:ss")
                },
            )
            .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            message.channel.send(e);
        }
    }
}