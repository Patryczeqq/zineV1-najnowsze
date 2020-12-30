const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "google",
    description: "Wyszukiwanie w Google.",
    category: "Przydatne",
    usage: "<zapytanie>",

    async run(message, args, client) {
        const str = args.join("+")
        if (!str) return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "google <zapytanie>")
        else {
            const e = new MessageEmbed()
            .setColor("#75FF67")
            .setAuthor("Wyszukiwanie Google", "https://admonkey.pl/wp-content/uploads/2016/12/google-logo-png.png")
            .addFields(
                {
                    name: "Zapytanie",
                    value: str
                },
                {
                    name: "Wyniki wyszukiwania",
                    value: `[Kliknij](https://google.pl/search?q=${str})`
                }
            )
            .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            message.channel.send(e);
        }
    }
}