const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "amijoke",
    description: "Am I a joke to you?",
    aliases: ["zart", "joke"],
	category: "Zabawa",

    async run(message, args, client) {
        const uzytkownik = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]) || client.users.cache.get(args[0])
        try {
            const e = new MessageEmbed()
            .setColor("#75FF67")
            .setAuthor("Am I a joke to you?", "https://images.vexels.com/media/users/3/134615/isolated/preview/36d955206f05f36a3d4c053c2fea3937-joke-emoji-emoticon-by-vexels.png")
            .setImage(`https://api.alexflipnote.dev/amiajoke?image=${uzytkownik ? uzytkownik.user.displayAvatarURL({ dynamic: true, format: "png" }) : message.author.displayAvatarURL({ dynamic: true, format: "png" })}`)
            .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            message.channel.send(e);
        } catch {
            err = new Discord.MessageEmbed()
            .setAuthor("Error", "https://www.freeiconspng.com/thumbs/error/red-circular-image-error-0.png")
            .setDescription(`Nie znaleziono takiego użytkownika w pamięci bota. Poproś developera, by go dodał.`)
            .setColor(0xFF3F3F)
            message.channel.send(err)
        }
	}
}