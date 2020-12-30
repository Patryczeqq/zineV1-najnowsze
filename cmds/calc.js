const { MessageEmbed } = require("discord.js")
const math = require("mathjs")

module.exports = {
    name: "calc",
    description: "Obliczanie wyrażeń matematycznych.",
    aliases: ["kalkulator", "oblicz", "licz", "liczenie"],
    category: "Przydatne",
    usage: "<działanie>",

    async run(message, args, client) {
        const dzialanie = args.join(" ")
        if (!dzialanie) return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "calc <działanie>")
        else {
            try {
                let wynik = math.evaluate(dzialanie)
                const e = new MessageEmbed()
                .setColor("#75FF67")
                .setAuthor("Działanie matematyczne", "https://cdn.iconscout.com/icon/free/png-512/calculator-717-461704.png")
                .addField("Działanie", dzialanie)
                .addField("Wynik", wynik)
                .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                message.channel.send(e);
            } catch (err) {
                client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Podaj prawidłowe działanie")
            }
        }
	}
}