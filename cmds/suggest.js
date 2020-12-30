const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "suggest",
    descriptionpl: "Wstawia propozycję na kanał",
    descriptionen: "Puts suggestion on the channel",
    aliases: ["sug", "propozycja", "zaproponuj"],
    category: "Przydatne",
    usagepl: "<treść propozycji>",
    usageen: "<suggestion content>",
    
    async run(message, args, client) {
        const tresc = args.join(" ")
        const prefix = await client.config.get(`guild-${message.guild.id}-prefix`) || "-"
        const kanalPropozycji = await client.config.get(`config-${message.guild.id}-suggestionsChannel`)
        if (!kanalPropozycji) {
            client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, `Suggestion channel not set in server configuration. To do this, use: \`${prefix}config set suggestionsChannel <#channel>\` (This can only be done by someone with \`Manage guild\` permission)`, `Nie ustawiono kanału propozycji w konfiguracji serwera. Aby to zrobić użyj: \`${prefix}skonfiguruj set suggestionsChannel <#kanał>\` (Może tego dokonać tylko osoba z uprawnieniem \`Zarządzanie serwerem\`)`))
        } else if (!tresc) {
            client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, client.langManager.handleLanguage(message, "suggest <suggestion content>", "suggest <treść propozycji>"))
        } else try {
            // Na kanał serwerowy
            try {
                const sugChn = kanalPropozycji.replace("<#", "").replace(">", "")
                const ek = new MessageEmbed()
                .setColor("#75FF67")
                .setAuthor(client.langManager.handleLanguage(message, "New suggestion", "Nowa propozycja"), "https://img2.pngio.com/download-free-png-poll-png-6-png-image-dlpngcom-poll-png-800_800.jpg")
                .setDescription(tresc)
                .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                message.guild.channels.cache.get(sugChn).send(ek).then(function (doReakcji) {
                    doReakcji.react("👍🏻")
                    doReakcji.react("👎🏻")
                })
            } catch { client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, "I don't have permissions to send messages on suggestion channel", "Nie mam uprawnień do wysyłania wiadomości na kanale propozycji")) }

            // Na kanał komendy

            const e = new MessageEmbed()
            .setColor("#75FF67")
            .setAuthor(client.langManager.handleLanguage(message, "Success", "Sukces"), "https://lh3.googleusercontent.com/6mPfUugVJcDvcc0OlXdrXRPpUY2ZI31AlgXX5_MB-sIcRWGTbpN3Xh89kLiJDg2pdg")
            .setDescription(client.langManager.handleLanguage(message, "A proposal was successfully sent to the server proposal channel.", "Pomyślnie wysłano propozycję na serwerowy kanał propozycji."))
            .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
            message.channel.send(e)
        } catch (e) {
            client.functions.errorMsg(client, "CriticalError", message.channel, message.guild.id, e)
        }
	}
}