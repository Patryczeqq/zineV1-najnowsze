const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "clear",
    description: "Czyści wiadomości",
    category: "Moderacja",
    aliases: ["wyczysc"],
    usage: "<liczba wiadomości>",

    async run(message, args, client) {
        const wiadomosci = args[0]
        function checkN(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
        if (!wiadomosci) return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "clear <liczba wiadomości>")
        else if (!message.member.hasPermission("MANAGE_GUILD")) return client.functions.permissionError(message.channel, "Zarządzanie serwerem")
        else if (!checkN(wiadomosci) || wiadomosci === 0 || wiadomosci === "0") return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Podaj prawidłową liczbę wiadomości")
        else if (wiadomosci > 100) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Liczba wiadomości nie może przekroczyć 100")
        else try {
            await message.channel.bulkDelete(wiadomosci)
            const ec = new MessageEmbed()
            .setColor("#F0FF6E")
            .setAuthor("Sukces", "https://lh3.googleusercontent.com/6mPfUugVJcDvcc0OlXdrXRPpUY2ZI31AlgXX5_MB-sIcRWGTbpN3Xh89kLiJDg2pdg")
            .setDescription(`Pomyślnie usunięto ${wiadomosci} wiadomości.`)
            .setFooter(`Wiadomość zostanie usunięta za 5 sekund / Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            message.channel.send(ec).then(msg => msg.delete({ timeout: 10000 }))
        } catch (err) {
            client.functions.errorMsg(client, "CriticalError", message.channel, message.guild.id, err)
        }
    }
}