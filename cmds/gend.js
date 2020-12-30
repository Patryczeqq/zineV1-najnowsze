
module.exports = {
    name: "gend",
    description: "Usuwa i kończy giveaway",
    category: "Giveaway",
    usage: "<ID konkursowej wiadomości>",

    async run(message, args, client) {
        if (!message.member.hasPermission("MANAGE_GUILD")) return client.functions.permissionError(message.channel, "Zarządzanie serwerem")
        const msgID = args[0]
        if (!msgID) {
            client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "gend <ID konkursowej wiadomości>")
        } else try {
            function checkN(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
            if (!checkN(msgID)) client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Podaj prawidłowe ID wiadomości")
            else {
                client.giveaways.reroll(msgID, {
                    messages: {
                        congrat: ":tada: Gratulacje {winners}, wygrałeś / -liście **{prize}**!",
                        error: ":no_entry_sign: Nikt nie wziął udziału w konkursie lub zareagowała za mała ilość osób!"
                    }
                })
                .catch(err => client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Podaj prawidłowe ID wiadomości"))
                client.giveaways.delete(msgID).then(() => {
                    const e = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor("Usunięto konkurs", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Emoji_u1f389.svg/1024px-Emoji_u1f389.svg.png")
                    .setDescription("Pomyślnie usunięto konkurs i wybrano nowego zwycięzcę.")
                    .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e)
                })
            }
        } catch (err) { client.functions.errorMsg(client, "CriticalError", message.channel, message.guild.id, err) }
    }
}