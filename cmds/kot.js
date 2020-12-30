const { MessageEmbed } = require("discord.js")
const axios = require("axios")

module.exports = {
    name: "kot",
    description: "Randomowe zdjęcie kota",
    aliases: ["cat"],
    category: "Zabawa",

    async run(message, args, client) {
        let getData = async () => {
            let odpowiedz = await axios.get("https://api.alexflipnote.dev/cats")
            let img = odpowiedz.data
            return img
        }
        let data = await getData()
        const e = new MessageEmbed()
		.setColor("#75FF67")
        .setAuthor("Losowe zdjęcie kota", "https://cdn.iconscout.com/icon/free/png-512/aparat-569197.png")
        .setImage(data.file)
		.setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        message.channel.send(e);
	}
}