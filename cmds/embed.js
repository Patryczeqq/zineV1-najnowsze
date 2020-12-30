const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "embed",
    description: "Tworzy wiadomość embed.",
    aliases: ["emb"],
    category: "Przydatne",

    async run(message, args, client) {
        const ust = args.join(' ').split('%%')
        if (!message.member.hasPermission("MANAGE_GUILD")) return client.functions.permissionError(message.channel, "Zarządzanie serwerem")
        else if (!ust[0] || !ust[1] || !ust[2]) return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "embed <kolor HEX> %% <tytuł> %% <opis> %% [footer] %% [thumbnail] %% [image]")
        else {
            var reg = /[0-9A-Fa-f]{6}/g;
            var strona = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
            if (!reg.test(ust[0])) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Podaj prawidłowy kolor HEX")
            else if (ust[4] && !strona.test(ust[4])) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Podaj prawidłowy URL thumbnail")
            else if (ust[5] && !strona.test(ust[5])) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Podaj prawidłowy URL zdjęcia")
            const e = new MessageEmbed()
            .setColor(ust[0])
            .setTitle(ust[1])
            .setDescription(ust[2])
            if (ust[3]) e.setFooter(ust[3])
            if (ust[4]) e.setThumbnail(ust[4])
            if (ust[5]) e.setImage(ust[5])
            if (message.content.includes("--del")) message.delete()
            message.channel.send(e)
        }
    }
}