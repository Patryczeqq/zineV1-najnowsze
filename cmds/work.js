const { MessageEmbed } = require("discord.js")
const eco = require("discord-simple-economy")

module.exports = {
    name: "work",
    descriptionpl: "Zarabia na Twoje utrzymanie. Niestety.",
    descriptionen: "It earns your living. Unfortunately.",
    aliases: ["pracuj"],
    category: "Ekonomia",
    cooldown: 1800,
    
    async run(message, args, client) {
        const hajs = Math.floor(Math.random() * 19) + 3
        const odp = [
            client.langManager.handleLanguage(message, "You write the website code. You earn", "Napisałeś kod strony internetowej. Zarabiasz "),
            client.langManager.handleLanguage(message, "You helped an elderly neighbor with groceries. You got from her ", "Pomogłeś starszej sąsiadce przy noszeniu zakupów. Dostałeś od niej "),
            client.langManager.handleLanguage(message, "You are done writing the frontend of the page. The boss paid you ", "Skończyłeś pisać frontend strony. Szef wypłacił ci "),
            client.langManager.handleLanguage(message, "You have prepared the website code. After analysis, the co-owner paid you ", "Przygotowałeś kod strony WWW. Po analizie współwłaściciel wypłacił ci ")
        ]
        const e = new MessageEmbed()
		.setColor("#F0FF6E")
        .setAuthor(client.langManager.handleLanguage(message, "Working", "Zarabianie"), "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/64946/cash-clipart-md.png")
        .setDescription(odp[Math.floor(Math.random() * odp.length)] + hajs + client.langManager.handleLanguage(message, " zlotys.", " złotych."))
		.setFooter(client.embedFooter, message.author.displayAvatarURL({ dynamic: true }))
        const res = eval(`${eco.wallet(message.author, message.guild.id)} + ${hajs}`)
        await eco.set(message.author, message.guild, new Number(res), new Number(eco.bank(message.author, message.guild.id)))
        message.channel.send(e);
	}
}