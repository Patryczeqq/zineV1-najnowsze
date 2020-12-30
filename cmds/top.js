const { MessageEmbed } = require("discord.js")
const eco = require("discord-simple-economy")

module.exports = {
    name: "top",
    descriptionpl: "Leaderboard pieniędzy.",
    descriptionen: "Money leaderboard",
    aliases: ["lb", "leaderboard"],
    category: "Ekonomia",
    
    async run(message, args, client) {
        eco.lb(message.guild, 1).then((v) => {
            let lb = JSON.parse(v)
            const str1 = new MessageEmbed()
            .setColor("#F0FF6E")
            .setAuthor(client.langManager.handleLanguage(message, "Leaderboard", "Topka"), "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/64946/cash-clipart-md.png")
            .setDescription(
                `<@${lb.data['1'].id}> - ${lb.data['1'].amount || "B/D"} zł\n`.replace("<@not found>", "B/D").replace("B/D - B/D zł", "")+
                `<@${lb.data['2'].id}> - ${lb.data['2'].amount || "B/D"} zł\n`.replace("<@not found>", "B/D").replace("B/D - B/D zł", "")+
                `<@${lb.data['3'].id}> - ${lb.data['3'].amount || "B/D"} zł\n`.replace("<@not found>", "B/D").replace("B/D - B/D zł", "")+
                `<@${lb.data['4'].id}> - ${lb.data['4'].amount || "B/D"} zł\n`.replace("<@not found>", "B/D").replace("B/D - B/D zł", "")+
                `<@${lb.data['5'].id}> - ${lb.data['5'].amount || "B/D"} zł\n`.replace("<@not found>", "B/D").replace("B/D - B/D zł", "")+
                `<@${lb.data['6'].id}> - ${lb.data['6'].amount || "B/D"} zł\n`.replace("<@not found>", "B/D").replace("B/D - B/D zł", "")+
                `<@${lb.data['7'].id}> - ${lb.data['7'].amount || "B/D"} zł\n`.replace("<@not found>", "B/D").replace("B/D - B/D zł", "")+
                `<@${lb.data['8'].id}> - ${lb.data['8'].amount || "B/D"} zł\n`.replace("<@not found>", "B/D").replace("B/D - B/D zł", "")+
                `<@${lb.data['9'].id}> - ${lb.data['9'].amount || "B/D"} zł\n`.replace("<@not found>", "B/D").replace("B/D - B/D zł", "")+
                `<@${lb.data['10'].id}> - ${lb.data['10'].amount || "B/D"} zł\n`.replace("<@not found>", "B/D").replace("B/D - B/D zł", "")
            )
            .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
            if (str1.description.length === 10) str1.setDescription(client.langManager.handleLanguage(message, "None", "Brak"))
            message.channel.send(str1)
        })
	}
}