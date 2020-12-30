const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "captcha",
    description: "Tworzy fake captcha.",
    category: "Zabawa",
    aliases: ["cpt", "cptcha", "cpt"],
    usage: "<tekst>",

    async run(message, args, client) {
        const tekst = args.join("+")
        if (!tekst) client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "captcha <tekst>")
        else if (tekst.length > 40) client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Długość tekstu nie może przekroczyć 40 znaków")
        else {
            const e = new MessageEmbed()
            .setColor("#75FF67")
            .setAuthor("Recaptcha", "https://cdn.iconscout.com/icon/free/png-512/aparat-569197.png")
            .setImage(`https://api.no-api-key.com/api/v2/recaptcha?text=${tekst.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace("ł", "l")}`)
            .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            message.channel.send(e);
        }
	}
}