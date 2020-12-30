const { MessageEmbed } = require("discord.js")
const eco = require("discord-simple-economy")

module.exports = {
    name: "with",
    descriptionpl: "Wykonuje wypłatę Twoich pieniędzy z banku.",
    descriptionen: "Performs a withdrawal of your money from the bank.",
    aliases: ["withdraw"],
    category: "Ekonomia",
    usagepl: "<ilość pieniędzy>",
    usageen: "<money amount>",

    async run(message, args, client) {
        function checkN(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
        const kasa = args[0]
        if (!kasa) return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, client.langManager.handleLanguage(message, "with <money amount>", "with <ilość pieniędzy>"))
        else if (kasa === 0 || kasa === "0") return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, "Please enter correct amount of money", "Podaj prawidłową sumę pieniędzy"))
        else if (kasa > eco.bank(message.author, message.guild)) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, "You don't have that much money in bank", "Nie posiadasz tyle pieniędzy w banku"))
        else if (message.content.includes("--all")) {
            if (kasa === "--all") {
                const e = new MessageEmbed()
                .setColor("#F0FF6E")
                .setAuthor(client.langManager.handleLanguage(message, "Withdraw complete", "Wypłacono środki"), "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/64946/cash-clipart-md.png")
                .setDescription(client.langManager.handleLanguage(message, "You have successfully withdrawn the entire amount you had in the bank to your pocket.", "Pomyślnie wypłacono całą kwotę, którą posiadałeś w banku do Twojej kieszeni."))
                .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                await eco.set(message.author, message.guild, new Number(eval(`${eco.wallet(message.author, message.guild)} + ${eco.bank(message.author, message.guild)}`)), new Number(0))
                message.channel.send(e);
            } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, "Please enter correct amount of money", "Podaj prawidłową sumę pieniędzy"))
        } else if (!checkN(kasa) || kasa === 0) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, "Please enter correct amount of money", "Podaj prawidłową sumę pieniędzy"))
        else {
            const e = new MessageEmbed()
            .setColor("#F0FF6E")
            .setAuthor(client.langManager.handleLanguage(message, "Withdraw complete", "Wypłacono środki"), "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/64946/cash-clipart-md.png")
            .setDescription(client.langManager.handleLanguage(message, `Successfully withdrawned ${kasa} zlotys from the bank account.`, `Pomyślnie wypłacono ${kasa} złotych z konta w banku.`))
            .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
            await eco.set(message.author, message.guild, new Number(eval(`${eco.wallet(message.author, message.guild)} + ${kasa}`)), new Number(eval(`${eco.bank(message.author, message.guild)} - ${kasa}`)))
            message.channel.send(e);
        }
	}
}