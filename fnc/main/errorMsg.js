const Discord = require("discord.js")
module.exports = async (client, type, channel, guild_id, message_err) => {
    if (!client || !type || !channel || !guild_id || !message_err) throw new TypeError("Podaj argumenty w następującej kolejności: CLIENT, TYPE, CHANNEL, GUILD_ID, MESSAGE_ERR")
    if (type === "ArgsError") {
        let err = new Discord.MessageEmbed()
        .setAuthor("Error", "https://www.freeiconspng.com/thumbs/error/red-circular-image-error-0.png")
        .setDescription(`${client.langManager.handleLanguage(guild_id, "You didn't provide enough arguments.\nCorrect usage:", "Podałeś za mało argumentów.\nPrawidłowe użycie komendy:")}` + "`" + `${await client.config.get(`guild-${guild_id}-prefix`) || "-"}${message_err}` + "`")
        .setColor(0xFF3F3F)
        return channel.send(err)
    } else if (type === "WarnMsg") {
        let err = new Discord.MessageEmbed()
        .setAuthor("Error", "https://www.freeiconspng.com/thumbs/error/red-circular-image-error-0.png")
        .setDescription(message_err)
        .setColor(0xFF3F3F)
        return channel.send(err)
    } else if (type === "CriticalError") {
        let e = new Discord.MessageEmbed()
        .setAuthor("Error", "https://www.freeiconspng.com/thumbs/error/red-circular-image-error-0.png")
        .setDescription(client.langManager.handleLanguage(guild_id, "Oh... It looks like there was a big error when trying to execute the command. It has already been reported to the bot developers. It will be repaired soon.\nIf you want to get help faster, join our [support server](https://zinebot.pl/support).", "Ojjjjj... Wygląda na to, że podczas próby wywołania komendy wystąpił duży błąd. Został on już zgłoszony do developerów bota. Zostanie on naprawiony w najbliższym czasie.\nJeżeli jednak chcesz się szybciej skontaktować dołącz na nasz [serwer pomocy](https://zinebot.pl/support)."))
        .setColor(0xFF3F3F)
        channel.send(e)
        client.emit("error", message_err)
    } else throw new TypeError("Podałeś nieprawidłowy argument TYPE.")
}