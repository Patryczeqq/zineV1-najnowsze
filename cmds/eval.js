const { MessageEmbed } = require("discord.js")
const config = require("../config.json")

module.exports = {
    name: "eval",
    description: "Wykonuje podane polecenie",
    aliases: ["e"],
    category: "Developerskie",
    usage: "<polecenie>",

    async run(message, args, client) {
        const input = args.join(" ")
        if (config.devs.blocked.includes(message.author.id) || config.devs.blocked.includes(message.author.id) || !config.devs.allowed.includes(message.author.id)) return client.functions.permissionError(message.channel, "perms.global.developer")
        else try {
            if (!input) return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "eval <polecenie>")
            else {
                if (message.content.includes('client.token') || message.content.includes('client["token"]') || message.content.includes('client[\'token\']') || message.content.includes('client[`token`]') || message.content.includes('client. token') || message.content.includes('client. token') || message.content.includes('client . token') || message.content.includes('client[`token`]')) throw new TypeError("Cannot read property 'token' of undefined")
                let start = process.hrtime()
                let czas = process.hrtime(start)
                let evaled = await eval(input)
                evaled = require("util").inspect(evaled, { depth: 0 })
                if (evaled.length > 1024) {
                    console.log(evaled)
                    const e = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor("Wykonano polecenie", "https://icon-library.com/images/terminal-icon-png/terminal-icon-png-6.jpg")
                    .addFields(
                        {
                            name: "Komenda",
                            value: "```js\n" + input + "```"
                        },
                        {
                            name: "Zwrot",
                            value: "```" + `Zwrot przekroczył limit znaków. Został on umieszczony w konsoli.` + "```"
                        },
                        {
                            name: "Typ zwrotu",
                            value: "```js\n" + typeof evaled + "```"
                        },
                        {
                            name: "Czas wykonania",
                            value: "```js\n" + `${czas[0] > 0 ? `${czas[0].toFixed(2)} sekund` : ""}${czas[1] / 1e6.toFixed(2)} milisekund` + "```"
                        }
                    )
                    .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e)
                } else {
                    const e = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor("Wykonano polecenie", "https://icon-library.com/images/terminal-icon-png/terminal-icon-png-6.jpg")
                    .addFields(
                        {
                            name: "Komenda",
                            value: "```js\n" + input + "```"
                        },
                        {
                            name: "Zwrot",
                            value: "```js\n" + evaled + "```"
                        },
                        {
                            name: "Typ zwrotu",
                            value: "```js\n" + typeof evaled + "```"
                        },
                        {
                            name: "Czas wykonania",
                            value: "```js\n" + `${czas[0] > 0 ? `${czas[0]} sekund` : ""}${czas[1] / 1e6} milisekund` + "```"
                        }
                    )
                    .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e)
                }
            }
        } catch (err) {
            const e = new MessageEmbed()
            .setColor("#FF3F3F")
            .setAuthor("Błąd przy wykonywaniu polecenia", "https://icon-library.com/images/terminal-icon-png/terminal-icon-png-6.jpg")
            .setDescription(`Treść błędu:` + "```js\n" + err + "```")
            .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            message.channel.send(e);
        }
    }
}