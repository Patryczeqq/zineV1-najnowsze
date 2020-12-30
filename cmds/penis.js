const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "penis",
    description: "Pokazuje długość Twojego penisa",
    category: "Zabawa",

    async run(message, args, client) {
        const odp = [
            '8=>',
            '8==>',
            '8===>',
            '8====>',
            '8=====>',
            '8======>',
            '8=======>',
            '8========>',
            '8=========>',
            '8==========>'
        ]
        const l = Math.floor(Math.random() * odp.length) + 1
        const e = new MessageEmbed()
        .setColor("#75FF67")
        .setAuthor("Penis", "https://icons.iconarchive.com/icons/icons8/windows-8/512/Science-Length-icon.png")
        .setDescription("Długość Twojego penisa wynosi:\n" + odp[l])
        .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        message.channel.send(e)
	}
}