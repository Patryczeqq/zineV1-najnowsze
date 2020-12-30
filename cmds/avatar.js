const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "avatar",
    description: "Komenda wyświetlająca Twój avatar.",
    aliases: ["avek", "av"],
	category: "Zabawa",

    async run(message, args, client) {
        const uzytkownik = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]) || client.users.cache.get(args[0])
        try {
            const e = new MessageEmbed()
            .setColor("#75FF67")
            .setAuthor("Avatar", "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png")
            .setDescription(`Linki do pobrania: [png](${uzytkownik ? uzytkownik.user.displayAvatarURL({ dynamic: true, format: "png" }) : message.author.displayAvatarURL({ dynamic: true, format: "png" })}) | [jpg](${uzytkownik ? uzytkownik.user.displayAvatarURL({ dynamic: true, format: "jpg" }) : message.author.displayAvatarURL({ dynamic: true, format: "jpg" })}) | [webp](${uzytkownik ? uzytkownik.user.displayAvatarURL({ dynamic: true }) : message.author.displayAvatarURL({ dynamic: true })})`)
            .setImage(`${uzytkownik ? uzytkownik.user.displayAvatarURL({ dynamic: true, format: "png" }) : message.author.displayAvatarURL({ dynamic: true, format: "png" })}`)
            .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            message.channel.send(e);
        } catch {
            client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, `Nie znaleziono takiego użytkownika w pamięci bota\nPoproś developera, by go dodał`)
        }
	}
}