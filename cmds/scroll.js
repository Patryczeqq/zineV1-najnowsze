const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "scroll",
    description: "Scroll meme.",
    category: "Zabawa",

    async run(message, args, client) {
        const tekst = args.join("+")
        if (!tekst) {
            client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "scroll <tekst>")
        } else if (tekst.length > 13) {
            client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Twój tekst nie może zawierać więcej niż 13 liter")
        } else try {
            const e = new MessageEmbed()
            .setColor("#75FF67")
            .setAuthor("Scroll", "https://img.pngio.com/microsoft-learning-personal-photo-png-200_200.png")
            .setImage(`https://api.alexflipnote.dev/scroll?text=${tekst}`)
            .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            message.channel.send(e);
        } catch (err) { client.functions.errorMsg(client, "CriticalError", message.channel, message.guild.id, err) }
	}
}