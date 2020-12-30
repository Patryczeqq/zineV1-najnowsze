const Discord = require("discord.js")
module.exports = async (channel, req_perms) => {
    let err = new Discord.MessageEmbed()
    .setAuthor("Error", "https://www.freeiconspng.com/thumbs/error/red-circular-image-error-0.png")
    .setDescription(client.langManager.handleLanguage(message, `You don't have required permissions to use this command\nRequired permissions:\n\`${req_perms}\``, `Nie posiadasz wymaganych uprawnień do użycia tej komendy.\nWymagane uprawnienia:\n\`${req_perms}\``))
    .setColor(0xFF3F3F)
    return channel.send(err)
}