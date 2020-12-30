const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "rip",
    description: "Wyświetla Twój avatar w grobie ( ͡° ͜ʖ ͡°)",
    aliases: ["grob", "grób"],
    category: "Zabawa",

    async run(message, args, client) {
        const uzytkownik = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]) || client.users.cache.get(args[0])
        const e = new MessageEmbed()
		.setColor("#75FF67")
        .setAuthor("Grób", "https://images.vexels.com/media/users/3/202724/isolated/preview/881cffab06a803b01e2215052df44315-rip-tombstone-cartoon-icon-by-vexels.png")
        .setImage(`https://api.no-api-key.com/api/v2/rip?user_image=${uzytkownik ? uzytkownik.displayAvatarURL({ dynamic: true, format: "png" }) : message.author.displayAvatarURL({ dynamic: true, format: "png" })}`)
		.setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        message.channel.send(e);
	}
}