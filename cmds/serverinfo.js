const { MessageEmbed } = require("discord.js")
const moment = require("moment")

module.exports = {
    name: "serverinfo",
    description: "Informacje o serwerze",
    aliases: ["si", "guildinfo", "server"],
    category: "Informacyjne",
    
    async run(message, args, client) {
        const regiony = {
            "brazil": "Brazylia",
            "europe": "Europa",
            "eu-central": "Centralna Europa",
            "eu-east": "Wschodnia Europa",
            "eu-south": "Południowa Europa",
            "eu-west": "Północna Europa",
            "hongkong": "Hongkong",
            "india": "Indie",
            "japan": "Japonia",
            "russia": "Rosja",
            "singapore": "Singapur",
            "southafrica": "Południowa Afryka",
            "sydney": "Sydnej",
            "us-central": "Centralna Ameryka",
            "us-east": "Wschodnia Ameryka",
            "us-south": "Południowa Ameryka",
            "us-west": "Północna Ameryka"
        }
        const lvl = {
            "NONE": "Brak",
            "LOW": "Mała",
            "MEDIUM": "Średnia",
            "HIGH": "(╯°□°）╯︵ ┻━┻ (Duża)",
            "VERY_HIGH": "(ノಠ益ಠ)ノ彡┻━┻ (Bardzo duża)"
        }
        const e = new MessageEmbed()
        .setColor("#F0FF6E")
        .setAuthor("Informacje o serwerze", "https://pngimage.net/wp-content/uploads/2018/06/vps-png-2.png")
        .addFields(
            {
                name: "Nazwa",
                value: message.guild.name
            },
            {
                name: "ID",
                value: message.guild.id
            },
            {
                name: "Właściciel",
                value: message.guild.owner
            },
            {
                name: "Region",
                value: regiony[message.guild.region] || message.guild.region
            },
            {
                name: "Poziom weryfikacji",
                value: lvl[message.guild.verificationLevel] || message.guild.verificationLevel
            },
            {
                name: "Osoby",
                value: message.guild.members.cache.filter(mbr => !mbr.user.bot).size
            },
            {
                name: "Role",
                value: message.guild.roles.cache.size
            },
            {
                name: "Kanały",
                value: message.guild.channels.cache.size
            },
            {
                name: "Data dołączenia",
                value: moment(message.member.joinedAt).format("YYYY-MM-DD HH:mm:ss")
            },
            {
                name: "Data utworzenia",
                value: moment(message.guild.createdAt).format("YYYY-MM-DD HH:mm:ss")
            },
        )
        .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        message.channel.send(e);
    }
}