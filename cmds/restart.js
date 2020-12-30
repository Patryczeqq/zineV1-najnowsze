const { MessageEmbed } = require("discord.js")
const config = require("../config.json")

module.exports = {
    name: "restart",
    description: "Randomowe zdjęcie ptaka",
    aliases: ["reload", "rl", "rst", "rs"],
    category: "Developerskie",
    usage: "<% / komenda>",

    async run(message, args, client) {
        const akcja = args[0]
        if (config.devs.blocked.includes(message.author.id) || !config.devs.allowed.includes(message.author.id)) {
            client.functions.permissionError(message.channel, "perms.global.developer")
        } else if (!akcja) {
            client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "restart <% / nazwa komendy>")
        } else if (akcja === "%") {
            message.reply("Bot w trakcie restartowania...")
            require("child_process").exec("pm2 restart 0", async (err, res, odp) => {
                return message.reply("Bot w trakcie restartowania..." + res)
            })
        } else try {
            delete require.cache[require.resolve(`./${akcja}.js`)]
            const e = new MessageEmbed()
            .setColor("#75FF67")
            .setAuthor("Przeładowano", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Crystal_128_reload.svg/768px-Crystal_128_reload.svg.png")
            .setDescription(`Pomyślnie przeładowano ${args[0].replace("%", "bota")}.`)
            .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            message.channel.send(e);
        } catch (err) {
            client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, `Nie znaleziono komendy ${akcja}`)
        }
    }
}