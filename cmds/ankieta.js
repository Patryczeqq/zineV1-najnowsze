const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "ankieta",
    description: "Tworzy ankietę.",
    aliases: ["poll", "sondaż", "ankietę"],
    category: "Moderacja",
    usage: "<Pytanie %% Odpowiedź 1 %% Odpowiedź 2 %% ...>",

    async run(message, args, client) {
        const tresc = args.join(" ")
        args = tresc.split(/%%/g);
        const pytanie = args[0];
        const opcje = [...new Set(args.slice(1))];
        if (!message.member.hasPermission("MANAGE_GUILD")) return client.functions.permissionError(message.channel, "Zarządzanie serwerem")
        else if (!tresc) return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "ankieta <Pytanie %% Odpowiedź 1 %% Odpowiedź 2 ...>")
        else if (opcje.length < 2) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie możesz podać mniej niż 2 odpowiedzi")
        else if (opcje.length > 9) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie możesz podać więcej niż 10 odpowiedzi")
        else try {
            let emotki = [
                "1️⃣",
                "2️⃣",
                "3️⃣",
                "4️⃣",
                "5️⃣",
                "6️⃣",
                "7️⃣",
                "8️⃣",
                "9️⃣",
                "🔟"
            ]

            // Tymczasowe zmienne
            let str = ""
            let eNum = 0

            // Str
            for (const txt of opcje) {
                str = str + `${emotki[eNum]} - ${opcje[eNum]}` + "\n"
                eNum++
            }

            // Na kanał
            args = args.map(a => a.replace(/"/g, ''));
            const pollEmb = new MessageEmbed()
            .setColor("#F0FF6E")
            .setAuthor("Nowa ankieta", "https://cdn.iconscout.com/icon/free/png-512/voting-poll-4-542529.png")
            .setDescription(`:bar_chart: ${pytanie} \n\n ${str}`)
            .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            message.channel.send(pollEmb)
            .then(async (pollMsg) => {
                for (let eNum = 0; eNum < opcje.length; eNum++) {
                await pollMsg.react(emotki[eNum]);
                }
            })
        } catch (err) {
            client.functions.errorMsg(client, "CriticalError", message.channel, message.guild.id, err)
        }
	}
}