const { MessageEmbed } = require("discord.js")
const hb = require("hastebin-gen")

module.exports = {
    name: "haste",
    description: "Publikuje Twój tekst na hastebin.",
    category: "Przydatne",
    usage: "<tekst>",

    async run(message, args, client) {
        const tekst = args.join(" ")
        if (!tekst) return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "haste <tekst>")
        else try {
            hb(tekst).then(url => {
                const e = new MessageEmbed()
                .setColor("#75FF67")
                .setAuthor("Hastebin", "https://d2.alternativeto.net/dist/icons/hastebin_91073.png?width=64&height=64&mode=crop&upscale=false")
                .setDescription(`Opublikowano tekst. Aby go zobaczyć [kliknij tutaj](${url})`)
                .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                message.channel.send(e);
            })
        } catch (err) {
            client.functions.errorMsg(client, "CriticalError", message.channel, message.guild.id, err)
        }
	}
}