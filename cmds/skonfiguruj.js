const { MessageEmbed } = require("discord.js")
const pag = require("discord.js-reaction-menu")

module.exports = {
    name: "skonfiguruj",
    descriptionpl: "Konfigurowanie serwera",
    descriptionen: "Guild configuration",
    aliases: ["c", "conf", "config", "konfig", "konfiguruj", "sett", "settings", "ustawienia"],
    category: "Moderacja",
    usagepl: "<set / show> <opcja> <nowe ustawienie>",
    usageen: "<set / show> <option> <new value>",
    
    async run(message, args, client) {
        const akcja = args[0]
        const opcja = args[1]
        const ustawienie = [...args].slice(2).join(" ")
        if (!akcja) return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, client.langManager.handleLanguage(message, "config <set / show> <option> <new value>", "skonfiguruj <set / show> <opcja> <nowa wartość>"))
        else if (akcja === "show") try {
            const str1 = new MessageEmbed()
            .setColor("#75FF67")
            .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
            .setDescription(client.langManager.handleLanguage(message, `In this window you can see the configuration of the server.\nTo change a specific setting, use \`${await client.config.get(`guild-${message.guild.id}-prefix`) || "-"}config set <option> <new value> \`. \nExample: \`${await client.config.get(`guild-${message.guild.id}-prefix`) || "-"}config set prefix % \`. \nTo remove a setting from the database use: \`${await client.config.get(`guild-${message.guild.id}-prefix`) || "-"}config set <setting name> off \`. Remember that not all settings can be turned off! (e.g. prefix). \nAvailable variables for greetings and farewells: \`{membermention} - mention, {memberid} - user id, {membertag} - user tag, {membercreated} - user account creation date, {guildname} - name server, {guildid} - server id, {guildmembers} - number of users on the server \`.\nTo move between pages use the reactions.`, `W tym oknie możesz zobaczyć konfigurację serwera.\nAby zmienić konkretne ustawienie użyj \`${await client.config.get(`guild-${message.guild.id}-prefix`) || "-"}skonfiguruj set <opcja> <nowa wartość>\`.\nPrzykład: \`${await client.config.get(`guild-${message.guild.id}-prefix`) || "-"}skonfiguruj set prefix %\`.\nAby usunąć ustawienie z bazy użyj: \`${await client.config.get(`guild-${message.guild.id}-prefix`) || "-"}skonfiguruj set <nazwa ustawienia> off\`. Pamiętaj, że nie wszystkie ustawienia można wyłączać! (np. prefix).\nDostępne zmienne dla powitań i pożegnań: \`{membermention} - wzmianka, {memberid} - id użytkownika, {membertag} - tag użytkownika, {membercreated} - data założenia konta użytkownika, {guildname} - nazwa serwera, {guildid} - id serwera, {guildmembers} - liczba użytkowników na serwerze\`.\nAby przemieszczać się pomiędzy stronami użyj reakcji.`))
            .addFields(
                {
                    name: "Prefix (\`prefix\`)",
                    value: await client.config.get(`guild-${message.guild.id}-prefix`) || "-"
                },
                {
                    name: client.langManager.handleLanguage(message, "Suggestions channel (\`suggestionsChannel\`)", "Kanał propozycji (\`suggestionsChannel\`)"),
                    value: await client.config.get(`config-${message.guild.id}-suggestionsChannel`) || client.langManager.handleLanguage(message, "Not specified", "Nie ustawiono")
                },
                {
                    name: client.langManager.handleLanguage(message, "Announcement channel (\`announcementChannel\`)", "Kanał ogłoszeń (\`announcementChannel\`)"),
                    value: await client.config.get(`config-${message.guild.id}-announcementChannel`) || client.langManager.handleLanguage(message, "Not specified", "Nie ustawiono")
                },
                {
                    name: client.langManager.handleLanguage(message, "Announcement mention (\`announcementMention\`)", "Wzmianka ogłoszeń (\`announcementMention\`)"),
                    value: await client.config.get(`config-${message.guild.id}-announcementMention`) || client.langManager.handleLanguage(message, "Not specified", "Nie ustawiono")
                },
                {
                    name: client.langManager.handleLanguage(message, "Welcome module (\`welcomeModule\`)", "Moduł powitań (\`welcomeModule\`)"),
                    value: `${await client.config.get(`config-${message.guild.id}-welcomeModule`)}`.replace("on", "Włączony").replace("off", "Wyłączony").replace(null, "Wyłączony") || "Wyłączony"
                },
                {
                    name: client.langManager.handleLanguage(message, "Welcome channel (\`welcomeChannel\`)", "Kanał powitań (\`welcomeChannel\`)"),
                    value: await client.config.get(`config-${message.guild.id}-welcomeChannel`) || client.langManager.handleLanguage(message, "Not specified", "Nie ustawiono")
                },
                {
                    name: client.langManager.handleLanguage(message, "Welcome message (\`welcomeMessage\`)", "Wiadomość powitalna (\`welcomeMessage\`)"),
                    value: await client.config.get(`config-${message.guild.id}-welcomeMessage`) || client.langManager.handleLanguage(message, "User joined this server: {membermention}", "Użytkownik dołączył na nasz serwer: {membermention}")
                },
                {
                    name: client.langManager.handleLanguage(message, "Welcome message embed color", "Kolor wiadomości powitalnej (\`welcomeMessageColor\`)"),
                    value: await client.config.get(`config-${message.guild.id}-welcomeMessageColor`) || "#17FF00"
                }
            )
            .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
            
            const str2 = new MessageEmbed()
            .setColor("#75FF67")
            .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
            .setDescription(client.langManager.handleLanguage(message, `In this window you can see the configuration of the server.\nTo change a specific setting, use \`${await client.config.get(`guild-${message.guild.id}-prefix`) || "-"}config set <option> <new value> \`. \nExample: \`${await client.config.get(`guild-${message.guild.id}-prefix`) || "-"}config set prefix % \`. \nTo remove a setting from the database use: \`${await client.config.get(`guild-${message.guild.id}-prefix`) || "-"}config set <setting name> off \`. Remember that not all settings can be turned off! (e.g. prefix). \nAvailable variables for greetings and farewells: \`{membermention} - mention, {memberid} - user id, {membertag} - user tag, {membercreated} - user account creation date, {guildname} - name server, {guildid} - server id, {guildmembers} - number of users on the server \`.\nTo move between pages use the reactions.`, `W tym oknie możesz zobaczyć konfigurację serwera.\nAby zmienić konkretne ustawienie użyj \`${await client.config.get(`guild-${message.guild.id}-prefix`) || "-"}skonfiguruj set <opcja> <nowa wartość>\`.\nPrzykład: \`${await client.config.get(`guild-${message.guild.id}-prefix`) || "-"}skonfiguruj set prefix %\`.\nAby usunąć ustawienie z bazy użyj: \`${await client.config.get(`guild-${message.guild.id}-prefix`) || "-"}skonfiguruj set <nazwa ustawienia> off\`. Pamiętaj, że nie wszystkie ustawienia można wyłączać! (np. prefix).\nDostępne zmienne dla powitań i pożegnań: \`{membermention} - wzmianka, {memberid} - id użytkownika, {membertag} - tag użytkownika, {membercreated} - data założenia konta użytkownika, {guildname} - nazwa serwera, {guildid} - id serwera, {guildmembers} - liczba użytkowników na serwerze\`.\nAby przemieszczać się pomiędzy stronami użyj reakcji.`))
            .addFields(
                {
                    name: client.langManager.handleLanguage(message, "Leave module (\`leaveModule\`)", "Moduł pożegnań (\`leaveModule\`)"),
                    value: `${await client.config.get(`config-${message.guild.id}-leaveModule`)}`.replace("on", "Włączony").replace("off", "Wyłączony").replace(null, "Wyłączony") || "Wyłączony"
                },
                {
                    name: client.langManager.handleLanguage(message, "Leave channel (\`leaveChannel\`)", "Kanał pożegnań (\`leaveChannel\`)"),
                    value: await client.config.get(`config-${message.guild.id}-leaveChannel`) || client.langManager.handleLanguage(message, "Not specified", "Nie ustawiono")
                },
                {
                    name: client.langManager.handleLanguage(message, "Leave message (\`leaveMessage\`)", "Wiadomość pożegnalna (\`leaveMessage\`)"),
                    value: await client.config.get(`config-${message.guild.id}-leaveMessage`) || client.langManager.handleLanguage(message, "{membertag} leaves our server :(", "{membertag} opuścił nasz serwer :(")
                },
                {
                    name: client.langManager.handleLanguage(message, "Leave message embed color (\`leaveMessageColor\`)", "Kolor wiadomości pożegnalnej (\`leaveMessageColor\`)"),
                    value: await client.config.get(`config-${message.guild.id}-leaveMessageColor`) || "#ff0000"
                },
                {
                    name: client.langManager.handleLanguage(message, "Messages logs module (\`messageLog\`)", "Logi wiadomości (\`messageLog\`)"),
                    value: `${await client.config.get(`config-${message.guild.id}-messageLog`)}`.replace(true, "Włączony").replace(false, "Wyłączony").replace(null, "Wyłączony") || "Wyłączony"
                },
                {
                    name: client.langManager.handleLanguage(message, "Messages logs channel (\`messageLogChannel\`)", "Kanał logów wiadomości (\`messageLogChannel\`)"),
                    value: await client.config.get(`config-${message.guild.id}-messageLogChannel`) || client.langManager.handleLanguage(message, "Not specified", "Nie ustawiono")
                },
                {
                    name: client.langManager.handleLanguage(message, "Verification module (\`verificationModule\`)", "Moduł weryfikacji (\`verificationModule\`)"),
                    value: `${await client.config.get(`config-${message.guild.id}-verificationModule`)}`.replace("on", "Włączony").replace("off", "Wyłączony").replace(null, "Wyłączony") || "Wyłączony"
                },
                {
                    name: client.langManager.handleLanguage(message, "Verification role (\`verificationRole\`)", "Rola nadawana po poprawnym zweryfikowaniu się (\`verificationRole\`)"),
                    value: await client.config.get(`config-${message.guild.id}-verificationRole`) || client.langManager.handleLanguage(message, "Not specified", "Nie ustawiono")
                },
                {
                    name: client.langManager.handleLanguage(message, "Mute role (\`muteRole\`)", "Rola wyciszonego użytkownika (\`muteRole\`)"),
                    value: await client.config.get(`config-${message.guild.id}-muteRole`) || client.langManager.handleLanguage(message, "Not specified", "Nie ustawiono")
                },
                {
                    name: client.langManager.handleLanguage(message, "AntyLink module (\`antyLink\`)", "Moduł blokujący linki (\`antyLink\`)"),
                    value: `${await client.config.get(`config-${message.guild.id}-antyLink`)}`.replace(false, "Wyłączony").replace(true, "Włączony").replace(null, "Wyłączony") || "Wyłączony"
                },
                {
                    name: client.langManager.handleLanguage(message, "Verification channel (\`verificationChannel\`)", "Kanał weryfikacji (\`verificationChannel\`)"),
                    value: await client.config.get(`config-${message.guild.id}-verificationChannel`) || client.langManager.handleLanguage(message, "Not specified", "Nie ustawiono")
                },
            )
            .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)

            new pag.menu({
				channel: message.channel,
				userID: message.author.id,
				pages: [
                    str1,
                    str2
				],
				time: 120000
			})

			/* Reakcje */
			pag.reactions.first = "⏪"
			pag.reactions.back = "⬅"
			pag.reactions.next = "➡"
            pag.reactions.last = "⏩"
            pag.reactions.stop = "⏹"
        } catch (err) {
            client.functions.errorMsg(client, "CriticalError", message.channel, message.guild.id, err)
        } else if (akcja === "set") try {
            if (!message.member.hasPermission("MANAGE_GUILD")) return client.functions.permissionError(message.channel, client.langManager.handleLanguage(message, "Manage guild", "Zarządzanie serwerem"))
            else if (!opcja || !ustawienie) return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, client.langManager.handleLanguage(message, "config set <option> <new value>", "skonfiguruj set <opcja> <nowa wartość>"))
            else if (opcja === "prefix") {
                if (ustawienie.length > 3) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, "Prefix cannot be longer than 3 characters", "Prefix nie może być dłuższy niż 3 znaki"))
                else {
                    await client.config.set(`guild-${message.guild.id}-prefix`, ustawienie)
                    const e1 = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                    .setDescription(client.langManager.handleLanguage(message, `Succesfully updated prefix to ${ustawienie}.`, `Pomyślnie zmieniono prefix na ${ustawienie}.`))
                    .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e1);
                }
            } else if (opcja === "suggestionsChannel") {
                const kanal = message.mentions.channels.first()
                if (!kanal) {
                    if (ustawienie === "off") {
                        await client.config.delete(`config-${message.guild.id}-suggestionsChannel`)
                        const e2 = new MessageEmbed()
                        .setColor("#75FF67")
                        .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                        .setDescription(client.langManager.handleLanguage(message, "Succesfully deleted suggestions channel from database.", "Pomyślnie usunięto kanał propozycji z bazy."))
                        .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                        message.channel.send(e2);
                    } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, "No such channel was found", "Nie znaleziono takiego kanału"))
                } else {
                    await client.config.set(`config-${message.guild.id}-suggestionsChannel`, `${kanal}`)
                    const e2 = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                    .setDescription(client.langManager.handleLanguage(message, `Successfully updated suggestions channel to ${kanal}.`, `Pomyślnie ustawiono kanał propozycji na ${kanal}.`))
                    .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e2);
                }
            } else if (opcja === "announcementChannel") {
                const annChn = message.mentions.channels.first()
                if (!annChn) {
                    if (ustawienie === "off") {
                        await client.config.delete(`config-${message.guild.id}-announcementChannel`)
                        const e = new MessageEmbed()
                        .setColor("#75FF67")
                        .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                        .setDescription(client.langManager.handleLanguage(message, "Successfully deleted announcement channel from database.", "Pomyślnie usunięto kanał ogłoszeń z bazy."))
                        .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                        message.channel.send(e);
                    } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, "No such channel was found", "Nie znaleziono takiego kanału"))
                } else {
                    await client.config.set(`config-${message.guild.id}-announcementChannel`, `${annChn}`)
                    const e = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                    .setDescription(client.langManager.handleLanguage(message, `Successfully updated announcement channel to ${annChn}.`, `Pomyślnie ustawiono kanał ogłoszeń na ${annChn}.`))
                    .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e);
                }
            } else if (opcja === "announcementMention") {
                const rola = ustawienie.replace("<@&", "").replace(">", "")
                const mntn = message.guild.roles.cache.get(rola)
                if (!mntn) {
                    if (ustawienie === "off") {
                        await client.config.delete(`config-${message.guild.id}-announcementMention`)
                        const e = new MessageEmbed()
                        .setColor("#75FF67")
                        .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                        .setDescription(client.langManager.handleLanguage(message, "Successfully deleted announcement mention from database.", "Pomyślnie usunięto wzmiankę ogłoszeń z bazy."))
                        .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                        message.channel.send(e);
                    } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, "No such mention was found", "Nie znaleziono takiej rangi"))
                } else {
                    await client.config.set(`config-${message.guild.id}-announcementMention`, ustawienie)
                    const e = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                    .setDescription(client.langManager.handleLanguage(message, `Successfully updated announcement mention to ${mntn}.`, `Pomyślnie ustawiono wzmiankę ogłoszeń na ${mntn}.`))
                    .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e);
                }
            } else if (opcja === "welcomeModule") {
                const chn = await client.config.get(`config-${message.guild.id}-welcomeChannel`)
                if (!chn) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Musisz wpierw ustawić kanał powitań")
                else if (ustawienie === "tak") {
                    await client.config.set(`config-${message.guild.id}-welcomeModule`, "on")
                    const e = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                    .setDescription(client.langManager.handleLanguage(message, "Successfully enabled welcome module.", "Pomyślnie włączono moduł powitań."))
                    .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e);
                } else if (ustawienie === "nie") {
                    await client.config.set(`config-${message.guild.id}-welcomeModule`, "off")
                    const e = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                    .setDescription(client.langManager.handleLanguage(message, "Successfully disabled welcome module.", "Pomyślnie wyłączono moduł powitań."))
                    .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e);
                } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, "You may only enter one of the following options: \`yes\`/\`no\`", "Możesz podać tylko jedną z podanych opcji: \`tak\`/\`nie\`"))
            } else if (opcja === "welcomeChannel") {
                const chn = message.mentions.channels.first()
                if (!chn) {
                    if (ustawienie === "off") {
                        await client.config.set(`config-${message.guild.id}-welcomeModule`, "off")
                        await client.config.delete(`config-${message.guild.id}-welcomeChannel`)
                        const e = new MessageEmbed()
                        .setColor("#75FF67")
                        .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                        .setDescription(client.langManager.handleLanguage(message, "Successfully deleted welcome channel from database.", "Pomyślnie usunięto kanał powitań z bazy."))
                        .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                        message.channel.send(e);
                    } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, "No such channel was found", "Nie znaleziono takiego kanału"))
                } else {
                    await client.config.set(`config-${message.guild.id}-welcomeChannel`, `${chn}`)
                    const e = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                    .setDescription(client.langManager.handleLanguage(message, `Successfully updated welcome channel to ${chn}.`, `Pomyślnie ustawiono kanał powitań na ${chn}.`))
                    .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e);
                }
            } else if (opcja === "welcomeMessage") {
                const msg = ustawienie
                if (!msg) {
                    if (ustawienie === "off" || ustawienie === "default") {
                        await client.config.set(`config-${message.guild.id}-welcomeMessage`, client.langManager.handleLanguage(message, "User joined this server: {membermention}", "Użytkownik dołączył na nasz serwer: {membermention}"))
                        const e = new MessageEmbed()
                        .setColor("#75FF67")
                        .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                        .setDescription(client.langManager.handleLanguage(message, "Successfully updated welcome message to default.", "Pomyślnie ustawiono wiadomość powitalną na domyślną."))
                        .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                        message.channel.send(e);
                    } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Podaj wiadomość powitalną\nDostępne zmienne:\n\`{membermention} - wzmianka, {memberid} - id użytkownika, {membertag} - tag użytkownika, {membercreated} - data założenia konta użytkownika, {guildname} - nazwa serwera, {guildid} - id serwera, {guildmembers} - liczba użytkowników na serwerze\`")
                } else {
                    await client.config.set(`config-${message.guild.id}-welcomeMessage`, `${msg}`)
                    const e = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                    .setDescription(client.langManager.handleLanguage(message, `Successfully updated welcome message to ${msg}.`, `Pomyślnie ustawiono wiadomość powitalną na ${msg}.`))
                    .addField(client.langManager.handleLanguage(message, "E.g.", "Przykład"), `${msg}`
                        .replace(/{membermention}/g, `<@${message.author.id}>`)
                        .replace(/{memberid}/g, message.author.id)
                        .replace(/{membertag}/g, message.author.tag)
                        .replace(/{membercreated}/g, require("moment")(message.member.createdAt).format("YYYY-MM-DD HH:MM:ss"))
                        .replace(/{guildname}/g, message.guild.name)
                        .replace(/{guildid}/g, message.guild.id)
                        .replace(/{guildmembers}/g, message.guild.members.cache.filter(mbr => !mbr.user.bot).size)
                    )
                    .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e);
                }
            } else if (opcja === "welcomeMessageColor") {
                var reg = /[0-9A-Fa-f]{6}/g;
                const kolor = ustawienie
                if (!reg.test(kolor) || kolor.length != 7) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Podaj prawidłowy kolor HEX")
                else if (!kolor) {
                    if (ustawienie === "off" || ustawienie === "default") {
                        await client.config.set(`config-${message.guild.id}-welcomeMessaageColor`, "#17FF00")
                        const e = new MessageEmbed()
                        .setColor("#75FF67")
                        .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                        .setDescription(`Pomyślnie ustawiono kolor wiadomości powitalnej na domyślny.`)
                        .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                        message.channel.send(e);
                    } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Podaj kolor HEX wiadomości")
                } else {
                    await client.config.set(`config-${message.guild.id}-welcomeMessageColor`, `${kolor}`)
                    const e = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                    .setDescription(`Pomyślnie ustawiono kolor wiadomości powitalnej na ${kolor}.`)
                    .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e);
                }
            } else if (opcja === "leaveModule") {
                const chn = await client.config.get(`config-${message.guild.id}-leaveChannel`)
                if (!chn) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Musisz wpierw ustawić kanał pożegnań")
                else if (ustawienie === "tak") {
                    await client.config.set(`config-${message.guild.id}-leaveModule`, "on")
                    const e = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                    .setDescription(`Pomyślnie włączono moduł pożegnań.`)
                    .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e);
                } else if (ustawienie === "nie") {
                    await client.config.set(`config-${message.guild.id}-leaveModule`, "off")
                    const e = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                    .setDescription(`Pomyślnie wyłączono moduł pożegnań.`)
                    .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e);
                } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Możesz podać tylko jedną z podanych opcji: \`tak\`/\`nie\`.")
            } else if (opcja === "leaveChannel") {
                const chn = message.mentions.channels.first()
                if (!chn) {
                    if (ustawienie === "off") {
                        await client.config.set(`config-${message.guild.id}-leaveModule`, "off")
                        await client.config.set(`config-${message.guild.id}-leaveChannel`, null)
                        const e = new MessageEmbed()
                        .setColor("#75FF67")
                        .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                        .setDescription(`Pomyślnie usunięto kanał pożegnań z bazy.`)
                        .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                        message.channel.send(e);
                    } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie znaleziono takiego kanału")
                } else {
                    await client.config.set(`config-${message.guild.id}-leaveChannel`, `${chn}`)
                    const e = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                    .setDescription(`Pomyślnie ustawiono kanał pożegnań na ${chn}.`)
                    .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e);
                }
            } else if (opcja === "leaveMessage") {
                const msg = ustawienie
                if (!msg) {
                    if (ustawienie === "off") {
                        await client.config.set(`config-${message.guild.id}-leaveMessage`, "{membertag} opuścił nasz serwer :(")
                        const e = new MessageEmbed()
                        .setColor("#75FF67")
                        .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                        .setDescription(`Pomyślnie ustawiono wiadomość pożegnalną na domyślną.`)
                        .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                        message.channel.send(e);
                    } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Podaj wiadomość pożegnalną\nDostępne zmienne:\n\`{membermention} - wzmianka, {memberid} - id użytkownika, {membertag} - tag użytkownika, {membercreated} - data założenia konta użytkownika, {guildname} - nazwa serwera, {guildid} - id serwera, {guildmembers} - liczba użytkowników na serwerze\`")
                } else {
                    await client.config.set(`config-${message.guild.id}-leaveMessage`, `${msg}`)
                    const e = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                    .setDescription(`Pomyślnie ustawiono wiadomość pożegnalną na ${msg}.`)
                    .addField("Przykład", `${msg}`
                        .replace(/{membermention}/g, `<@${message.author.id}>`)
                        .replace(/{memberid}/g, message.author.id)
                        .replace(/{membertag}/g, message.author.tag)
                        .replace(/{membercreated}/g, require("moment")(message.member.createdAt).format("YYYY-MM-DD HH:MM:ss"))
                        .replace(/{guildname}/g, message.guild.name)
                        .replace(/{guildid}/g, message.guild.id)
                        .replace(/{guildmembers}/g, message.guild.members.cache.filter(mbr => !mbr.user.bot).size)
                    )
                    .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e);
                }
            } else if (opcja === "leaveMessageColor") {
                var reg = /[0-9A-Fa-f]{6}/g;
                const kolor = ustawienie
                if (!reg.test(kolor) || kolor.length != 7) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Podaj prawidłowy kolor HEX\nPrzykład: \`#ff0000\`")
                else if (!kolor) {
                    if (ustawienie === "off") {
                        await client.config.set(`config-${message.guild.id}-leaveMessageColor`, "#ff0000")
                        const e = new MessageEmbed()
                        .setColor("#75FF67")
                        .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                        .setDescription(`Pomyślnie ustawiono kolor wiadomości pożegnalnej na domyślny.`)
                        .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                        message.channel.send(e);
                    } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Podaj kolor HEX wiadomości")
                } else {
                    await client.config.set(`config-${message.guild.id}-leaveMessageColor`, `${kolor}`)
                    const e = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                    .setDescription(`Pomyślnie ustawiono kolor wiadomości pożegnalnej na ${kolor}.`)
                    .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e);
                }
            } else if (opcja === "antyLink") {
                if (ustawienie === "tak") {
                    await client.config.set(`config-${message.guild.id}-antyLink`, true)
                    const e = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                    .setDescription(`Pomyślnie włączono moduł AntyLink.`)
                    .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e);
                } else if (ustawienie === "nie") {
                    await client.config.set(`config-${message.guild.id}-antyLink`, false)
                    const e = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                    .setDescription(`Pomyślnie wyłączono moduł AntyLink.`)
                    .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e);
                } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Możesz podać tylko jedną z podanych opcji: \`tak\`/\`nie\`")
            } else if (opcja === "messageLog") {
                const mod = await client.config.get(`config-${message.guild.id}-messageLogChannel`)
                if (!mod) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Musisz wpierw ustawić kanał logów wiadomości")
                else {
                    if (ustawienie === "tak") {
                        await client.config.set(`config-${message.guild.id}-messageLog`, true)
                        const e = new MessageEmbed()
                        .setColor("#75FF67")
                        .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                        .setDescription(`Pomyślnie włączono logi wiadomości.`)
                        .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                        message.channel.send(e);
                    } else if (ustawienie === "nie") {
                        await client.config.set(`config-${message.guild.id}-messageLog`, false)
                        const e = new MessageEmbed()
                        .setColor("#75FF67")
                        .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                        .setDescription(`Pomyślnie wyłączono logi wiadomości.`)
                        .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                        message.channel.send(e);
                    } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Możesz podać tylko jedną z podanych opcji: \`tak\`/\`nie\`")
                }
            } else if (opcja === "messageLogChannel") {
                const chn = message.mentions.channels.first()
                if (!chn) {
                    if (ustawienie === "off") {
                        await client.config.set(`config-${message.guild.id}-messageLog`, false)
                        await client.config.set(`config-${message.guild.id}-messageLogChannel`, null)
                        const e = new MessageEmbed()
                        .setColor("#75FF67")
                        .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                        .setDescription(`Pomyślnie usunięto kanał logów wiadomości z bazy.`)
                        .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                        message.channel.send(e);
                    } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie znaleziono takiego kanału")
                } else {
                    await client.config.set(`config-${message.guild.id}-messageLogChannel`, `${chn}`)
                    const e = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                    .setDescription(`Pomyślnie ustawiono kanał logów wiadomości na ${chn}.`)
                    .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e);
                }
            } else if (opcja === "verificationModule") {
                const verrole = await client.config.get(`config-${message.guild.id}-verificationRole`)
                const verchn = await client.config.get(`config-${message.guild.id}-verificationChannel`)
                if (!verrole) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Musisz wpierw ustawić rolę, która będzie nadawana po weryfikacji")
                if (!verchn) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Musisz wpierw ustawić kanał weryfikacji")
                else {
                    if (ustawienie === "tak") {
                        await client.config.set(`config-${message.guild.id}-verificationModule`, "on")
                        const e = new MessageEmbed()
                        .setColor("#75FF67")
                        .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                        .setDescription(`Pomyślnie włączono moduł weryfikacji.`)
                        .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                        message.channel.send(e);
                    } else if (ustawienie === "nie") {
                        await client.config.set(`config-${message.guild.id}-verificationModule`, "off")
                        const e = new MessageEmbed()
                        .setColor("#75FF67")
                        .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                        .setDescription(`Pomyślnie wyłączono moduł weryfikacji.`)
                        .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                        message.channel.send(e);
                    } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Możesz podać tylko jedną z podanych opcji: \`tak\`/\`nie\`")
                }
            } else if (opcja === "verificationRole") {
                const rola = ustawienie.replace("<@&", "").replace(">", "")
                const mntn = message.guild.roles.cache.get(rola)
                if (!mntn) {
                    if (ustawienie === "off") {
                        await client.config.set(`config-${message.guild.id}-verificationModule`, "off")
                        await client.config.set(`config-${message.guild.id}-verificationRole`, null)
                        const e = new MessageEmbed()
                        .setColor("#75FF67")
                        .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                        .setDescription(`Pomyślnie usunięto rolę, która będzie nadawana po weryfikacji z bazy.`)
                        .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                        message.channel.send(e);
                    } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie znaleziono takiej rangi")
                } else {
                    await client.config.set(`config-${message.guild.id}-verificationRole`, `${mntn}`)
                    const e = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                    .setDescription(`Pomyślnie ustawiono rolę, która będzie nadawana po weryfikacji na ${mntn}.`)
                    .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e);
                }
            } else if (opcja === "muteRole") {
                const rola = ustawienie.replace("<@&", "").replace(">", "")
                const mntn = message.guild.roles.cache.get(rola)
                if (!mntn) {
                    if (ustawienie === "off") {
                        await client.config.set(`config-${message.guild.id}-muteRole`, null)
                        const e = new MessageEmbed()
                        .setColor("#75FF67")
                        .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                        .setDescription(`Pomyślnie usunięto rolę wyciszonego użytkownika.`)
                        .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                        message.channel.send(e);
                    } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie znaleziono takiej rangi")
                } else {
                    await client.config.set(`config-${message.guild.id}-muteRole`, `${mntn}`)
                    const e = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                    .setDescription(`Pomyślnie ustawiono rolę wyciszonego użytkownika na ${mntn}.`)
                    .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e);
                }
            } else if (opcja === "verificationChannel") {
                const chn = ustawienie.replace("<#", "").replace(">", "")
                const mntn = message.guild.channels.cache.get(chn)
                if (!mntn) {
                    if (ustawienie === "off") {
                        await client.config.set(`config-${message.guild.id}-verificationModule`, "off")
                        await client.config.set(`config-${message.guild.id}-verificationRole`, null)
                        await client.config.set(`config-${message.guild.id}-verificationChannel`, null)
                        const e = new MessageEmbed()
                        .setColor("#75FF67")
                        .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                        .setDescription(`Pomyślnie usunięto kanał weryfikacji z bazy.`)
                        .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                        message.channel.send(e);
                    } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie znaleziono takiego kanału")
                } else {
                    await client.config.set(`config-${message.guild.id}-verificationChannel`, `${mntn}`)
                    const e = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor(client.langManager.handleLanguage(message, "Config", "Konfiguracja"), "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png")
                    .setDescription(`Pomyślnie ustawiono kanał weryfikacji na ${mntn}.`)
                    .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e);
                }
            } else return client.functions.customErrorMsg(message.channel, "Podałeś nieprawidłową opcję.", "skonfiguruj set <opcja> <nowa wartość>")
        } catch (err) {
            client.functions.errorMsg(client, "CriticalError", message.channel, message.guild.id, err)
        }
    }
} 