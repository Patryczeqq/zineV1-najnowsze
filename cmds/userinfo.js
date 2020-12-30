const { MessageEmbed } = require("discord.js")
const moment = require("moment")

module.exports = {
    name: "userinfo",
    descriptionpl: "Informacje o konkretnym użytkowniku",
    descriptionen: "Informations about user",
    aliases: ["ui"],
    category: "Informacyjne",
    usagepl: "[ID użytkownika / pełna nazwa użytkownika]",
    usageen: "[User ID / full user name]",
    
    async run(message, args, client) {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]) || client.users.cache.get(args[0]) || message.author
        member = message.guild.member(member)
        const flags = {
            DISCORD_EMPLOYEE: '<:dev:766927241631236116>',
            DISCORD_PARTNER: '<:partner:766927327731908639>',
            BUGHUNTER_LEVEL_1: '<:bughunter:766927328244531200>',
            BUGHUNTER_LEVEL_2: '<:bughunter_lvl2:766927327711723522>',
            HYPESQUAD_EVENTS: '<:hypesquadevents:766927327467929601>',
            HOUSE_BRAVERY: '<:bravery:766927327472123945>',
            HOUSE_BRILLIANCE: '<:brilliance:766927327597821963>',
            HOUSE_BALANCE: '<:balance:766927327707136010>',
            EARLY_SUPPORTER: '<:earlysupporter:766927327845548043>',
            VERIFIED_BOT: '<:verifiedbot:766927241710927892>',
            VERIFIED_DEVELOPER: '<:verifiedbotdeveloper:766927327472123927>'
        }
        const flags_u = member.flags || member.user.flags
        const e = new MessageEmbed()
        .setColor("#F0FF6E")
        .setAuthor(client.langManager.handleLanguage(message, "User info", "Informacje o użytkowniku"), "https://emoji.gg/assets/emoji/1618_users_logo.png")
        .addFields(
            {
                name: client.langManager.handleLanguage(message, "Name and discrim", "Nazwa i tag"),
                value: `${member.user.username}#${member.user.discriminator}`
            },
            {
                name: client.langManager.handleLanguage(message, "User ID", "ID użytkownika"),
                value: `${member.id}`
            },
            {
                name: client.langManager.handleLanguage(message, "Flags", "Odznaki"),
                value: `${flags_u ? flags_u.toArray().map(f => flags[f]).join(', ') : client.langManager.handleLanguage(message, "None", "Brak")}`
            },
            {
                name: client.langManager.handleLanguage(message, "Avatar link", "Link do avataru"),
                value: `[png / gif](${member.user.displayAvatarURL({ dynamic: true, format: "png" })}) | ` +
                `[jpg](${member.user.displayAvatarURL({ dynamic: true, format: "jpg" })}) | ` +
                `[webp](${member.user.displayAvatarURL({ dynamic: true, format: "webp" })})`
            },
            {
                name: "Status",
                value: `${member.user.presence.status}`
                    .replace("online", "Online")
                    .replace("idle", client.langManager.handleLanguage(message, "Idle", "Zaraz wracam"))
                    .replace("dnd", client.langManager.handleLanguage(message, "Do not Disturb", "Nie przeszkadzać"))
                    .replace("offline", client.langManager.handleLanguage(message, "Niedostępny", "Offline"))
            },
            {
                name: client.langManager.handleLanguage(message, "Activity", "Aktywność"),
                value: `${member.user.presence.game || client.langManager.handleLanguage(message, "None", "Brak")}`
            },
            {
                name: client.langManager.handleLanguage(message, "Discord account creation date", "Data założenia konta na Discordzie"),
                value: `${moment.utc(member.user.createdAt).format("YYYY-MM-DD HH:mm:ss")}`
            },
            {
                name: client.langManager.handleLanguage(message, "Date of joining the server", "Data dołączenia do serwera"),
                value: `${moment(member.joinedAt).format('YYYY-MM-DD HH:mm:ss')}`
            },
            {
                name: client.langManager.handleLanguage(message, "Hoist role", "Najwyższa ranga"),
                value: `${member.roles.hoist || 'Brak'}`
            },
            {
                name: client.langManager.handleLanguage(message, "Role list", "Lista ról"),
                value: `${member.roles.cache
                    .sort((a, b) => b.position - a.position)
                    .map(role => role.toString())
                    .slice(0, -1).join(", ") || "Brak ról"}`
            }
        )
        .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
        message.channel.send(e)
    }
}