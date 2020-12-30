const { MessageEmbed } = require("discord.js")
const eco = require("discord-simple-economy")

module.exports = {
    name: "bal",
    description: "Pokazuje stan Twojego konta.",
    aliases: ["balance", "money", "pieniadze"],
	category: "Ekonomia",

    async run(message, args, client) {
        const uzytkownik = message.mentions.members.first() || message.guild.members.cache.get(`${args[0]}`) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === `${args[0]}`) || client.users.cache.get(`${args[0]}`) || message.author
        const e = new MessageEmbed()
		.setColor("#F0FF6E")
        .setAuthor("Stan konta", "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/64946/cash-clipart-md.png")
        .addFields(
            {
                name: "Kasa",
                value: `${eco.wallet(uzytkownik, message.guild) || "0"} zł`
            },
            {
                name: "W banku",
                value: `${eco.bank(uzytkownik, message.guild) || "0"} zł`
            },
            {
                name: "Łącznie",
                value: `${eco.total(uzytkownik, message.guild) || "0"} zł`
            }
        )
		.setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        message.channel.send(e);
	}
}