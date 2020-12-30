const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const eco = require("discord-simple-economy")

module.exports = {
    name: "rob",
    description: "Obrabia kogoś",
    aliases: ["kradnij"],
    category: "Ekonomia",

    async run(message, args, client) {
        const os = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]) || client.users.cache.get(args[0])
        if (!os) {
            client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "rob <@użytkownik / ID>")
        } else if (eco.wallet(os, message.guild) < "20") {
            client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Ta osoba ma za mało pieniędzy, abyś mógł ją obrabować")
        } else if (os.id == message.author.id) {
            client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie możesz rabować samego siebie")
        } else {
            const liczba = Math.floor(Math.random() * 19) + 3
            const sukces = [1, 0, 0, 0, 0].sort(() => Math.random() - 0.5)[0]
            if (sukces) {
                const e = new MessageEmbed()
                .setColor("#F0FF6E")
                .setAuthor("Obrabowano", "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/64946/cash-clipart-md.png")
                .setDescription(`Pomyślnie obrabowałeś ${os} z ${liczba} złotych. Poszczęściło ci się.`)
                .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                const cbN = eval(`${eco.wallet(os, message.guild)} - ${liczba}`)
                const nuB = eval(`${eco.wallet(message.author, message.guild)} + ${liczba}`)
                await eco.set(os, message.guild, new Number(cbN), new Number(eco.bank(os, message.guild)))
                await eco.set(message.author, message.guild, new Number(nuB), new Number(eco.bank(message.author, message.guild)))
                message.channel.send(e)
            } else {
                err = new Discord.MessageEmbed()
                .setAuthor("Nie udało się", "https://www.freeiconspng.com/thumbs/error/red-circular-image-error-0.png")
                .setDescription(`Tym razem Ci się nie udało. Tracisz ${liczba} złotych, ale cóż. Takie życie.`)
                .setColor(0xFF3F3F)
                message.channel.send(err)
                const cbN = eval(`${eco.wallet(message.author, message.guild)} - ${liczba}`)
                await eco.set(message.author, message.guild, new Number(cbN), new Number(eco.bank(message.author, message.guild)))
            }
        }
	}
}