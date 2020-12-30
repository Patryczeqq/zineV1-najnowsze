
module.exports = {
    name: "greroll",
    description: "Rerroluje, czyli wybiera nowego zwycięzcę giveaway.",
    aliases: ["rerolluj"],
    category: "Giveaway",
    usage: "<ID konkursowej wiadomości>",

    async run(message, args, client) {
        if (!message.member.hasPermission("MANAGE_GUILD")) return client.functions.permissionError(message.channel, "Zarządzanie serwerem")
        const msgID = args[0]
        if (!msgID) {
            client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "greroll <ID konkursowej wiadomości>")
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
                message.channel.send("Wybrano nowego zwycięzcę!")
                .catch(err => client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Podaj prawidłowe ID wiadomości") )
            }
        } catch (err) { client.functions.errorMsg(client, "CriticalError", message.channel, message.guild.id, err) }
    }
}