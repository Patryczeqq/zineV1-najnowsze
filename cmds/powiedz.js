module.exports = {
    name: "powiedz",
    description: "Wysyła wiadomość jako bot",
    aliases: ["pw", "say"],
    category: "Przydatne",
    usage: "<tekst>",

    async run(message, args, client) {
        const tresc = args.join(" ")
        if (!tresc) return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "powiedz <tekst>")
        else return message.channel.send(tresc)
	}
}