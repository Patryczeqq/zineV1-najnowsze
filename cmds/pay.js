const { MessageEmbed } = require("discord.js")
const eco = require("discord-simple-economy")

module.exports = {
    name: "pay",
    description: "Przelewa pieniądze konkretnemu użytkownikowi.",
    aliases: ["przelej", "dajmenelowi", "dajtenhajs"],
    category: "Ekonomia",
    usage: "<@użytkownik / ID> <kwota>",

    async run(message, args, client) {
        const kasa = args[1]
        const os = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]) || client.users.cache.get(args[0])
        if (!os || !kasa) {
            client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "pay <@użytkownik / ID> <kwota>")
        } else {
            function checkN(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
            if (!checkN(kasa) || kasa === 0) {
                client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Podaj prawidłową sumę pieniędzy")
            } else if (kasa > eco.wallet(message.author, message.guild)) {
                client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie masz tyle pieniędzy w kieszeni")
            } else if (os.id === message.author.id) {
                client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie możesz przelać pieniędzy samemu sobie")
            } else {
                const hajs_ma = eval(`${eco.wallet(message.author, message.guild)} - ${kasa}`)
                const hajs_os = eval(`${eco.wallet(os, message.guild)} + ${kasa}`)
                const e = new MessageEmbed()
                .setColor("#F0FF6E")
                .setAuthor("Przelano pieniądze", "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/64946/cash-clipart-md.png")
                .setDescription(`Pomyślnie przelano ${kasa} złotych na stan konta użytkownika ${os}.`)
                .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                await eco.set(message.author, message.guild, new Number(hajs_ma), new Number(eco.bank(message.author, message.guild)))
                await eco.set(os, message.guild, new Number(hajs_os), new Number(eco.bank(os, message.guild)))
                message.channel.send(e);
            }
        }
	}
}