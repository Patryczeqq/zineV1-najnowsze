const { MessageEmbed } = require("discord.js")
const eco = require("discord-simple-economy")

module.exports = {
    name: "dep",
    description: "Wykonuje przelew Twoich pieniędzy do banku.",
    aliases: ["deposit"],
    category: "Ekonomia",
    usage: "<ilość pieniędzy>",

    async run(message, args, client) {
        function checkN(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
        const kasa = args[0]
        if (!kasa) return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "dep <ilość pieniędzy>")
        else if (kasa > eco.wallet(message.author, message.guild)) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie posiadasz tyle pieniędzy w kieszeni")
        else if (kasa === 0 || kasa === "0") return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Podaj prawidłową sumę pieniędzy")
        else if (message.content.includes("--all")) {
            if (kasa === "--all") {
                if (eco.wallet(message.author, message.guild) === 0) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie masz pieniędzy w kieszeni")
                const e = new MessageEmbed()
                .setColor("#F0FF6E")
                .setAuthor("Przelano środki", "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/64946/cash-clipart-md.png")
                .setDescription(`Pomyślnie przelano całą kwotę, którą posiadałeś w kieszeni do banku.`)
                .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                await eco.dep(message.author, message.guild, new Number(eco.wallet(message.author, message.guild)))
                message.channel.send(e);
            } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Podaj prawidłową sumę pieniędzy")
        } else if (!checkN(kasa) || kasa === 0 || kasa === "0") return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Podaj prawidłową sumę pieniędzy")
        else {
            const e = new MessageEmbed()
            .setColor("#F0FF6E")
            .setAuthor("Przelano środki", "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/64946/cash-clipart-md.png")
            .setDescription(`Pomyślnie przelano ${kasa} złotych na konto w banku.`)
            .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            await eco.dep(message.author, message.guild, new Number(kasa))
            message.channel.send(e);
        }
	}
}