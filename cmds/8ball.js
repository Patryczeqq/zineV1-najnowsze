const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "8ball",
    description: "Losowa odpowiedź na podane przez ciebie pytanie",
    aliases: ["8b", "osiemball"],
    category: "Zabawa",
    usage: "<pytanie>",
    
    async run(message, args, client) {
        const pytanie = args.join(" ")
        if (!pytanie) {
            client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "8ball <pytanie>")
        } else {
            const odpowiedzi = [
                'Tak.',
                'Nie.',
                'Nie wiem.',
                'Na pewno.',
                'Oczywiście, że tak.',
                'Nie mam pewności, ale nie.',
                'Hmm...',
                'Co to za pytanie?',
                'Serio? To nie wiem.',
                'Jest duża szansa.',
                'Powtórz, nie rozumiem.',
                'Chyba tak.',
                'Chyba nie.',
                'Myślę, że tak.',
                'Myślę, że nie.',
                'Zastanawiam się.'
            ]
            const e = new MessageEmbed()
            .setColor("#75FF67")
            .setAuthor("8ball", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/8-Ball_Pool.svg/1200px-8-Ball_Pool.svg.png")
            .addField("Pytanie", pytanie, false)
            .addField("Odpowiedź", odpowiedzi[Math.floor(Math.random()*odpowiedzi.length)], false)
            .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            message.channel.send(e);
        }
    }
}