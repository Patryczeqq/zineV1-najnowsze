const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "reverse",
    description: "Odwraca tekst.",
    category: "Śmieszne",
    usage: "<tekst>",
    category: "Zabawa",

    async run(message, args, client) {
        const tekst = args.join(" ")
        if (!tekst) {
            client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "reverse <tekst>")
        } else if (tekst.length > 50) {
            client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Twój tekst nie może zawierać więcej niż 50 liter")
        } else try {
            const e = new MessageEmbed()
            .setColor("#75FF67")
            .setAuthor("Odwrócony tekst", "https://cdn2.iconfinder.com/data/icons/responsive-user-interface-1/18/2-512.png")
            .addFields(
                {
                    name: "Normalny tekst",
                    value: "```" + tekst + "```"
                },
                {
                    name: "Odwrócony tekst",
                    value: "```" + tekst.split("").reverse().join("") + "```"
                }
            )
            .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            message.channel.send(e);
        } catch (err) { client.functions.errorMsg(client, "CriticalError", message.channel, message.guild.id, err) }
	}
}