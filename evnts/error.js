const Discord = require("discord.js")
module.exports = async (client, error) => {
    let emb = new Discord.MessageEmbed()
    .setAuthor("Błąd", "https://www.freeiconspng.com/thumbs/error/red-circular-image-error-0.png")
    .setDescription(`Wystąpił błąd:` + "```js\n" + `${error.stack || error}` + "```")
    .setColor(0xFF3F3F)
    client.channels.cache.get("774963567035416607").send(emb)
    client.channels.cache.get("774963567035416607").send("[ <@744935304271626258> ]")
}