const { MessageEmbed } = require("discord.js")
const config = require("../config.json")
const chp = require("child_process")

module.exports = {
    name: "shell",
    description: "Wykonuje kod w konsoli bota",
    aliases: ["console"],
    category: "Developerskie",
    usage: "<polecenie>",
    
    async run(message, args, client) {
        const polecenie = args.join(" ")
        if (config.devs.blocked.includes(message.author.id) || !config.devs.allowed.includes(message.author.id)) {
            client.functions.permissionError(message.channel, "perms.global.developer")
        } else if (!polecenie) {
            client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "shell <polecenie>")
        } else {
            await chp.exec(polecenie, (err, res, c) => {
                if (err) {
                    const e = new MessageEmbed()
                    .setColor(0xFF3F3F)
                    .setAuthor("Błąd w trakcie wykonywania polecenia", "https://icon-library.com/images/terminal-icon-png/terminal-icon-png-6.jpg")
                    .addFields(
                        {
                            name: "Polecenie",
                            value: "```js\n" + polecenie + "```"
                        },
                        {
                            name: "Error",
                            value: "```js\n" + err + "```"
                        }
                    )
                    .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e);
                } else {
                    const e = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor("Wykonano polecenie w konsoli", "https://icon-library.com/images/terminal-icon-png/terminal-icon-png-6.jpg")
                    .addFields(
                        {
                            name: "Polecenie",
                            value: "```js\n" + polecenie + "```"
                        },
                        {
                            name: "Zwrot",
                            value: "```js\n" + res + "```"
                        }
                    )
                    .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    try { message.channel.send(e) } catch (err) {
                        const e = new MessageEmbed()
                        .setColor(0xFF3F3F)
                        .setAuthor("Błąd w trakcie wykonywania polecenia", "https://icon-library.com/images/terminal-icon-png/terminal-icon-png-6.jpg")
                        .addFields(
                            {
                                name: "Polecenie",
                                value: "```js\n" + polecenie + "```"
                            },
                            {
                                name: "Error",
                                value: "```js\n" + err + "```"
                            }
                        )
                        .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                        message.channel.send(e);
                    }
                }
            })
        }
	}
}