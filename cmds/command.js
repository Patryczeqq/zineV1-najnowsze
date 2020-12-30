const { MessageEmbed } = require("discord.js")
const config = require("../config.json")

module.exports = {
    name: "command",
    description: "Edytuje komendę",
    aliases: ["cmdh", "cmdedit"],
    usage: "<enable / disable> <guild / channel / global> <komenda / --all> [powód]",
    category: "Moderacja",

    async run(message, args, client) {
        const akcja = args[0]
        const opcja = args[1]
        const cmd =
            client.commands.get(args[2]) ||
            client.commands.find(
            (cmd) => cmd.aliases && cmd.aliases.includes(args[2]),
        )
        const reasonArg = [...args].slice(3).join(" ") || "Nie podano"
        if (!akcja) {
            return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "command <enable / disable> <guild / channel / global> <komenda / --all> [powód]")
        } else if (opcja === "global") {
            const stat = await client.cmdSettings.get(`cmd-all-isDisabled`) || "disabled"
            const stat_cmd = await client.cmdSettings.get(`cmd-${cmd.name}-isDisabled`) || "disabled"
            if (config.devs.blocked.includes(message.author.id) || !config.devs.allowed.includes(message.author.id)) return client.functions.permissionError(message.channel, "perms.global.developer")
            if (akcja === "enable") {
                try {
                    if (args[2] === "--all") {
                        if (stat === true) {
                            await client.cmdSettings.set(`cmd-all-isDisabled`, false)
                            await client.cmdSettings.set(`cmd-all-reason`, reasonArg)
                            const e = new MessageEmbed()
                            .setColor("#F0FF6E")
                            .setAuthor("CmdHandler", "https://thumbs.dreamstime.com/b/enable-disable-icon-button-symbol-vector-illustration-187548358.jpg")
                            .setDescription(`Pomyślnie włączono wszystkie komendy **GLOBALNIE**.`)
                            .addField("Powód", reasonArg)
                            .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                            message.channel.send(e);
                        } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Wszystkie komendy globalnie są już włączone")
                    } else {
                        if (!cmd) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie znaleziono takiej komendy")
                        if (cmd.category === "Developerskie") return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie możesz zarządzać tą komendą")
                        if (stat_cmd === true) {
                            await client.cmdSettings.set(`cmd-${cmd.name}-isDisabled`, false)
                            await client.cmdSettings.set(`cmd-${cmd.name}-reason`, reasonArg)
                            const e = new MessageEmbed()
                            .setColor("#F0FF6E")
                            .setAuthor("CmdHandler", "https://thumbs.dreamstime.com/b/enable-disable-icon-button-symbol-vector-illustration-187548358.jpg")
                            .setDescription(`Pomyślnie włączono komendę ${cmd.name}.`)
                            .addField("Powód", reasonArg)
                            .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                            message.channel.send(e);
                        } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Ta komenda jest już wyłączona")
                    }
                } catch { return }
            } else if (akcja === "disable") {
                try {
                    if (args[2] === "--all") {
                        if (stat !== true) {
                            await client.cmdSettings.set(`cmd-all-isDisabled`, true)
                            await client.cmdSettings.set(`cmd-all-reason`, reasonArg)
                            const e = new MessageEmbed()
                            .setColor("#F0FF6E")
                            .setAuthor("CmdHandler", "https://thumbs.dreamstime.com/b/enable-disable-icon-button-symbol-vector-illustration-187548358.jpg")
                            .setDescription(`Pomyślnie wyłączono wszystkie komendy **GLOBALNIE**.`)
                            .addField("Powód", reasonArg)
                            .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                            message.channel.send(e);
                        } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Wszystkie komendy na serwerze są już wyłączone")
                    } else {
                        if (!cmd) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie znaleziono takiej komendy")
                        if (cmd.category === "Developerskie") return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie możesz zarządzać tą komendą")
                        if (stat_cmd === false || stat_cmd === "disabled" || stat_cmd === null) {
                            await client.cmdSettings.set(`cmd-${cmd.name}-isDisabled`, true)
                            await client.cmdSettings.set(`cmd-${cmd.name}-reason`, reasonArg)
                            const e = new MessageEmbed()
                            .setColor("#F0FF6E")
                            .setAuthor("CmdHandler", "https://thumbs.dreamstime.com/b/enable-disable-icon-button-symbol-vector-illustration-187548358.jpg")
                            .setDescription(`Pomyślnie wyłączono komendę ${cmd.name}.`)
                            .addField("Powód", reasonArg)
                            .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                            message.channel.send(e);
                        } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Ta komenda nie jest wyłączona")
                    }
                } catch { return }
            } else return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "command <enable / disable> <guild / channel / global> <komenda / --all> [powód]")
        } else if (opcja === "guild") {
            const stat = await client.cmdSettings.get(`cmd-all-on-${message.guild.id}-isDisabled`) || "disabled"
            const stat_cmd = await client.cmdSettings.get(`cmd-${cmd.name}-on-${message.guild.id}-isDisabled`) || "disabled"
            if (!message.member.hasPermission("MANAGE_GUILD")) return client.functions.permissionError(message.channel, "Zarządzanie serwerem")
            else if (akcja === "enable") {
                if (args[2] === "--all") {
                    if (stat === true) {
                        await client.cmdSettings.set(`cmd-all-on-${message.guild.id}-isDisabled`, false)
                        await client.cmdSettings.set(`cmd-all-on-${message.guild.id}-reason`, reasonArg)
                        const e = new MessageEmbed()
                        .setColor("#F0FF6E")
                        .setAuthor("CmdHandler", "https://thumbs.dreamstime.com/b/enable-disable-icon-button-symbol-vector-illustration-187548358.jpg")
                        .setDescription(`Pomyślnie włączono wszystkie komendy na tym serwerze.`)
                        .addField("Powód", reasonArg)
                        .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                        message.channel.send(e);
                    } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Wszystkie komendy na serwerze są już wyłączone")
                } else {
                    if (!cmd) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie znaleziono takiej komendy")
                    if (cmd.category === "Developerskie") return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie możesz zarządzać tą komendą")
                    if (cmd.category === "Developerskie") return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie możesz zarządzać tą komendą")
                    if (stat_cmd === true) {
                        await client.cmdSettings.set(`cmd-${cmd.name}-on-${message.guild.id}-isDisabled`, false)
                        await client.cmdSettings.set(`cmd-${cmd.name}-on-${message.guild.id}-reason`, reasonArg)
                        const e = new MessageEmbed()
                        .setColor("#F0FF6E")
                        .setAuthor("CmdHandler", "https://thumbs.dreamstime.com/b/enable-disable-icon-button-symbol-vector-illustration-187548358.jpg")
                        .setDescription(`Pomyślnie włączono komendę ${cmd.name} na tym serwerze.`)
                        .addField("Powód", reasonArg)
                        .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                        message.channel.send(e);
                    } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Ta komenda jest już włączona")
                }
            } else if (akcja === "disable") {
                if (args[2] === "--all") {
                    if (stat !== true) {
                        await client.cmdSettings.set(`cmd-all-on-${message.guild.id}-isDisabled`, true)
                        await client.cmdSettings.set(`cmd-all-on-${message.guild.id}-reason`, reasonArg)
                        const e = new MessageEmbed()
                        .setColor("#F0FF6E")
                        .setAuthor("CmdHandler", "https://thumbs.dreamstime.com/b/enable-disable-icon-button-symbol-vector-illustration-187548358.jpg")
                        .setDescription(`Pomyślnie wyłączono wszystkie komendy na tym serwerze.`)
                        .addField("Powód", reasonArg)
                        .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                        message.channel.send(e);
                    } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Wszystkie komendy na serwerze są już wyłączone")
                } else {
                    if (!cmd) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie znaleziono takiej komendy")
                    if (cmd.category === "Developerskie") return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie możesz zarządzać tą komendą")
                    if (stat_cmd === false || stat_cmd === "disabled" || stat_cmd === null) {
                        await client.cmdSettings.set(`cmd-${cmd.name}-on-${message.guild.id}-isDisabled`, true)
                        await client.cmdSettings.set(`cmd-${cmd.name}-on-${message.guild.id}-reason`, reasonArg)
                        const e = new MessageEmbed()
                        .setColor("#F0FF6E")
                        .setAuthor("CmdHandler", "https://thumbs.dreamstime.com/b/enable-disable-icon-button-symbol-vector-illustration-187548358.jpg")
                        .setDescription(`Pomyślnie wyłączono komendę ${cmd.name} na tym serwerze.`)
                        .addField("Powód", reasonArg)
                        .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                        message.channel.send(e);
                    } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Ta komenda jest już wyłączona")
                }
            } else return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "command <enable / disable> <guild / channel / global> <komenda / --all> [powód]")
        } else if (opcja === "channel") {
            const stat = await client.cmdSettings.get(`cmd-all-on-${message.channel.id}-isDisabled`) || "disabled"
            const stat_cmd = await client.cmdSettings.get(`cmd-${cmd.name}-on-${message.channel.id}-isDisabled`) || "disabled"
            if (!message.member.hasPermission("MANAGE_CHANNELS")) return client.functions.permissionError(message.channel, "Zarządzanie kanałami")
            else if (akcja === "enable") {
                if (args[2] === "--all") {
                    if (stat === true) {
                        await client.cmdSettings.set(`cmd-all-on-${message.channel.id}-isDisabled`, false)
                        await client.cmdSettings.set(`cmd-all-on-${message.channel.id}-reason`, reasonArg)
                        const e = new MessageEmbed()
                        .setColor("#F0FF6E")
                        .setAuthor("CmdHandler", "https://thumbs.dreamstime.com/b/enable-disable-icon-button-symbol-vector-illustration-187548358.jpg")
                        .setDescription(`Pomyślnie włączono wszystkie komendy na tym kanale.`)
                        .addField("Powód", reasonArg)
                        .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                        message.channel.send(e);
                    } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Wszystkie komendy na tym kanale są już włączone")
                } else {
                    if (!cmd) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie znaleziono takiej komendy")
                    if (cmd.category === "Developerskie") return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie możesz zarządzać tą komendą")
                    if (stat_cmd === true) {
                        await client.cmdSettings.set(`cmd-${cmd.name}-on-${message.channel.id}-isDisabled`, false)
                        await client.cmdSettings.set(`cmd-${cmd.name}-on-${message.channel.id}-reason`, reasonArg)
                        const e = new MessageEmbed()
                        .setColor("#F0FF6E")
                        .setAuthor("CmdHandler", "https://thumbs.dreamstime.com/b/enable-disable-icon-button-symbol-vector-illustration-187548358.jpg")
                        .setDescription(`Pomyślnie włączono komendę ${cmd.name} na tym kanale.`)
                        .addField("Powód", reasonArg)
                        .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                        message.channel.send(e);
                    } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Ta komenda jest już włączona")
                }
            } else if (akcja === "disable") {
                if (args[2] === "--all") {
                    if (stat !== true) {
                        await client.cmdSettings.set(`cmd-all-on-${message.channel.id}-isDisabled`, true)
                        await client.cmdSettings.set(`cmd-all-on-${message.channel.id}-reason`, reasonArg)
                        const e = new MessageEmbed()
                        .setColor("#F0FF6E")
                        .setAuthor("CmdHandler", "https://thumbs.dreamstime.com/b/enable-disable-icon-button-symbol-vector-illustration-187548358.jpg")
                        .setDescription(`Pomyślnie wyłączono wszystkie komendy na tym kanale.`)
                        .addField("Powód", reasonArg)
                        .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                        message.channel.send(e);
                    } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Wszystkie komendy na tym kanale są już wyłączone")
                } else {
                    if (!cmd) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie znaleziono takiej komendy")
                    if (cmd.category === "Developerskie") return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie możesz zarządzać tą komendą")
                    if (stat_cmd === false || stat_cmd === "disabled" || stat_cmd === null) {
                        await client.cmdSettings.set(`cmd-${cmd.name}-on-${message.channel.id}-isDisabled`, true)
                        await client.cmdSettings.set(`cmd-${cmd.name}-on-${message.channel.id}-reason`, reasonArg)
                        const e = new MessageEmbed()
                        .setColor("#F0FF6E")
                        .setAuthor("CmdHandler", "https://thumbs.dreamstime.com/b/enable-disable-icon-button-symbol-vector-illustration-187548358.jpg")
                        .setDescription(`Pomyślnie wyłączono komendę ${cmd.name} na tym kanale.`)
                        .addField("Powód", reasonArg)
                        .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                        message.channel.send(e);
                    } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Ta komenda jest już wyłączona")
                }
            } else return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "command <enable / disable> <guild / channel / global> <komenda / --all> [powód]")
        } else return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "command <enable / disable> <guild / channel / global> <komenda / --all> [powód]")
    }
}