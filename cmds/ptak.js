const { MessageEmbed } = require("discord.js")
const axios = require("axios")

module.exports = {
    name: "ptak",
    description: "Randomowe zdjęcie ptaka",
    aliases: ["bird"],
    category: "Zabawa",

    async run(message, args, client) {
        let getData = async () => {
            let odpowiedz = await axios.get("https://some-random-api.ml/img/birb")
            let img = odpowiedz.data
            return img
        }
        let data = await getData()
        const e = new MessageEmbed()
		.setColor("#75FF67")
        .setAuthor("Losowe zdjęcie ptaka", "https://cdn.iconscout.com/icon/free/png-512/aparat-569197.png")
        .setImage(data.link)
		.setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        message.channel.send(e);
	}
}