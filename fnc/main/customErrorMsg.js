const Discord = require("discord.js")
module.exports = async (channel, err, usage) => {
    let errorEmb = new Discord.MessageEmbed()
    .setAuthor("Error", "https://www.freeiconspng.com/thumbs/error/red-circular-image-error-0.png")
    .setDescription(`${err} ${client.langManager.handleLanguage(message, "Correct usage:", "Prawidłowe użycie komendy:")} \`${usage}\``)
    .setColor(0xFF3F3F)
    return channel.send(errorEmb)
}