const { MessageEmbed } = require("discord.js")
const OwnerID = "744935304271626258"

module.exports = {
    name: "aktualizacja",
    description: "Zamieszcza aktualizację na serwerze bota",
    aliases: ["update", "upd"],
    category: "Developerskie",
    usage: "<treść>",

    async run(message, args, client) {
        const tresc = args.join(" ")
        if (message.author.id !== OwnerID) return client.functions.permissionError(message.channel, "Właściciel bota")
        else if (!tresc) return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "aktualizacja <treść>")
        else {
                if (tresc.includes("--early")) {
                    const tresc_nowa = tresc.replace("--early", "")
                    const e = new MessageEmbed()
                    .setColor("#F0FF6E")
                    .setAuthor("Nowa wersja beta", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Flat_restart_icon.svg/512px-Flat_restart_icon.svg.png")
                    .setDescription(tresc_nowa)
                    .setFooter(`Aktualizację zamieścił ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    client.channels.cache.get("766920421811290132").send(e)

                    // Na kanał

                    const ec = new MessageEmbed()
                    .setColor("#F0FF6E")
                    .setAuthor("Sukces", "https://lh3.googleusercontent.com/6mPfUugVJcDvcc0OlXdrXRPpUY2ZI31AlgXX5_MB-sIcRWGTbpN3Xh89kLiJDg2pdg")
                    .setDescription(`Pomyślnie wysłano nową wersję beta na serwer bota.`)
                    .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(ec)
                } else if (tresc.includes("--mark")) {
                    const tresc_nowa = tresc.replace("--mark", "")
                    // Na zmiany
                    
                    const e = new MessageEmbed()
                    .setColor("#F0FF6E")
                    .setAuthor("Nowa aktualizacja", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Flat_restart_icon.svg/512px-Flat_restart_icon.svg.png")
                    .setDescription("```diff\n" + tresc_nowa + "```")
                    .setFooter(`Aktualizację zamieścił ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)

                    // Na kanał

                    const ec = new MessageEmbed()
                    .setColor("#F0FF6E")
                    .setAuthor("Sukces", "https://lh3.googleusercontent.com/6mPfUugVJcDvcc0OlXdrXRPpUY2ZI31AlgXX5_MB-sIcRWGTbpN3Xh89kLiJDg2pdg")
                    .setDescription(`Pomyślnie wysłano aktualizację z Markdownem na serwer bota.`)
                    .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    
                    client.channels.cache.get("766922498796683294").send(e)
                    message.channel.send(ec)
                } else {
                    // Na zmiany
                    
                    const e = new MessageEmbed()
                    .setColor("#F0FF6E")
                    .setAuthor("Nowa aktualizacja", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Flat_restart_icon.svg/512px-Flat_restart_icon.svg.png")
                    .setDescription(tresc)
                    .setFooter(`Aktualizację zamieścił ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)

                    // Na kanał

                    const ec = new MessageEmbed()
                    .setColor("#F0FF6E")
                    .setAuthor("Sukces", "https://lh3.googleusercontent.com/6mPfUugVJcDvcc0OlXdrXRPpUY2ZI31AlgXX5_MB-sIcRWGTbpN3Xh89kLiJDg2pdg")
                    .setDescription(`Pomyślnie wysłano aktualizację na serwer bota.`)
                    .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    
                    client.channels.cache.get("766922498796683294").send(e)
                    message.channel.send(ec)
            }
        }
    }
}