const Discord = require("discord.js")
module.exports = async (client, warn) => {
    let emb = new Discord.MessageEmbed()
    .setAuthor("Warn", "https://www.freeiconspng.com/thumbs/error/red-circular-image-error-0.png")
    .setDescription(`Zdiagnozowano warn:` + "```js\n" + `${warn}` + "```")
    .setColor("YELLOW")
    client.channels.cache.get("774963567035416607").send(emb)
    client.channels.cache.get("774963567035416607").send("[ <@744935304271626258> ]")
}