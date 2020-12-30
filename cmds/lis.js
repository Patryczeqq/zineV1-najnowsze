const { MessageEmbed } = require("discord.js")
const axios = require("axios")

module.exports = {
    name: "lis",
    description: "Randomowe zdjęcie lisa",
    aliases: ["fox"],
    category: "Zabawa",

    async run(message, args, client) {
        let getData = async () => {
            let odpowiedz = await axios.get("https://some-random-api.ml/img/fox")
            let img = odpowiedz.data
            return img
        }
        let data = await getData()
        const e = new MessageEmbed()
		.setColor("#75FF67")
        .setAuthor("Losowe zdjęcie lisa", "https://cdn.iconscout.com/icon/free/png-512/aparat-569197.png")
        .setImage(data.link)
		.setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        message.channel.send(e);
	}
}