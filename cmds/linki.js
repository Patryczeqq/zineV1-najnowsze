const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "linki",
    description: "Po prostu linki. Co tu więcej mówić.",
    aliases: ["invite", "dodaj", "dodajbota"],
    category: "Informacyjne",

    async run(message, args, client) {
        let e = new MessageEmbed()
        .setAuthor("Linki", "https://images.vexels.com/media/users/3/136294/isolated/preview/4172fc9833fe18b5f8669b148713a189-link-icon-by-vexels.png")
        .addFields(
            {
                name: "Serwer support",
                value: "[kliknij tutaj](https://zinebot.pl/support)"
            },
            {
                name: "Dodaj bota",
                value: "[kliknij tutaj](https://zinebot.pl/dodaj)"
            },
            {
                name: "Strona WWW",
                value: "[kliknij tutaj](https://zinebot.pl/)"
            },
            {
                name: "BotLista.pl",
                value: "[kliknij tutaj](https://botlista.pl/bots/745181618242846762/)"
            },
            {
                name: "Top.GG",
                value: "[wkrótce](https://top.gg)"
            }
        )
        .setColor("#58ABFF")
        .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        message.channel.send(e);
    }
}