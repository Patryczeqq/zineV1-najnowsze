const Discord = require("discord.js")
const os = require("os")
const { wersjaBota } = require("../conf/vars.js")

module.exports = {
    name: "botinfo",
    description: "Informacje o bocie",
    aliases: ["boti", "b-i", "bot", "bi"],
    category: "Informacyjne",

    async run(message, args, client) {
        const core = os.cpus()[0]

        /* 
            UPTIME 
        */

        let sekL = (client.uptime / 1000)
        let dni = Math.floor(sekL / 86400)
        sekL %= 86400
        let godziny = Math.floor(sekL / 3600)
        sekL %= 3600
        let minuty = Math.floor(sekL / 60)
        let sekundy = Math.floor(sekL % 60)

		let embed = new Discord.MessageEmbed()
		.setAuthor("Informacje o bocie", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Infobox_info_icon.svg/1200px-Infobox_info_icon.svg.png")
		.setColor("#58ABFF")
        .addFields(
            {
                name: "Mój tag",
                value: `${client.user.tag}`
            },
            {
                name: "Ping",
                value: `${client.ws.ping}`
            },
            {
                name: "Użytkownicy",
                value: client.users.cache.size
            },
            {
                name: "Liczba komend",
                value: `${client.commands.size}`
            },
            {
                name: "Serwery (łącznie)",
                value: `${await client.shard.fetchClientValues(`guilds.cache.size`).then(res => res.reduce((acc, guildCount) => acc + guildCount, 0))}`
            },
            {
                name: "Serwery (względem shardów) [Shard 1 | Shard 2 | Shard 3]",
                value: `${await client.shard.fetchClientValues(`guilds.cache.size`)}`.replace(/,/g, " | ")
            },
            {
                name: "Wersja node.js",
                value: `${process.version}`
            },
            {
                name: "Wersja bota",
                value: `${wersjaBota}`
            },
            {
                name: "Wersja discord.js",
                value: `${Discord.version}`
            },
            {
                name: "Uptime",
                value: `${dni} dni, ${godziny} godzin, ${minuty} minut, ${sekundy} sekund`
            },
            {
                name: "Rdzenie procesora",
                value: `${os.cpus().length}`
            },
            {
                name: "Model procesora",
                value: `${core.model}`
            },
            {
                name: "Szybkość procesora",
                value: `${core.speed}MHz`
            },
            {
                name: "Użycie pamięci",
                value: `${(((process.memoryUsage().heapUsed)/1024)/1024).toFixed(0)} MB / 2048 MB`
            }
        )
        .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        message.channel.send(embed);
	}
}