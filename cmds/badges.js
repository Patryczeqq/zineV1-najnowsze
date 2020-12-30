const Discord = require("discord.js")
const config = require("../config.json")

module.exports = {
    name: "badges",
    description: "Wyświetla listę odznak",
    aliases: ["badge", "odznaki", "odzn", "odz"],
    category: "Informacyjne",
    usage: "<show / add / remove> [użytkownik]",

    async run(message, args, client) {
        const prefix = await client.config.get(`guild-${message.guild.id}-prefix`) || "-"
        const akcja = args[0]
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(1).join(" ") || x.user.username === args[1]) || client.users.cache.get(args[1]) || message.author
        const badge = args[2]
        if (!akcja) return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "badges <show / add / remove / fetch> [@użytkownik / ID]")
        else if (!user) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, `Nie znaleziono takiego użytkownika w bazie danych\nAby go dodać użyj \`${prefix}badges fetch <@użytkownik / ID>\`.`)
        else if (akcja === "add") {
            if (config.devs.blocked.includes(message.author.id) || !config.devs.allowed.includes(message.author.id)) return client.functions.permissionError(message.channel, "perms.global.developer")
            else if (!user || !badge) return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "badges add <@użytkownik / ID> <odznaka>")
            else if (badge === "developer") {
                await client.badges.set(`badges-${user.id}-developer`, true)
                const e = new Discord.MessageEmbed()
                .setAuthor("Odznaki", "https://www.freeiconspng.com/thumbs/badge-icon-png/badge-icon-png-22.png")
                .setDescription(`Pomyślnie dodano odznakę ${badge.replace("developer", "**Developer**")} użytkownikowi ${user}.`)
                .setColor(0xFF3F3F)
                message.channel.send(e)
            } else if (badge === "staff") {
                await client.badges.set(`badges-${user.id}-staff`, true)
                const e = new Discord.MessageEmbed()
                .setAuthor("Odznaki", "https://www.freeiconspng.com/thumbs/badge-icon-png/badge-icon-png-22.png")
                .setDescription(`Pomyślnie dodano odznakę ${badge.replace("staff", "**Support**")} użytkownikowi ${user}.`)
                .setColor(0xFF3F3F)
                message.channel.send(e)
            } else if (badge === "bughunter") {
                await client.badges.set(`badges-${user.id}-bughunter`, true)
                const e = new Discord.MessageEmbed()
                .setAuthor("Odznaki", "https://www.freeiconspng.com/thumbs/badge-icon-png/badge-icon-png-22.png")
                .setDescription(`Pomyślnie dodano odznakę ${badge.replace("bughunter", "**Łapacz błędów**")} użytkownikowi ${user}.`)
                .setColor(0xFF3F3F)
                message.channel.send(e)
            } else if (badge === "zasluzony") {
                await client.badges.set(`badges-${user.id}-zasluzony`, true)
                const e = new Discord.MessageEmbed()
                .setAuthor("Odznaki", "https://www.freeiconspng.com/thumbs/badge-icon-png/badge-icon-png-22.png")
                .setDescription(`Pomyślnie dodano odznakę ${badge.replace("zasluzony", "**Zasłużony**")} użytkownikowi ${user}.`)
                .setColor(0xFF3F3F)
                message.channel.send(e)
            } else if (badge === "partner") {
                await client.badges.set(`badges-${user.id}-partner`, true)
                err = new Discord.MessageEmbed()
                .setAuthor("Odznaki", "https://www.freeiconspng.com/thumbs/badge-icon-png/badge-icon-png-22.png")
                .setDescription(`Pomyślnie dodano odznakę ${badge.replace("partner", "**Partner**")} użytkownikowi ${user}.`)
                .setColor(0xFF3F3F)
                message.channel.send(err)
            } else if (badge === "wspierajacy") {
                await client.badges.set(`badges-${user.id}-wspierajacy`, true)
                const e = new Discord.MessageEmbed()
                .setAuthor("Odznaki", "https://www.freeiconspng.com/thumbs/badge-icon-png/badge-icon-png-22.png")
                .setDescription(`Pomyślnie dodano odznakę ${badge.replace("supporter", "**Wspierający**")} użytkownikowi ${user}.`)
                .setColor(0xFF3F3F)
                message.channel.send(e)
            } else if (badge === "earlyacc") {
                await client.badges.set(`badges-${user.id}-earlyacc`, true)
                const e = new Discord.MessageEmbed()
                .setAuthor("Odznaki", "https://www.freeiconspng.com/thumbs/badge-icon-png/badge-icon-png-22.png")
                .setDescription(`Pomyślnie dodano odznakę ${badge.replace("earlyacc", "**Wczesny dostęp**")} użytkownikowi ${user}.`)
                .setColor(0xFF3F3F)
                message.channel.send(e)
            } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie znaleziono takiej odznaki\nLista dostępnych odznak: \`developer\`, \`staff\`, \`bughunter\`, \`zasluzony\`, \`partner\`, \`wspierajacy\`, \`earlyacc\`")
        } else if (akcja === "remove") {
            if (config.devs.blocked.includes(message.author.id) || !config.devs.allowed.includes(message.author.id)) return client.functions.permissionError(message.channel, "perms.global.developer")
            else if (!user || !badge) return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "badges remove <@użytkownik / ID> <odznaka>")
            else if (badge === "developer") {
                await client.badges.set(`badges-${user.id}-developer`, false)
                const e = new Discord.MessageEmbed()
                .setAuthor("Odznaki", "https://www.freeiconspng.com/thumbs/badge-icon-png/badge-icon-png-22.png")
                .setDescription(`Pomyślnie usunięto odznakę ${badge.replace("developer", "**Developer**")} użytkownikowi ${user}.`)
                .setColor(0xFF3F3F)
                message.channel.send(e)
            } else if (badge === "staff") {
                await client.badges.set(`badges-${user.id}-staff`, false)
                const e = new Discord.MessageEmbed()
                .setAuthor("Odznaki", "https://www.freeiconspng.com/thumbs/badge-icon-png/badge-icon-png-22.png")
                .setDescription(`Pomyślnie usunięto odznakę ${badge.replace("staff", "**Support**")} użytkownikowi ${user}.`)
                .setColor(0xFF3F3F)
                message.channel.send(e)
            } else if (badge === "bughunter") {
                await client.badges.set(`badges-${user.id}-bughunter`, false)
                const e = new Discord.MessageEmbed()
                .setAuthor("Odznaki", "https://www.freeiconspng.com/thumbs/badge-icon-png/badge-icon-png-22.png")
                .setDescription(`Pomyślnie usunięto odznakę ${badge.replace("bughunter", "**Łapacz błędów**")} użytkownikowi ${user}.`)
                .setColor(0xFF3F3F)
                message.channel.send(e)
            } else if (badge === "zasluzony") {
                await client.badges.set(`badges-${user.id}-zasluzony`, false)
                const e = new Discord.MessageEmbed()
                .setAuthor("Odznaki", "https://www.freeiconspng.com/thumbs/badge-icon-png/badge-icon-png-22.png")
                .setDescription(`Pomyślnie usunięto odznakę ${badge.replace("zasluzony", "**Zasłużony**")} użytkownikowi ${user}.`)
                .setColor(0xFF3F3F)
                message.channel.send(e)
            } else if (badge === "partner") {
                await client.badges.set(`badges-${user.id}-partner`, false)
                const e = new Discord.MessageEmbed()
                .setAuthor("Odznaki", "https://www.freeiconspng.com/thumbs/badge-icon-png/badge-icon-png-22.png")
                .setDescription(`Pomyślnie usunięto odznakę ${badge.replace("partner", "**Partner**")} użytkownikowi ${user}.`)
                .setColor(0xFF3F3F)
                message.channel.send(e)
            } else if (badge === "wspierajacy") {
                await client.badges.set(`badges-${user.id}-wspierajacy`, false)
                const e = new Discord.MessageEmbed()
                .setAuthor("Odznaki", "https://www.freeiconspng.com/thumbs/badge-icon-png/badge-icon-png-22.png")
                .setDescription(`Pomyślnie usunięto odznakę ${badge.replace("wspierajacy", "**Wspierający**")} użytkownikowi ${user}.`)
                .setColor(0xFF3F3F)
                message.channel.send(e)
            } else if (badge === "earlyacc") {
                await client.badges.set(`badges-${user.id}-earlyacc`, false)
                const e = new Discord.MessageEmbed()
                .setAuthor("Odznaki", "https://www.freeiconspng.com/thumbs/badge-icon-png/badge-icon-png-22.png")
                .setDescription(`Pomyślnie usunięto odznakę ${badge.replace("earlyacc", "**Wczesny dostęp**")} użytkownikowi ${user}.`)
                .setColor(0xFF3F3F)
                message.channel.send(e)
            } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie znaleziono takiej odznaki\nLista dostępnych odznak: \`developer\`, \`staff\`, \`bughunter\`, \`zasluzony\`, \`partner\`, \`wspierajacy\`, \`earlyacc\`")
        } else if (akcja === "show") {
            const dev = await client.badges.get(`badges-${user.id}-developer`)
            const staff = await client.badges.get(`badges-${user.id}-staff`)
            const bughunter = await client.badges.get(`badges-${user.id}-bughunter`)
            const zasluzony = await client.badges.get(`badges-${user.id}-zasluzony`)
            const partner = await client.badges.get(`badges-${user.id}-partner`)
            const wspierajacy = await client.badges.get(`badges-${user.id}-wspierajacy`)
            const earlyacc = await client.badges.get(`badges-${user.id}-earlyacc`)

            const e = new Discord.MessageEmbed()
            .setAuthor("Odznaki", "https://www.freeiconspng.com/thumbs/badge-icon-png/badge-icon-png-22.png")
            .setDescription(`Lista odznak użytkownika ${user} (\`${user.id}\`)`)
            .addField("<:dev:766927241631236116> Developer bota", `${dev}`.replace(true, "**Tak**").replace(false, "**Nie**").replace(null, "**Nie**"))
            .addField("<:zweryfikowany:766927244563447848> Staff", `${staff}`.replace(true, "**Tak**").replace(false, "**Nie**").replace(null, "**Nie**"))
            .addField("<:bughunter_lvl2:766927327711723522> Łapacz błędów", `${bughunter}`.replace(true, "**Tak**").replace(false, "**Nie**").replace(null, "**Nie**"))
            .addField("<:hypesquadevents:766927327467929601> Zasłużony", `${zasluzony}`.replace(true, "**Tak**").replace(false, "**Nie**").replace(null, "**Nie**"))
            .addField("<:partner:766927327731908639> Partner", `${partner}`.replace(true, "**Tak**").replace(false, "**Nie**").replace(null, "**Nie**"))
            .addField("<:earlysupporter:766927327845548043> Wspierający", `${wspierajacy}`.replace(true, "**Tak**").replace(false, "**Nie**").replace(null, "**Nie**"))
            .addField(":test_tube: Wczesny dostęp", `${earlyacc}`.replace(true, "**Tak**").replace(false, "**Nie**").replace(null, "**Nie**"))
            .setColor(0xFF3F3F)
            message.channel.send(e)
        }
    }
}