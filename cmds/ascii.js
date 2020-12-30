const { MessageEmbed } = require("discord.js")
const figlet = require("figlet")
const hb = require("hastebin-gen")

module.exports = {
    name: "ascii",
    description: "Konwertuje tekst na ascii.",
    category: "Zabawa",
    aliases: ["asc"],
    usage: "<tekst>",

    async run(message, args, client) {
        const tekst = args.join(" ")
        if (!tekst) return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "ascii <tekst>")
        else {
            figlet.text(tekst, function(err, d) {
                if (tekst.length > 13) {
                    hb(d).then(url => {
                        const e = new MessageEmbed()
                        .setColor("#75FF67")
                        .setAuthor("Tekst Ascii", "https://image.winudf.com/v2/image/Y29tLnZtcy5hc2NpaV9pY29uXzE1MDY3MTQ4MzlfMDI4/icon.png?w=170&fakeurl=1")
                        .setDescription(`Ten tekst znajdziesz [tutaj](${url})`)
                        .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                        message.channel.send(e)
                    })
                } else {
                    const e = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor("Tekst Ascii", "https://image.winudf.com/v2/image/Y29tLnZtcy5hc2NpaV9pY29uXzE1MDY3MTQ4MzlfMDI4/icon.png?w=170&fakeurl=1")
                    .setDescription("```" + d + "```")
                    .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e)
                }
            })
        }
	}
}