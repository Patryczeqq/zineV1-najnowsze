const { MessageEmbed } = require("discord.js")
const cnv = require("canvacord")
const Discord = require("discord.js")

module.exports = {
    name: "yt",
    descriptionpl: "Tworzy fake komentarz YouTube.",
    descriptionen: "Creates fake YouTube comment",
    category: "Zabawa",
    aliases: ["youtube", "yt-comment", "youtube-comment"],
    usagepl: "<tekst>",
    usageen: "<text>",
    cooldown: 30000,
    
    async run(message, args, client) {
        const tekst = args.join(" ")
        if (!tekst) {
            client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, client.langManager.handleLanguage(message, "yt <text>", "yt <tekst>"))
        } else if (tekst.length > 30) {
            client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, "Content of the comment cannot contain more than 30 letters", "Treść komentarza nie może zawierać więcej niż 30 liter."))
        } else try {
            const img = await cnv.Canvas.youtube(ops = {username: message.author.username, avatar: message.author.displayAvatarURL({ dynamic: false, format: "png" }), content: tekst.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace("ł", "l") })
            const att = new Discord.MessageAttachment(img, "img.png")
            const e = new MessageEmbed()
            .setColor("#75FF67")
            .setAuthor(client.langManager.handleLanguage(message, "YouTube comment", "Komentarz YouTube"), "https://cdn.iconscout.com/icon/free/png-512/aparat-569197.png")
            .attachFiles(att)
            .setImage("attachment://img.png")
            .setFooter(client.embedFooter, message.author.displayAvatarURL({ dynamic: true }))
            message.channel.send(e);
        } catch (err) {
            client.functions.errorMsg(client, "CriticalError", message.channel, message.guild.id, err)
        }
	}
}