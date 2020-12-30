const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
    name: "supreme",
    descriptionpl: "Własne logo Supreme",
    descriptionen: "Your own Supreme logo",
    aliases: ["spr"],
    category: "Zabawa",
    usagepl: "<tekst> [--l / --d]",
    usageen: "<text> [--l / --d]",

    async run(message, args, client) {
        const tekst = args.join("+")
        if (!tekst) {
            client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, client.langManager.handleLanguage(message, "supreme <text> [--l]", "supreme <tekst> [--l]"))
        } else if (message.content.includes("--l")) {
            const att = new Discord.MessageAttachment(`https://api.alexflipnote.dev/supreme?text=${tekst_n.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace("ł", "l")}&light=true`, "image.png")
            const tekst_n = tekst.replace("--l", "")
            const e = new MessageEmbed()
            .setColor("#75FF67")
            .setAuthor(client.langManager.handleLanguage(message, "Your light Supreme logo", "Twoje jasne logo Supreme"), "https://cdn.iconscout.com/icon/free/png-512/aparat-569197.png")
            .attachFiles(att)
            .setImage("attachment://image.png")
            .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
            message.channel.send(e);
        } else if (message.content.includes("--d")) {
            const att2 = new Discord.MessageAttachment(`https://api.alexflipnote.dev/supreme?text=${tekst_n.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace("ł", "l")}&dark=true`, "image.png")
            const tekst_n = tekst.replace("--d", "")
            const e = new MessageEmbed()
            .setColor("#75FF67")
            .setAuthor(client.langManager.handleLanguage(message, "Your dark Supreme logo", "Twoje ciemne logo Supreme"), "https://cdn.iconscout.com/icon/free/png-512/aparat-569197.png")
            .attachFiles(att2)
            .setImage("attachment://image.png")
            .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
            message.channel.send(e);
        } else {
            const att3 = new Discord.MessageAttachment(`https://api.alexflipnote.dev/supreme?text=${tekst_n}&light=false`, "image.png")
            const e = new MessageEmbed()
            .setColor("#75FF67")
            .setAuthor(client.langManager.handleLanguage(message, "Your Supreme logo", "Twoje logo Supreme"), "https://cdn.iconscout.com/icon/free/png-512/aparat-569197.png")
            .attachFiles(att3)
            .setImage("attachment://image.png")
            .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
            message.channel.send(e);
        }
	}
}