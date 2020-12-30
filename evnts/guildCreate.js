const { MessageEmbed } = require("discord.js")
const moment = require("moment")
module.exports = async (client, serv) => {
    try {
        const db = require("quick.db")
        await db.set(`config-${serv.id}-lang`, "en")
        const e = new MessageEmbed()
        .setAuthor("Thanks!", "https://pkms.co.uk/wp-content/uploads/2019/07/heart.png")
        .setColor("#FFC961")
        .setDescription(`Thanks for adding me to the server named ${serv.name}!\nMy default prefix is \`-\`, but you can change it with the command \`-config set prefix <new prefix>\`.\nList of commands: \`-help \`.\nTo see the current server configuration, use \`-config show\`.\nBelow is a **short tutorial**.\n\n**TO CHANGE THE BOT LANGUAGE (available languages: Polish, English [default]) USE THE COMMAND \`-config set lang <pl / en>\`.**`)
        .setImage("https://zinebot.pl/cdn/tut/tutorial.gif")
        serv.owner.send(e)

        const e2 = new MessageEmbed()
        .setAuthor("Nowy serwer", "https://lh3.googleusercontent.com/6mPfUugVJcDvcc0OlXdrXRPpUY2ZI31AlgXX5_MB-sIcRWGTbpN3Xh89kLiJDg2pdg")
        .setColor("#FFC961")
        .addFields(
            {
                name: "Nazwa serwera",
                value: serv.name
            },
            {
                name: "ID serwera",
                value: serv.id
            },
            {
                name: "Region serwera",
                value: serv.region
            },
            {
                name: "Liczba użytkowników",
                value: serv.members.cache.filter(mbr => !mbr.user.bot).size
            },
            {
                name: "Data utworzenia",
                value: moment(serv.createdAt).format("YYYY-MM-DD HH:mm:ss")
            },
        )
        client.channels.cache.get("775640078760280064").send(e2)
    } catch { return }
}