const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
    name: "trump",
    descriptionpl: "Tweet jako Trump",
    descriptionen: "Tweet as Donald Trump",
    category: "Zabawa",
    aliases: ["tweet"],
    usagepl: "<treść tweeta>",
    usageen: "<tweet content>",
    
    async run(message, args, client) {
        const kom = args.join("+")
        if (!kom) {
            client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, client.langManager.handleLanguage(message, "trump <tweet content>", "trump <treść tweeta>"))
        } else {
            const att = new Discord.MessageAttachment(`https://api.no-api-key.com/api/v2/trump?message=${kom.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace("ł", "l")}`, "image.png")
            const e = new MessageEmbed()
            .setColor("#75FF67")
            .setAuthor(client.langManager.handleLanguage(message, "Tweet as Donald Trump", "Tweet jako Donald Trump"), "https://lh3.googleusercontent.com/proxy/P5oeWidBSZPzRKrAtDthv7WSQFyRphXubPj8Sdea9RakRUBOQ9iikv_L6aVOCigpiJ0P7Gj3kWkX0jMIn76nENGaUm3jIxc38aXAIw4i_OwXV6ke")
            .attachFiles(att)
            .setImage("attachment://image.png")
            .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
            message.channel.send(e);
        }
	}
}